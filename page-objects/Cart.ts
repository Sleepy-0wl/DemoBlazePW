import {Page, Locator} from '@playwright/test';

export class Cart {

    readonly page: Page;
    readonly cartItem: Locator;

    constructor(page: Page){
        this.page = page;
        this.cartItem = page.locator(".success");
    }
}