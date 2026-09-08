import { expect } from '@playwright/test';
import { test } from '../fixtures/testFixtures';
import loginData from '../testData/loginData.json';
import checkoutData from '../testData/checkoutData.json';

test('ETE flow @smoke', async ({ page, loginPage, checkPage, cartPage, productsPage, checkviewPage }) => {
    await loginPage.goTo();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    const productNames = await productsPage.getAllProductNames();
    console.log(productNames);
    await productsPage.addToCartProduct(checkoutData.customer.productName);
    await productsPage.goToCart()
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveURL(/cart\.html/); //verify if its cart page url
    const productDisplayed = await cartPage.isProductDisplayed(checkoutData.customer.productName);
    console.log(productDisplayed);
    expect(productDisplayed).toBeTruthy();
    await expect(cartPage.getProduct(checkoutData.customer.productName)).toBeVisible()
    await cartPage.selectCheckOutButton()
    const headingDisplayed = await checkPage.isDisplayedHeading();
    console.log(headingDisplayed);
    const headingText = await checkPage.getHeadingAtCheckOutPage()
    console.log(headingText)
    expect(headingText).toBeTruthy()
    await expect(checkPage.headingAtCheckOutPage).toBeVisible();
    await checkPage.enterCustomerInformation(checkoutData.customer.firstName, checkoutData.customer.lastName, checkoutData.customer.zipCode)
    await expect(checkPage.firstName).toHaveValue(checkoutData.customer.firstName);
    const fName = await checkPage.getFirstName()
    console.log(fName)
    const zip = await checkPage.getZip()
    console.log(zip)
    await checkPage.selectContinueButton()
    await expect(checkviewPage.headerAtOverview).toBeVisible()
    await expect(checkviewPage.headerAtOverview).toHaveText('Checkout: Overview');
    await expect(checkviewPage.productAtViewPage).toBeVisible()
    await expect(checkviewPage.productAtViewPage).toHaveText(checkoutData.customer.productName);
    await expect(checkviewPage.getProduct('Sauce Labs Bolt T-Shirt')).toHaveText('Sauce Labs Bolt T-Shirt');
    await checkviewPage.selectFinishButton()
    await expect(checkviewPage.orderText).toBeVisible()
    await expect(checkviewPage.orderText).toContainText('Thank you for your order!')

});