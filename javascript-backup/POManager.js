const { LoginPage } = require('../pageObjects/LoginPage');
const { ProductsPage } = require('../pageObjects/ProductsPage');
const { CartPage } = require('../pageObjects/CartPage');
const { CheckOutPage } = require('../pageObjects/CheckOutPage')
const { CheckOutOverviewPage } = require('../pageObjects/CheckOutOverviewPage')
class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page)
        this.checkoutPage = new CheckOutPage(page)
        this.checkoutOverviewPage = new CheckOutOverviewPage(page)
    }
    getLoginPage() {

        return this.loginPage;
    }
    getProductsPage() {
        return this.productsPage;
    }
    getCartPage() {
        return this.cartPage
    }
    getCheckOutPage() {
        return this.checkoutPage
    }
    getCheckOutOverviewPage() {
        return this.checkoutOverviewPage
    }
}

module.exports = { POManager };