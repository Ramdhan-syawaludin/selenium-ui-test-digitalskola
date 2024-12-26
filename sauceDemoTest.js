const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

async function sauceDemoTest(){
    let driver = await new Builder().forBrowser('chrome').build();

    try{
        await driver.get("https://www.saucedemo.com");

        await driver.findElement(By.id('user-name')).sendKeys('standard_user');
        await driver.findElement(By.xpath("//input[@id='password']")).sendKeys('secret_sauce');

        await driver.findElement(By.xpath("//input[@id='login-button']")).click();

        let titleText = await driver.findElement(By.xpath("//div[@class='app_logo']")).getText();
        assert.strictEqual(titleText.includes('Swag Labs'), true, "Title does not include 'Swag Labs'");

        let menuButton = await driver.findElement(By.xpath("//button[@id='react-burger-menu-btn']"));
        assert.strictEqual(await menuButton.isDisplayed(), true, "Menu Button is not visible");

        await driver.findElement(By.xpath("//button[@id='add-to-cart-sauce-labs-backpack']")).click();

        await driver.findElement(By.css(".shopping_cart_link")).click();

        let itemName = await driver.findElement(By.css(".inventory_item_name")).getText();
        assert.strictEqual(itemName.includes('Sauce Labs Backpack'), true, "No items on the cart");

    } finally {
        await driver.quit();
    }
}

sauceDemoTest();
