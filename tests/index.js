const puppeteer = require('puppeteer');

const assert = (isValid, errorMessage) => {
  if (!isValid) {
    console.log(`ERROR: ${errorMessage}`)
    process.exit(1)
  }
}

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1500,
      height: 1200
    }
  });

  const page = await browser.newPage();
  await page.goto('http://localhost:8501/');

  const mosaicTitle = "GUI for Mosaic built using Streamlit"
  await page.waitForSelector('.stApp h3')
  await page.screenshot({ path: 'main.png' });
  const element = await page.$('.stApp h3')
  let value = await element.evaluate(el => el.textContent)
  assert(value === mosaicTitle, 'Mosaic title not found')

  const h5_file = 'Raji-KG1.demo.h5'
  const h5_selection = await page.$('.stSelectbox')
  let box = await page.$('div.stSelectbox')
  await page.screenshot({path: 'dropdown-1.png'})

  await box.click()
  await page.screenshot({path: 'dropdown-2.png'})

  let el = await page.$x("//span[contains(., 'Raji')]")
  await page.screenshot({path: 'dropdown-3.png'})
  el[0].click()
  await page.screenshot({path: 'dropdown-4.png'})
  console.log('after #4')

  await page.waitForXPath("//label[contains(., 'Running')]")
  await page.screenshot({path: 'dropdown-5.png'})
  console.log('after #5')

  await page.waitForXPath("//p[contains(., 'Creating visuals.')]")
  await page.screenshot({path: 'dropdown-6.png'})
  console.log('after #6')

  await page.waitForXPath("//p[contains(., 'Done.')]")
  await page.waitForXPath("//label[contains(., 'Running')]", {hidden: true})

  await page.screenshot({path: 'dropdown-7.png'})
  console.log('after #7')

  await browser.close();
})();
