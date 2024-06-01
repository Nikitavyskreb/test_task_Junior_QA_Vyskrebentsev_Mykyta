/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    open () {
        return browser.url(`https://www.saucedemo.com`)
    }
}
