const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const loginData = require('../testData/loginData.json');
const { channel } = require('node:diagnostics_channel');

test('Verify Checkout page', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const productsPage = poManager.getProductsPage();
    const cartPage = poManager.getCartPage();
    const checkPage = poManager.getCheckOutPage();
    const checkviewPage = poManager.getCheckOutOverviewPage()

    await loginPage.goTo();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    const productNames = await productsPage.getAllProductNames();
    console.log(productNames);
    await productsPage.addToCartProduct('Sauce Labs Bolt T-Shirt');
    await productsPage.goToCart()
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveURL(/cart\.html/); //verify if its cart page url
    const productDisplayed = await cartPage.isProductDisplayed('Sauce Labs Bolt T-Shirt');
    console.log(productDisplayed);
    expect(productDisplayed).toBeTruthy();
    await expect(cartPage.getProduct('Sauce Labs Bolt T-Shirt')).toBeVisible()
    await cartPage.selectCheckOutButton()
    const headingDisplayed = await checkPage.isDisplayedHeading();
    console.log(headingDisplayed);
    const headingText = await checkPage.getHeadingAtCheckOutPage()
    console.log(headingText)
    expect(headingText).toBeTruthy()
    await expect(checkPage.headingAtCheckOutPage).toBeVisible();
    await checkPage.enterCustomerInformation('neels', 'kotha', "456")
    await expect(checkPage.firstName).toHaveValue('neels');
    const fName = await checkPage.getFirstName()
    console.log(fName)
    const zip = await checkPage.getZip()
    console.log(zip)
    await checkPage.selectContinueButton()
    await expect(checkviewPage.headerAtOverview).toBeVisible()
    await expect(checkviewPage.headerAtOverview).toHaveText('Checkout: Overview');
    await expect(checkviewPage.productAtViewPage).toBeVisible()
    await expect(checkviewPage.productAtViewPage).toHaveText('Sauce Labs Bolt T-Shirt');
    await expect(checkviewPage.getProductText('Sauce Labs Bolt T-Shirt')).toHaveText('Sauce Labs Bolt T-Shirt');
    await checkviewPage.selectFinishButton()
    await expect(checkviewPage.orderText).toBeVisible()
    await expect(checkviewPage.orderText).toContainText('Thank you for your order!')
});