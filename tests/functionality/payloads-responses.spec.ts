import {test, expect} from '../fixtures/Fixtures';

test.describe("Playing with payloads and respones", () => {

    test.beforeEach(async ({homepage}) => {
        await homepage.goToHomepage();
     });
    
     test.skip("Playing 1", async ({navMenu, login, generators, dialogs, page}) => {

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
        await login.passwordInput.fill(generators.passwordGenerator(9));
        await login.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test.skip("Playing 2", async ({navMenu, login, generators, dialogs, page}) => {

        await page.route("https://api.demoblaze.com/login", async (route) => route.abort()
        );

        await navMenu.login.click();
        await login.usernameInput.fill("SovaTest");
        await login.passwordInput.fill("Testna22");
        await login.submitButton.click();

        await expect(navMenu.nameOfUser).not.toBeVisible();
    });

    test("Test the payload of Phones", async ({filterMain, page}) => {

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

