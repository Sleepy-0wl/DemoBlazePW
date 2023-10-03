import {test, expect} from '@playwright/test';
import { Homepage } from '../page-objects/Homepage';
import { NavMenu } from '../page-objects/NavMenu';
import { SignUp } from '../page-objects/SignUp';
import { Generators } from '../helpers/Generators';

test.describe("Sign up testovi", () => {
    test.beforeEach(async ({page}) => {
       let homepage = new Homepage(page);
       await homepage.goToHomepage();
    });

    test("Registracija bez usernamea i lozinke", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("Please fill out Username and Password.");            
            await dialog.accept();
          });

        await navMenu.signUp.click();
        await signUp.submitButton.click();
    });

    test("Registracija", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);
        let generatori = new Generators();

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("Sign up successful.");            
            await dialog.accept();
        });

        await navMenu.signUp.click();
        await signUp.usernameInput.fill(generatori.usernameGenerator(8));
        await signUp.passwordInput.fill(generatori.passwordGenerator(10));
        await signUp.submitButton.click();
    });

    test("Registracija sa već iskorištenim imenom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let signUp = new SignUp(page);

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("This user already exists.");            
            await dialog.accept();
        });

        await navMenu.signUp.click();
        await signUp.usernameInput.fill("a");
        await signUp.passwordInput.fill("a");
        await signUp.submitButton.click();
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