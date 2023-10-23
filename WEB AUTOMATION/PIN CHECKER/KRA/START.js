import puppeteer from "puppeteer";
import fs from "fs/promises";
import { ImageAnnotatorClient } from "@google-cloud/vision";

const keyFilePath = './KRA/keys.json';  // Update with the correct path to your key file

const keyFileContent = await fs.readFile(keyFilePath);

const client = new ImageAnnotatorClient({
  keyFilename: keyFilePath,  // Provide the path to the key file, not its content
});


const id = "P051619980A";
const password = "bclitax@2023";
const imagePath = "./KRA/ocr.png";

const checkPassword = async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate to a website with a password input field
  await page.goto("https://itax.kra.go.ke/KRA-Portal/");
  await page.waitForNavigation();

  // Type the password into the input field
  await page.type("#logid", id, { delay: 100 });
  await page.click(".btn");

  await page.type("#userName", id);
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

  // Get the annotated result
  console.log(documentAnnotateResult.fullTextAnnotation);

  await page.click("#loginButton");

  await browser.close();
};

checkPassword();
