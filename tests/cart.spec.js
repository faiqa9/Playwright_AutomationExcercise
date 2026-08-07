const { test, expect } = require('@playwright/test');

test('@smoke @cart TC_CART_001 Add Product to Cart', async ({ page }) => {

    // Open website and products page
   await page.goto('https://automationexercise.com/products');

// Wait for products
await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

// First product
const firstProduct = page.locator('.product-image-wrapper').first();

// Hover
await firstProduct.hover();

// Click Add to Cart inside this product only
await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup appears
    await expect(page.getByText('Added!')).toBeVisible();

    // Click View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify Cart page
    await expect(page).toHaveURL(/.*view_cart/);

    // Verify cart is not empty
await expect(page.locator('#cart_info_table')).toBeVisible();

// Verify Blue Top exists in cart
await expect(page.locator('.cart_description')).toContainText('Blue Top');

// Verify quantity
await expect(page.locator('.cart_quantity button')).toHaveText('1');

    // Verify product is present in cart
    await expect(page.locator('.cart_description').first()).toContainText('Blue Top');

    // Verify quantity is 1
    await expect(page.locator('.cart_quantity button').first()).toHaveText('1');

    // Verify Cart page
    await expect(page).toHaveURL(/.*view_cart/);

});

//Remove product
test('TC_CART_002 Remove Product from Cart', async ({ page }) => {

    // Open website
    await page.goto('https://automationexercise.com/');

    // Go to Products
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // First product
    const firstProduct = page.locator('.product-image-wrapper').first();

    // Hover
    await firstProduct.hover();

    // Click Add to Cart
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify cart page
    await expect(page).toHaveURL(/.*view_cart/);

    // Remove product
    await page.locator('.cart_quantity_delete').click();

    // Verify cart becomes empty
    await expect(page.getByText('Cart is empty')).toBeVisible();

});

//verify cart count
test('TC_CART_003 Verify Product Added to Cart', async ({ page }) => {

    // Open Products page
    await page.goto('https://automationexercise.com/products');

    // Wait for products
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // First product
    const firstProduct = page.locator('.product-image-wrapper').first();

    // Hover
    await firstProduct.hover();

    // Add product
    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify Cart page
    await expect(page).toHaveURL(/.*view_cart/);

    // Verify exactly one product exists
    await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(1);

});

//multiple products to the cart
test('TC_CART_004 Add Multiple Products', async ({ page }) => {

    // Open Products page
    await page.goto('https://automationexercise.com/products');

    // Wait until products are visible
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // -----------------------
    // Add First Product
    // -----------------------

    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // Continue Shopping
    await page.getByRole('button', { name: 'Continue Shopping' }).click();

    // -----------------------
    // Add Second Product
    // -----------------------

    const secondProduct = page.locator('.product-image-wrapper').nth(1);

    await secondProduct.hover();

    await secondProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify Cart page
    await expect(page).toHaveURL(/.*view_cart/);

    // Verify exactly 2 products exist
    await expect(page.locator('#cart_info_table tbody tr')).toHaveCount(2);

});

//verify product details in cart
test('TC_CART_005 Verify Product Details in Cart', async ({ page }) => {

    // Open Products page
    await page.goto('https://automationexercise.com/products');

    // Wait for first product
    await expect(page.locator('.product-image-wrapper').first()).toBeVisible();

    // Add first product
    const firstProduct = page.locator('.product-image-wrapper').first();

    await firstProduct.hover();

    await firstProduct.locator('.overlay-content .add-to-cart').click();

    // Verify popup
    await expect(page.getByText('Added!')).toBeVisible();

    // View Cart
    await page.getByRole('link', { name: 'View Cart' }).click();

    // Verify URL
    await expect(page).toHaveURL(/.*view_cart/);

    // Verify Product Name
    await expect(page.locator('.cart_description')).toContainText('Blue Top');

    // Verify Price
    await expect(page.locator('.cart_price')).toContainText('Rs. 500');

    // Verify Quantity
    await expect(page.locator('.cart_quantity button')).toHaveText('1');

    // Verify Total Price
    await expect(page.locator('.cart_total')).toContainText('Rs. 500');

});

//negative test cases

//verify empty cart
test('TC_CART_006 Verify Empty Cart', async ({ page }) => {

    // Open Cart page directly
    await page.goto('https://automationexercise.com/view_cart');

    // Verify URL
    await expect(page).toHaveURL(/.*view_cart/);

    // Verify empty cart message
    await expect(page.getByText('Cart is empty!')).toBeVisible();

});

//verify checkout without products
test('TC_CART_007 Checkout with Empty Cart', async ({ page }) => {

    // Open Cart page
    await page.goto('https://automationexercise.com/view_cart');

    // Verify cart is empty
    await expect(page.getByText('Cart is empty!')).toBeVisible();

    // Verify Proceed To Checkout button is NOT visible
    await expect(
        page.getByRole('link', { name: 'Proceed To Checkout' })).not.toBeVisible();

});
