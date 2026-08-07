const { test, expect } = require('@playwright/test');

test('TC_HOME_001 Verify Home Page', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await expect(page).toHaveURL('https://automationexercise.com/');

    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Signup / Login' })).toBeVisible();

});

