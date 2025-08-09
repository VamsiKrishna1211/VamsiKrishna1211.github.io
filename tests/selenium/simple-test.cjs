const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

describe('Simple Portfolio Test', function() {
  let driver;

  before(async function() {
    this.timeout(30000);
    
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  it('should load the homepage successfully', async function() {
    this.timeout(15000);
    await driver.get('http://localhost:5173');
    
    const title = await driver.getTitle();
    console.log('Page title:', title);
    
    // Wait for the hero section to load (it might take time due to lazy loading)
    await driver.wait(until.elementLocated(By.className('hero')), 10000);
    
    // Check if hero section loads
    const hero = await driver.findElement(By.className('hero'));
    assert(hero, 'Hero section should be present');
    
    // Check if the name is displayed
    try {
      const heroName = await driver.findElement(By.className('hero-name'));
      const nameText = await heroName.getText();
      console.log('✅ Hero name found:', nameText);
      assert(nameText.length > 0, 'Hero name should not be empty');
    } catch (error) {
      console.log('ℹ️ Hero name element not found, checking for any text in hero section');
      const heroText = await hero.getText();
      console.log('✅ Hero section text:', heroText.substring(0, 100));
      assert(heroText.includes('Vamsi') || heroText.includes('Krishna'), 'Hero should contain name');
    }
    
    console.log('✅ Basic test passed - Portfolio loads successfully!');
  });
});
