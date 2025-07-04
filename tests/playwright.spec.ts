import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
})

test ('redirect adn check value', async({page})=>{
    await page.goto('https://playwright.dev/');
    await page.getByRole('link',{name:'Get Started'}).click();
   await expect (page.getByRole('heading',{name:'Installation'})).toBeVisible();
})

