class ProductsPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        this.productsHeading = page.getByText("Products")
        this.productNames = page.locator(".inventory_item_name")
        this.cartButtonLink = page.locator(".shopping_cart_link")
    }
    async isProductDisplayed() {
        return await this.productsHeading.isVisible()
    }
    async getProductText() {
        return await this.productsHeading.textContent()
    }
    async getAllProductNames() {
        return await this.productNames.allInnerTexts()
    }
    async addToCartProduct(productName) {
        const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }
    async goToCart() {
        await this.cartButtonLink.click()
    }
}
module.exports = { ProductsPage }