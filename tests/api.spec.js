const { test, expect } = require('@playwright/test');

test('@api @regression TC_API_001 Get All Products', async ({ request }) => {

    const response = await request.get(
        'https://automationexercise.com/api/productsList'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

console.log(body);

expect(body.responseCode).toBe(200);

expect(body.products.length).toBeGreaterThan(0);

expect(body.products[0].name).toBe('Blue Top');

});

test('TC_API_002 Verify POST request', async ({ request }) => {

    const response = await request.post(
        'https://automationexercise.com/api/searchProduct',
        {
            form: {
                search_product: 'Blue Top'
            }
        }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);

expect(body.products.length).toBe(1);

expect(body.products[0].name).toBe('Blue Top');

expect(body.products[0].brand).toBe('Polo');

expect(body.products[0].price).toBe('Rs. 500');

});

test('TC_API_003 Verify PUT request', async ({ request }) => {

    const response = await request.put(
        'https://automationexercise.com/api/productsList'
    );

    const body = await response.json();
    console.log(body);

expect(body.responseCode).toBe(405);

expect(body.message).toBe('This request method is not supported.');

});

test('TC_API_004 Verify DELETE request', async ({ request }) => {

    const response = await request.delete(
        'https://automationexercise.com/api/productsList'
    );

    const body = await response.json();

    console.log(body);

    expect(body.responseCode).toBe(405);

    expect(body.message).toBe('This request method is not supported.');

});