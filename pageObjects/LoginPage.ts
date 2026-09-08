import { Page, Locator } from "@playwright/test";
export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly loginCredentials: Locator;
    readonly errorMsg: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.loginCredentials = page.locator('.login_credentials_wrap-inner')
        this.errorMsg = page.getByText('Epic sadface: Username and password do not match any user in this service')
    }
    async goTo(): Promise<void> {
        await this.page.goto('/');
    }
    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }
    async CredentialsText(): Promise<string[]> {
        const text = await this.loginCredentials.innerText();
        return text.split('\n').slice(1);
    }
    async getErrorMessage(): Promise<string | null> {
        return await this.errorMsg.textContent()
    }
}
