const puppeteer = require('puppeteer')

const getAmazonKindleInfo = async (url) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)

  const [imgEl] = await page.$x('//*[@id="ebooksImgBlkFront"]')
  const src = await imgEl.getProperty('src')
  const imgURL = await src.jsonValue()

  const [titleEl] = await page.$x('//*[@id="ebooksProductTitle"]')
  const [titleEl] = await page.$x('//*[@id="ebooksProductTitle"]')
  const textTitle = await titleEl.getProperty('textContent')
  const title = await textTitle.jsonValue()


  const [kindleListEl] = await page.$x('//*[@id="a-autoid-8-announce"]/span[2]/span')
  const kindlePriceText = await kindleListEl.getProperty('textContent')
  const kindlePrice = await kindlePriceText.jsonValue()

  const [fileSizeEl] = await page.$x('//*[@id="productDetailsTable"]/tbody/tr/td/div/ul/li[1]/text()')
  const fileSizeText = await fileSizeEl.getProperty('textContent')
  const fileSize = await fileSizeText.jsonValue()

  const [pageCountEl] = await page.$x('//*[@id="productDetailsTable"]/tbody/tr/td/div/ul/li[2]/text()')
  const pageCountText = await pageCountEl.getProperty('textContent')
  const pageCount = await pageCountText.jsonValue()

  console.log({
    imgURL,
    title,
    kindlePrice,
    fileSize,
    pageCount
  })

  browser.close()
}

getAmazonKindleInfo('https://www.amazon.com/Markets-Profile-Profiting-Auction-Process-ebook/dp/B008L03WWE/ref=sr_1_1?dchild=1&keywords=markets+in+profile&qid=1586934801&sr=8-1')

