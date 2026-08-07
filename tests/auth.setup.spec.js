const { test,} = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test('Authenticate User', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

    await loginPage.login(
        process.env.EMAIL,
        process.env.PASSWORD
    );

    await page.context().storageState({
        path: 'playwright/.auth/user.json'
    });

});