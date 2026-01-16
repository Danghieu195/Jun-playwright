import {Page, Locator} from '@playwright/test'
import path, {join} from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// private final By avatarWrapper = By.cssSelector(".orangehrm-edit-employee-image-wrapper");

export class MyInfoPage {
    readonly page: Page;

    // Locator
    readonly avatarWrapper: Locator;
    readonly uploadInput: Locator;
    readonly uploadButton: Locator;

    // Constructor
    constructor(page: Page) {
        this.page = page;
        this.avatarWrapper = page.locator('.orangehrm-edit-employee-image-wrapper');
        this.uploadInput = page.locator("input[type='file']");
        this.uploadButton = page.locator('button.employee-image-action');
    }

    //Handle upload avatar
    async uploadAvatar(): Promise<void> {
        // B1: Click vao avatar wrapper
        await this.avatarWrapper.waitFor({state: 'visible', timeout: 10000});
        await this.avatarWrapper.click();
        await this.page.waitForTimeout(2000);

        //B2: Click vào nút upload
        await this.uploadButton.waitFor({state: 'visible', timeout: 10000})
        await this.uploadButton.click();
        await this.page.waitForTimeout(2000);

        //B3: Chọn hình và upload hình
        await this.uploadInput.waitFor({state: 'attached', timeout: 10000});
        
        const filePath = join(__dirname, "..", "data", "testing-09.png")
        console.log(filePath);
        
        await this.uploadInput.setInputFiles(filePath)
        await this.page.waitForTimeout(5000);
    }
}

