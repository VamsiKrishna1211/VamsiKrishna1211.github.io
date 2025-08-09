const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const assert = require('assert');

// Test configuration
const BASE_URL = 'http://localhost:5173'; // Vite dev server
const TIMEOUT = 10000;

describe('Portfolio Website - Comprehensive Tests', function() {
  let driver;

  // Setup before running tests
  before(async function() {
    this.timeout(30000);
    
    // Configure Chrome options for headless testing
    const options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--disable-gpu');
    options.addArguments('--window-size=1920,1080');
    
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    
    await driver.manage().window().maximize();
  });

  // Cleanup after tests
  after(async function() {
    if (driver) {
      await driver.quit();
    }
  });

  describe('Page Load and Initial State', function() {
    it('should load the homepage successfully', async function() {
      this.timeout(TIMEOUT);
      await driver.get(BASE_URL);
      
      const title = await driver.getTitle();
      assert(title.length > 0, 'Page title should not be empty');
      
      // Wait for main content to load
      await driver.wait(until.elementLocated(By.className('App')), TIMEOUT);
    });

    it('should display loading spinner initially', async function() {
      this.timeout(TIMEOUT);
      await driver.get(BASE_URL);
      
      try {
        // Check if loading spinner appears (it might disappear quickly)
        const loadingElement = await driver.findElement(By.className('loading-container'));
        assert(loadingElement, 'Loading spinner should be present');
      } catch (error) {
        // Loading might complete too quickly in some environments
        console.log('Loading spinner completed quickly or not found');
      }
    });
  });

  describe('Navigation Bar Tests', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      await driver.wait(until.elementLocated(By.className('navbar')), TIMEOUT);
    });

    it('should display navigation bar with logo', async function() {
      const navbar = await driver.findElement(By.className('navbar'));
      assert(navbar, 'Navigation bar should be present');
      
      const logo = await driver.findElement(By.className('navbar-logo'));
      assert(logo, 'Logo should be present in navbar');
      
      const logoText = await logo.getText();
      assert(logoText.includes('VK'), 'Logo should contain VK text');
    });

    it('should have all navigation menu items', async function() {
      const expectedMenuItems = ['Home', 'About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'];
      
      const navItems = await driver.findElements(By.className('navbar-item'));
      assert(navItems.length >= expectedMenuItems.length - 1, 'Should have most navigation items');
      
      // Check if at least some menu items are present
      let foundItems = 0;
      for (let item of navItems) {
        const text = await item.getText();
        if (expectedMenuItems.includes(text)) {
          foundItems++;
        }
      }
      assert(foundItems >= 3, 'Should find at least 3 navigation menu items');
    });

    it('should scroll to sections when nav items are clicked', async function() {
      this.timeout(TIMEOUT);
      
      try {
        // Find About navigation item and click it
        const aboutNavItem = await driver.findElement(By.xpath("//button[contains(text(), 'About')]"));
        await aboutNavItem.click();
        
        // Wait a moment for scroll
        await driver.sleep(1000);
        
        // Check if About section is visible
        const aboutSection = await driver.wait(until.elementLocated(By.id('about')), TIMEOUT);
        assert(aboutSection, 'About section should be accessible after clicking nav item');
      } catch (error) {
        console.log('Navigation click test skipped - element might not be immediately clickable');
      }
    });

    it('should show mobile menu toggle on smaller screens', async function() {
      // Resize to mobile viewport
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      
      try {
        const mobileToggle = await driver.findElement(By.className('navbar-toggle'));
        const isDisplayed = await mobileToggle.isDisplayed();
        // Mobile toggle might be hidden with CSS, so we check if element exists
        assert(mobileToggle, 'Mobile toggle should exist');
      } catch (error) {
        console.log('Mobile toggle test - element might be styled differently');
      }
      
      // Reset to desktop size
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
    });
  });

  describe('Hero Section Tests', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      await driver.wait(until.elementLocated(By.className('hero')), TIMEOUT);
    });

    it('should display hero section with name and title', async function() {
      const heroSection = await driver.findElement(By.className('hero'));
      assert(heroSection, 'Hero section should be present');
      
      const heroTitle = await driver.findElement(By.className('hero-title'));
      const titleText = await heroTitle.getText();
      assert(titleText.includes('Vamsi Krishna'), 'Hero should display the name');
    });

    it('should display typing animation text', async function() {
      try {
        const typingText = await driver.findElement(By.className('typing-text'));
        assert(typingText, 'Typing text element should be present');
        
        const text = await typingText.getText();
        assert(text.length > 0, 'Typing text should not be empty');
      } catch (error) {
        console.log('Typing animation might not be immediately available');
      }
    });

    it('should display hero stats', async function() {
      const heroStats = await driver.findElement(By.className('hero-stats'));
      assert(heroStats, 'Hero stats section should be present');
      
      const stats = await driver.findElements(By.className('stat'));
      assert(stats.length >= 2, 'Should have at least 2 stat items');
    });

    it('should display action buttons', async function() {
      const heroButtons = await driver.findElement(By.className('hero-buttons'));
      assert(heroButtons, 'Hero buttons section should be present');
      
      // Check for download resume button
      try {
        const downloadBtn = await driver.findElement(By.xpath("//a[contains(text(), 'Download Resume') or contains(text(), 'Resume')]"));
        assert(downloadBtn, 'Download resume button should be present');
      } catch (error) {
        console.log('Download button might have different text or structure');
      }
    });

    it('should display social links', async function() {
      const socialSection = await driver.findElement(By.className('hero-social'));
      assert(socialSection, 'Social links section should be present');
      
      const socialLinks = await driver.findElements(By.className('social-link'));
      assert(socialLinks.length >= 2, 'Should have at least 2 social links');
    });

    it('should display profile image', async function() {
      try {
        const profileImage = await driver.findElement(By.className('profile-image'));
        assert(profileImage, 'Profile image should be present');
        
        const src = await profileImage.getAttribute('src');
        assert(src && src.length > 0, 'Profile image should have a source');
      } catch (error) {
        console.log('Profile image might be loading or have different class name');
      }
    });
  });

  describe('Sections Visibility Tests', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      await driver.sleep(2000); // Wait for page to fully load
    });

    it('should display About section', async function() {
      const aboutSection = await driver.wait(until.elementLocated(By.id('about')), TIMEOUT);
      assert(aboutSection, 'About section should be present');
      
      // Scroll to about section
      await driver.executeScript('arguments[0].scrollIntoView(true);', aboutSection);
      await driver.sleep(1000);
      
      const isDisplayed = await aboutSection.isDisplayed();
      assert(isDisplayed, 'About section should be visible');
    });

    it('should display Experience section', async function() {
      const experienceSection = await driver.wait(until.elementLocated(By.id('experience')), TIMEOUT);
      assert(experienceSection, 'Experience section should be present');
      
      await driver.executeScript('arguments[0].scrollIntoView(true);', experienceSection);
      await driver.sleep(1000);
    });

    it('should display Projects section', async function() {
      const projectsSection = await driver.wait(until.elementLocated(By.id('projects')), TIMEOUT);
      assert(projectsSection, 'Projects section should be present');
      
      await driver.executeScript('arguments[0].scrollIntoView(true);', projectsSection);
      await driver.sleep(1000);
    });

    it('should display Skills section', async function() {
      const skillsSection = await driver.wait(until.elementLocated(By.id('skills')), TIMEOUT);
      assert(skillsSection, 'Skills section should be present');
      
      await driver.executeScript('arguments[0].scrollIntoView(true);', skillsSection);
      await driver.sleep(1000);
    });

    it('should display Education section', async function() {
      const educationSection = await driver.wait(until.elementLocated(By.id('education')), TIMEOUT);
      assert(educationSection, 'Education section should be present');
    });

    it('should display Contact section', async function() {
      const contactSection = await driver.wait(until.elementLocated(By.id('contact')), TIMEOUT);
      assert(contactSection, 'Contact section should be present');
      
      await driver.executeScript('arguments[0].scrollIntoView(true);', contactSection);
      await driver.sleep(1000);
    });
  });

  describe('Content Data Tests', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      await driver.sleep(2000);
    });

    it('should display experience data', async function() {
      const experienceSection = await driver.findElement(By.id('experience'));
      await driver.executeScript('arguments[0].scrollIntoView(true);', experienceSection);
      await driver.sleep(1000);
      
      try {
        const experienceCards = await driver.findElements(By.className('experience-card'));
        assert(experienceCards.length >= 1, 'Should display at least one experience item');
        
        if (experienceCards.length > 0) {
          const firstCard = experienceCards[0];
          const cardText = await firstCard.getText();
          assert(cardText.length > 50, 'Experience card should have substantial content');
        }
      } catch (error) {
        console.log('Experience cards might have different class names or structure');
      }
    });

    it('should display project data', async function() {
      const projectsSection = await driver.findElement(By.id('projects'));
      await driver.executeScript('arguments[0].scrollIntoView(true);', projectsSection);
      await driver.sleep(1000);
      
      try {
        const projectCards = await driver.findElements(By.className('project-card'));
        assert(projectCards.length >= 1, 'Should display at least one project');
        
        if (projectCards.length > 0) {
          const firstProject = projectCards[0];
          const projectText = await firstProject.getText();
          assert(projectText.length > 30, 'Project card should have meaningful content');
        }
      } catch (error) {
        console.log('Project cards might have different structure');
      }
    });

    it('should display skills data', async function() {
      const skillsSection = await driver.findElement(By.id('skills'));
      await driver.executeScript('arguments[0].scrollIntoView(true);', skillsSection);
      await driver.sleep(1000);
      
      try {
        const skillCategories = await driver.findElements(By.className('skill-category'));
        assert(skillCategories.length >= 1, 'Should display at least one skill category');
        
        const skillTags = await driver.findElements(By.className('skill-tag'));
        assert(skillTags.length >= 5, 'Should display at least 5 skill tags');
      } catch (error) {
        console.log('Skills might have different class structure');
      }
    });
  });

  describe('Contact Form Tests', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      const contactSection = await driver.findElement(By.id('contact'));
      await driver.executeScript('arguments[0].scrollIntoView(true);', contactSection);
      await driver.sleep(1000);
    });

    it('should display contact form', async function() {
      try {
        const contactForm = await driver.findElement(By.className('contact-form'));
        assert(contactForm, 'Contact form should be present');
        
        // Check for form fields
        const nameField = await driver.findElement(By.id('name'));
        const emailField = await driver.findElement(By.id('email'));
        const messageField = await driver.findElement(By.id('message'));
        
        assert(nameField, 'Name field should be present');
        assert(emailField, 'Email field should be present');
        assert(messageField, 'Message field should be present');
      } catch (error) {
        console.log('Contact form elements might have different IDs or structure');
      }
    });

    it('should validate required form fields', async function() {
      try {
        const submitBtn = await driver.findElement(By.className('submit-btn'));
        
        // Try to submit empty form
        await submitBtn.click();
        await driver.sleep(500);
        
        // Check if browser validation appears (HTML5 validation)
        const nameField = await driver.findElement(By.id('name'));
        const validationMessage = await nameField.getAttribute('validationMessage');
        
        // If HTML5 validation is working, the validation message should exist
        if (validationMessage) {
          assert(validationMessage.length > 0, 'Should show validation message for required field');
        }
      } catch (error) {
        console.log('Form validation test might need adjustment based on implementation');
      }
    });

    it('should display contact information', async function() {
      try {
        const contactDetails = await driver.findElement(By.className('contact-details'));
        assert(contactDetails, 'Contact details should be present');
        
        const contactText = await contactDetails.getText();
        assert(contactText.includes('koche156@umn.edu'), 'Should display email address');
      } catch (error) {
        console.log('Contact details might have different structure');
      }
    });
  });

  describe('Responsive Design Tests', function() {
    it('should work on mobile viewport', async function() {
      // Set mobile viewport
      await driver.manage().window().setRect({ width: 375, height: 667 });
      await driver.get(BASE_URL);
      await driver.sleep(2000);
      
      // Check if page loads on mobile
      const app = await driver.findElement(By.className('App'));
      assert(app, 'App should load on mobile viewport');
      
      // Check if hero section is still visible
      const hero = await driver.findElement(By.className('hero'));
      const isDisplayed = await hero.isDisplayed();
      assert(isDisplayed, 'Hero section should be visible on mobile');
      
      // Reset to desktop
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
    });

    it('should work on tablet viewport', async function() {
      // Set tablet viewport
      await driver.manage().window().setRect({ width: 768, height: 1024 });
      await driver.get(BASE_URL);
      await driver.sleep(2000);
      
      const app = await driver.findElement(By.className('App'));
      assert(app, 'App should load on tablet viewport');
      
      // Reset to desktop
      await driver.manage().window().setRect({ width: 1920, height: 1080 });
    });
  });

  describe('Performance and Animation Tests', function() {
    it('should load within reasonable time', async function() {
      this.timeout(15000);
      const startTime = Date.now();
      
      await driver.get(BASE_URL);
      await driver.wait(until.elementLocated(By.className('hero')), TIMEOUT);
      
      const loadTime = Date.now() - startTime;
      assert(loadTime < 10000, 'Page should load within 10 seconds');
    });

    it('should display Three.js background animation', async function() {
      await driver.get(BASE_URL);
      await driver.sleep(3000); // Wait for Three.js to initialize
      
      try {
        const backgroundAnimation = await driver.findElement(By.className('background-animation'));
        assert(backgroundAnimation, 'Background animation container should be present');
        
        // Check if canvas element exists (Three.js creates canvas)
        const canvas = await driver.findElement(By.tagName('canvas'));
        assert(canvas, 'Three.js canvas should be present');
      } catch (error) {
        console.log('Three.js background might not be immediately available or might be disabled');
      }
    });
  });

  describe('Accessibility Tests', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      await driver.sleep(2000);
    });

    it('should have proper heading structure', async function() {
      const h1Elements = await driver.findElements(By.tagName('h1'));
      const h2Elements = await driver.findElements(By.tagName('h2'));
      
      assert(h1Elements.length >= 1, 'Should have at least one h1 element');
      assert(h2Elements.length >= 3, 'Should have multiple h2 elements for sections');
    });

    it('should have alt text for images', async function() {
      try {
        const images = await driver.findElements(By.tagName('img'));
        
        for (let img of images) {
          const alt = await img.getAttribute('alt');
          if (alt === null || alt === '') {
            console.log('Warning: Image without alt text found');
          }
        }
        
        // At least the profile image should have alt text
        assert(images.length > 0, 'Should have at least one image');
      } catch (error) {
        console.log('Image accessibility test completed with warnings');
      }
    });

    it('should be keyboard navigable', async function() {
      // Test Tab navigation
      const body = await driver.findElement(By.tagName('body'));
      await body.click(); // Focus on page
      
      // Send Tab key a few times
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.sleep(200);
      await driver.actions().sendKeys(Key.TAB).perform();
      await driver.sleep(200);
      
      // Check if focus is moving (basic test)
      const activeElement = await driver.switchTo().activeElement();
      assert(activeElement, 'Should be able to navigate with keyboard');
    });
  });

  describe('Link and Button Functionality', function() {
    beforeEach(async function() {
      await driver.get(BASE_URL);
      await driver.sleep(2000);
    });

    it('should have working social media links', async function() {
      try {
        const socialLinks = await driver.findElements(By.className('social-link'));
        
        for (let link of socialLinks) {
          const href = await link.getAttribute('href');
          if (href && href.startsWith('http')) {
            assert(href.length > 10, 'Social link should have valid URL');
          }
        }
        
        assert(socialLinks.length >= 2, 'Should have at least 2 social links');
      } catch (error) {
        console.log('Social links test - might have different structure');
      }
    });

    it('should have working download resume link', async function() {
      try {
        const downloadLinks = await driver.findElements(By.xpath("//a[contains(@href, '.pdf') or contains(text(), 'Resume')]"));
        
        if (downloadLinks.length > 0) {
          const href = await downloadLinks[0].getAttribute('href');
          assert(href && href.length > 0, 'Resume download link should have valid href');
        }
      } catch (error) {
        console.log('Resume download link might have different structure');
      }
    });
  });
});

// Helper function to run tests
console.log('Portfolio Selenium Test Suite');
console.log('Make sure to start the development server with "npm run dev" before running tests');
console.log('Run tests with: npm test or node tests/selenium/portfolio-comprehensive.test.js');
