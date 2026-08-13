const { test, expect } = require('../fixtures/baseFixture');

test.beforeEach(async ({ page }) => {
    await page.goto('https://automationexercise.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 60000
    });
});

test('@regression @order TC_ORDER_001 Place Order', async ({ page, loginPage }) => {

    // Open Products page
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

     // Verify user is authenticated
    await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();

    // Hover first product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    // Add first product to cart
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify cart page
    await expect(page).toHaveURL(/.*view_cart/);

    // Proceed to Checkout
    await page.locator('a.check_out').click();

    // Verify checkout page
    await expect(page.getByText('Address Details')).toBeVisible();

    await expect(page.getByText('Review Your Order')).toBeVisible();

    // Click Place Order
    await page.getByRole('link', { name: 'Place Order' }).click();

    // Verify Payment page
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();

});

//complete payment and verify order success
test('TC_ORDER_002 Complete Payment', async ({ page, loginPage }) => {

    // Open Products
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // First product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    // Add to cart
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Proceed To Checkout
    await page.locator('a.check_out').click();

    // Verify checkout page
    await expect(page.getByText('Review Your Order')).toBeVisible();

    // Place Order
    await page.getByRole('link', { name: 'Place Order' }).click();

    // Payment Details
    await page.locator('[data-qa="name-on-card"]').fill('Faiqa');

    await page.locator('[data-qa="card-number"]').fill('4111111111111111');

    await page.locator('[data-qa="cvc"]').fill('123');

    await page.locator('[data-qa="expiry-month"]').fill('12');

    await page.locator('[data-qa="expiry-year"]').fill('2030');

    // Submit payment
    await page.locator('[data-qa="pay-button"]').click();

    // Verify success message
    await expect(page.getByText('Congratulations! Your order has been confirmed!')).toBeVisible();

});

//verify payment with empty fields
test('TC_ORDER_003 Verify Payment with Empty Fields', async ({ page, loginPage }) => {

    // Open Products
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Proceed to Checkout
    await page.locator('a.check_out').click();

    // Place Order
    await page.getByRole('link', { name: 'Place Order' }).click();

    // Click Pay without entering details
    await page.locator('[data-qa="pay-button"]').click();

    // Verify user is still on Payment page
    await expect(page.getByRole('heading', { name: 'Payment' })).toBeVisible();

});