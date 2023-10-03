import {test, expect} from '@playwright/test';
import { Homepage } from '../page-objects/Homepage';
import { NavMenu } from '../page-objects/NavMenu';
import { Generators } from '../helpers/Generators';
import { LogIn } from '../page-objects/Login';

test.describe("Log in testovi", () => {
    test.beforeEach(async ({page}) => {
       let homepage = new Homepage(page);
       await homepage.goToHomepage();
    });

    test("Log in bez usernamea i lozinke", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("Please fill out Username and Password.");            
            await dialog.accept();
          });

        await navMenu.login.click();
        await login.submitButton.click();
    });

    test("Log in", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("Sign up successful.");            
            await dialog.accept();
        });

        await navMenu.login.click();
        await login.usernameInput.fill("SovaTest");
        await login.passwordInput.fill("Tesna22");
        await login.submitButton.click();
    });

    test("Login sa nepostojećim korisnikom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);
        let generatori = new Generators();

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("User does not exist.");            
            await dialog.accept();
        });

        await navMenu.login.click();
        await login.usernameInput.fill(generatori.usernameGenerator(12));
        await login.passwordInput.fill("aassf");
        await login.submitButton.click();
    });

    test("Krivi password", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);
        let generatori = new Generators();

        page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain("Wrong password.");            
            await dialog.accept();
        });

        await navMenu.login.click();
        await login.usernameInput.fill("a");
        await login.passwordInput.fill(generatori.passwordGenerator(9));
        await login.submitButton.click();
    });

    test("Zatvaranje modala close buttonom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);

        await navMenu.login.click();
        await login.closeButton.click();
        await expect(login.logInLabel).not.toBeVisible();
    });

    test("Zatvaranje modala x buttonom", async ({page}) => {
        let navMenu = new NavMenu(page);
        let login = new LogIn(page);

        await navMenu.login.click();
        await login.xButton.click();
        await expect(login.logInLabel).not.toBeVisible();
    });

    
});