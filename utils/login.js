async function login(page, email, password) {

    await page.getByRole('link', { name: 'Signup / Login' }).click();

    await page.locator('[data-qa="login-email"]').fill(email);

    await page.locator('[data-qa="login-password"]').fill(password);

    await page.locator('[data-qa="login-button"]').click();

}

module.exports = { login };