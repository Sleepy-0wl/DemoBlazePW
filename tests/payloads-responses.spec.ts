import {test, expect} from '@playwright/test';
import { Homepage } from '../page-objects/Homepage';
import { NavMenu } from '../page-objects/NavMenu';
import { LogIn } from '../page-objects/Login';
import { Generators } from '../helpers/Generators';
import { Dialogs } from '../helpers/Dialogs';
import { FilterMain } from '../page-objects/FilterMain';

test.describe("Playing with payloads and respones", () => {

    test.beforeEach(async ({page}) => {
        let homepage = new Homepage(page);
        await homepage.goToHomepage();
     });
    
     test("Playing 1", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);
        let generatori = new Generators();
        let dialogs = new Dialogs(page);

        await page.route("https://api.demoblaze.com/login", async (route) => 
        {
            const response = await route.fetch();
            const json = await response.json();
            json.errorMessage = 'Foo';
            await route.fulfill({ response, json });
          }
        );

        dialogs.handleDialog("Wrong password.");

        await navMenu.login.click();
        await login.usernameInput.fill("a");
        await login.passwordInput.fill(generatori.passwordGenerator(9));
        await login.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Playing 2", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);
        let generatori = new Generators();
        let dialogs = new Dialogs(page);

        await page.route("https://api.demoblaze.com/login", async (route) => route.abort()
        );

        await navMenu.login.click();
        await login.usernameInput.fill("SovaTest");
        await login.passwordInput.fill("Testna22");
        await login.submitButton.click();

        await expect(navMenu.nameOfUser).not.toBeVisible();
    });

    test.only("Test the payload of Phones", async ({page}) => {
        let filterMain = new FilterMain(page);

        page.on('request', (request) => {
            if (request.url().includes('https://api.demoblaze.com/bycat')) {
              expect(request.postDataJSON()).toEqual({
                "cat": "phone",
            });
            }
          });

        await filterMain.phones.click();

        
    });
});

