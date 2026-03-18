import { test, expect } from '@playwright/test';
import { flattenLevels } from '../../src/js/levels.js';
import { openApp, loadLevelByIndex, smokeCurrentLevel } from './helpers.js';

const levels = flattenLevels();

test.describe.configure({ mode: 'parallel' });

levels.forEach((level, index) => {
  test(`${index + 1}. ${level.title.zh}`, async ({ page }) => {
    const browserErrors = await openApp(page);

    await loadLevelByIndex(page, index, level.title.zh);
    await smokeCurrentLevel(page);

    await expect(page.locator('#title')).toContainText(level.title.zh);
    expect(browserErrors, `browser errors on level ${index + 1}`).toEqual([]);
  });
});
