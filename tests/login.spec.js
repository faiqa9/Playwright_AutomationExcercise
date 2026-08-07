const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const loginData = require('../data/loginData.json');
const { takeScreenshot } = require('../utils/screenshotUtil');

test.beforeEach(async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.open();

});
loginData.forEach((data) => {

    test(`@smoke @login ${data.testCase}`, async ({ page }) => {

        const loginPage = new LoginPage(page);

        await loginPage.login(data.email, data.password);

        // Assertions
      if (data.expected === 'success') {

        await expect(loginPage.loggedInText).toBeVisible();

        await takeScreenshot(page, data.testCase);

        } else if (data.expected === 'invalid') {

            await expect(loginPage.invalidLoginMessage).toBeVisible();

        } else if (data.expected === 'emptyPassword') {

            await expect(loginPage.loginButton).toBeVisible();

        } else if (data.expected === 'emptyEmail') {

            await expect(loginPage.loginButton).toBeVisible();

        }

    });

});