import puppeteer from "puppeteer";

const log = console.log
const ADMIN_EMAIL = "sylvialulyvaji1992@gmail.com";
const ADMIN_ID = "30053171";
const ADMIN_PASSWORD = "Bcl@2023";

const runScript = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigating to the login page
    await page.goto("https://fns.immigration.go.ke/account/login.html");

    // Waiting for the login form to be available
    await page.waitForSelector("#email");

    // Filling the form
    await page.type("#email", ADMIN_EMAIL);
    await page.type("#regNo", ADMIN_ID);
    await page.type("#password", ADMIN_PASSWORD);

    // Submitting the form (if there's a submit button, adjust accordingly)
    await page.click("#btnLogin");

    // Waiting for navigation to complete (adjust timeout if needed)
    await page.waitForNavigation({ waitUntil: "domcontentloaded" });

    await page.goto("https://fns.immigration.go.ke/dash/permit/newspecialpassStart.php?cat=1");

    await page.click("#passId");
    await page.keyboard.press("v", { delay: 100 });
    await page.keyboard.press("Enter");

    await page.type("#fileR", "3894875", { delay: 100 });
    await page.type("#surname", "Epale");
    await page.type("#othernames", "Imodoi James", { delay: 100 });

    await page.click("#countryOfBirth");
    await page.keyboard.press("k");
    await page.keyboard.press("k");
    await page.keyboard.press("Enter");

    await page.click("#genderId");
    await page.keyboard.press("m");
    await page.keyboard.press("Enter");

    await page.type("#jobtitle", "Software Developer");
    await page.type("#jobdescription", "Software Developer at BCL ");

    await page.type("#employername", "Booksmart Consultancy Limited ");

    await page.type("#employerpostalcode", "PARK SUITS");

    await page.type("#employercity", "Nairobi");

    await page.type("#passport_no", "AH284F9IJ");

    await page.type("#placeOfIssue", "Toronto");

    await page.type("#reasonsOfVisit", "Vacation and Work");

    await page.type("#PeriodOfStay", "2 Weeks");

    await page.type("#employerTelNo", "0745987867");

    await page.type("#phone_no", "0743854888");

    await page.type("#email_address", "ijepale@gmail.com");

    await page.type("#postaladdress", "128 GTC");

    await page.type("#postalcode", "0100");

    await page.type("#city", "Nairobi");

    await page.type("#kenyancellphone", "0743854888");

    await page.click("#county");
    await page.keyboard.press("n");
    await page.keyboard.press("Enter");

    await page.click("#subcounty");
    await page.keyboard.press("w");
    await page.keyboard.press("Enter");

    await page.type("#location", "Westlands");

    await page.type("#road", "Epale");

    await page.type("#plotNo", "Epale");

    await page.type("#landmark", "Epale");

    await page.type("#town", "Epale");

    await page.click("#maritalstatus");
    await page.keyboard.press("m");
    await page.keyboard.press("Enter");

    await page.click("#profession");
    await page.keyboard.press("b");
    await page.keyboard.press("Enter");

    await page.click("#gratis");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    // Closing the browser
    log('Application Success')
  }
};

runScript();
