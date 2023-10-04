import {Page, expect} from '@playwright/test';

export class Dialogs{

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
    }

    handleDialog(message: string){
        this.page.on('dialog', async dialog => {
            expect(dialog.type()).toContain('alert');
            expect(dialog.message()).toContain(message);            
            await dialog.accept();
        });
    }
}