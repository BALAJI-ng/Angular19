import { test, expect } from '@playwright/test';

test.describe('Angular App', () => {
  test('has title', async ({ page }) => {
    await page.goto('/');
    
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Angular/);
  });

  test('navigates to dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('sidebar navigation works', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check if sidebar is visible
    await expect(page.locator('#sidebar')).toBeVisible();
    
    // Check if dashboard link is active
    await expect(page.locator('a[class*="active"]')).toContainText('Dashboard');
  });

  test('can navigate to NgRx page', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Click on NgRx link
    await page.getByText('NgRx Store').click();
    
    // Should navigate to NgRx page
    await expect(page).toHaveURL(/.*ngrx/);
  });

  test('can navigate to Signals page', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Click on Signals link
    await page.getByText('Angular Signals').click();
    
    // Should navigate to Signals page
    await expect(page).toHaveURL(/.*signals/);
  });

  test('responsive design - mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    
    // Check if navbar toggler is visible on mobile
    await expect(page.locator('.navbar-toggler')).toBeVisible();
  });
});
