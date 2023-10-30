import { chromium } from "playwright";
import fs from "fs/promises";
import { ImageAnnotatorClient } from "@google-cloud/vision";
import ExcelJS from "exceljs";

const keyFilePath = "./KRA/keys.json";
const excelFilePath = "./KRA/passwords_clients.xlsx";
const imagePath = "./KRA/ocr.png";

const client = new ImageAnnotatorClient({
  keyFilename: keyFilePath
});

const readExcelData = async (excelFilePath, sheetName) => {
  try {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(excelFilePath);

    const worksheet = workbook.getWorksheet(sheetName || 1);

    const data = [];
    for (let i = 2; i <= worksheet.rowCount; i++) {
      const row = worksheet.getRow(i);
      const id = row.getCell(1).value;
      const password = row.getCell(2).value;
      data.push({ id, password, row });
    }

    return data;
  } catch (error) {
    throw new Error(`Error reading Excel file: ${error.message}`);
  }
};

const checkPassword = async (id, password, row) => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto("https://itax.kra.go.ke/KRA-Portal/");
    await page.waitForNavigation();

    await page.type("#logid", id);
    await page.click(".btn");
    await page.type("#xxZTT9p2wQ", password);

    const image = await page.waitForSelector("#captcha_img");

    await image.screenshot({
      path: imagePath
    });

    const imageContent = await fs.readFile(imagePath);
    const imageBase64 = imageContent.toString("base64");

    const [documentAnnotateResult] = await client.annotateImage({
      image: {
        content: imageBase64
      },
      features: [
        {
          type: "DOCUMENT_TEXT_DETECTION"
        }
      ]
    });

    const text = await documentAnnotateResult.fullTextAnnotation.text;

    const numbers = text.match(/\d+/g);

    if (!numbers || numbers.length < 2) {
      throw new Error("Unable to extract valid numbers from the text.");
    }

    let result;
    if (text.includes("+")) {
      result = Number(numbers[0]) + Number(numbers[1]);
    } else if (text.includes("-")) {
      result = Number(numbers[0]) - Number(numbers[1]);
    } else {
      throw new Error("Unsupported operator.");
    }

    await page.type("#captcahText", result.toString());
    await page.click("#loginButton");

    let status;

    try {
      await page.waitForSelector(".hm_top_315", { timeout: 5000 });
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

    row.getCell(3).value = status; // Assuming the Status column is in the 3rd column (index 3)

    const cell = row.getCell(3);
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
    row.getCell(3).value = "Error"; // Assuming the Status column is in the 3rd column (index 3)
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
