const { test, expect } = require('@playwright/test');

test('TC_CHECKOUT_001 Proceed to Checkout', async ({ page }) => {

    // Open Products page
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // Add first product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify Cart page
    await expect(page).toHaveURL(/.*view_cart/);

    // Click Proceed To Checkout
    await expect(page.locator('a.check_out')).toBeVisible();
// Click Proceed To Checkout
await page.locator('a.check_out').click();

// Verify popup appears
await expect(page.locator('#checkoutModal')).toBeVisible();

// Click Register / Login from popup
await page.locator('#checkoutModal').getByRole('link', { name: 'Register / Login' }).click();

// Verify Login page opens
await expect(page).toHaveURL(/.*login/);

});

//login nad verify checkout
test('TC_CHECKOUT_002 Login and Verify Checkout', async ({ page }) => {

    // Open Products
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // Add first product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Proceed To Checkout
    await page.locator('a.check_out').click();
    console.log(await page.url());

    // Verify checkout page
    await expect(page.getByText('Review Your Order')).toBeVisible();

});

//view order summary
test('TC_CHECKOUT_003 Verify Order Summary', async ({ page }) => {

    // Open Products
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // Add first product  //chained locater
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Proceed To Checkout
    await page.locator('a.check_out').click();

    // Verify checkout page
    await expect(page.getByText('Review Your Order')).toBeVisible();

    // Verify product exists in order summary
    await expect(page.locator('#cart_info')).toContainText('Blue Top');

    // Verify quantity
    await expect(page.locator('.cart_quantity button').first()).toBeVisible();

});