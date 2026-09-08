import { test, expect } from '@playwright/test';

test('API practice @api', async ({ request }) => {
    // 1. Login through API
    const loginResponse = await request.post(
        'https://rahulshettyacademy.com/api/ecom/auth/login',
        {
            data: {
                userEmail: process.env.RSA_EMAIL,
                userPassword: process.env.RSA_PASSWORD
            }
        }
    );
    expect(loginResponse.status()).toBe(200);

    const loginBody = await loginResponse.json();

    const token = loginBody.token;

    // 2. Call product API with token
    const response = await request.post(
        'https://rahulshettyacademy.com/api/ecom/product/get-all-products',
        {
            headers: {
                Authorization: token
            }
        }
    );

    console.log('STATUS:', response.status());
    console.log('STATUS:', response.status());
    expect(response.status()).toBe(200);
});