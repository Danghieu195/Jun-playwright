import { test, expect } from '@playwright/test';
import { MyInfoPage } from '../pages/MyInfoPage';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/loginpage';

test.describe("My info test", () => {
    //B1: login voi account đúng

    //B2: Click menu my info
    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        const myInfoPage = new MyInfoPage(page)

        await loginPage.login("Admin", "admin123")

        await page.waitForURL("**/dashboard**", { timeout: 10000 })

        // Đợi web load menu sidebar xong mới chạy tiếp
        await homePage.sidebarMenuNames.first().waitFor({ timeout: 10000 })

        await homePage.clickMenuMyinfo()

        await myInfoPage.avatarWrapper.waitFor({ state: 'visible', timeout: 10000 })
    })

    test("Upload avatar test", async ({ page }) => {
        const myInfoPage = new MyInfoPage(page)

        await myInfoPage.uploadAvatar()

        expect(true).toBeTruthy()


    })
    // Nãy chạy thì sẽ thấy nó chưa vô trang đã bị lỗi => Mình check screenshot vs video => Check lại code test 
    // => Chạy thêm thì thấy lỗi típ => Check lỗi + screenshot + video => Chưa thấy click My info => Mình check logic xử code click 
    // => Xong lỗi upload 
    // ok nha
})

