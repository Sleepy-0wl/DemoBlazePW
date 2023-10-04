import {Page, Locator} from '@playwright/test';

export class ItemsMain {

    readonly page: Page;
    readonly allItems: Locator;
    readonly itemCard: Locator;
    readonly itemImg: Locator;
    readonly itemTitle: Locator;
    readonly itemPrice: Locator;
    readonly itemDescription: Locator;

    constructor(page: Page){
        this.page = page;
        this.allItems = page.locator("#tbodyid");
        this.itemCard = page.locator(".card");
        this.itemImg = page.locator(".card-img-top");
        this.itemTitle = page.locator(".card-title");
        this.itemPrice = page.locator(".card >> h5");
        this.itemDescription = page.locator(".card-text");
    }
}