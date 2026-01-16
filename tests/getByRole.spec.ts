import {test, expect} from "@playwright/test"
import path, { join } from "path"
import { readFileSync } from "fs"
import { fileURLToPath } from 'url'
import { highlightAndScreenshot } from "../ultils/screenshot"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

test.describe("Test getByRole with HTML local", () => {
    // set up load file HTML trước mỗi test case
    test.beforeEach(async ({page}) => {
        //B1: Đọc file HTML từ folder public
        const htmlPath = join(__dirname, "..", "public", "index.html")

        //B2: set file HTML vào page playwright
        const htmlContent = readFileSync(htmlPath, "utf-8") // utf-8: để đọc file dạng text có cả dấu 
        await page.setContent(htmlContent, {waitUntil: "domcontentloaded"})

    })

    // test case 1: button
    test("Test button", async ({page}) =>{
        const submitbtn = page.getByRole('button', {name: 'Submit'})
        await expect(submitbtn).toBeVisible()

        const cancelbtn = page.getByRole('button', {name: 'Cancel'})
        await expect(cancelbtn).toBeVisible()


        await page.waitForTimeout(3000)
    })  

    test("Test input", async ({page}) => {
        const usernameInput = page.getByRole("textbox", {name: "username"})
        await expect (usernameInput).toBeVisible()
        await page.waitForTimeout(3000)
    })

    test("Test dropdown select", async ({page}) => {
        const countrySelect = page.getByRole("combobox", {name: "country"})
        await highlightAndScreenshot(page, countrySelect, "GetByRole Test", "country_select")
        await expect (countrySelect).toBeVisible()

        await countrySelect.selectOption({label: "Vietnam"})
        await expect(countrySelect).toHaveValue("vn")


        await page.waitForTimeout(3000)
    })

    test("Test checkbox", async ({page}) => {
        const agreeCheckbox = page.getByRole("checkbox", {name: "agree"})
        await highlightAndScreenshot(page, agreeCheckbox, "GetByRole Test", "agree_checkbox")
        await expect(agreeCheckbox).toBeVisible()
        await agreeCheckbox.check()
        await expect(agreeCheckbox).toBeChecked()

        await page.waitForTimeout(3000)
    })

    test("Test radio", async({page}) => {
        const maleRadio = page.getByRole("radio", {name: "male"}).first()
        await highlightAndScreenshot(page, maleRadio, "GetByRole Test Radio", "male_radio")
        await expect(maleRadio).toBeVisible()
        await maleRadio.check()
        await expect(maleRadio).toBeChecked()

        await page.waitForTimeout(3000)
    })

    test("Test table", async ({page}) => {
        const table = page.getByRole("table")
        await expect(table).toBeVisible
        
        //kiểm tra data trong table
        const johnRow = table.getByRole("cell", {name: "john Doe"})
        await expect(johnRow).toBeVisible

        //Kiểm tra trong table có bao nhiêu data
        const row = table.getByRole("row")
        let countRow = await row.count
        await expect(countRow).toEqual(4) // 1 header + 3 data

    })

    test("Test link", async ({page}) => {
        const navigation = page.getByRole("navigation")
        await expect(navigation).toBeVisible

        const homeLink = navigation.getByRole("link").filter({hasText: "Home"}).first()
        await expect(homeLink).toBeVisible
    })

})