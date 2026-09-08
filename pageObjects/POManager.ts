import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { ProductsPage } from './ProductsPage';
import { CartPage } from './CartPage';
import { CheckOutPage } from './CheckOutPage';
import { CheckOutOverviewPage } from './CheckOutOverviewPage';
export class POManager {
    readonly page: Page;
    readonly loginPage: LoginPage;
    readonly productsPage: ProductsPage;
    readonly cartPage: CartPage;
    readonly checkoutPage: CheckOutPage;
    readonly checkoutOverviewPage: CheckOutOverviewPage;
    constructor(page: Page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.productsPage = new ProductsPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckOutPage(page);
        this.checkoutOverviewPage = new CheckOutOverviewPage(page)
    }
    getLoginPage(): LoginPage {

        return this.loginPage;
    }
    getProductsPage(): ProductsPage {
        return this.productsPage;
    }
    getCartPage(): CartPage {
        return this.cartPage;
    }
    getCheckOutPage(): CheckOutPage {
        return this.checkoutPage;
    }
    getCheckOutOverviewPage(): CheckOutOverviewPage {
        return this.checkoutOverviewPage;
    }
}