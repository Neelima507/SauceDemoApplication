import { Page, Locator } from "@playwright/test";
export class ProductsPage {
    readonly page: Page;
    readonly productsHeading: Locator;
    readonly productNames: Locator;
    readonly cartButtonLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productsHeading = page.getByText("Products")
        this.productNames = page.locator(".inventory_item_name")
        this.cartButtonLink = page.locator(".shopping_cart_link")
    }
    async isProductDisplayed(): Promise<boolean> {
        return this.productsHeading.isVisible()
    }
    async getProductText(): Promise<string | null> {
        return this.productsHeading.textContent()
    }
    async getAllProductNames(): Promise<string[]> {
        return this.productNames.allInnerTexts()
    }
    async addToCartProduct(productName: string): Promise<void> {
        const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }
    async goToCart(): Promise<void> {
        await this.cartButtonLink.click()
    }
}
