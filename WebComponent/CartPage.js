const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
        this.checkoutButton = By.xpath("//button[@id='checkout']");
    }

    async itemOnCart(){
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }

    async checkout(){
        await this.driver.findElement(this.checkoutButton).click();
    }
}

module.exports = CartPage;