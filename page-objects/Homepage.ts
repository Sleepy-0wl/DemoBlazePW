import {Page, Locator} from '@playwright/test';

export class Homepage {

    readonly page: Page;
    readonly logo: Locator;

    constructor(page: Page){
        this.page = page;
        this.logo = page.locator("#nava");
        
    }

    async goToHomepage(){
        await this.page.goto("https://www.demoblaze.com/", {waitUntil: "load"});
    }
}