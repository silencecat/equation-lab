import { test, expect } from '@playwright/test';
import {
  dragLocatorToPoint,
  dragToolToEquals,
  openApp,
  openDrawer,
} from './helpers.js';

test.describe('weird actions', () => {
  test('chapter 2 early levels keep teaching terms separate on first render', async ({ page }) => {
    await openApp(page);

    await page.evaluate(() => document.querySelectorAll('#levels .level')[5].click());
    await page.waitForFunction(() => document.querySelector('#title')?.textContent?.includes('2-1'));
    const level21Terms = await page.$$eval('#left > .chip', (els) =>
      els.map((el) => el.textContent.replace(/\s+/g, '')),
    );
    expect(level21Terms).toHaveLength(3);
    expect(level21Terms.join(' ')).toContain('+2');
    expect(level21Terms.join(' ')).toContain('+1');

    await page.evaluate(() => document.querySelectorAll('#levels .level')[7].click());
    await page.waitForFunction(() => document.querySelector('#title')?.textContent?.includes('2-3'));
    const level23Terms = await page.$$eval('#left > .chip', (els) =>
      els.map((el) => el.textContent.replace(/\s+/g, '')),
    );
    expect(level23Terms).toHaveLength(3);
    expect(level23Terms.join(' ')).toContain('−2');
    expect(level23Terms.join(' ')).toContain('+5');
  });

  test('language switch, invalid input, free mode tools, and feedback popup all work', async ({ page }) => {
    const browserErrors = await openApp(page);

    await page.locator('#themeToggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'playful');
    await expect.poll(async () => page.evaluate(() => {
      const raw = localStorage.getItem('eqlab_state_v1');
      return raw ? JSON.parse(raw).profile.theme : '';
    })).toBe('playful');
    await page.locator('#themeToggle').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'lab');

    await openDrawer(page);
    await page.evaluate(() => document.querySelector('.langbtn[data-lang="en"]').click());
    await expect(page.locator('#goal')).not.toHaveText('');
    await page.evaluate(() => document.querySelector('.langbtn[data-lang="ja"]').click());
    await page.evaluate(() => document.querySelector('.langbtn[data-lang="zh"]').click());

    await page.locator('#freeLeft').fill('abc');
    await page.evaluate(() => document.querySelector('#loadFree').click());
    await expect(page.locator('#title')).not.toHaveText('');

    await page.locator('#freeLeft').fill('1/2x+3');
    await page.locator('#freeRight').fill('8');
    await page.evaluate(() => document.querySelector('#loadFree').click());
    await page.waitForTimeout(250);

    await page.locator('#toolValue').fill('0');
    await dragToolToEquals(page, 'div');
    await page.waitForTimeout(220);
    await expect(page.locator('body')).toContainText('不能除以 0');

    await page.locator('#toolValue').fill('2');
    await dragToolToEquals(page, 'mul');
    await page.waitForTimeout(1200);
    const leftAfterMul = await page.$$eval('#left > .chip', (els) =>
      els.map((el) => el.textContent.replace(/\s+/g, '')),
    );
    const rightAfterMul = await page.$$eval('#right > .chip', (els) =>
      els.map((el) => el.textContent.replace(/\s+/g, '')),
    );
    expect(leftAfterMul.join(' ')).toContain('△');
    expect(leftAfterMul.join(' ')).toContain('6');
    expect(rightAfterMul.join(' ')).toContain('16');

    await openDrawer(page);
    await page.evaluate(() => document.querySelector('#randomFree').click());
    await page.waitForTimeout(220);
    if (await page.locator('#undo').isEnabled()) {
      await page.locator('#undo').click();
      await page.waitForTimeout(120);
    }
    await page.locator('#reset').click();
    await page.waitForTimeout(150);

    await openDrawer(page);
    const popupPromise = page.waitForEvent('popup');
    await page.evaluate(() => document.querySelector('.feedback-btn[data-tpl="bug_report"]').click());
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    expect(popup.url()).toContain('github.com');
    expect(
      popup.url().includes('/issues/new') || popup.url().includes('/login?return_to='),
    ).toBe(true);
    await popup.close();

    expect(browserErrors).toEqual([]);
  });

  test('build tray cards tolerate odd drags and still place normally', async ({ page }) => {
    const browserErrors = await openApp(page);

    await loadBuildLevel(page, 3, '1-4');

    const trayChip = page.locator('#buildTray .tray-chip').first();
    await dragLocatorToPoint(page, trayChip, { x: 15, y: 15 });
    await page.waitForTimeout(150);

    const leftBox = await page.locator('#left').boundingBox();
    await dragLocatorToPoint(page, trayChip, {
      x: leftBox.x + leftBox.width / 2,
      y: leftBox.y + leftBox.height / 2,
    });
    await page.waitForTimeout(350);

    await expect(page.locator('#left .chip')).toHaveCount(1);

    if (await page.locator('#undo').isEnabled()) {
      await page.locator('#undo').click();
      await page.waitForTimeout(180);
    }
    await page.locator('#reset').click();
    await page.waitForTimeout(180);

    expect(browserErrors).toEqual([]);
  });
});

async function loadBuildLevel(page, index, titleHint) {
  await openDrawer(page);
  await page.evaluate((i) => {
    const buttons = document.querySelectorAll('#levels .level');
    const btn = buttons[i];
    if (!btn) throw new Error(`missing level button ${i}`);
    btn.click();
  }, index);
  await page.waitForFunction(
    (title) => document.querySelector('#title')?.textContent?.includes(title),
    titleHint,
  );
  await page.waitForTimeout(150);
}
