
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h2:has-text("PupiCrochet")')).toBeVisible();
  await expect(page).toHaveTitle(/PupiCrochet Store/);
});
