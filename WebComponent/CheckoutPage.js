const { By } = require('selenium-webdriver');

class CheckoutPage {
    constructor(driver){
        this.driver = driver;
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.name('lastName');
        this.postalcodeInput = By.css('#postal-code');
        this.continueButton = By.css('#continue');
        this.finishButton = By.xpath("//button[@id='finish']");
    }

    async navigate(browser){
        await this.driver.get(browser);
    }

    async informationCheckout(firstname, lastname, postalcode){
        await this.driver.findElement(this.firstNameInput).sendKeys(firstname);
        await this.driver.findElement(this.lastNameInput).sendKeys(lastname);
        await this.driver.findElement(this.postalcodeInput).sendKeys(postalcode);
        await this.driver.findElement(this.continueButton).click();
    }

    async overview(){
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }

    async finishCheckout(){
        await this.driver.findElement(this.finishButton).click();
        const title = await this.driver.findElement(By.className('title'));
        return title.getText();
    }

}

module.exports = CheckoutPage;