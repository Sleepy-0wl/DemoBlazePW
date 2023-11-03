import {test, expect} from '@playwright/test';
import { Homepage } from '../../page-objects/Homepage';
import { NavMenu } from '../../page-objects/NavMenu';
import { ItemsMain } from '../../page-objects/ItemsMain';
import { FilterMain } from '../../page-objects/FilterMain';

test.describe("Snapshot tests", () => {

    test.beforeEach(async ({page}) => {
        let homepage = new Homepage(page);
        await homepage.goToHomepage();
     });
    
    test('Home page snapshot', async ({ page }) => {
        await expect(page).toHaveScreenshot();
      });

    test('Samsung Galaxy S6 item page snapshot', async ({ page }) => {
        let itemsMain = new ItemsMain(page);

        await itemsMain.itemTitle.first().click()
        await expect(page).toHaveScreenshot();
    });

    test('About Us modal snapshot', async ({ page }) => {
        let navMenu = new NavMenu(page);

        await navMenu.aboutUs.click();
        await expect(page.locator("#videoModal")).toHaveScreenshot();
    });

    test('Sign In modal snapshot', async ({ page }) => {
        let navMenu = new NavMenu(page);

        await navMenu.signUp.click();
        await expect(page.locator("#signInModal")).toHaveScreenshot();
    });

    test('Cart snapshot', async ({ page }) => {
        let navMenu = new NavMenu(page);

        await navMenu.cart.click();
        await expect(page).toHaveScreenshot();
    });

    test('Logo snapshot', async ({ page }) => {
        let homepage = new Homepage(page);

        await expect(homepage.logo).toHaveScreenshot();
    });

    test('Log In modal snapshot', async ({ page }) => {
        let navMenu = new NavMenu(page);

        await navMenu.login.click();
        await expect(page.locator("#logInModal")).toHaveScreenshot();
    });

    test('Contact modal snapshot', async ({ page }) => {
        let navMenu = new NavMenu(page);

        await navMenu.contact.click();
        await expect(page.locator("#exampleModal")).toHaveScreenshot();
    });

    test('Categories Menu snapshot', async ({ page }) => {
        let filterMain = new FilterMain(page);

        await expect(filterMain.categoriesGroup).toHaveScreenshot();
    });

    test('Footer snapshot', async ({ page }) => {
        await expect(page.locator("#footc")).toHaveScreenshot();
    });

    test('Footer snapshot 2', async ({ page }) => {
        await expect(page.locator("#footc")).toHaveScreenshot();
    });

    test('Footer snapshot 3', async ({ page }) => {
        await expect(page.locator("#footc")).toHaveScreenshot();
    });
});

