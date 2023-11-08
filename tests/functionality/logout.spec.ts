import {test, expect} from '../fixtures/Fixtures';

test.describe("Log out tests", () => {
    
    test("Log out", async ({homepage, navMenu, login, page}) => {
    
        await homepage.goToHomepage();
    
        //await navMenu.login.click();
        //await login.usernameInput.fill("SovaTest");
        //await login.passwordInput.fill("Testna22");
       // await login.submitButton.click();
    
        //await expect(navMenu.nameOfUser).toBeVisible();
        await navMenu.logout.click();
        await expect(navMenu.nameOfUser).not.toBeVisible();
    });
});

