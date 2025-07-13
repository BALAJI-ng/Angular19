import { test, expect } from '@playwright/test';

test.describe('Angular App Tests', () => {
  test('should load the Angular application', async ({ page }) => {
    await page.goto('/');

    // Wait for Angular to load
    await page.waitForLoadState('networkidle');

    // Check if the page title contains something meaningful
    await expect(page).toHaveTitle(/Angular|Fe/i);
  });

  test('should display the main content', async ({ page }) => {
    await page.goto('/');

    // Wait for the app to load
    await page.waitForLoadState('networkidle');

    // Check if the main app component is visible
    const appRoot = page.locator('app-root');
    await expect(appRoot).toBeVisible();
  });

  test('should navigate through the application', async ({ page }) => {
    await page.goto('/');

    // Wait for the app to load
    await page.waitForLoadState('networkidle');

    // Take a screenshot for debugging
    await page.screenshot({ path: 'test-results/homepage.png' });
  });
});

// External website tests (for learning purposes)
test.describe('Playwright Learning Tests', () => {
  test('has title on Playwright website', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('navigate to Get Started page', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get Started' }).click();
    await expect(
      page.getByRole('heading', { name: 'Installation' })
    ).toBeVisible();
  });
});
