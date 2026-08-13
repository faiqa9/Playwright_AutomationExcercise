const { test, expect } = require('../fixtures/baseFixture');

test('TC_CHECKOUT_001 Proceed to Checkout', async ({ page }) => {

    // Open Products page
    await page.goto('https://automationexercise.com/products');

    await expect(
        page.locator('.product-image-wrapper').first()
    ).toBeVisible();

    // Add first product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    await expect(page).toHaveURL(/.*view_cart/);

    // Proceed to Checkout
    await page.locator('a.check_out').click();

    // Verify login/register popup
    await expect(page.locator('#checkoutModal')).toBeVisible();

    await page
        .locator('#checkoutModal')
        .getByRole('link', { name: 'Register / Login' })
        .click();

    // Verify Login page
    await expect(page).toHaveURL(/.*login/);
});


test('TC_CHECKOUT_002 Login and Verify Checkout', async ({ page, loginPage }) => {

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

    // Proceed to Checkout
    await page.locator('a.check_out').click();

    // Handle Register/Login popup
    await expect(page.locator('#checkoutModal')).toBeVisible();

    await page.locator('#checkoutModal')
        .getByRole('link', { name: 'Register / Login' })
        .click();

    // Login
    await loginPage.login(
        process.env.EMAIL,
        process.env.PASSWORD
    );

    // Return to Cart
    await page.getByRole('link', { name: 'Cart' }).click();

    // Proceed to Checkout again
    await page.locator('a.check_out').click();

    // Verify Checkout page
    await expect(page.getByText('Address Details')).toBeVisible();
    await expect(page.getByText('Review Your Order')).toBeVisible();

});

test('TC_CHECKOUT_003 Verify Order Summary', async ({ page, loginPage }) => {

    // Open Products
    await page.goto('https://automationexercise.com/products');

    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // Add first product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Proceed to Checkout
    await page.locator('a.check_out').click();

    // Handle Register/Login popup
    await expect(page.locator('#checkoutModal')).toBeVisible();

    await page.locator('#checkoutModal')
        .getByRole('link', { name: 'Register / Login' })
        .click();

    // Login
    await loginPage.login(
        process.env.EMAIL,
        process.env.PASSWORD
    );

    // Return to Cart
    await page.getByRole('link', { name: 'Cart' }).click();

    // Proceed to Checkout again
    await page.locator('a.check_out').click();

    // Verify Checkout page
    await expect(page.getByText('Address Details')).toBeVisible();
    await expect(page.getByText('Review Your Order')).toBeVisible();

    // Verify product in order summary
    await expect(page.locator('#cart_info')).toContainText('Blue Top');

    // Verify quantity
    await expect(
        page.locator('.cart_quantity button').first()
    ).toBeVisible();

});