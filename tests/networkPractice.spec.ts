import { test, expect } from '@playwright/test';

test('network practice', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/client');

    await page.locator('#userEmail').fill('neelutgd507@gmail.com');
    await page.locator('#userPassword').fill('Neelu@507');

    const responsePromise = page.waitForResponse(
        response =>
            response.url().includes('/api/ecom/auth/login') &&
            response.status() === 200
    );

    await page.locator('#login').click();

    const response = await responsePromise;
    const responseBody = await response.json();

    console.log('Response Body:', responseBody);

    console.log('Status:', response.status());
    console.log('Response URL:', response.url());

    await expect(page).toHaveURL(/dashboard/);

});
test('intercept request', async ({ page }) => {

    await page.route('**/api/ecom/order/get-orders-for-customer/**',
        async route => {

            console.log('Request intercepted');

            await route.continue();
        }
    );

    // login and navigate to Orders page here
});