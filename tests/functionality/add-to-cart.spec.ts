import {test, expect} from '../fixtures/Fixtures';


test.describe("Tests for adding items to carts", () => {

    test.beforeEach(async ({homepage}) => {
        await homepage.goToHomepage();
     });

     test("Adding to cart and deletion from it", async ({homepage, navMenu, itemsMain, singleItem, dialogs, cart, page}) => {

        dialogs.handleDialog("");

        // makes sure that at least one item is in the cart
        await homepage.goToHomepage();
        await itemsMain.itemTitle.first().click()
        await singleItem.addToCart.click();        
        await page.waitForEvent("dialog");      

        // deletes all the items from the cart
        await navMenu.cart.click();
        await expect(cart.cartItem.first()).toBeVisible();
        var numberOfItems = await cart.cartItem.count();
        while(numberOfItems != 0){
            await page.getByText("Delete").first().click();
            await page.waitForTimeout(1500);
            numberOfItems = await cart.cartItem.count();
        }

        // adds one more item to the cart
        await homepage.goToHomepage();
        await itemsMain.itemTitle.first().click()
        await singleItem.addToCart.click();        
        await page.waitForEvent("dialog");
        
        // checks if exactly 1 item is added
        await navMenu.cart.click();
        await expect(cart.cartItem).toHaveCount(1);
    });
})

