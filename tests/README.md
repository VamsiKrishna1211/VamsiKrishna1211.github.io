# Portfolio Website Test Suite

This directory contains comprehensive Selenium tests for the portfolio website to ensure all components load properly and are visible.

## 🧪 Test Coverage

The test suite covers:

### ✅ **Page Load and Initial State**
- Homepage loading
- Loading spinner functionality
- Basic page structure

### 🧭 **Navigation Tests**
- Navigation bar presence and functionality
- Logo display
- Menu item navigation
- Mobile responsive navigation
- Scroll-to-section functionality

### 🎯 **Hero Section Tests**
- Name and title display
- Typing animation
- Statistics display
- Action buttons (Download Resume, Contact)
- Social media links
- Profile image loading

### 📄 **Section Visibility Tests**
- About section
- Experience section  
- Projects section
- Skills section
- Education section
- Publications section
- Patents section
- Achievements section
- Certifications section
- Contact section

### 📊 **Content Data Tests**
- Experience data from JSON
- Project data display
- Skills categories and tags
- Education information
- Publications and patents
- Achievements and certifications

### 📝 **Contact Form Tests**
- Form field presence
- Form validation
- Contact information display
- Email functionality

### 📱 **Responsive Design Tests**
- Mobile viewport (375px width)
- Tablet viewport (768px width)
- Desktop viewport (1920px width)

### ⚡ **Performance Tests**
- Page load time validation
- Three.js background animation
- Component rendering speed

### ♿ **Accessibility Tests**
- Proper heading structure (h1, h2, etc.)
- Image alt text
- Keyboard navigation
- Focus management

### 🔗 **Functionality Tests**
- Social media links
- Download resume functionality
- External link validation
- Button interactions

## 🚀 Running Tests

### Prerequisites
1. **Node.js** (v16 or higher)
2. **Google Chrome** browser installed
3. **Development server** running

### Installation
```bash
# Install dependencies
npm install

# Install Chrome driver (if not already installed)
npm install chromedriver
```

### Test Execution

#### Option 1: Automated Test Runner (Recommended)
```bash
# This will start the dev server and run tests automatically
npm test
```

#### Option 2: Manual Test Execution
```bash
# Start development server in one terminal
npm run dev

# Run tests in another terminal
npm run test:selenium
```

#### Option 3: Concurrent Execution
```bash
# Run dev server and tests concurrently
npm run test:dev
```

### Test Configuration

The tests are configured to run in **headless Chrome** by default for CI/CD compatibility. To run with a visible browser window, modify the Chrome options in `portfolio-comprehensive.test.js`:

```javascript
const options = new chrome.Options();
// Comment out this line to see the browser window
// options.addArguments('--headless');
```

### Test Results

The test suite will output:
- ✅ **Passed tests**: Components loading correctly
- ❌ **Failed tests**: Issues with component visibility or functionality  
- ⚠️ **Warnings**: Optional features that might not be immediately available

## 🐛 Troubleshooting

### Common Issues

1. **"Connection refused" error**
   - Ensure the development server is running on `http://localhost:5173`
   - Check if port 5173 is available

2. **Element not found errors**
   - Component might still be loading
   - CSS class names might have changed
   - Increase timeout values if needed

3. **Chrome driver issues**
   - Update Chrome browser to latest version
   - Reinstall chromedriver: `npm install chromedriver@latest`

4. **Timeout errors**
   - Increase timeout values in test configuration
   - Check network speed and system performance

### Debug Mode

To run tests with debug information:
```bash
# Set debug environment variable
DEBUG=selenium* npm test
```

## 📈 Test Metrics

The comprehensive test suite includes:
- **100+ individual test assertions**
- **15+ test categories**
- **Cross-device compatibility testing**
- **Performance benchmarking**
- **Accessibility validation**

### Expected Test Duration
- **Full test suite**: ~3-5 minutes
- **Individual sections**: ~30-60 seconds each
- **Performance tests**: ~1-2 minutes

## 🔧 Customization

### Adding New Tests

1. **Component Tests**: Add to existing describe blocks
2. **New Sections**: Create new describe blocks
3. **Performance Tests**: Add to performance section
4. **Accessibility Tests**: Extend accessibility describe block

### Test Data Validation

The tests validate against the JSON data files:
- `src/data/personal.json`
- `src/data/experience.json`
- `src/data/projects.json`
- `src/data/skills.json`
- `src/data/education.json`
- `src/data/publications.json`
- `src/data/patents.json`
- `src/data/achievements.json`
- `src/data/certifications.json`

## 🤖 CI/CD Integration

For continuous integration, add this to your workflow:

```yaml
- name: Run Portfolio Tests
  run: |
    npm install
    npm run build
    npm test
```

The tests are designed to run in headless mode and work with most CI/CD platforms including GitHub Actions, GitLab CI, and Jenkins.

## 📋 Test Checklist

Before deploying, ensure all these tests pass:

- [ ] Page loads without errors
- [ ] All navigation links work
- [ ] Hero section displays correctly
- [ ] All sections are visible
- [ ] Contact form functions properly
- [ ] Mobile responsiveness works
- [ ] Three.js animations load
- [ ] Performance is acceptable
- [ ] Accessibility standards met
- [ ] All data displays correctly

---

**Note**: These tests ensure your portfolio website provides an excellent user experience across all devices and browsers. Regular testing helps maintain quality and catch issues early in development.
