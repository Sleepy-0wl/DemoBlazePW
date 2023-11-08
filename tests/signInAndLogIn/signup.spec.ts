import {test, expect} from '../fixtures/Fixtures';


test.describe("Sign up testovi", () => {
    test.beforeEach(async ({homepage}) => {
       await homepage.goToHomepage();
    });
    test.use({ storageState: { cookies: [], origins: [] } });

    test("Registracija bez usernamea i lozinke", async ({navMenu, signUp, dialogs}) => {

        dialogs.handleDialog("Please fill out Username and Password.");

        await navMenu.signUp.click();
        await signUp.submitButton.click();
    });

    test("Registracija", async ({navMenu, signUp, generators, dialogs, page}) => {

        dialogs.handleDialog("Sign up successful.");
        
        await navMenu.signUp.click();
        await signUp.usernameInput.fill(generators.usernameGenerator(8));
        await signUp.passwordInput.fill(generators.passwordGenerator(10));
        await signUp.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Registracija sa već iskorištenim imenom", async ({navMenu, signUp, dialogs, page}) => {

        dialogs.handleDialog("This user already exist.");

        await navMenu.signUp.click();
        await signUp.usernameInput.fill("a");
        await signUp.passwordInput.fill("a");
        await signUp.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Zatvaranje modala close buttonom", async ({navMenu, signUp}) => {

        await navMenu.signUp.click();
        await signUp.closeButton.click();
        await expect(signUp.signInLabel).not.toBeVisible();
    });

    test("Zatvaranje modala x buttonom", async ({navMenu, signUp}) => {
      
        await navMenu.signUp.click();
        await signUp.xButton.click();
        await expect(signUp.signInLabel).not.toBeVisible();
    });
});