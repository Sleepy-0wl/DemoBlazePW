import {test, expect} from '@playwright/test';
import { Homepage } from '../../page-objects/Homepage';
import { ItemsMain } from '../../page-objects/ItemsMain';
import { FilterMain } from '../../page-objects/FilterMain';

test.describe("Categories tests", () => {
    
    test("Change categories", async ({page}) => {
        let homepage = new Homepage(page);
        let filterMain = new FilterMain(page);
        let itemsMain = new ItemsMain(page);
    
        await homepage.goToHomepage();
        await filterMain.laptops.click();
        await expect(itemsMain.itemCard).toHaveCount(6);
    
        await filterMain.monitors.click();
        await expect(itemsMain.itemCard).toHaveCount(2);
    
        await filterMain.phones.click();
        await expect(itemsMain.itemCard).toHaveCount(7); 
    });
});

