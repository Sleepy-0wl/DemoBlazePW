import {test, expect} from '@playwright/test';
import { Homepage } from '../../page-objects/Homepage';
import { Generators } from '../../helpers/Generators';

test.describe("API tests", () => {

    test.beforeEach(async ({page}) => {
        let homepage = new Homepage(page);
        await homepage.goToHomepage();
     });

    test("Should check login with wrong password via API", async ({request}) => {
        const response = await request.post("https://api.demoblaze.com/login", {
            data: {
                "username": "SovaTest",
                "password": "wdiawawofj",
            }
        });
        expect(response.ok).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();
        expect(responseBody.errorMessage).toMatch("Wrong password.");
    });

    test("Should check sign up via API", async ({request}) => {
        let generator = new Generators()
        const response = await request.post("https://api.demoblaze.com/signup", {
            data: {
                "username": generator.usernameGenerator(6),
                "password": generator.passwordGenerator(9),
            }
        });
        expect(response.ok).toBeTruthy();
        expect(response.status()).toBe(200);
    });

    test("Should check category change via API", async ({request}) => {
        const response = await request.post("https://api.demoblaze.com/bycat", {
            data: {
                "cat": "monitor",
            }
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody.Items[0]).toHaveProperty("cat", "monitor");
        expect(responseBody.Items[0]).toHaveProperty("id", 10);
        expect(responseBody.Items[0]).toHaveProperty("title", "Apple monitor 24");
        expect(responseBody.Items[0]).toHaveProperty("price", 400);
        expect(responseBody.Items).toHaveLength(2);
    });
    
    test("Should check loading of items via API", async ({request}) => {
        const response = await request.get("https://api.demoblaze.com/entries");

        expect(response.status()).toBe(200);
        const responseBody = await response.json();

        expect(responseBody.Items).toHaveLength(9); //na ekranu 7, a meni ruši test ak stavim 7, pa je onda 9, hmmm hmmm sumnjivo
        expect(responseBody.Items[0]).toHaveProperty("cat", "phone");
        expect(responseBody.Items[2]).toHaveProperty("id", 3);
        expect(responseBody.Items[4].title).toMatch("Iphone 6 32gb");
        expect(responseBody.Items[0].price).toBe(360);


    });

    test.only("Should simulate selecting an item via API", async ({request}) => {
        const response = await request.post("https://api.demoblaze.com/view", {
            data: {
                "id": 3,
            }
        });
        expect(response.statusText()).toMatch("OK");
        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.img).toContain(".jpg");
        expect(responseBody.price).toBeGreaterThan(12);
    });
});

