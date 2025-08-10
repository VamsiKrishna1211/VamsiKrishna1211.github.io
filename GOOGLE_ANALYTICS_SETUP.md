# Google Analytics Setup Guide

This project now includes comprehensive Google Analytics 4 (GA4) tracking for your portfolio website.

## Quick Setup

1. **Get your Google Analytics Measurement ID:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property for your website
   - Copy your Measurement ID (format: `G-2PJDJW3LT8`)

2. **Update Environment Variable:**
   - Open `.env` file in your project root
   - Replace the placeholder with your actual Measurement ID:
     ```
     VITE_GA_MEASUREMENT_ID=G-2PJDJW3LT8
     ```

3. **Deploy and Test:**
   - Run your project: `npm run dev`
   - Visit different sections of your portfolio
   - Check Google Analytics dashboard for real-time data

## What's Being Tracked

### Automatic Tracking
- **Page Views**: Initial page load
- **Section Views**: When users scroll to different sections (Hero, About, Experience, Projects, Skills, Education, Research, Contact)

### User Interactions
- **Navigation Buttons**: Clicks on navigation elements in Hero section
- **Social Media Links**: Clicks on GitHub, LinkedIn, Google Scholar, Email links
- **Resume Downloads**: PDF download tracking
- **Contact Form**: Form submission attempts (success/failure)
- **External Links**: Clicks on any external links

### Custom Events
- **Section Engagement**: Tracks which sections users actually view (using Intersection Observer)
- **User Journey**: Understanding how users navigate through your portfolio

## Files Modified

### Core Analytics Files
- `src/utils/analytics.js` - Main analytics utility functions
- `src/hooks/useAnalyticsTracking.js` - Custom hook for section view tracking

### Updated Components
- `src/App.jsx` - Analytics initialization and section tracking
- `src/components/Hero/Hero.jsx` - Social links and navigation tracking
- `src/components/Contact/Contact.jsx` - Form submission tracking

### Configuration
- `.env` - Environment variable for Measurement ID
- `package.json` - Added `react-ga4` dependency

## Available Analytics Functions

You can use these functions in other components:

```javascript
import { 
  trackButtonClick, 
  trackExternalLink, 
  trackFileDownload, 
  trackFormSubmission, 
  trackSectionView 
} from '../utils/analytics';

// Track button clicks
trackButtonClick('Button Name', 'Section Name');

// Track external links
trackExternalLink('https://example.com', 'Link Description');

// Track file downloads
trackFileDownload('filename.pdf', 'PDF');

// Track form submissions
trackFormSubmission('Contact Form', true); // true for success, false for error
```

## Privacy & Performance

- **Privacy-Friendly**: Only tracks user interactions, no personal data
- **Performance Optimized**: Uses React.lazy for code splitting
- **Intersection Observer**: Efficient section view tracking
- **Development Mode**: Debug mode enabled in development environment

## Viewing Your Analytics Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your property
3. Check these reports:
   - **Real-time**: See current visitors
   - **Events**: View custom events (section views, button clicks, etc.)
   - **Pages and screens**: See page performance
   - **Conversions**: Track form submissions and downloads

## Customization

To add tracking to new components or interactions:

1. Import the analytics functions
2. Call the appropriate tracking function on user interactions
3. Use descriptive names for events and categories

Example:
```javascript
import { trackButtonClick } from '../../utils/analytics';

const handleClick = () => {
  trackButtonClick('New Feature Button', 'New Section');
  // Your existing click logic
};
```

## Troubleshooting

- **No data in GA**: Check your Measurement ID in `.env`
- **Development tracking**: Set `NODE_ENV=production` to disable debug mode
- **Console errors**: Ensure all analytics imports are correct

Your portfolio now has comprehensive analytics tracking that will help you understand visitor behavior and engagement!
