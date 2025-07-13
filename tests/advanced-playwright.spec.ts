import { test, expect } from '@playwright/test';
import { EventBusPage } from './pages/EventBusPage';

test.describe('Angular App - Event Bus Tests', () => {
  
  test('should load the Angular application', async ({ page }) => {
    await page.goto('/');
    
    // Wait for Angular to load
    await page.waitForLoadState('networkidle');
    
    // Check if the page title contains something meaningful
    await expect(page).toHaveTitle(/Angular|Fe/i);
    
    // Take a screenshot
    await page.screenshot({ path: 'test-results/homepage.png' });
  });

  test('should test event bus communication using Page Object Model', async ({ page }) => {
    const eventBusPage = new EventBusPage(page);
    
    // Navigate to event bus demo
    await eventBusPage.navigateToEventBusDemo();
    
    // Verify components are loaded and communicating
    await eventBusPage.verifyEventBusCommunication();
    
    // Verify user details are displayed correctly
    await eventBusPage.verifyUserDetails();
    
    // Take a screenshot for verification
    await eventBusPage.takeScreenshot('event-bus-demo');
  });

  test('should display the main content and app structure', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
    
    // Check if the main app component is visible
    const appRoot = page.locator('app-root');
    await expect(appRoot).toBeVisible();
    
    // Verify the page has loaded properly
    const body = page.locator('body');
    await expect(body).not.toBeEmpty();
  });

  test('should handle navigation and routing', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
    
    // Check current URL
    expect(page.url()).toContain('localhost:4200');
    
    // Take a screenshot for debugging
    await page.screenshot({ 
      path: 'test-results/navigation-test.png',
      fullPage: true 
    });
  });
});

// External website tests for learning Playwright concepts
test.describe('Playwright Learning - External Site Tests', () => {
  
  test('should navigate Playwright documentation', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Test title assertion
    await expect(page).toHaveTitle(/Playwright/);
    
    // Test element interaction
    await page.getByRole('link', { name: 'Get Started' }).click();
    
    // Test content assertion
    await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    
    // Test URL assertion
    expect(page.url()).toContain('/docs/intro');
  });

  test('should demonstrate various locator strategies', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // By role
    const getStartedLink = page.getByRole('link', { name: 'Get Started' });
    await expect(getStartedLink).toBeVisible();
    
    // By text
    const heading = page.getByText('Playwright');
    await expect(heading).toBeVisible();
    
    // CSS selector
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'test-results/locator-strategies.png' });
  });

  test('should test form interactions and inputs', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    
    // Test search functionality if available
    const searchButton = page.locator('[aria-label*="Search"], [title*="Search"]');
    
    if (await searchButton.isVisible()) {
      await searchButton.click();
      
      // If search input appears, test it
      const searchInput = page.locator('input[type="search"], input[placeholder*="Search"]');
      if (await searchInput.isVisible()) {
        await searchInput.fill('testing');
        await page.keyboard.press('Enter');
      }
    }
    
    await page.screenshot({ path: 'test-results/search-test.png' });
  });
});
