import LoginPage from '../pageobjects/login.page.js'

describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'secret_sauce')
    await LoginPage.checkLogin();
  })

    it('username should enter to the field and the password should be hidden under the mask', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')
        await LoginPage.checkUserInput('standard_user', 'secret_sauce')
    })

  it('should appear "Epic sadface: Username is required" alert if username field isnt field', async () => {
    await LoginPage.open()
    await LoginPage.login('', '')
    await LoginPage.checkUsernameAlert();
  })

  it('should appear "Epic sadface: Password is required" alert if password field isnt field', async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', '')
    await LoginPage.checkPasswordAlert();
  })

  it('should appear "Epic sadface: Username and password do not match any user in this service" alert if the password field is field with incorrect password', async () => {
    await LoginPage.open()
    await LoginPage.login('standard_user', 'qwerty')
    await LoginPage.checkWrongPasswordAlert();
  })
})

