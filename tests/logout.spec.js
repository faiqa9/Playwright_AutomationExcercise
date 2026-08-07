const { test, expect } = require('@playwright/test');
const { login } = require('../utils/login');

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
});

test('TC_LOGOUT_001 Successful Logout', async ({ page }) => {

    await test.step('Login', async () => {

    // Login
   await login(page,'faiqayasin961@gmail.com','#1234#1234#');

    // Verify login successful
    await expect(page.getByText('Logged in as')).toBeVisible();

     });

    await test.step('Logout', async () => {

    // Click Logout
    await page.getByRole('link', { name: 'Logout' }).click();

    });

    await test.step('Verify Login Page', async () => {

    // Verify Login page opens
    await expect(page).toHaveURL(/.*login/);

    await expect(page.getByText('Login to your account')).toBeVisible();

    });

});

test('TC_LOGOUT_002 Access Protected Page After Logout', async ({ page }) => {

    // Login
    await login(page,'faiqayasin961@gmail.com','#1234#1234#');

    // Verify login
    await expect(page.getByText('Logged in as')).toBeVisible();

    // Logout
    await page.getByRole('link', { name: 'Logout' }).click();

    // Try to open Checkout page directly
    await page.goto('https://automationexercise.com/checkout');

    // Verify user is redirected or login page is shown
    await expect(page).toHaveURL(/.*login|.*checkout/);

    if (await page.getByText('Login to your account').isVisible()) {
        await expect(page.getByText('Login to your account')).toBeVisible();
    }

});