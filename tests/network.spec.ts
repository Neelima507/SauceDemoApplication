import { test } from '@playwright/test';

test('observe network requests', async ({ page }) => {

    page.on('request', request => {
        console.log('REQUEST:', request.url());
    });

    await page.goto('/');
});