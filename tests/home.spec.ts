import{test, expect} from '@playwright/test'
import { LoginPage } from '../pages/loginpage'
import { HomePage } from '../pages/HomePage'

test.describe('Home page test', () => {
    // Set up môi trường
    //B1: Login với account  
    //B2: Goto home page 

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page)
        const homePage = new HomePage(page)
        
        await loginPage.login("Admin", "admin123")

        //Đợi đến khi trang home xuất hiện => URL có chưa /dashboard
        await page.waitForURL("**/dashboard**", {timeout:10000})

        // Đợi đến khi menu items xuất hiện
        await homePage.sidebarMenuNames.first().waitFor({ })

    })

    test("Verify các menu có đầy đủ trong sidebar không", async ({page}) => {
        const homePage = new HomePage(page)
        const menuItems = await homePage.getSidebarMenuItems()
        
        //Kiểm tra các menu item
        //Case 1: Số lượng menu item > 0
        expect(menuItems.length).toBeGreaterThan(0)

        // Case 2 : Kiểm tra các menu item có đúng giá trị mong muốn
        expect(menuItems).toContain("Admin")

        //Case 3: Kiểm tra menu items có đầy đủ giá trị mong muốn không
    })
})