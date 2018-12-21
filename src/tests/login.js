import puppeteer from 'puppeteer';

const person = {
  email: 'leon@gmail.com',
  pwd: 'leon@gmail.com',
};

export default async function login() {
  const browser = await puppeteer.launch({
    headless: false,
    // devtools: true,
    slowMo: 20,
  });
  const page = await browser.newPage();

  page.emulate({
    viewport: {
      width: 1920,
      height: 1080,
    },
    userAgent: '',
  });

  await page.goto('http://localhost:3000/');
  await page.waitForSelector('input[name=submit]');

  await page.click('input[name=email]');
  await page.type('input[name=email]", person.email');
  await page.click('input[name=pwd]');
  await page.type('input[name=pwd]', person.pwd);
  await page.click('input[name=submit]');

  await page.waitForSelector('#footer');

  browser.close();
}
