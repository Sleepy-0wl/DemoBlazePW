import {test, expect} from '../fixtures/Fixtures';


test.describe("Snapshot tests", () => {

    test.beforeEach(async ({homepage, page}) => {
        await homepage.goToHomepage();
     });
    
    test('Home page snapshot', async ({ page }) => {
        await expect(page).toHaveScreenshot();
      });

    test('Samsung Galaxy S6 item page snapshot', async ({ itemsMain, page }) => {

        await itemsMain.itemTitle.first().click()
        await expect(page).toHaveScreenshot();
    });

    test('About Us modal snapshot', async ({ navMenu, page }) => {

        await navMenu.aboutUs.click();
        await expect(page.locator("#videoModal")).toHaveScreenshot();
    });

    test('Sign In modal snapshot', async ({ navMenu, page }) => {

        await navMenu.signUp.click();
        await expect(page.locator("#signInModal")).toHaveScreenshot();
    });

    test('Cart snapshot', async ({ navMenu, cart, page }) => {

        await navMenu.cart.click();
        await expect(page.getByRole('button', { name: 'Place Order' })).toHaveText("Place Order");
        await expect(page).toHaveScreenshot();
    });

    test('Logo snapshot', async ({ homepage, page }) => {

        await expect(homepage.logo).toHaveScreenshot();
    });

    test('Log In modal snapshot', async ({ navMenu, page }) => {

        await navMenu.login.click();
        await expect(page.locator("#logInModal")).toHaveScreenshot();
    });

    test('Contact modal snapshot', async ({ navMenu, page }) => {

        await navMenu.contact.click();
        await expect(page.locator("#exampleModal")).toHaveScreenshot();
    });

    test('Categories Menu snapshot', async ({ filterMain, page }) => {

        await expect(filterMain.categoriesGroup).toHaveScreenshot();
    });

    test('Footer snapshot', async ({ page }) => {
        await expect(page.locator("#footc")).toHaveScreenshot();
    });
});

