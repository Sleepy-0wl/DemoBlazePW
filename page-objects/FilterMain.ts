import {Page, Locator} from '@playwright/test';

export class FilterMain {

    readonly page: Page;
    readonly phones: Locator;
    readonly laptops: Locator;
    readonly monitors: Locator;
    readonly categoriesGroup: Locator;

    constructor(page: Page){
        this.page = page;
        this.phones = page.locator("#itemc").getByText("Phones");
        this.laptops = page.locator("#itemc").getByText("Laptops");
        this.monitors = page.locator("#itemc").getByText("Monitors");
        this.categoriesGroup = page.locator("#cat");
    }
}