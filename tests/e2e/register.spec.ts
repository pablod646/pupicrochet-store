import { test, expect } from '@playwright/test';

test.describe('Registration Flow', () => {
  test('should allow a user to register successfully', async ({ page }) => {
    await page.goto('/register');

    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password123');

    await page.click('button[type="submit"]');

    // Expect to be redirected to the login page after successful registration
    await page.waitForURL('/auth');
    await expect(page.locator('h2', { hasText: 'Inicia sesión en tu cuenta' })).toBeVisible();
  });

  test('should display error messages for invalid registration data', async ({ page }) => {
    await page.goto('/register');

    // Submit with empty fields
    await page.click('button[type="submit"]');
    await expect(page.locator('p.text-red-600', { hasText: 'Invalid email address' })).toBeVisible();
    await expect(page.locator('p.text-red-600', { hasText: 'Password must be at least 8 characters long' })).toBeVisible();

    // Submit with mismatched passwords
    await page.fill('input[name="email"]', `test-${Date.now()}@example.com`);
    await page.fill('input[name="password"]', 'password123');
    await page.fill('input[name="confirmPassword"]', 'password456');
    await page.click('button[type="submit"]');
    await expect(page.locator('p.text-red-600', { hasText: "Passwords don't match" })).toBeVisible();
  });
});
