const { expect } = require('@playwright/test');

class LoginPage {

    constructor(page) {
        this.page = page;

        // Locators
        this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.emailTextbox = page.locator('[data-qa="login-email"]');
        this.passwordTextbox = page.locator('[data-qa="login-password"]');
        this.loginButton = page.locator('[data-qa="login-button"]');

        this.loggedInText = page.getByText('Logged in as');
        this.invalidLoginMessage = page.getByText('Your email or password is incorrect!');
    }

    async open() {
        await this.page.goto('https://automationexercise.com/');
    }

    async login(email, password) {
        await this.loginLink.click();
        await this.emailTextbox.fill(email);
        await this.passwordTextbox.fill(password);
        await this.loginButton.click();
    }

}

module.exports = { LoginPage };