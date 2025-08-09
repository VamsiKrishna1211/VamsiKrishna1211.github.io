import { Builder, By, until, Key } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

async function testPortfolioWebsite() {
  console.log('🚀 Starting Selenium tests for Robotics Portfolio...\n');
  
  // Configure Chrome options
  const options = new chrome.Options();
  options.addArguments('--headless'); // Run in headless mode
  options.addArguments('--no-sandbox');
  options.addArguments('--disable-dev-shm-usage');
  options.addArguments('--window-size=1920,1080');
  
  let driver;
  let testsPassed = 0;
  let testsTotal = 0;
  
  try {
    // Initialize the WebDriver
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    console.log('✅ Chrome driver initialized successfully');
    
    // Navigate to the local development server
    const baseUrl = 'http://localhost:5173'; // Vite default port
    await driver.get(baseUrl);
    console.log(`🌐 Navigated to: ${baseUrl}\n`);
    
    // Test 1: Page loads successfully
    testsTotal++;
    try {
      await driver.wait(until.titleContains(''), 10000);
      const title = await driver.getTitle();
      console.log(`✅ Test 1: Page loaded successfully - Title: "${title}"`);
      testsPassed++;
    } catch (error) {
      console.log(`❌ Test 1: Page load failed - ${error.message}`);
    }
    
    // Test 2: Hero section is visible
    testsTotal++;
    try {
      const heroSection = await driver.wait(
        until.elementLocated(By.className('hero')), 
        10000
      );
      const isDisplayed = await heroSection.isDisplayed();
      if (isDisplayed) {
        console.log('✅ Test 2: Hero section is visible');
        testsPassed++;
      } else {
        console.log('❌ Test 2: Hero section is not visible');
      }
    } catch (error) {
      console.log(`❌ Test 2: Hero section test failed - ${error.message}`);
    }
    
    // Test 3: Navigation menu functionality
    testsTotal++;
    try {
      const navbar = await driver.findElement(By.className('navbar'));
      const isNavbarVisible = await navbar.isDisplayed();
      
      if (isNavbarVisible) {
        console.log('✅ Test 3: Navigation bar is visible');
        testsPassed++;
      } else {
        console.log('❌ Test 3: Navigation bar is not visible');
      }
    } catch (error) {
      console.log(`❌ Test 3: Navigation test failed - ${error.message}`);
    }
    
    // Test 4: Check for Three.js canvas elements
    testsTotal++;
    try {
      const canvasElements = await driver.findElements(By.tagName('canvas'));
      if (canvasElements.length > 0) {
        console.log(`✅ Test 4: Found ${canvasElements.length} Three.js canvas elements`);
        testsPassed++;
      } else {
        console.log('❌ Test 4: No Three.js canvas elements found');
      }
    } catch (error) {
      console.log(`❌ Test 4: Three.js canvas test failed - ${error.message}`);
    }
    
    // Test 5: Skills section interaction
    testsTotal++;
    try {
      // Scroll to skills section
      await driver.executeScript('document.querySelector("#skills")?.scrollIntoView()');
      await driver.sleep(2000); // Wait for animations
      
      const skillsSection = await driver.findElement(By.className('skills'));
      const isSkillsVisible = await skillsSection.isDisplayed();
      
      if (isSkillsVisible) {
        console.log('✅ Test 5: Skills section is accessible');
        testsPassed++;
      } else {
        console.log('❌ Test 5: Skills section is not accessible');
      }
    } catch (error) {
      console.log(`❌ Test 5: Skills section test failed - ${error.message}`);
    }
    
    // Test 6: Contact form functionality
    testsTotal++;
    try {
      await driver.executeScript('document.querySelector("#contact")?.scrollIntoView()');
      await driver.sleep(2000);
      
      const contactForm = await driver.findElement(By.className('contact-form'));
      const nameInput = await contactForm.findElement(By.name('name'));
      const emailInput = await contactForm.findElement(By.name('email'));
      const messageInput = await contactForm.findElement(By.name('message'));
      
      // Fill out the form
      await nameInput.sendKeys('Test User');
      await emailInput.sendKeys('test@example.com');
      await messageInput.sendKeys('This is a test message from Selenium automation.');
      
      console.log('✅ Test 6: Contact form can be filled out successfully');
      testsPassed++;
    } catch (error) {
      console.log(`❌ Test 6: Contact form test failed - ${error.message}`);
    }
    
    // Test 7: Social links functionality
    testsTotal++;
    try {
      const socialLinks = await driver.findElements(By.className('social-link'));
      if (socialLinks.length > 0) {
        // Check if links have proper href attributes
        let validLinks = 0;
        for (let link of socialLinks) {
          const href = await link.getAttribute('href');
          if (href && (href.includes('github.com') || href.includes('linkedin.com') || href.includes('mailto:'))) {
            validLinks++;
          }
        }
        
        if (validLinks > 0) {
          console.log(`✅ Test 7: Found ${validLinks} valid social links`);
          testsPassed++;
        } else {
          console.log('❌ Test 7: No valid social links found');
        }
      } else {
        console.log('❌ Test 7: No social links found');
      }
    } catch (error) {
      console.log(`❌ Test 7: Social links test failed - ${error.message}`);
    }
    
    // Test 8: Mobile responsiveness check
    testsTotal++;
    try {
      // Simulate mobile viewport
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.sleep(1000);
      
      const mobileMenuToggle = await driver.findElements(By.className('mobile-menu-toggle'));
      if (mobileMenuToggle.length > 0) {
        console.log('✅ Test 8: Mobile navigation elements are present');
        testsPassed++;
      } else {
        console.log('❌ Test 8: Mobile navigation elements not found');
      }
      
      // Reset to desktop view
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
    } catch (error) {
      console.log(`❌ Test 8: Mobile responsiveness test failed - ${error.message}`);
    }
    
    // Test 9: Performance check - page load time
    testsTotal++;
    try {
      const navigationStart = await driver.executeScript(
        'return window.performance.timing.navigationStart'
      );
      const loadComplete = await driver.executeScript(
        'return window.performance.timing.loadEventEnd'
      );
      
      const loadTime = loadComplete - navigationStart;
      
      if (loadTime < 10000) { // Less than 10 seconds
        console.log(`✅ Test 9: Page load time is acceptable (${loadTime}ms)`);
        testsPassed++;
      } else {
        console.log(`❌ Test 9: Page load time is too slow (${loadTime}ms)`);
      }
    } catch (error) {
      console.log(`❌ Test 9: Performance test failed - ${error.message}`);
    }
    
    // Test 10: Email functionality test
    testsTotal++;
    try {
      const emailButtons = await driver.findElements(By.xpath("//button[contains(text(), 'Email')]"));
      if (emailButtons.length > 0) {
        console.log('✅ Test 10: Email functionality buttons are present');
        testsPassed++;
      } else {
        console.log('❌ Test 10: Email functionality buttons not found');
      }
    } catch (error) {
      console.log(`❌ Test 10: Email functionality test failed - ${error.message}`);
    }
    
  } catch (error) {
    console.log(`💥 Fatal error during testing: ${error.message}`);
  } finally {
    // Close the browser
    if (driver) {
      await driver.quit();
      console.log('\n🔒 Browser closed successfully');
    }
  }
  
  // Print test summary
  console.log('\n' + '='.repeat(50));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(50));
  console.log(`Total Tests: ${testsTotal}`);
  console.log(`Passed: ${testsPassed}`);
  console.log(`Failed: ${testsTotal - testsPassed}`);
  console.log(`Success Rate: ${((testsPassed / testsTotal) * 100).toFixed(1)}%`);
  
  if (testsPassed === testsTotal) {
    console.log('\n🎉 All tests passed! Your robotics portfolio is working perfectly!');
  } else if (testsPassed > testsTotal * 0.8) {
    console.log('\n👍 Most tests passed! Minor issues detected.');
  } else {
    console.log('\n⚠️  Several tests failed. Please check the implementation.');
  }
  
  console.log('\n🤖 Robotics Portfolio Test Suite Complete!\n');
}

// Run the tests
testPortfolioWebsite().catch(console.error);

export default testPortfolioWebsite;
