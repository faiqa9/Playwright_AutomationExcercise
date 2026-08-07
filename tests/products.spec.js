const { test, expect } = require('@playwright/test');

test('@smoke @products TC_PRODUCTS_001 Verify Products Page', async ({ page }) => {

    // Step 1: Open website
    await page.goto('https://automationexercise.com/');

    // Step 2: Click Products
    await page.goto('https://automationexercise.com/products');

    // Step 3: Verify URL
    await expect(page).toHaveURL(/.*products/);

    // Step 4: Verify heading
    await expect(page.getByRole('heading', { name: 'All Products' })).toBeVisible();

    // Step 5: Verify search box
    await expect(page.locator('#search_product')).toBeVisible();

    // Step 6: Verify search button
    await expect(page.locator('#submit_search')).toBeVisible();

    // Step 7: Verify at least one product is displayed
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

});

//search product
test('TC_PRODUCTS_002 Search Product', async ({ page }) => {

    await page.goto('https://automationexercise.com/');

    await page.getByRole('link', { name: 'Products' }).click();

    await page.waitForLoadState('networkidle');

    await expect(page).toHaveURL(/.*products/);

    await page.locator('#search_product').fill('Blue Top');

    await page.locator('#submit_search').click();

    await expect(page.getByText('Blue Top').first()).toBeVisible();

});