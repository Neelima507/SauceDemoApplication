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
    test('test.step practice', async ({ page }) => {

        await test.step('Login to SauceDemo', async () => {
            await page.locator('#user-name').fill('standard_user');
            await page.locator('#password').fill('secret_sauce');
            await page.locator('#login-button').click();
        });

        await test.step('Verify Products Page', async () => {
            await expect(page).toHaveURL(/inventory/);
            await expect(page.locator('.title')).toHaveText('Products');
        });
    })

});