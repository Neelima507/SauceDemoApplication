import { Page, Locator } from "@playwright/test";
export class CheckOutPage {
    readonly page: Page;
    readonly headingAtCheckOutPage: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly zipCode: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headingAtCheckOutPage = page.locator(".header_secondary_container")
        this.firstName = page.getByPlaceholder("First Name")
        this.lastName = page.getByPlaceholder("Last Name")
        this.zipCode = page.getByPlaceholder("Zip/Postal Code")
        this.continueButton = page.locator("#continue")
    }
    async selectContinueButton(): Promise<void> {
        await this.continueButton.click()
    }
    async getHeadingAtCheckOutPage(): Promise<string | null> {
        return await this.headingAtCheckOutPage.textContent()
    }
    async isDisplayedHeading(): Promise<boolean> {
        return this.headingAtCheckOutPage.isVisible()
    }
    async enterCustomerInformation(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
    }
    async getFirstName(): Promise<string> {
        return await this.firstName.inputValue()
    }
    async getZip(): Promise<string> {
        return await this.zipCode.inputValue()
    }
}
