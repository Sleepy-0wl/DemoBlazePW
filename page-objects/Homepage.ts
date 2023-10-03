import {Page, Locator} from '@playwright/test';

export class Homepage {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async goToHomepage(){
        await this.page.goto("https://www.demoblaze.com/", {waitUntil: "load"});
    }
}