import { test as base } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
import { LoginPage } from '../pageObjects/LoginPage';
import { ProductsPage } from '../pageObjects/ProductsPage';
import { CartPage } from '../pageObjects/CartPage';
import { CheckOutPage } from '../pageObjects/CheckOutPage';
import { CheckOutOverviewPage } from '../pageObjects/CheckOutOverviewPage';
type MyFixtures = {
    poManager: POManager;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkPage: CheckOutPage;
    checkviewPage: CheckOutOverviewPage;
};
export const test = base.extend<MyFixtures>({
    poManager: async ({ page }, use) => {
        const poManager = new POManager(page);
        await use(poManager);
    },
    loginPage: async ({ poManager }, use) => {
        const loginPage = poManager.getLoginPage();
        await use(loginPage);
    },
    productsPage: async ({ poManager }, use) => {
        const productsPage = poManager.getProductsPage();
        await use(productsPage);
    },
    cartPage: async ({ poManager }, use) => {
        const cartPage = poManager.getCartPage();
        await use(cartPage);
    },
    checkPage: async ({ poManager }, use) => {
        const checkPage = poManager.getCheckOutPage();
        await use(checkPage);
    },
    checkviewPage: async ({ poManager }, use) => {
        const checkviewPage = poManager.getCheckOutOverviewPage();
        await use(checkviewPage);
    },

});