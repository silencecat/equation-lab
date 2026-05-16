import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

test('practice area generates and scores a smart-calc problem', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceView')).toBeVisible();
  await expect(page.locator('.practice-deck-btn')).toHaveCount(10);
  await page.locator('[data-deck-id="multiplicative-structure"]').click();
  await expect(page.locator('[data-deck-id="multiplicative-structure"]')).toHaveClass(/active/);
  await expect(page.locator('#practiceExpression')).not.toHaveText('');
  await expect(page.locator('#practicePoints')).toContainText('硬币');

  const answer = await page.evaluate(() => window.__testCurrentPractice?.()?.answer);
  await page.locator('#practiceAnswer').fill(String(answer));
  await page.locator('#practiceSubmit').click();

  await expect(page.locator('#practiceFeedback')).toBeVisible();
  await expect(page.locator('#practiceFeedbackBadge')).not.toHaveText('');
  await expect(page.locator('#practiceStrategy')).toBeVisible();
  expect(browserErrors).toEqual([]);
});
