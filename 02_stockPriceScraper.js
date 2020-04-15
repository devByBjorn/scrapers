const puppeteer = require('puppeteer')

const getStockPrice = async (url) => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)

  const [nameEl] = await page.$x(
    '//*[@id="surface"]/div[5]/div[1]/div[3]/div/div[2]/div/div[1]/dl/dd[1]/span')
  const nameStr = await nameEl.getProperty('textContent')
  const nameJSON = await nameStr.jsonValue()
  const nameArr = JSON.stringify(nameJSON).split('')

  const [priceEl] = await page.$x(
    '//*[@id="surface"]/div[3]/div/div/div/div/ul/li[6]/span[2]/span')
  const priceStr = await priceEl.getProperty('textContent')
  const priceJSON = await priceStr.jsonValue()
  const priceArr = JSON.stringify(priceJSON).split('')

  const carveOutPrice = priceArr.filter((item) => {
    if (Number.isInteger(parseInt(item))) {
      return item
    } else if (item === ',') {
      return item
    }
  })

  const name = nameArr.join('').replace(/[^a-zA-Z0-9 ]/g, "")
  const price = parseFloat(carveOutPrice.join('').replace(/,/g, '.'))

  console.log({
    [name]: price
  })

  browser.close()
}

getStockPrice('https://www.avanza.se/aktier/om-aktien.html/5237/electrolux-a')

