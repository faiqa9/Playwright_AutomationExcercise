const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/products');
});

test('TC_SEARCH_001 Search Existing Product', async ({ page }) => {

    // Verify search box
    await expect(page.locator('#search_product')).toBeVisible();

    // Enter product name
    await page.locator('#search_product').fill('Blue Top');

    // Click Search
    await page.locator('#submit_search').click();

    // Verify heading
    await expect(page.getByText('Searched Products')).toBeVisible();

    // Verify searched product is displayed
    await expect(page.locator('.productinfo p').first()).toContainText('Blue Top');

});

test('TC_SEARCH_002 Search Non-existing Product', async ({ page }) => {

    // Search invalid product
    await page.locator('#search_product').fill('XYZ123ABC');

    // Click Search
    await page.locator('#submit_search').click();

    // Verify heading
    await expect(page.getByText('Searched Products')).toBeVisible();

   // Verify no products are displayed
await expect(page.locator('.product-image-wrapper')).toHaveCount(0);

});

test('TC_SEARCH_003 Search with Empty Text', async ({ page }) => {

    // Leave search box empty
    await page.locator('#search_product').fill('');

    // Click Search
    await page.locator('#submit_search').click();

    // Verify search box is still visible
    await expect(page.locator('#search_product')).toBeVisible();

});

test('TC_SEARCH_004 Search with Special Characters', async ({ page }) => {

    // Enter special characters
    await page.locator('#search_product').fill('@#$%^&*');

    // Click Search
    await page.locator('#submit_search').click();

    // Verify heading
    await expect(page.getByText('Searched Products')).toBeVisible();

});

test('TC_SEARCH_005 Verify Search is Case Insensitive', async ({ page }) => {

    // Enter lowercase product name
    await page.locator('#search_product').fill('blue top');

    // Click Search
    await page.locator('#submit_search').click();

    // Verify searched product is displayed
    await expect(page.locator('.productinfo p').first()).toContainText('Blue Top');

});