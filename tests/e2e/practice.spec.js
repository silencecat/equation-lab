import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

test('practice area uses a deck lobby and banks coins after a full session', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceView')).toBeVisible();
  await expect(page.locator('#practiceLobby')).toBeVisible();
  await expect(page.locator('.practice-deck-card')).toHaveCount(10);
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');

  await page.locator('[data-deck-id="multiplicative-structure"]').click();
  await expect(page.locator('#practiceLobby')).toBeHidden();
  await expect(page.locator('#practiceExpression')).not.toHaveText('');
  await expect(page.locator('#practicePoints')).toContainText('硬币');

  for (let i = 0; i < 10; i++) {
    const answer = await page.evaluate(() => window.__testCurrentPractice?.()?.answer);
    await page.locator('#practiceAnswer').fill(String(answer));
    await page.locator('#practiceSubmit').click();
    await expect(page.locator('#practiceFeedback')).toBeVisible();
    await expect(page.locator('#practiceFeedbackBadge')).not.toHaveText('');
    await expect(page.locator('#practiceStrategy')).toBeVisible();
    if (i < 9) {
      await expect(page.locator('#practiceFeedbackText')).toContainText('小袋');
      await expect(page.locator('.practice-mini-reward')).toBeVisible();
      await expect(page.locator('#practiceNext')).toBeFocused();
      await page.locator('#practiceNext').click();
      await expect(page.locator('.practice-mini-reward')).toHaveCount(0);
      await expect(page.locator('#practiceAnswer')).toBeEnabled();
    }
  }

  await expect(page.locator('#practiceFeedbackText')).toContainText('硬币罐');
  await expect(page.locator('.practice-celebration')).toBeVisible();
  await expect(page.locator('.practice-flying-coin').first()).toBeVisible();
  await expect(page.locator('#practiceCoinPill')).not.toContainText('硬币罐 0 硬币');
  await page.locator('#practiceNext').click();
  await expect(page.locator('#practiceLobby')).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test('practice session keeps coins pending if the child leaves early', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await page.locator('#homePractice').click();
  await page.locator('[data-deck-id="order-ops"]').click();
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');

  const answer = await page.evaluate(() => window.__testCurrentPractice?.()?.answer);
  await page.locator('#practiceAnswer').fill(String(answer));
  await page.locator('#practiceSubmit').click();
  await expect(page.locator('#practiceFeedbackText')).toContainText('小袋');
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');

  await page.locator('#practiceBackHome').click();
  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceLobby')).toBeVisible();
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');
  expect(browserErrors).toEqual([]);
});
