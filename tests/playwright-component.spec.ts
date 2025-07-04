import { test, expect } from '@playwright/test';

test.describe('Angular Dashboard Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
  });

  test('should display the main dashboard', async ({ page }) => {
    await expect(page.locator('#sidebar')).toBeVisible();
    await expect(page.locator('.navbar')).toBeVisible();
    await expect(page.locator('router-outlet')).toBeVisible();
  });

  test('should navigate through sidebar links', async ({ page }) => {
    // Test NgRx navigation
    await page.click('text=NgRx Store');
    await expect(page).toHaveURL(/.*ngrx/);
    
    // Test Signals navigation
    await page.click('text=Angular Signals');
    await expect(page).toHaveURL(/.*signals/);
    
    // Test Playwright navigation
    await page.click('text=Playwright E2E Testing');
    await expect(page).toHaveURL(/.*playwright/);
  });

  test('should display active link styling', async ({ page }) => {
    await page.click('text=NgRx Store');
    await expect(page.locator('text=NgRx Store')).toHaveClass(/active/);
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('.navbar-toggler')).toBeVisible();
    
    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('#sidebar')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('#sidebar')).toBeVisible();
  });

  test('should load Playwright component correctly', async ({ page }) => {
    await page.click('text=Playwright E2E Testing');
    
    // Check if Playwright component is loaded
    await expect(page.locator('h3:has-text("Playwright E2E Testing")')).toBeVisible();
    await expect(page.locator('text=What is Playwright?')).toBeVisible();
    await expect(page.locator('text=Key Features:')).toBeVisible();
    
    // Check for browser selector
    await expect(page.locator('#browserSelect')).toBeVisible();
    
    // Check for run tests button
    await expect(page.locator('button:has-text("Run Tests")')).toBeVisible();
  });

  test('should simulate test execution', async ({ page }) => {
    await page.click('text=Playwright E2E Testing');
    
    // Click run tests button
    await page.click('button:has-text("Run Tests")');
    
    // Check if button text changes to "Running Tests..."
    await expect(page.locator('button:has-text("Running Tests...")')).toBeVisible();
    
    // Wait for tests to complete (simulation)
    await page.waitForTimeout(6000);
    
    // Check if test results are displayed
    await expect(page.locator('text=Test Results')).toBeVisible();
  });
});

test.describe('Playwright Component Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/playwright');
  });

  test('should display all feature cards', async ({ page }) => {
    const features = [
      'Cross-browser Testing',
      'Auto-wait',
      'Network Interception',
      'Screenshots & Videos',
      'Parallel Testing',
      'Trace Viewer'
    ];

    for (const feature of features) {
      await expect(page.locator(`text=${feature}`)).toBeVisible();
    }
  });

  test('should show sample test code', async ({ page }) => {
    await expect(page.locator('h5:has-text("Sample Test Code")')).toBeVisible();
    await expect(page.locator('pre code')).toContainText('import { test, expect } from');
  });

  test('should display best practices', async ({ page }) => {
    await expect(page.locator('h5:has-text("Best Practices")')).toBeVisible();
    await expect(page.locator('text=Use data-testid attributes')).toBeVisible();
    await expect(page.locator('text=Create reusable page object models')).toBeVisible();
  });

  test('should show quick commands', async ({ page }) => {
    await expect(page.locator('h5:has-text("Quick Commands")')).toBeVisible();
    await expect(page.locator('text=npm install -D @playwright/test')).toBeVisible();
    await expect(page.locator('text=npx playwright test')).toBeVisible();
  });

  test('should change browser selection', async ({ page }) => {
    const browserSelect = page.locator('#browserSelect');
    
    await browserSelect.selectOption('firefox');
    await expect(browserSelect).toHaveValue('firefox');
    
    await browserSelect.selectOption('webkit');
    await expect(browserSelect).toHaveValue('webkit');
  });
});
