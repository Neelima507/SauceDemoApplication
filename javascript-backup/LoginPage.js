class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        // Store Playwright's page object
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.loginCredentials = page.locator('.login_credentials_wrap-inner')
        this.errorMsg = page.getByText('Epic sadface: Username and password do not match any user in this service')
    }
    async goTo() {
        await this.page.goto('https://www.saucedemo.com/');
    }
    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async CredentialsText() {
        const text = await this.loginCredentials.innerText();
        return text.split('\n').slice(1);
    }
    async getErrorMessage() {
        return await this.errorMsg.textContent()
    }
}

module.exports = { LoginPage };