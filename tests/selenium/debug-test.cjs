const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

describe('Debug Portfolio Test', function() {
  let driver;

  before(async function() {
    this.timeout(30000);
    
    const options = new chrome.Options();
    // Remove headless mode to see what's happening
    // options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async function() {
    if (driver) {
      // Keep browser open for 5 seconds to see the result
      await driver.sleep(5000);
      await driver.quit();
    }
  });

  it('should load and debug the page', async function() {
    this.timeout(20000);
    
    console.log('🌐 Loading page...');
    await driver.get('http://localhost:5173');
    
    // Wait for React to load
    await driver.sleep(3000);
    
    const title = await driver.getTitle();
    console.log('📄 Page title:', title);
    
    // Check what's actually in the DOM
    const rootElement = await driver.findElement(By.id('root'));
    const rootContent = await rootElement.getAttribute('innerHTML');
    console.log('🏗️ Root element content length:', rootContent.length);
    
    // Check for any text content
    const bodyText = await driver.findElement(By.tagName('body')).getText();
    console.log('📝 Body text length:', bodyText.length);
    console.log('📝 Body text preview:', bodyText.substring(0, 200));
    
    // Check for JavaScript errors
    const logs = await driver.manage().logs().get('browser');
    console.log('🐛 Browser console logs:');
    logs.forEach(log => {
      if (log.level.name === 'SEVERE') {
        console.log('❌ ERROR:', log.message);
      } else {
        console.log('ℹ️', log.level.name + ':', log.message);
      }
    });
    
    // Try to find any div elements
    const divElements = await driver.findElements(By.tagName('div'));
    console.log('📦 Number of div elements found:', divElements.length);
    
    // Try to find the App class specifically
    try {
      const appElement = await driver.findElement(By.className('App'));
      console.log('✅ App element found!');
    } catch (error) {
      console.log('❌ App element not found:', error.message);
    }
    
    // Wait a bit more and try to find hero
    await driver.sleep(5000);
    
    try {
      const heroElement = await driver.findElement(By.className('hero'));
      console.log('✅ Hero element found!');
    } catch (error) {
      console.log('❌ Hero element not found:', error.message);
    }
    
    console.log('🔍 Debug test completed');
  });
});
