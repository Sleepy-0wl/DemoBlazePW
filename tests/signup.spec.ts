import {test, expect} from '@playwright/test';
import { Homepage } from '../page-objects/Homepage';
import { NavMenu } from '../page-objects/NavMenu';
import { SignUp } from '../page-objects/SignUp';
import { Generators } from '../helpers/Generators';
import { Dialogs } from '../helpers/Dialogs';

test.describe("Sign up testovi", () => {
    test.beforeEach(async ({page}) => {
       let homepage = new Homepage(page);
       await homepage.goToHomepage();
    });

    test("Registracija bez usernamea i lozinke", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);
        let dialogs = new Dialogs(page);

        dialogs.handleDialog("Please fill out Username and Password.");

        await navMenu.signUp.click();
        await signUp.submitButton.click();
    });

    test("Registracija", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);
        let generatori = new Generators();
        let dialogs = new Dialogs(page);

        dialogs.handleDialog("Sign up successful.");
        
        await navMenu.signUp.click();
        await signUp.usernameInput.fill(generatori.usernameGenerator(8));
        await signUp.passwordInput.fill(generatori.passwordGenerator(10));
        await signUp.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Registracija sa već iskorištenim imenom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);
        let dialogs = new Dialogs(page);

        dialogs.handleDialog("This user already exist.");

        await navMenu.signUp.click();
        await signUp.usernameInput.fill("a");
        await signUp.passwordInput.fill("a");
        await signUp.submitButton.click();
        await page.waitForEvent("dialog");
    });

    test("Zatvaranje modala close buttonom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);

        await navMenu.signUp.click();
        await signUp.closeButton.click();
        await expect(signUp.signInLabel).not.toBeVisible();
    });

    test("Zatvaranje modala x buttonom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);

        await navMenu.signUp.click();
        await signUp.xButton.click();
        await expect(signUp.signInLabel).not.toBeVisible();
    });
});