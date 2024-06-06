import Page from './page.js';

class inventoryPage extends Page {
  get burgerBtn() {
    return $('#react-burger-menu-btn');
  }

  get allItemsBtn() {
    return $('*[data-test="inventory-sidebar-link"]');
  }

  get aboutBtn() {
    return $('*[data-test="about-sidebar-link"]');
  }

  get logoutBtn() {
    return $('*[data-test="logout-sidebar-link"]');
  }

  get resetAppStateBtn() {
    return $('*[data-test="reset-sidebar-link"]');
  }

  addToCartBtn(itemName) {
    return $(`*[data-test="add-to-cart-${itemName}"]`);
  }

  removeFromCartBtn(itemName) {
    return $(`*[data-test="remove-${itemName}"]`);
  }

  get numberOfProduct() {
    return $('*[data-test="shopping-cart-badge"]');
  }

  get shoppingCart() {
    return $('*[data-test="shopping-cart-link"]');
  }

  get cartItem() {
    return $('*[data-test="inventory-item"]');
  }

  get twitterIcon() {
    return $('a[data-test="social-twitter"]');
  }

  get facebookIcon() {
    return $('a[data-test="social-facebook"]');
  }

  get linkedinIcon() {
    return $('a[data-test="social-linkedin"]');
  }

  get checkoutBtn() {
    return $('*[data-test="checkout"]');
  }

  get inventoryList() {
    return $('*[data-test="inventory-list"]');
  }



  convertToTitleCase(itemName) {
    return itemName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  async checkBurgerMenu() {
    const isBurgerMenuDisplayed = await this.burgerBtn.isDisplayed();
    expect(isBurgerMenuDisplayed).toBe(true);
    await this.burgerBtn.click();

    const isAllItemsBtn = await this.allItemsBtn.isDisplayed();
    const isAboutBtn = await this.aboutBtn.isDisplayed();
    const isLogoutBtn = await this.logoutBtn.isDisplayed();
    const isResetAppStateBtn = await this.resetAppStateBtn.isDisplayed();

    expect(isAllItemsBtn).toBe(true);
    expect(isAboutBtn).toBe(true);
    expect(isLogoutBtn).toBe(true);
    expect(isResetAppStateBtn).toBe(true);
  }

  async checkUserLogout() {
    await this.logoutBtn.click();
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe('https://www.saucedemo.com/');
  }

  async addItemToCart(itemName) {
    await this.addToCartBtn(itemName).click();
  }

  async removeItemFromCart(itemName) {
    await this.removeFromCartBtn(itemName).click();
  }

  async checkItemAddedToCart() {
    const isNumberOfProductDisplayed = await this.numberOfProduct.isDisplayed();
    const numberOfProduct = await this.numberOfProduct.getText();
    expect(isNumberOfProductDisplayed).toBe(true);
    expect(numberOfProduct).toBe('1');

    await this.shoppingCart.click();
    const isCartItemDisplayed = await this.cartItem.isDisplayed();
    expect(isCartItemDisplayed).toBe(true);
  }

  async checkItemAddedToCartWithCorrectName(itemName) {
    await this.shoppingCart.click();
    const cartItemText = await this.cartItem.getText();
    const expectedItemName = this.convertToTitleCase(itemName);
    expect(cartItemText).toContain(expectedItemName);
  }

  async clickCheckCheckoutBtn() {
    await this.checkoutBtn.click();
  }
  
  async checkProductListAndCartEmpty() {
    const isInventoryListDisplayed = await this.inventoryList.isDisplayed();
    const isNumberOfProductDisplayed = await this.numberOfProduct.isDisplayed();
    expect(isInventoryListDisplayed).toBe(true);
    expect(isNumberOfProductDisplayed).toBe(false);
  }

  async checkTwitterIcon() {
    await this.twitterIcon.click();

    await browser.pause(2000); 

    let handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);
  
    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe('https://x.com/saucelabs');

    
    handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[0]);
  }

  async checkTwitterIcon() {
    await this.twitterIcon.click();
    await browser.pause(2000); 

    let handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe('https://x.com/saucelabs');

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  }

  async checkFacebookIcon() {
    await this.facebookIcon.click();
    await browser.pause(2000); 

    let handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe('https://www.facebook.com/saucelabs');

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  }

  async checkLinkedinIcon() {
    await this.linkedinIcon.click();
    await browser.pause(2000); 

    let handles = await browser.getWindowHandles();
    await browser.switchToWindow(handles[1]);

    const currentUrl = await browser.getUrl();
    expect(currentUrl).toBe('https://www.linkedin.com/company/sauce-labs/');

    await browser.closeWindow();
    await browser.switchToWindow(handles[0]);
  }

  async checkSorting(optionValue) {

    const selectContainer = $('.select_container');
    const sortingSelect = selectContainer.$('select.product_sort_container');


    await sortingSelect.selectByAttribute('value', optionValue);
    await browser.pause(2000); 

    const products = $$('.product');
    const sortedProducts = await Promise.all(products.map(product => product.getText()));
    const sortedCopy = [...sortedProducts].sort();
    expect(sortedProducts).toEqual(sortedCopy);
  }
}

export default new inventoryPage();