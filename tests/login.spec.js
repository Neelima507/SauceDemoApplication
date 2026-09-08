const { test, expect } = require('@playwright/test');
const { POManager } = require('../pageObjects/POManager');
const loginData = require('../testData/loginData.json');

test('Valid user should login successfully', async ({ page }) => {
    // Create Page Object Manager
    const poManager = new POManager(page);
    // Get LoginPage object
    const loginPage = poManager.getLoginPage();
    const productsPage = poManager.getProductsPage();
    // Open application
    await loginPage.goTo();
    // Login using external test data
    await loginPage.loginCredentials.waitFor()
    console.log(await loginPage.loginCredentials.isVisible())
    const credentialsTextLoginPage = await loginPage.CredentialsText()
    console.log(credentialsTextLoginPage) //print credentials
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    // Verify successful login
    await expect(page).toHaveURL(/inventory/);
    const headingText = await productsPage.getProductText()
    console.log(headingText) //printing heading text
    await expect(productsPage.productsHeading).toBeVisible()
    console.log(await productsPage.productsHeading.isVisible())//print true or false

});
test('Invalid user should not login successfully', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(loginData.inValidUser.username, loginData.inValidUser.password);
    const errortext = await loginPage.getErrorMessage()
    console.log("error msg is ---- " + errortext)
    //await expect(errortext).toContain('Username and password do not match');
    await expect(loginPage.errorMsg).toContainText('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory/);

});
test('valid user and invalid password so should not login successfully', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.login(loginData.inValidPass.username, loginData.inValidPass.password);
    //await expect(errortext).toContain('Username and password do not match');
    await expect(loginPage.errorMsg).toContainText('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory/);

});
test('Verify all products displayed', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const productsPage = poManager.getProductsPage();
    await loginPage.goTo();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    const productNames = await productsPage.getAllProductNames();
    console.log(productNames);

});
test('Select one product dynamically', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const productsPage = poManager.getProductsPage();
    await loginPage.goTo();
    await loginPage.login(loginData.validUser.username, loginData.validUser.password);
    const productNames = await productsPage.getAllProductNames();
    console.log(productNames);
    await productsPage.addToCartProduct('Sauce Labs Bolt T-Shirt');
    await productsPage.goToCart()
    const title = await page.title();
    console.log(title);
    await expect(page).toHaveURL(/cart\.html/);

});
test('Verify selected product at cart page', async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    const productsPage = poManager.getProductsPage();
    const cartPage = poManager.getCartPage();
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
}); 
