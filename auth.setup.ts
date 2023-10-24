import { test as setup, expect } from '@playwright/test';
import { Homepage } from './page-objects/Homepage';
import { NavMenu } from './page-objects/NavMenu';
import { LogIn } from './page-objects/Login';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
    let homepage = new Homepage(page);
    let navMenu = new NavMenu(page);
    let login = new LogIn(page);

    await homepage.goToHomepage();
    await navMenu.login.click();
    await login.usernameInput.fill("SovaTest");
    await login.passwordInput.fill("Testna22");
    await login.submitButton.click();

    await page.waitForSelector("#nameofuser")

    await page.context().storageState({ path: authFile });
});