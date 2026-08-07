const { test, expect } = require('@playwright/test');

test('TC_REGISTER_001 Register New User', async ({ page }) => {

    // Generate unique email
    const email = `user${Date.now()}@gmail.com`;

    // Open website
    await page.goto('https://automationexercise.com/');

    // Open Signup/Login
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Verify New User Signup
    await expect(page.getByText('New User Signup!')).toBeVisible();

    // Enter name
    await page.locator('[data-qa="signup-name"]').fill('Playwright User');

    // Enter unique email
    await page.locator('[data-qa="signup-email"]').fill(email);

    // Click Signup
    await page.locator('[data-qa="signup-button"]').click();

    // Verify Account Information page
    await expect(page.getByText('Enter Account Information')).toBeVisible();

});

test('TC_REGISTER_002 Complete Registration', async ({ page }) => {

    // Generate unique email
    const email = `user${Date.now()}@gmail.com`;

    // Open website
    await page.goto('https://automationexercise.com/');

    // Signup/Login
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Signup
    await page.locator('[data-qa="signup-name"]').fill('Playwright User');
    await page.locator('[data-qa="signup-email"]').fill(email);
    await page.locator('[data-qa="signup-button"]').click();

    // Verify Account Information page
    await expect(page.getByText('Enter Account Information')).toBeVisible();

    // Select Title (Radio Button)
    await page.locator('#id_gender2').check();

    // Password
    await page.locator('[data-qa="password"]').fill('Password123');

    // Date of Birth (Dropdowns)
    await page.locator('[data-qa="days"]').selectOption('10');
    await page.locator('[data-qa="months"]').selectOption('5');
    await page.locator('[data-qa="years"]').selectOption('2000');

    // Checkboxes
    await page.locator('#newsletter').check();
    await page.locator('#optin').check();

    // Address Information
    await page.locator('[data-qa="first_name"]').fill('Playwright');
    await page.locator('[data-qa="last_name"]').fill('User');
    await page.locator('[data-qa="company"]').fill('ABC Company');
    await page.locator('[data-qa="address"]').fill('123 Test Street');

    // Country
    await page.locator('[data-qa="country"]').selectOption('Canada');

    // State
    await page.locator('[data-qa="state"]').fill('Ontario');

    // City
    await page.locator('[data-qa="city"]').fill('Toronto');

    // Zip Code
    await page.locator('[data-qa="zipcode"]').fill('12345');

    // Mobile Number
    await page.locator('[data-qa="mobile_number"]').fill('1234567890');

    // Create Account
    await page.locator('[data-qa="create-account"]').click();

    // Verify Account Created
    await expect(page.getByText('Account Created!')).toBeVisible();

});

test('TC_REGISTER_003 Register with Existing Email', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Open Signup/Login
    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Enter existing user details
    await page.locator('[data-qa="signup-name"]').fill('Playwright User');

    await page.locator('[data-qa="signup-email"]').fill('faiqayasin961@gmail.com');

    // Click Signup
    await page.locator('[data-qa="signup-button"]').click();

    // Verify error message
    await expect(
        page.getByText('Email Address already exist!')
    ).toBeVisible();

});

test('TC_REGISTER_004 Empty Required Fields', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Click Signup without entering data
    await page.locator('[data-qa="signup-button"]').click();

    // Verify still on Signup page
    await expect(
        page.getByText('New User Signup!')
    ).toBeVisible();

});

test('TC_REGISTER_005 Invalid Email Format', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: 'Signup / Login' }).click();

    // Enter invalid email
    await page.locator('[data-qa="signup-name"]').fill('Playwright User');

    await page.locator('[data-qa="signup-email"]').fill('abc.com');

    // Click Signup
    await page.locator('[data-qa="signup-button"]').click();

    // Verify still on Signup page
    await expect(
        page.getByText('New User Signup!')
    ).toBeVisible();

});