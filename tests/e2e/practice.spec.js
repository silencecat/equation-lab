import { test, expect } from '@playwright/test';
import { openApp } from './helpers.js';

async function openPracticeStage(page, domainId, moduleId, stageId) {
  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceView')).toBeVisible();
  await expect(page.locator('#practiceLobby')).toBeVisible();
  await page.locator(`[data-domain-id="${domainId}"]`).click();
  await page.locator(`[data-module-id="${moduleId}"]`).click();
  await page.locator(`.practice-stage-card[data-stage-id="${stageId}"]`).click();
}

async function answerCurrentNumberQuestion(page) {
  const answer = await page.evaluate(() => window.__testCurrentPractice?.()?.answer);
  await page.locator('#practiceAnswer').fill(String(answer));
  await page.locator('#practiceSubmit').click();
}

async function answerCurrentChoiceQuestion(page) {
  const answer = await page.evaluate(() => window.__testCurrentPractice?.()?.answer);
  const ids = Array.isArray(answer) ? answer : [answer];
  for (const id of ids) {
    await page.locator(`.practice-option[data-option-id="${id}"]`).click();
  }
  await page.locator('#practiceSubmit').click();
}

test('practice area uses skill domains and banks coins after a full timed session', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceView')).toBeVisible();
  await expect(page.locator('#practiceLobby')).toBeVisible();
  await expect(page.locator('#practiceTitle')).toContainText('算数基础能力训练区');
  await expect(page.locator('.practice-domain-card')).toHaveCount(6);
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');

  await page.locator('[data-domain-id="multiplicative-structure"]').click();
  await expect(page.locator('.practice-module-card')).toHaveCount(2);
  await page.locator('[data-module-id="multiplicative-structure"]').click();
  await expect(page.locator('.practice-stage-card')).toHaveCount(4);
  await page.locator('.practice-stage-card[data-stage-id="train"]').click();

  await expect(page.locator('#practiceLobby')).toBeHidden();
  await expect(page.locator('#practiceExpression')).not.toHaveText('');
  await expect(page.locator('#practicePoints')).toContainText('硬币');
  await expect(page.locator('#practiceAnswerBlock')).toBeVisible();

  for (let i = 0; i < 10; i++) {
    await answerCurrentNumberQuestion(page);
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

test('practice sense stage is choice-based and does not bank coins', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await openPracticeStage(page, 'number-sense', 'rounding-sum', 'sense');
  await expect(page.locator('#practiceTimerPill')).toContainText('观察练习');
  await expect(page.locator('#practiceOptions')).toBeVisible();
  await expect(page.locator('#practiceAnswerBlock')).toBeHidden();
  await expect(page.locator('#practicePoints')).toContainText('找结构');

  for (let i = 0; i < 10; i++) {
    await answerCurrentChoiceQuestion(page);
    await expect(page.locator('#practiceFeedback')).toBeVisible();
    if (i < 9) {
      await expect(page.locator('#practiceFeedbackText')).toContainText('不把硬币');
      await expect(page.locator('.practice-mini-reward')).toBeVisible();
      await page.locator('#practiceNext').click();
      await expect(page.locator('.practice-mini-reward')).toHaveCount(0);
    }
  }

  await expect(page.locator('#practiceFeedbackText')).toContainText('观察练习');
  await expect(page.locator('.practice-celebration')).toHaveCount(0);
  await expect(page.locator('#practiceCoinPill')).toContainText('硬币罐 0 硬币');
  expect(browserErrors).toEqual([]);
});

test('practice session keeps coins pending if the child leaves early', async ({ page }) => {
  const browserErrors = await openApp(page, { stayOnHome: true });

  await openPracticeStage(page, 'operation-relations', 'order-ops', 'train');
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');

  await answerCurrentNumberQuestion(page);
  await expect(page.locator('#practiceFeedbackText')).toContainText('小袋');
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');

  await page.locator('#practiceBackHome').click();
  await page.locator('#homePractice').click();
  await expect(page.locator('#practiceLobby')).toBeVisible();
  await expect(page.locator('#practiceCoinPill')).toContainText('0 硬币');
  expect(browserErrors).toEqual([]);
});
