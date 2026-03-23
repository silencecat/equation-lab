import { expect } from '@playwright/test';

export function attachBrowserErrorCollector(page) {
  const errors = [];
  page.on('pageerror', (err) => errors.push(String(err)));
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

export async function openApp(page, options = {}) {
  const {
    locale = 'zh',
    clearedLevelIds = [],
    seenOnboarding = true,
  } = options;

  const state = {
    version: 1,
    profile: { locale },
    progress: { clearedLevelIds, currentLevelId: '' },
    learning: { seenOnboarding, lastPlayedAt: null },
    meta: { schemaVersion: 1 },
  };

  await page.addInitScript((seed) => {
    localStorage.setItem('eqlab_state_v1', JSON.stringify(seed));
    localStorage.setItem('eqlab_lang', seed.profile.locale);
    localStorage.setItem('eqlab_cleared', JSON.stringify(seed.progress.clearedLevelIds));
    localStorage.setItem('eqlab_onboard_done', seed.learning.seenOnboarding ? '1' : '0');
  }, state);

  const errors = attachBrowserErrorCollector(page);
  await page.goto('/equation_lab.html');
  await expect(page.locator('#homeView')).toBeVisible();
  // 进入第一个旅程以切换到游戏视图
  await page.locator('.journey-card').first().click();
  await expect(page.locator('#title')).toBeVisible();
  return errors;
}

export async function openDrawer(page) {
  const overlay = page.locator('#drawerOverlay');
  if (!(await overlay.isVisible().catch(() => false))) {
    await page.locator('.menu-btn').click();
    await page.waitForTimeout(120);
  }
}

export async function loadLevelByIndex(page, index, expectedTitle) {
  if (index !== 0) {
    await page.evaluate((i) => window.__testLoadLevel(i), index);
  }
  await page.waitForFunction(
    (title) => document.querySelector('#title')?.textContent?.includes(title),
    expectedTitle,
  );
  await page.waitForTimeout(150);
  await dismissGateIfOpen(page);
}

export async function dismissGateIfOpen(page) {
  const gate = page.locator('#gateOverlay');
  if (await gate.isVisible().catch(() => false)) {
    // 点击正确选项（带 correct 数据的按钮）
    await page.evaluate(() => {
      const btns = document.querySelectorAll('.gate-opt');
      // 找到正确答案索引: gate数据在当前关卡上
      const lv = window.__testCurrentLevel?.();
      if (lv?.gate) {
        const idx = lv.gate.options.findIndex(o => o.correct);
        if (idx >= 0 && btns[idx]) btns[idx].click();
      } else if (btns.length) {
        // fallback: 依次尝试
        btns.forEach(b => b.click());
      }
    });
    await page.waitForTimeout(600);
  }
}

export async function dragLocatorToPoint(page, locator, point) {
  const box = await locator.boundingBox();
  if (!box) throw new Error('missing source bounding box');
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(point.x, point.y, { steps: 16 });
  await page.mouse.up();
}

export async function dragTermToSide(page, locator, sideSelector) {
  const target = await page.locator(sideSelector).boundingBox();
  if (!target) throw new Error(`missing target box for ${sideSelector}`);
  await dragLocatorToPoint(page, locator, {
    x: target.x + target.width * 0.65,
    y: target.y + target.height / 2,
  });
}

export async function dragToolToEquals(page, op) {
  const eqBox = await page.locator('#eqToolDrop').boundingBox();
  if (!eqBox) throw new Error('missing equals box');
  await dragLocatorToPoint(page, page.locator(`.tool-op[data-op="${op}"]`), {
    x: eqBox.x + eqBox.width / 2,
    y: eqBox.y + eqBox.height / 2,
  });
}

export async function invalidDragOutside(page) {
  const locator = page.locator('#left .chip, #right .chip, #buildTray .tray-chip').first();
  if (!(await locator.count())) return false;
  const box = await locator.boundingBox();
  if (!box) return false;
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(30, 30, { steps: 10 });
  await page.mouse.up();
  await page.waitForTimeout(180);
  return true;
}

export async function smokeCurrentLevel(page) {
  await invalidDragOutside(page);

  const buildVisible = await page.locator('#buildTray').isVisible().catch(() => false);
  if (buildVisible) {
    const trayChip = page.locator('#buildTray .tray-chip').first();
    if (await trayChip.count()) {
      const leftBox = await page.locator('#left').boundingBox();
      if (leftBox) {
        await dragLocatorToPoint(page, trayChip, {
          x: leftBox.x + leftBox.width * 0.6,
          y: leftBox.y + leftBox.height / 2,
        });
        await page.waitForTimeout(350);
        if (await page.locator('#undo').isEnabled()) {
          await page.locator('#undo').click();
          await page.waitForTimeout(180);
        }
      }
    }
  } else {
    const expand = page.locator('.gexpand').first();
    if (await expand.count()) {
      await expand.click();
      await page.waitForTimeout(1400);
      if (await page.locator('#undo').isEnabled()) {
        await page.locator('#undo').click();
        await page.waitForTimeout(220);
      }
    } else {
      const leftNum = page.locator('#left .chip.n').first();
      const rightNum = page.locator('#right .chip.n').first();
      if (await leftNum.count()) {
        await dragTermToSide(page, leftNum, '#right');
        await page.waitForTimeout(900);
        if (await page.locator('#undo').isEnabled()) {
          await page.locator('#undo').click();
          await page.waitForTimeout(220);
        }
      } else if (await rightNum.count()) {
        await dragTermToSide(page, rightNum, '#left');
        await page.waitForTimeout(900);
        if (await page.locator('#undo').isEnabled()) {
          await page.locator('#undo').click();
          await page.waitForTimeout(220);
        }
      } else {
        await page.locator('#toolValue').fill('2');
        await dragToolToEquals(page, 'mul');
        await page.waitForTimeout(900);
        if (await page.locator('#undo').isEnabled()) {
          await page.locator('#undo').click();
          await page.waitForTimeout(220);
        }
      }
    }
  }

  await page.locator('#reset').click();
  await page.waitForTimeout(180);
}
