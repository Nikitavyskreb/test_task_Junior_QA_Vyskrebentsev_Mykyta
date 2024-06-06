import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class loginPage extends Page {
  /**
   * define selectors using getter methods
   */
  get inputUsername() {
    return $('input[data-test="username"]');
  }

  get inputPassword() {
    return $('input[data-test="password"]');
  }

  get btnSubmit() {
    return $('input[data-test="login-button"]');
  }

  get alertElement() {
    return $('*[data-test="error"]');
  }

  get inventoryList() {
    return $('*[data-test="inventory-list"]');
  }

  get shoppingCart() {
    return $('*[data-test="shopping-cart-link"]');
  }

  get errorIconUsername() {
    return $('input[data-test="username"] + .error_icon');
  }

  get errorIconPassword() {
    return $('input[data-test="password"] + .error_icon');
  }

  /**
   * a method to encapsule automation code to interact with the page
   * e.g. to login using username and password
   */
  
  async login(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);
    await this.btnSubmit.click();
  }

  async checkLogin() {
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html');

    const isInventoryListDisplayed = await this.inventoryList.isDisplayed();
    expect(isInventoryListDisplayed).toBe(true);
  
    const isShoppingCartisplayed = await this.shoppingCart.isDisplayed();
    expect(isShoppingCartisplayed).toBe(true);
  }

  async checkUserInput(username, password) {
    await this.inputUsername.setValue(username);
    await this.inputPassword.setValue(password);

    const value1 = await this.inputUsername.getValue();
    expect(value1).toBe(username);

    const type = await this.inputPassword.getAttribute('type');
    expect(type).toBe('password');
  }

  async checkAlert(expectedAlertText) {
    await this.btnSubmit.click();

    const isErrorIconUsernameDisplayed = await this.errorIconUsername.isDisplayed();
    const isErrorIconPasswordDisplayed = await this.errorIconPassword.isDisplayed();
    const isUsernameHighlighted = await this.inputUsername.getAttribute('class').then(classes => classes.includes('error'));
    const isPasswordHighlighted = await this.inputPassword.getAttribute('class').then(classes => classes.includes('error'));

    
    expect(isErrorIconUsernameDisplayed).toBe(true);
    expect(isErrorIconPasswordDisplayed).toBe(true);
    expect(isUsernameHighlighted).toBe(true);
    expect(isPasswordHighlighted).toBe(true);

    const alertText = await this.alertElement.getText();
    expect(alertText).toBe(expectedAlertText);
  }

  async checkUsernamePasswordFieldsEmpty() {
    const value1 = await this.inputUsername.getValue();
    const value2 = await this.inputPassword.getValue();

    expect(value1).toBe('');
    expect(value2).toBe('');
  }
}

export default new loginPage();
