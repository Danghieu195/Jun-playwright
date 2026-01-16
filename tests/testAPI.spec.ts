import {test, expect} from "@playwright/test"

test.describe("API test - expect", () => {
    test("API get list movie", async({page}) => {
        const response = await page.request.get(
            "https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP01",
            {
                headers: {
                    TokenCybersoft: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJUZXN0aW5nIDA5IiwiSGV0SGFuU3RyaW5nIjoiMTgvMDYvMjAyNiIsIkhldEhhblRpbWUiOiIxNzgxNzQwODAwMDAwIiwibmJmIjoxNzU3NzgyODAwLCJleHAiOjE3ODE4ODg0MDB9.MuNVtl4e_hHS8l24RyveztKVmnTqyPC1nCN_sdQdGKU"
                }
            }

        )

        //verify status code
        expect(response.status()).toBe(200)

        //verify response body
        // convert string data về dạng json
        const responseBody = await response.json()
        console.log(responseBody)

        expect(responseBody).toHaveProperty("statusCode")
        expect(responseBody).toHaveProperty("message")
        expect(responseBody).toHaveProperty("content")
        expect(responseBody).toHaveProperty("statusCode")
        expect(responseBody).toHaveProperty("dateTime")
        expect(responseBody).toHaveProperty("messageConstants")

    })
})