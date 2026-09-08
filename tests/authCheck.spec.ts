import { test, expect } from '@playwright/test';

test('verify saved login', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/inventory/);

    console.log('User is already logged in');
});