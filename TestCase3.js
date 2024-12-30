const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const DashboardPage = require('./WebComponent/DashboardPage');
const CartPage = require('./WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {require: true});
}

describe('TestCase 3', function () {
    this.timeout(400000);
    let driver;

    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        const dashboardPage = new DashboardPage(driver);
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        await dashboardPage.addToCart();
    });

    it('Add item to cart succesfully and verify cart', async function (){
        const cartPage = new CartPage(driver);
        const item = await cartPage.itemOnCart();
        assert.strictEqual(item, 'Sauce Labs Backpack', 'Expected item name to be Sauce Labs Backpack')
    });

    afterEach(async function () {
        const screenshot = await driver.takeScreenshot();
        const filepath = `${screenshotDir}${this.currentTest.title.replace(/\s+/g, '_' )}_${Date.now()}.png`;
        fs.writeFileSync(filepath, screenshot, 'base64');
    })

    after(async function (){
        await driver.quit();
    });

});