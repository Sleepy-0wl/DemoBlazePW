import {Page, Locator} from '@playwright/test';

export class LogIn {

    readonly page: Page;
    readonly logInLabel: Locator;
    readonly xButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly closeButton: Locator;
    readonly submitButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.logInLabel = page.locator("#logInModalLabel");
        this.xButton = page.locator("#logInModal >> .close");
        this.usernameInput = page.locator("#loginusername");
        this.passwordInput = page.locator("#loginpassword");
        this.closeButton = page.getByLabel('Log in').getByText('Close')
        this.submitButton = page.locator("button").getByText("Log in");
    }
}