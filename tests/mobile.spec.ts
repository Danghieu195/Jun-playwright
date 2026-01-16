import {test, expect} from "@playwright/test"
import { LoginPage } from "../pages/loginpage"

//Tao cum test case
test.describe("Mobile Login Test", () => {
    test("Test login thanh cong", async ({page}) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 dimensions
        // khoi tao object login page
        const loginPage = new LoginPage(page)

        await loginPage.login("Admin", "admin123")

        await loginPage.isLoginSuccess
    })

    test("Test login that bai", async ({page}) => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 dimensions
        const loginPage = new LoginPage(page)

        await loginPage.login("WrongUser", "WrongPassword")

        await loginPage.isLoginSuccess() === false
    })
})
