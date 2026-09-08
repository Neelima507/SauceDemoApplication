class CartPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.selectedProductAtCartPage = page.locator(".inventory_item_name")
        this.checkOutButton = page.locator("#checkout")
    }
    async isProductDisplayed(productName) {
        const selectedProductText = await this.selectedProductAtCartPage.filter({ hasText: productName })
        return await selectedProductText.isVisible()
    }
    getProduct(productName) {
        return this.selectedProductAtCartPage.filter({ hasText: productName })
    }
    async selectCheckOutButton() {
        await this.checkOutButton.click()
    }
}
module.exports = { CartPage }
