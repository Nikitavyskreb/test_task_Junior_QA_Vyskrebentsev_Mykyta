import Page from './page.js';

class checkoutPage extends Page {
  get checkoutForm() {
    return $('*[data-test="checkout-info-container"]');
  }

  get firstNameField() {
    return $('*[data-test="firstName"]');
  }

  get lastNameField() {
    return $('*[data-test="lastName"]');
  }

  get postalCodeField() {
    return $('*[data-test="postalCode"]');
  }

  get itemPrice() {
    return $('*[data-test="inventory-item-price"]');
  }

  get continueBtn() {
    return $('*[data-test="continue"]');
  }

  get finishBtn() {
    return $('*[data-test="finish"]');
  }

  get successMessage() {
    return $('*[data-test="complete-header"]');
  }

  get backToProductsBtn() {
    return $('*[data-test="back-to-products"]');
  }

  get shoppingCart() {
    return $('*[data-test="shopping-cart-link"]');
  }

  get cartContent() {
    return $('*[data-test="cart-contents-container"]');
  }

  get inventoryItem() {
    return $('*[data-test="inventory-item"]');
  }

  get checkoutBtn() {
    return $('*[data-test="checkout"]');
  }

  get alertElement() {
    return $('*[data-test="error"]');
  }

  async generateRandomFirstName() {
    const firstNames = ['John', 'Jane', 'Alex', 'Emily', 'Michael', 'Sarah', 'David', 'Laura', 'Robert', 'Emma'];
    const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    return randomFirstName;
  }

  async generateRandomSecondName() {
    const secondNames = ['Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Martin'];
    const randomSecondName = secondNames[Math.floor(Math.random() * secondNames.length)];
    return randomSecondName;
  }

  async generateRandomPostalCode() {
    let postalCode = '';
    for (let i = 0; i < 5; i++) {
      postalCode += Math.floor(Math.random() * 10).toString();
    }
    return postalCode;
  }

  async getItemPrice() {
    const itemPrice = this.itemPrice.getText();
    return itemPrice;
  }

  async checkCheckoutForm() {
    const isCheckoutFormDisplayed = await this.checkoutForm.isDisplayed();
    expect(isCheckoutFormDisplayed).toBe(true);

    const randomFirstName = await this.generateRandomFirstName();
    const randomSecondName = await this.generateRandomSecondName();
    const randomPostalCode = await this.generateRandomPostalCode(); 

    await this.firstNameField.setValue(randomFirstName);
    await this.lastNameField.setValue(randomSecondName);
    await this.postalCodeField.setValue(randomPostalCode);

    const value1 = await this.firstNameField.getValue();
    expect(value1).toBe(randomFirstName);

    const value2 = await this.lastNameField.getValue();
    expect(value2).toBe(randomSecondName);

    const value3 = await this.postalCodeField.getValue();
    expect(value3).toBe(randomPostalCode);

    await this.continueBtn.click();

    const currentPrice = await this.itemPrice.getText();
    const price = await this.getItemPrice();
    expect(currentPrice).toBe(price)

    await this.finishBtn.click();
    const currentUrl1 = await browser.getUrl();
    expect(currentUrl1).toBe('https://www.saucedemo.com/checkout-complete.html');

    const isSuccessMessageDisplayed = await this.successMessage.isDisplayed();
    expect(isSuccessMessageDisplayed).toBe(true);

    await this.backToProductsBtn.click();
    const currentUrl2 = await browser.getUrl();
    expect(currentUrl2).toBe('https://www.saucedemo.com/inventory.html');
  }

  async checkCheckoutWithoutProducts() {
    await this.shoppingCart.click();
    const isCartContentDisplayed = await this.cartContent.isDisplayed();
    const isInventoryItemDisplayed = await this.inventoryItem.isDisplayed();
    expect(isCartContentDisplayed).toBe(true);
    expect(isInventoryItemDisplayed).toBe(false);

    await this.checkoutBtn.click();
    const isAlertElementDisplayed = await this.cartContent.isDisplayed();
    expect(isAlertElementDisplayed).toBe(true);
  }
}

export default new checkoutPage();