import {test, expect} from '@playwright/test';
import { Homepage } from '../../page-objects/Homepage';
import { ItemsMain } from '../../page-objects/ItemsMain';
import { NavMenu } from '../../page-objects/NavMenu';
import { SingleItem } from '../../page-objects/SingleItem';
import { Dialogs } from '../../helpers/Dialogs';
import { Cart } from '../../page-objects/Cart';

test.describe("Tests for adding items to carts", () => {

    test.beforeEach(async ({page}) => {
        let homepage = new Homepage(page);
        await homepage.goToHomepage();
     });

    test("Add to cart", async ({page}) => {
        let navMenu = new NavMenu(page);
        let itemsMain = new ItemsMain(page);
        let singleItem = new SingleItem(page);
        let dialogs = new Dialogs(page);
        let cart = new Cart(page);

        dialogs.handleDialog("");

        await itemsMain.itemTitle.first().click()
        await singleItem.addToCart.click();        
        await page.waitForEvent("dialog");
        
        await navMenu.cart.click();
        await expect(cart.cartItem).toHaveCount(1);
    });
})

