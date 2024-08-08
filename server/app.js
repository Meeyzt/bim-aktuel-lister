const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');

const app = express();
const PORT = 3001;

// CORS yapılandırması
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.get('/scrape', async (req, res) => {
  try {
    console.log('Scraping started');
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://www.bim.com.tr');
    const responseItems = [];

    const tabs = await page.evaluate(() => {
      const tabs = document.querySelector("#form1 > div > div.homePage > div.aktuelArea.makeTwo > div > div.tabArea > div.subButtonArea.subButtonArea-1.active > div");

      console.log(tabs)

      if (!tabs) {
        return [];
      }

      // get Tab a elements
      const aElements = tabs.querySelectorAll('a');
      const tabTexts = [];
      aElements.forEach((a) => {
        tabTexts.push({
          text: a.innerText,
          href: a.href
        });
      });

      return tabTexts;
    });

    for (const tab of tabs) {
      await page.goto(tab.href);

      await page.waitForSelector('.productArea .product .imageArea img');

      const items = await page.evaluate(async (tabText) => {
        async function clickLoadMoreButton() {
          const loadMoreContainer = document.querySelector('#form1 > div > div.homePage > div.aktuelArea.makeTwo > div > div.productArea > div.buttonload.buttonArea.more');
          let loadMoreButtonDisplayed = true;

          if (loadMoreContainer) {
            const loadMoreButton = loadMoreContainer.querySelector('a');

            while (loadMoreButtonDisplayed) {
              if (loadMoreContainer.style.display === 'none') {
                loadMoreButtonDisplayed = false;
                break;
              }

              loadMoreButton.click();
              await new Promise((resolve) => setTimeout(resolve, 1000));
            }
          }
        }

        await clickLoadMoreButton();

        const cards = document.querySelectorAll('.productArea .product');

        if (!cards || cards.length === 0) {
          return [];
        }

        const cardItems = [];

        cards.forEach((card) => {
          const imageUrl = card.querySelector('.img-fluid') ? card.querySelector('.img-fluid').src : '';
          const title = card.querySelector('.title') ? card.querySelector('.title').innerText : '';
          const description = card.querySelector('.textArea') ? card.querySelector('.textArea').innerHTML : '';
          const price = card.querySelector('.priceArea') ? card.querySelector('.priceArea a').innerText : '';

          if (!imageUrl && !title && !price && !description) {
            return;
          }

          cardItems.push({ imageUrl, title, price, description, pageUrl: window.location.href, date: tabText });
        });

        return cardItems;
      }, tab.text);

      // Parça parça veri gönder
      responseItems.push(...items);
    }

    await browser.close();
    res.json({
      items: responseItems,
      dates: tabs
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Bir hata oluştu' });
    res.end();
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});