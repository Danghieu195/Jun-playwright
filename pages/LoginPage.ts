import{Page, Locator} from '@playwright/test';
import { highlightAndScreenshot } from '../ultils/screenshot';

export class LoginPage{
    // define locators
    readonly page: Page; // page object giup tuong tac voi trang web
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    // readonly homeTitle: Locator // verify login thanh cong
 


    // define funtions: login, validate login
    constructor(page: Page){ // Ham khoi tao
        this.page = page
        this.usernameInput = page.locator('input[name = "username"]')
        this.passwordInput = page.locator('input[name = "password"]')
        this.loginButton = page.locator('button[type = "submit"]')
    }

    async login(username: string, password: string): Promise<void>{
        // viết hàm đợi để load trang
        await this.page.waitForTimeout(3000)

        //B1: navigate vao web page login

        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
        
        //B2: Fill username vao input [username] 
        await this.usernameInput.fill(username)
        await highlightAndScreenshot(this.page, this.usernameInput, "Login Test", "fill_username")

        //B3: Fill password vao input [password]
        await this.passwordInput.fill(password)
        await highlightAndScreenshot(this.page, this.passwordInput, "Login Test", "fill_password")
        //B4: Click vao button [Login]
        await highlightAndScreenshot(this.page, this.loginButton, "Login Test", "click_loginbutton")
        await this.loginButton.click()
    }

    async isLoginSuccess(): Promise<boolean>{
        // Case 1: test URL co chu /dashboard 
        let url = this.page.url()
        return url.includes("dashboard")
    }
}