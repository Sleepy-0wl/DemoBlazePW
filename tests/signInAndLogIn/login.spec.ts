import {test, expect} from '../fixtures/Fixtures';


test.describe("Log in testovi", () => {
    test.beforeEach(async ({homepage}) => {
       await homepage.goToHomepage();
    });
    test.use({ storageState: { cookies: [], origins: [] } });

    test("Log in bez usernamea i lozinke", async ({navMenu, login, dialogs}) => {

        dialogs.handleDialog("Please fill out Username and Password.");

        await navMenu.login.click();
        await login.submitButton.click();
    });

    test("Log in", async ({navMenu, login}) => {

        await navMenu.login.click();
        await login.usernameInput.fill("SovaTest");
        await login.passwordInput.fill("Testna22");
        await login.submitButton.click();

        await expect(navMenu.nameOfUser).toBeVisible();
    });

    test("Login sa nepostojećim korisnikom", async ({navMenu, login, generators, dialogs, page}) => {

        dialogs.handleDialog("User does not exist.");

        await navMenu.login.click();
        await login.usernameInput.fill(generators.usernameGenerator(12));
        await login.passwordInput.fill("aassf");
        await login.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Krivi password", async ({navMenu, login, generators, dialogs, page}) => {

        dialogs.handleDialog("Wrong password.");

        await navMenu.login.click();
        await login.usernameInput.fill("a");
        await login.passwordInput.fill(generators.passwordGenerator(9));
        await login.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Zatvaranje modala close buttonom", async ({navMenu, login}) => {

        await navMenu.login.click();
        await login.closeButton.click();
        await expect(login.logInLabel).not.toBeVisible();
    });

    test("Zatvaranje modala x buttonom", async ({navMenu, login}) => {

        await navMenu.login.click();
        await login.xButton.click();
        await expect(login.logInLabel).not.toBeVisible();
    });


});