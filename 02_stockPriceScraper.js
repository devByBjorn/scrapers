const puppeteer = require('puppeteer')

const getStockPrice = async (url) => {

  // stock = stock.toLowerCase().trim().replace(' ', '-')
  // const smallCapUrl = `https://www.avanza.se/aktier/om-aktien.html/5304/${stock}`

  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto(url)

  const [priceEl] = await page.$x('//*[@id="surface"]/div[3]/div/div/div/div/ul/li[5]/span[2]')
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

  const price = parseFloat(carveOutPrice.join('').replace(/,/g, '.'))
  console.log(price)

  browser.close()
}

getStockPrice('https://www.avanza.se/aktier/om-aktien.html/663401/bonava-a')