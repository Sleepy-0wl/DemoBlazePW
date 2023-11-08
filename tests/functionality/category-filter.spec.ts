import {test, expect} from '../fixtures/Fixtures';


test.describe("Categories tests", () => {
    
    test("Change categories", async ({homepage, filterMain, itemsMain}) => {
    
        await homepage.goToHomepage();
        await filterMain.laptops.click();
        await expect(itemsMain.itemCard).toHaveCount(6);
    
        await filterMain.monitors.click();
        await expect(itemsMain.itemCard).toHaveCount(2);
    
        await filterMain.phones.click();
        await expect(itemsMain.itemCard).toHaveCount(7); 
    });
});

