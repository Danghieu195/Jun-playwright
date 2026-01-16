//B1: Highlight element trên trang web 
//B2: Chụp màn hình và lưu vào file

import { Locator, Page } from "@playwright/test";
import path, { join } from "path";
import { mkdirSync } from "fs";
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// nhận các tham số
//param1: page -> object page của playwright
//param2: locator -> object locator của playwright
//param3: testName -> để đặt folder lưu hình của highlight
//param4: stepName -> để đặt tên file cho hình chụp

export async function highlightAndScreenshot(
    page: Page,
    locartor: Locator,
    testName: string,
    stepName: string
): Promise<void>{

    //B1: Tạo tên folder
        const folderName = testName.toLowerCase();

    //B2: Tạo đường dẫn để lưu folder
    //__dirname: lấy đường dẫn hiện tại của file 
    //../ : quay lên 1 cấp thư mục 
    const screenshotDir = join(__dirname, "..", "screenshot", folderName)
    
    //B3: Tạo folder
    mkdirSync(screenshotDir, {recursive: true});

    //B4: Highlight elmement
    await locartor.evaluate((el) => {
        // thêm style để hightlight : viền đỏ
        (el as HTMLElement).style.border = "4px solid red",
         
        // màu nền vàng
        (el as HTMLElement).style.backgroundColor = "yellow"
    })

    await page.waitForTimeout(1000); // chờ 1s để thấy rõ phần highlight

    //B5: chụp ảnh màn hình và lưu vào folder
    const filePath = join(screenshotDir, `${stepName}.png`);
    await page.screenshot({path: filePath})
}
