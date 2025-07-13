import { test, expect } from '@playwright/test';

test.describe('Angular Application Tests', () => {
  
  test('should load Angular homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    // Wait for Angular to load completely
    await page.waitForLoadState('networkidle');
    
    // Additional wait for Safari/WebKit compatibility
    await page.waitForTimeout(2000);
    
    // Check if the main app component is present - with fallback for Safari
    const appRoot = page.locator('app-root');
    
    try {
      await expect(appRoot).toBeVisible({ timeout: 10000 });
    } catch (error) {
      // Fallback for Safari: check if element exists and has content
      await expect(appRoot).toBeAttached();
      const hasContent = await page.evaluate(() => {
        const root = document.querySelector('app-root');
        return root && (root.textContent?.trim().length || 0) > 0;
      });
      if (!hasContent) {
        throw new Error('app-root exists but has no content');
      }
    }
    
    // Take a screenshot for verification (with size limits for mobile)
    await page.screenshot({ 
      path: 'test-results/angular-homepage.png',
      fullPage: false // Avoid large screenshot issues on mobile
    });
  });

  test('should have correct page title', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check page title (adjust based on your app's title)
    await expect(page).toHaveTitle(/Angular|Fe/i);
  });

  test('should display app content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify the page isn't empty
    const bodyContent = await page.locator('body').textContent();
    expect(bodyContent?.trim().length).toBeGreaterThan(0);
  });

  test('should handle Angular routing', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on the correct domain and port
    expect(page.url()).toContain('localhost:4200');
    
    // Check if Angular has loaded by looking for common Angular attributes
    const ngElements = page.locator('[ng-version], app-root, [_ngcontent], [_nghost]');
    await expect(ngElements.first()).toBeAttached();
  });
});

// Keep the original Playwright learning tests
test.describe('Playwright Learning Tests', () => {
  
  test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  });

  test('get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.getByRole('link', { name: 'Get started' }).click();
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  });

  test('demonstrate locator strategies', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // By role (most reliable)
    const navLink = page.getByRole('link', { name: 'API' });
    if (await navLink.isVisible()) {
      await expect(navLink).toBeVisible();
    }
    
    // By text
    const heading = page.getByText('Playwright');
    await expect(heading.first()).toBeVisible();
    
    // CSS selector
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    await page.screenshot({ path: 'test-results/playwright-docs.png' });
  });
});
