import {Page, Locator} from '@playwright/test';

export class SignUp {

    readonly page: Page;
    readonly signInLabel: Locator;
    readonly xButton: Locator;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly closeButton: Locator;
    readonly submitButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.signInLabel = page.locator("#signInModalLabel");
        this.xButton = page.locator("#signInModal >> .close");
        this.usernameInput = page.locator("#sign-username");
        this.passwordInput = page.locator("#sign-password");
        this.closeButton = page.getByLabel('Sign up').getByText('Close')
        this.submitButton = page.locator("button").getByText("Sign up");
    }
}