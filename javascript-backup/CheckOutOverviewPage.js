class CheckOutOverviewPage {
    /**
        * @param {import('@playwright/test').Page} page
        */
    constructor(page) {
        this.page = page;
        this.headerAtOverview = page.locator('.header_secondary_container')
        this.productAtViewPage = page.locator(".inventory_item_name")
        this.finishButton = page.locator("#finish")
        this.orderText = page.locator(".complete-header")
    }
    async isoverviewHearderVisible() {
        return await this.headerAtOverview.isVisible()
    }
    getProductText(ProductText) {
        return this.productAtViewPage.filter({ hasText: ProductText })
    }
    async selectFinishButton() {
        await this.finishButton.click()
    }


}
module.exports = { CheckOutOverviewPage } 