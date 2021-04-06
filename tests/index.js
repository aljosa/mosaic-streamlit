const puppeteer = require('puppeteer')

const assert = (isValid, errorMessage) => {
  if (!isValid) {
    console.log(`ERROR: ${errorMessage}`)
    process.exit(1)
  }
}

async function screenshot(page) {
  if (this.screenshotCount) {
    this.screenshotCount++
  } else {
    this.screenshotCount = 1
  }

  console.log('Screenshot ', this.screenshotCount)
  await page.screenshot({path: `screenshot-${this.screenshotCount}.png`})
}

(async () => {
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1500,
      height: 1200
    }
  })

  const SERVER_URL = process.env.MOSAIC_STREAMLIT_TEST_SERVER
  const page = await browser.newPage()

  try {
    await page.goto(SERVER_URL)
    await screenshot(page)

    const mosaicTitle = "GUI for Mosaic built using Streamlit"
    await page.waitForSelector('.stApp h3')
    await screenshot(page)

    const element = await page.$('.stApp h3')
    let value = await element.evaluate(el => el.textContent)
    assert(value === mosaicTitle, 'Mosaic title not found')

    await page.evaluate(_ => {
      const sidebar = document.querySelector('section[data-testid=stSidebar]')
      sidebar.hidden = false
      const sidebar_block = document.querySelector('section[data-testid=stSidebar] > div:first-of-type')
      sidebar_block.style.width = '100rem !important'
      sidebar_block.style.marginLeft = '100rem !important'
      sidebar_block.style.background = 'red'
    })
    await screenshot(page)

    const selectFiles = await page.waitForSelector("div.stSelectbox")
    selectFiles.click()
    await screenshot(page)

    const el = await page.waitForXPath("//span[contains(., 'Raji')]")
    el.click()
    await screenshot(page)

    await page.waitForXPath("//label[contains(., 'Running')]")
    await screenshot(page)

    await page.waitForXPath("//p[contains(., 'Creating visuals.')]", {timeout: 0})
    await screenshot(page)

    await page.waitForXPath("//p[contains(., 'Done.')]")
    await page.waitForXPath("//label[contains(., 'Running')]", {hidden: true})
    await screenshot(page)

  } catch(ex) {
    console.log('Exception', ex)
  }

  await browser.close()
})()
