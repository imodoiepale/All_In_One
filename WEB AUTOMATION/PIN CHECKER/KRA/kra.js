import puppeteer from "puppeteer";
import fs from "fs/promises";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const keyFilePath = "./KRA/keys.json"; // Update with the correct path to your key file

const keyFileContent = await fs.readFile(keyFilePath);

const client = new ImageAnnotatorClient({
  keyFilename: keyFilePath // Provide the path to the key file, not its content
});

const id = "A016388740B";
const password = "bclitax2023";
const imagePath = "./KRA/ocr.png";

const checkPassword = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate to a website with a password input field
  await page.goto("https://itax.kra.go.ke/KRA-Portal/");
  await page.waitForNavigation();

  // Type the password into the input field
  await page.type("#logid", id, { delay: 100 });
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

  // Extract the numbers from the equation
  const numbers = await text.match(/\d+/g);
  

  // Calculate the result of the equation
  let result;
  if (text.includes("+")) {
    result = Number(numbers[0]) + Number(numbers[1]);
  } else if (text.includes("-")) {
    result = Number(numbers[0]) - Number(numbers[1]);
  } else {
    // Unsupported operator
    throw new Error("Unsupported operator.");
  }

  await page.type("#captcahText", result.toString());
  
  await page.click("#loginButton");
  

  await page.waitForNavigation();


  if (await page.waitForSelector(".hm_top_315")) {
    await console.log('Valid')
  } else if( await page.waitForSelector('#layer1 > div > table > tbody > tr:nth-child(1) > td:nth-child(1)')) {
    await console.log('Invalid')
  } else if (await page.waitForSelector('#normalDiv > table:nth-child(1) > tbody > tr > td > font > b')) {
    await console.log('Wrong Arithmetic')
  }

  await browser.close();
};

checkPassword();
