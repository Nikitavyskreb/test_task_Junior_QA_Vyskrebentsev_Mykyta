import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

describe('My Login application', () => {
    it('should login with valid credentials', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await LoginPage.btnSubmit.click();
        await LoginPage.checkLogin();
    })

    it('username should enter to the field and password should enter to the field, data is reprresented as dots instead of characters', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await LoginPage.checkUserInput('standard_user', 'secret_sauce')
    })

    it('should appear "Epic sadface: Username is required" alert if username field isnt field', async () => {

        await LoginPage.open()
        await LoginPage.login('', '')
        await LoginPage.btnSubmit.click();
        await LoginPage.checkUsernameAlert();
    })

    it('should appear "Epic sadface: Password is required" alert if password field isnt field', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', '')
        await LoginPage.btnSubmit.click();
        await LoginPage.checkPasswordAlert();
    })

    it('should appear "Epic sadface: Username and password do not match any user in this service" alert if the password field is field with incorrect password', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', 'qwerty')
        await LoginPage.btnSubmit.click();
        await LoginPage.checkWrongPasswordAlert();
    })
})
