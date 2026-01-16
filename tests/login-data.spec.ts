import {expect, test} from '@playwright/test'
import { LoginData, readFileFromCsv } from '../ultils/csvReader'
import { LoginPage } from '../pages/loginpage'

// đọc file csv 
const testData: LoginData[] = readFileFromCsv()
console.log(`Da load ${testData.length} tu file csv`)

test.describe("Login data from csv file", () => {
    for(let data of testData){
        test(`${data.description}`, async ({page}) => {
            const loginPage = new LoginPage(page)
            await loginPage.login(data.username, data.password)

            const isLoginSuccess = await loginPage.isLoginSuccess
            if(data.expected_result === "success") {
                expect(await loginPage.isLoginSuccess).toBeTruthy
            } else {
                expect(await loginPage.isLoginSuccess).toBeFalsy
            }
        })
    }
})