class CheckOutPage {
    /**
        * @param {import('@playwright/test').Page} page
        */
    constructor(page) {
        this.page = page;
        this.headingAtCheckOutPage = page.locator(".header_secondary_container")
        this.firstName = page.getByPlaceholder("First Name")
        this.lastName = page.getByPlaceholder("Last Name")
        this.zipCode = page.getByPlaceholder("Zip/Postal Code")
        this.continueButton = page.locator("#continue")
    }
    async selectContinueButton() {
        await this.continueButton.click()
    }
    async getHeadingAtCheckOutPage() {
        return await this.headingAtCheckOutPage.textContent()
    }
    async isDisplayedHeading() {
        return await this.headingAtCheckOutPage.isVisible()
    }
    async enterCustomerInformation(firstName, lastName, zipCode) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.zipCode.fill(zipCode);
    }
    async getFirstName() {
        return await this.firstName.inputValue()
    }
    async getZip() {
        return await this.zipCode.inputValue()
    }
}
module.exports = { CheckOutPage } 