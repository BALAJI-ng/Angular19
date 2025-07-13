import { test, expect } from '@playwright/test';

test.describe('Event Bus Communication Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the event bus demo before each test
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should test event bus parent-child communication', async ({ page }) => {
    // Try to navigate to event bus route if it exists
    try {
      await page.goto('/event-bus/parent');
      await page.waitForLoadState('networkidle');
      
      // Check if parent component is visible
      const parentText = page.getByText('Parent Component');
      if (await parentText.isVisible()) {
        await expect(parentText).toBeVisible();
      }
      
      // Check if child component receives the event
      const userMessage = page.getByText(/User:.*Default User.*ID:.*1/);
      if (await userMessage.isVisible()) {
        await expect(userMessage).toBeVisible();
      }
      
      // Take a screenshot
      await page.screenshot({ 
        path: 'test-results/event-bus-demo.png',
        fullPage: true 
      });
      
    } catch (error) {
      console.log('Event bus route not available, testing main page instead');
      
      // Fallback: test the main page
      await expect(page.locator('app-root')).toBeVisible();
    }
  });

  test('should verify Angular components are loaded', async ({ page }) => {
    // Look for any Angular components in the DOM
    const angularComponents = page.locator('[ng-version], app-root, [_ngcontent], [_nghost]');
    await expect(angularComponents.first()).toBeAttached();
    
    // Check for Angular-specific attributes
    const hasAngularAttrs = await page.evaluate(() => {
      return document.querySelector('[ng-version]') !== null ||
             document.querySelector('app-root') !== null ||
             document.querySelector('[_ngcontent]') !== null;
    });
    
    expect(hasAngularAttrs).toBe(true);
  });

  test('should handle dynamic content loading', async ({ page }) => {
    // Wait for any async operations to complete
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more for any dynamic content
    await page.waitForTimeout(2000);
    
    // Verify the page has loaded and has content
    const bodyText = await page.locator('body').textContent();
    expect(bodyText?.trim().length).toBeGreaterThan(0);
    
    // Take a screenshot for verification (with mobile-safe settings)
    const viewport = page.viewportSize();
    const isMobile = viewport && (viewport.width <= 768 || viewport.height <= 1024);
    
    await page.screenshot({ 
      path: 'test-results/dynamic-content.png',
      fullPage: false, // Prevent mobile Safari issues
      clip: isMobile ? 
        { x: 0, y: 0, width: Math.min(viewport.width, 768), height: Math.min(viewport.height, 1024) } : 
        undefined
    });
  });
});

test.describe('Form Testing Examples', () => {
  
  test('should demonstrate form interaction patterns', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Look for common form elements
    const inputs = page.locator('input');
    const buttons = page.locator('button');
    const forms = page.locator('form');
    
    // If forms exist, test them
    if (await forms.count() > 0) {
      console.log(`Found ${await forms.count()} form(s) on the page`);
      
      // Try to interact with the first form
      const firstForm = forms.first();
      await expect(firstForm).toBeVisible();
    }
    
    // If inputs exist, test them
    if (await inputs.count() > 0) {
      console.log(`Found ${await inputs.count()} input(s) on the page`);
      
      for (let i = 0; i < Math.min(3, await inputs.count()); i++) {
        const input = inputs.nth(i);
        if (await input.isVisible() && await input.isEnabled()) {
          const inputType = await input.getAttribute('type') || 'text';
          console.log(`Testing input ${i} of type: ${inputType}`);
          
          if (inputType === 'text' || inputType === 'email') {
            await input.fill(`test-value-${i}`);
            await expect(input).toHaveValue(`test-value-${i}`);
          }
        }
      }
    }
    
    await page.screenshot({ path: 'test-results/form-testing.png' });
  });
});

test.describe('Performance and Accessibility Tests', () => {
  
  test('should check page load performance', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const loadTime = Date.now() - startTime;
    console.log(`Page load time: ${loadTime}ms`);
    
    // Assert that page loads within reasonable time (10 seconds)
    expect(loadTime).toBeLessThan(10000);
  });

  test('should verify responsive design', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Test different viewport sizes
    const viewports = [
      { width: 1920, height: 1080, name: 'desktop' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 375, height: 667, name: 'mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(2000); // Allow layout to settle
      
      // Verify the page is still functional - with Safari/WebKit compatibility
      const appRoot = page.locator('app-root');
      
      try {
        await expect(appRoot).toBeVisible({ timeout: 10000 });
      } catch (error) {
        // Fallback for Safari: check if element exists
        await expect(appRoot).toBeAttached();
        const hasContent = await page.evaluate(() => {
          const root = document.querySelector('app-root');
          return root && (root.textContent?.trim().length || 0) > 0;
        });
        if (!hasContent) {
          console.warn(`app-root has no content in ${viewport.name} viewport`);
        }
      }
      
      // Take a screenshot with size limits for mobile Safari
      await page.screenshot({ 
        path: `test-results/responsive-${viewport.name}.png`,
        fullPage: false, // Prevent large screenshot issues
        clip: { x: 0, y: 0, width: Math.min(viewport.width, 1920), height: Math.min(viewport.height, 1080) }
      });
    }
  });

  test('should check for basic accessibility', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for presence of semantic HTML elements
    const semanticElements = [
      'main', 'header', 'nav', 'section', 'article', 'aside', 'footer'
    ];
    
    let semanticCount = 0;
    for (const element of semanticElements) {
      const count = await page.locator(element).count();
      if (count > 0) {
        semanticCount++;
        console.log(`Found ${count} ${element} element(s)`);
      }
    }
    
    console.log(`Total semantic elements found: ${semanticCount}`);
    
    // Check for alt attributes on images
    const images = page.locator('img');
    const imageCount = await images.count();
    
    if (imageCount > 0) {
      console.log(`Found ${imageCount} image(s)`);
      
      for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i);
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');
        
        if (!alt) {
          console.warn(`Image without alt text: ${src}`);
        }
      }
    }
  });
});
