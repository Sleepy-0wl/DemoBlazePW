import {test, expect} from '@playwright/test';
import { Homepage } from '../page-objects/Homepage';
import { NavMenu } from '../page-objects/NavMenu';
import { LogIn } from '../page-objects/Login';

test("Log out", async ({page}) => {
    let homepage = new Homepage(page);
    let navMenu = new NavMenu(page);
    let login = new LogIn(page);

    await homepage.goToHomepage();

    await navMenu.login.click();
    await login.usernameInput.fill("SovaTest");
    await login.passwordInput.fill("Testna22");
    await login.submitButton.click();

    await expect(navMenu.nameOfUser).toBeVisible();
    await navMenu.logout.click();
    await expect(navMenu.nameOfUser).not.toBeVisible();
});