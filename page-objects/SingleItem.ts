import {Page, Locator} from '@playwright/test';

export class SingleItem {

    readonly page: Page;
    readonly itemImage: Locator;
    readonly itemTitle: Locator;
    readonly itemPrice: Locator;
    readonly itemDescription: Locator;
    readonly addToCart: Locator;

    constructor(page: Page){
        this.page = page;
        this.itemImage = page.locator("#imgp >> img");
        this.itemTitle = page.locator(".name");
        this.itemPrice = page.locator(".price-container");
        this.itemDescription = page.locator(".description");
        this.addToCart = page.locator(".btn").getByText("Add to cart");
    }
}