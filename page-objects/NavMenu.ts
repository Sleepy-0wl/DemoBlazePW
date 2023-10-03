import {Page, Locator} from '@playwright/test';

export class NavMenu {

    readonly page: Page;
    readonly home: Locator;
    readonly contact: Locator;
    readonly aboutUs: Locator;
    readonly cart: Locator;
    readonly login: Locator;
    readonly logout: Locator;
    readonly signUp: Locator;
    readonly nameOfUser: Locator;

    constructor(page: Page){
        this.page = page;
        this.home = page.locator(".nav-item").getByText("Home");
        this.contact = page.locator(".nav-item").getByText("Contact");
        this.aboutUs = page.locator(".nav-item").getByText("About us");
        this.cart = page.locator("#cartur");
        this.login = page.locator("#login2");
        this.logout = page.locator("#logout2");
        this.signUp = page.locator("#signin2");
        this.nameOfUser = page.locator("#nameofuser");
    }
}