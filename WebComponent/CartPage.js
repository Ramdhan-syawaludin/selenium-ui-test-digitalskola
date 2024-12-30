const { By } = require('selenium-webdriver');

class CartPage {
    constructor(driver){
        this.driver = driver;
    }

    async itemOnCart(){
        const item = await this.driver.findElement(By.className('inventory_item_name'));
        return item.getText();
    }
}

module.exports = CartPage;