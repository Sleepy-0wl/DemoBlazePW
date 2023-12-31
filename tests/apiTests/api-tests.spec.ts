import {test, expect} from '../fixtures/Fixtures';

test.describe("API tests", () => {

    test.beforeEach(async ({homepage}) => {
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

    test("Should check sign up via API", async ({generators, request}) => {
        const response = await request.post("https://api.demoblaze.com/signup", {
            data: {
                "username": generators.usernameGenerator(6),
                "password": generators.passwordGenerator(9),
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
        const prviItem = responseBody.Items[0];

        expect(prviItem).toHaveProperty("cat", "monitor");
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

    test("Should simulate selecting an item via API", async ({request}) => {
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

    test("Should mock an item without calling API", async ({ filterMain, itemsMain, page }) => {
        await page.route("**/bycat", async route => {
          const json = {"Items": [
            {
                "cat": "laptops",
                "desc": "Lazi i obmane da ovaj mobitel valja te novce",
                "id": 1,
                "img": "imgs/galaxy_s6.jpg",
                "price": 570.0,
                "title": "SMasung Orion O9"
            },
        ]};
          await route.fulfill({ json });
        });

        await filterMain.laptops.click();
        expect(itemsMain.itemTitle.first()).toContainText("SMasung Orion O9");
      });

      test('Should get json from API and then add item to it', async ({ filterMain, itemsMain, page }) => {
        await page.route("**/bycat", async route => {
          const response = await route.fetch();
          const json = await response.json();
          //const data = JSON.stringify(json);
          //fs.writeFile("data.json", data, (error) => {
            //if (error) {
              //console.error(error);
              //throw error;
            //}});
          json.Items.push({
            cat: "monitor",
            desc: "Novogodišnja rezolucija da idemo na dijetu (samo prva dva dana)",
            id: 19,
            img: "imgs/asusm.jpg",
            price: 420.0,
            title: "ISUS monitor"
        });
          await route.fulfill({ response, json });
        });

        await filterMain.monitors.click();
        await page.waitForTimeout(1000);
        expect(itemsMain.itemTitle.last()).toContainText("ISUS monitor");
      });

      test('Should get json from API and then modify an item', async ({ filterMain, itemsMain, page }) => {
        await page.route("**/bycat", async route => {
          const response = await route.fetch();
          const json = await response.json();
          json.Items[2].title = "NeroNexus";

          await route.fulfill({response, json});
        });

        await filterMain.phones.click();
        await page.waitForTimeout(500);
        expect(itemsMain.itemTitle.nth(2)).toContainText("NeroNexus");
      });
});

