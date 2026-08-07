const { test, expect } = require('@playwright/test');

test('TC_CONTACT_001 Verify Contact Us Page', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Click Contact Us
    await page.getByRole('link', { name: 'Contact us' }).click();

    // Verify URL
    await expect(page).toHaveURL(/.*contact_us/);

    // Verify heading
    await expect(page.getByText('Get In Touch')).toBeVisible();

});

test('TC_CONTACT_002 Submit Contact Form', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Click Contact Us
    await page.getByRole('link', { name: 'Contact us' }).click();

    // Fill Contact Form
    await page.locator('[data-qa="name"]').fill('Faiqa');

    await page.locator('[data-qa="email"]').fill('faiqayasin961@gmail.com');

    await page.locator('[data-qa="subject"]').fill('Automation Testing');

    await page.locator('[data-qa="message"]').fill('This is a Playwright automation test.');

   // Handle confirmation dialog
// Handle confirmation popup
page.once('dialog', async dialog => {
    await dialog.accept();
});

// Click Submit
await page.locator('[data-qa="submit-button"]').click();

// Verify Home button is visible after successful submission
await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

});

test('TC_CONTACT_003 Contact Form with File Upload', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Contact Us
    await page.getByRole('link', { name: 'Contact us' }).click();

    // Fill form
    await page.locator('[data-qa="name"]').fill('Faiqa');
    await page.locator('[data-qa="email"]').fill('faiqayasin961@gmail.com');
    await page.locator('[data-qa="subject"]').fill('File Upload Test');
    await page.locator('[data-qa="message"]').fill('Testing file upload using Playwright.');

    // Upload file
    await page.locator('input[name="upload_file"]')
        .setInputFiles('tests/sample.txt');

    // Handle confirmation dialog
    page.once('dialog', async dialog => {
        await dialog.accept();
    });

    // Submit
    await page.locator('[data-qa="submit-button"]').click();

    // Verify Home button appears
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();

});