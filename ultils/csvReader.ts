// để đọc file và xử lý file cần import các lib sau: 
// fs/promises -> có sẵn
// path -> tìm đường dẫn tuyệt đối
// csv-parse -> cần phân tích file csv

import {readFile} from 'fs/promises'
import {join} from 'path'
import {parse} from 'csv-parse/sync'
import { readFileSync } from 'fs'

//định nghĩa dữ liệu có trong file csv
export interface LoginData {
    username: string
    password: string
    expected_result: string
    description: string
}

export const readFileFromCsv = (): LoginData[] => {
    //B1: Xác định đường dẫn tuyệt đối đến file csv
    // __dirname: xác định path của file hiện tại 
    const csvPath = join(__dirname, '..', 'data', 'login-data.csv')

    //B2: Đọc file csv
    const fileContent =  readFileSync(csvPath)

    //B3: Parse data string => list LoginData
    const data = parse(fileContent, {
        columns: true, // Lấy dòng đầu tiên làm header, làm key
        skip_empty_lines: true, // Bỏ qua những line data bị trống
        trim: true // Bỏ khoảng trắng thừa
    }) as LoginData[];

    return data
}