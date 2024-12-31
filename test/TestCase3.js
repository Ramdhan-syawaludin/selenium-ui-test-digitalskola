const { Builder } = require('selenium-webdriver');
const LoginPage = require('../WebComponent/LoginPage');
const DashboardPage = require('../WebComponent/DashboardPage');
const CartPage = require('../WebComponent/CartPage');
const assert = require('assert');
const fs = require('fs');
require('dotenv').config();

const browser = process.env.BROWSER;
const baseUrl = process.env.BASE_URL;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;

const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {require: true});
}

describe('TestCase 3 #Regression', function () {
    this.timeout(400000);
    let driver;

    switch(browser.toLowerCase()){
        case 'firefox':
            const firefox = require('selenium-webdriver/firefox');
            options = new firefox.Options();
            options.addArguments('--headless');
        case 'edge':
            const edge = require('selenium-webdriver/edge');
            options = new edge.Options();
            options.addArguments('--headless');
        case 'chrome':
        default:
            const chrome = require('selenium-webdriver/chrome');
            options = new chrome.Options();
            options.addArguments('--headless');
    }

    before(async function (){
        driver = await new Builder().forBrowser(browser).setChromeOptions(options).build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        const dashboardPage = new DashboardPage(driver);
        await loginPage.navigate(baseUrl);
        await loginPage.login(username, password);
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