import {test, expect} from '../fixtures/Fixtures';


test.describe("Tests for adding items to carts", () => {

    test.beforeEach(async ({homepage}) => {
        await homepage.goToHomepage();
     });

    test("Add to cart", async ({navMenu, itemsMain, singleItem, dialogs, cart, page}) => {

        dialogs.handleDialog("");

        await itemsMain.itemTitle.first().click()
        await singleItem.addToCart.click();        
        await page.waitForEvent("dialog");
        
        await navMenu.cart.click();
        await expect(cart.cartItem).toHaveCount(1);
    });
})

