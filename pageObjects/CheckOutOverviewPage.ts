import { Page, Locator } from "@playwright/test";
export class CheckOutOverviewPage {
    readonly page: Page;
    readonly headerAtOverview: Locator;
    readonly productAtViewPage: Locator;
    readonly finishButton: Locator;
    readonly orderText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.headerAtOverview = page.locator('.header_secondary_container')
        this.productAtViewPage = page.locator(".inventory_item_name")
        this.finishButton = page.locator("#finish")
        this.orderText = page.locator(".complete-header")
    }
    async isoverviewHearderVisible(): Promise<boolean> {
        return this.headerAtOverview.isVisible()
    }
    getProduct(productName: string): Locator {
        return this.productAtViewPage.filter({ hasText: productName })
    }
    async selectFinishButton(): Promise<void> {
        await this.finishButton.click()
    }
}