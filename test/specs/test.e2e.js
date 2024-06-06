import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'
import checkoutPage from '../pageobjects/checkout.page.js'

describe('Login page', () => {
  it('should login with valid credentials', async () => {
    await loginPage.open()
    await loginPage.login('standard_user', 'secret_sauce')
    await loginPage.checkLogin();
  })

  it('username should enter to the field and the password should be hidden under the mask', async () => {
    await loginPage.open()
    await loginPage.checkUserInput('standard_user', 'secret_sauce')
  })
  
  it('should appear "Epic sadface: Username and password do not match any user in this service" alert if the password field is field with incorrect password', async () => {
    await loginPage.open()
    await loginPage.login('standard_user', 'qwerty')

    const expectedAlertText = "Epic sadface: Username and password do not match any user in this service";
    await loginPage.checkAlert(expectedAlertText);
  })

  it('should appear "Epic sadface: Username is required" alert if username field is field with invalid username', async () => {
    await loginPage.open()
    await loginPage.login('qwerty', 'secret_sauce')

    const expectedAlertText = "Epic sadface: Username and password do not match any user in this service";
    await loginPage.checkAlert(expectedAlertText);
  })

  it('should appear "Epic sadface: Password is required" alert if password field isnt field', async () => {
    await loginPage.open()
    await loginPage.login('standard_user', '')

    const expectedAlertText = "Epic sadface: Password is required";
    await loginPage.checkAlert(expectedAlertText);
  })
})

describe('Inventory page', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should contain burger menu with 4 items, username and password are empty after logout', async () => {
    await inventoryPage.checkBurgerMenu();
    await inventoryPage.checkUserLogout();
    await loginPage.checkUsernamePasswordFieldsEmpty();
  })

  it('should save item to the cart after the logout', async () => {
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.checkItemAddedToCart();
    await inventoryPage.checkBurgerMenu();
    await inventoryPage.checkUserLogout();
    await loginPage.checkUsernamePasswordFieldsEmpty();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.checkItemAddedToCart();
    await inventoryPage.removeItemFromCart('sauce-labs-backpack');
  })

  // it('should sort products correctly', async () => {
  //   await inventoryPage.checkSorting('lohi');
  // })

  it('should redirect to the new tab after the clicking company icon', async () => {
    await inventoryPage.checkTwitterIcon();
    await inventoryPage.checkFacebookIcon();
    await inventoryPage.checkLinkedinIcon();
  })
})

describe('Checkout page', () => {
  beforeEach(async () => {
    await loginPage.open();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  it('should appear success message after checkout', async () => {
    await inventoryPage.addItemToCart('sauce-labs-backpack');
    await inventoryPage.checkItemAddedToCart();
    await checkoutPage.getItemPrice();
    await inventoryPage.checkItemAddedToCartWithCorrectName('sauce-labs-backpack');
    await inventoryPage.clickCheckCheckoutBtn();
    await checkoutPage.checkCheckoutForm();
    await inventoryPage.checkProductListAndCartEmpty();
  })

  it('should appear error message "Cart is empty"', async () => {
    await checkoutPage.checkCheckoutWithoutProducts();
  })
})
