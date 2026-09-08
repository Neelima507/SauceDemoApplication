import { Page, Locator } from "@playwright/test";
export class CartPage {
    readonly page: Page;
    readonly selectedProductAtCartPage: Locator;
    readonly checkOutButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.selectedProductAtCartPage = page.locator(".inventory_item_name")
        this.checkOutButton = page.locator("#checkout")
    }
    async isProductDisplayed(productName: string): Promise<boolean> {
        const selectedProductText = this.selectedProductAtCartPage.filter({ hasText: productName })
        return selectedProductText.isVisible()
    }
    getProduct(productName: string): Locator {
        return this.selectedProductAtCartPage.filter({ hasText: productName })
    }
    async selectCheckOutButton(): Promise<void> {
        await this.checkOutButton.click()
    }
}

