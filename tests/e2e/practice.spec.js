import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

test('practice area generates and scores a smart-calc problem', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceView')).toBeVisible();
  await expect(page.locator('#practiceExpression')).not.toHaveText('');

  const answer = await page.evaluate(() => window.__testCurrentPractice?.()?.answer);
  await page.locator('#practiceAnswer').fill(String(answer));
  await page.locator('#practiceSubmit').click();

  await expect(page.locator('#practiceFeedback')).toBeVisible();
  await expect(page.locator('#practiceFeedbackBadge')).not.toHaveText('');
  await expect(page.locator('#practiceStrategy')).toBeVisible();
  expect(browserErrors).toEqual([]);
});