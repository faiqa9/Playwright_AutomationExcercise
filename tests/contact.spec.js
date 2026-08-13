const { test, expect } = require('@playwright/test');

test('TC_CONTACT_001 Verify Contact Us Page', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: 'Contact us' }).click();

    await expect(page).toHaveURL(/.*contact_us/);

    await expect(
        page.getByText('Get In Touch')
    ).toBeVisible();
});


test('TC_CONTACT_002 Submit Contact Form', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: 'Contact us' }).click();

    // Fill Contact Form
    await page.locator('[data-qa="name"]').fill('Faiqa');

    await page.locator('[data-qa="email"]')
        .fill(process.env.EMAIL || 'faiqayasin961@gmail.com');

    await page.locator('[data-qa="subject"]')
        .fill('Automation Testing');

    await page.locator('[data-qa="message"]')
        .fill('This is a Playwright automation test.');

    // Handle confirmation dialog
    page.once('dialog', async dialog => {
        await dialog.accept();
    });

    // Submit
    await page.locator('[data-qa="submit-button"]').click();

   await page.locator('[data-qa="submit-button"]').click();

await page.waitForTimeout(2000);

console.log('URL:', await page.url());
console.log('BODY:', await page.locator('body').innerText());
});


test('TC_CONTACT_003 Contact Form with File Upload', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: 'Contact us' }).click();

    // Fill form
    await page.locator('[data-qa="name"]').fill('Faiqa');

    await page.locator('[data-qa="email"]')
        .fill(process.env.EMAIL || 'faiqayasin961@gmail.com');

    await page.locator('[data-qa="subject"]')
        .fill('File Upload Test');

    await page.locator('[data-qa="message"]')
        .fill('Testing file upload using Playwright.');

    // Upload file
    await page
        .locator('input[name="upload_file"]')
        .setInputFiles('tests/sample.txt');

    // Handle confirmation dialog
    page.once('dialog', async dialog => {
        await dialog.accept();
    });

    // Submit
    await page.locator('[data-qa="submit-button"]').click();

    // Verify successful submission
    await page.waitForTimeout(2000);

console.log('URL:', await page.url());
console.log('BODY:', await page.locator('body').innerText());
});