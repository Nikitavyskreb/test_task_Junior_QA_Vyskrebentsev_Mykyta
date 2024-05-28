import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class LoginPage extends Page {
    /**
     * define selectors using getter methods
     */
    get inputUsername () {
        return $('input[data-test="username"]');
    }

    get inputPassword () {
        return $('input[data-test="password"]');
    }

    get btnSubmit () {
        return $('input[data-test="login-button"]');
    }

    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    async login (username, password) {
  
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
    }

    async checkLogin () {
  
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toBe('https://www.saucedemo.com/inventory.html');
    }

    async checkUserInput (username) {

      const inputUsername = await $('input[data-test="username"]');
      const value1 = await inputUsername.getValue();

      expect(value1).toBe(username);

      const inputPassword = await $('input[data-test="password"]');
      const value2 = await inputPassword.getValue();
      const type = await inputPassword.getAttribute('type');

      expect(type).toBe('password');
  }

    async checkUsernameAlert () {

      const alertElement = await $('*[data-test="error"]');
      const alertText = await alertElement.getText();
      console.log(alertText);

      expect(alertText).toBe('Epic sadface: Username is required');
  }

    async checkPasswordAlert () {

      const alertElement = await $('*[data-test="error"]');
      const alertText = await alertElement.getText();
      console.log(alertText);

      expect(alertText).toBe('Epic sadface: Password is required');
  }

    async checkWrongPasswordAlert () {

      const alertElement = await $('*[data-test="error"]');
      const alertText = await alertElement.getText();
      console.log(alertText);

      expect(alertText).toBe('Epic sadface: Username and password do not match any user in this service');
  }
}

export default new LoginPage();
