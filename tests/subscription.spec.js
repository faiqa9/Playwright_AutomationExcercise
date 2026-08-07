const { test, expect } = require('@playwright/test');

test('TC_SUB_001 Subscribe with Valid Email', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Scroll to footer
    await page.locator('#footer').scrollIntoViewIfNeeded();

    // Verify Subscription heading
    await expect(page.getByText('Subscription')).toBeVisible();

    // Enter email
    await page.locator('#susbscribe_email').fill('test123@gmail.com');

    // Click Subscribe
    await page.locator('#subscribe').click();

    // Verify success message
    await expect(page.getByText('You have been successfully subscribed!')).toBeVisible();

});

test('TC_SUB_002 Subscribe with Empty Email', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Scroll to footer
    await page.locator('#footer').scrollIntoViewIfNeeded();

    // Leave email empty
    await page.locator('#susbscribe_email').fill('');

    // Click Subscribe
    await page.locator('#subscribe').click();

    // Verify email field is still visible
    await expect(page.locator('#susbscribe_email')).toBeVisible();

});

test('TC_SUB_003 Subscribe with Invalid Email', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Scroll to footer
    await page.locator('#footer').scrollIntoViewIfNeeded();

    // Enter invalid email
    await page.locator('#susbscribe_email').fill('abc.com');

    // Click Subscribe
    await page.locator('#subscribe').click();

    // Verify email field remains visible
    await expect(page.locator('#susbscribe_email')).toBeVisible();

});