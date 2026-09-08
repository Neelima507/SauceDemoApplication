import { test, expect } from '@playwright/test';

test.describe('SauceDemo Basic Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com');
    });

    test('Test 1', async ({ page }) => {
        await expect(page).toHaveTitle(/Swag Labs/);
    });

    test('Test 2', async ({ page }) => {
        await expect(page.locator('#user-name')).toBeVisible();
    });


});