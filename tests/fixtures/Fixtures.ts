import { test as base } from '@playwright/test';
import { Cart } from '../../page-objects/Cart';
import { FilterMain } from '../../page-objects/FilterMain';
import { Homepage } from '../../page-objects/Homepage';
import { ItemsMain } from '../../page-objects/ItemsMain';
import { LogIn } from '../../page-objects/Login';
import { NavMenu } from '../../page-objects/NavMenu';
import { SignUp } from '../../page-objects/SignUp';
import { SingleItem } from '../../page-objects/SingleItem';
import { Dialogs } from '../../helpers/Dialogs';
import { Generators } from '../../helpers/Generators';



type MyFixtures = {
    cart: Cart;
    filterMain: FilterMain;
    homepage: Homepage;
    itemsMain: ItemsMain;
    login: LogIn;
    navMenu: NavMenu;
    signUp: SignUp;
    singleItem: SingleItem;
    dialogs: Dialogs;
    generators: Generators;
  };

  export const test = base.extend<MyFixtures>({
    cart: async ({page}, use) => {
        await use(new Cart(page));
    },
    filterMain: async ({page}, use) => {
        await use(new FilterMain(page));
    },
    homepage: async ({page}, use) => {
        await use(new Homepage(page));
    },
    itemsMain: async ({page}, use) => {
        await use(new ItemsMain(page));
    },
    login: async ({page}, use) => {
        await use(new LogIn(page));
    },
    navMenu: async ({page}, use) => {
        await use(new NavMenu(page));
    },
    signUp: async ({page}, use) => {
        await use(new SignUp(page));
    },
    singleItem: async ({page}, use) => {
        await use(new SingleItem(page));
    },
    dialogs: async ({page}, use) => {
        await use(new Dialogs(page));
    },
    generators: async ({page}, use) => {
        await use(new Generators());
    },
  });
  export { expect } from '@playwright/test';

