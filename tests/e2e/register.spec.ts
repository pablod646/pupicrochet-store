
import { test, expect } from '@playwright/test';

test('allows a new user to register', async ({ page }) => {
  page.on('console', msg => console.log(msg.text()));
  await page.goto('/register');

  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
  await page.fill('input[name="password"]', 'password123');
  

  await page.click('button[type="submit"]');
  await page.waitForTimeout(1000); // wait for 1 second

  await expect(page).toHaveURL('/auth');
});
