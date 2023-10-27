import puppeteer from "puppeteer";
import ExcelJS from "exceljs";

const excelFilePath = "./ECITIZEN/E CITIZEN ID PASSWORD.xlsx";

const readExcelData = async (excelFilePath, sheetName) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);

    const worksheet = workbook.getWorksheet(sheetName || 1);

    const data = [];
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const id = row.getCell(3).value;
      const password = row.getCell(4).value;
      data.push({ id, password, row });
    }

    return data;
  } catch (error) {
    throw new Error(`Error reading Excel file: ${error.message}`);
  }
};

const checkPassword = async (id, password, row) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://accounts.ecitizen.go.ke/en/login");
    await page.waitForNavigation();

    await page.type("#login_username", id);

    await page.type("#login_pwd", password);
    await page.click("#login > div > div:nth-child(5) > button");

    await page.waitForNavigation();

    let status;

    try {
      await page.waitForSelector("text=ID Number");
      status = "Valid";
      console.log(`Client: ${id}\tPassword: ${password}\tStatus: ${status}`);
    } catch (error) {
      if (error.name === "TimeoutError") {
        status = "Invalid";
        console.log(`Client: ${id}\tPassword: ${password}\tStatus: ${status}`);
      } else {
        throw error; // Re-throw other errors
      }
    }

    row.getCell(5).value = status; // Assuming the Status column is in the 3rd column (index 3)

    const cell = row.getCell();
    if (status === "Valid") {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "00FF00" } // Green color
      };
    } else {
      cell.style = { fill: { type: "pattern", pattern: "solid", fgColor: { argb: "FF0000" } } };
    }
  } catch (error) {
    console.error(`Error processing row for ClientID ${id}: ${error.message}`);
    // Update Excel file with an error status
    row.getCell(5).value = "Error"; // Assuming the Status column is in the 3rd column (index 3)
  } finally {
    await browser.close();
  }
};

const main = async () => {
  try {
    const sheetName = "Sheet1";
    const data = await readExcelData(excelFilePath, sheetName);

    for (const { id, password, row } of data) {
      await checkPassword(id, password, row);

      // Save the modified workbook after each iteration
      const workbook = row.worksheet.workbook;
      await workbook.xlsx.writeFile(excelFilePath);
    }
  } catch (error) {
    console.error("Error reading Excel file or processing data:", error.message);
  }
};

main();
