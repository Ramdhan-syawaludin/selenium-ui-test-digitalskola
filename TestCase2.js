const { Builder } = require('selenium-webdriver');
const LoginPage = require('./WebComponent/LoginPage');
const assert = require('assert');
const fs = require('fs');

const screenshotDir = './screenshot/';
if(!fs.existsSync(screenshotDir)){
    fs.mkdirSync(screenshotDir, {require: true});
}

describe('TestCase 2', function () {
    this.timeout(400000);
    let driver;

    before(async function (){
        driver = await new Builder().forBrowser('chrome').build();
    });

    beforeEach(async function (){
        const loginPage = new LoginPage(driver);
        await loginPage.navigate();
        await loginPage.login('haha', 'hihi');
    });

    it('Error message appears for invalid credentials', async function (){
        const loginPagePage = new LoginPage(driver);
        const errorMessage = await loginPagePage.getErrorMessage();
        assert.strictEqual(errorMessage, 'Epic sadface: Username and password do not match any user in this service', 'Expected error message does not match')
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