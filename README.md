# Nikhil Kapahi Website

A personal website with podcast episodes and newsletter subscription functionality.

## Features

- Clean, responsive design inspired by lexfridman.com
- Multiple pages with navigation (Home and Podcasts)
- Newsletter subscription using MailerLite's embedded form
- Ready for GitHub Pages deployment

## Project Structure

```
├── index.html              # Home page
├── podcasts.html           # Podcasts page
├── styles.css              # Global styles
├── script.js               # Client-side JavaScript
└── .gitignore              # Git ignore file
```

## Setup Instructions

### GitHub Pages Deployment

1. Clone the repository
2. Make any desired changes to the HTML, CSS, or JavaScript files
3. Deploy to GitHub Pages:
   - Go to your GitHub repository
   - Navigate to Settings > Pages
   - Select your main branch as the source
   - Click Save

### MailerLite Integration

The website includes placeholder sections for MailerLite newsletter subscription forms. To set up your MailerLite integration:

1. **Create a MailerLite Account**: If you don't already have one, sign up at [mailerlite.com](https://www.mailerlite.com/)

2. **Create an Embedded Form**:
   - Log in to your MailerLite account
   - Navigate to Forms > Embedded Forms
   - Create a new form or use an existing one
   - Customize the form design to match your website

3. **Get the Embed Code**:
   - Once your form is ready, click "Get embed code"
   - Copy the entire embed code provided by MailerLite

4. **Add the Form to Your Website**:
   - Open both `index.html` and `podcasts.html`
   - Find the newsletter section with the placeholder comments
   - Replace the placeholder comments with your MailerLite embed code
   - The placeholder looks like this:
   
   ```html
   <!-- 
   IMPORTANT: REPLACE THIS COMMENT WITH YOUR MAILERLITE EMBEDDED FORM CODE
   
   To get your MailerLite embedded form:
   1. Log in to your MailerLite account
   2. Go to Forms > Embedded Forms
   3. Create a new form or select an existing one
   4. Click "Get embed code"
   5. Copy the entire embed code
   6. Replace this comment with that code
   -->
   ```

5. **Test Your Form**: After adding the embed code, test your form to ensure it's working correctly

This approach doesn't require any server-side code or API tokens in your repository, making it perfect for GitHub Pages hosting. All subscriber data will be stored directly in your MailerLite account.

## Development

For local development, simply open the HTML files in your browser. No server setup is required.

## Customization

- Edit the HTML files to change content
- Modify styles.css to adjust the design
- Update script.js for additional functionality

## Security Notes

- No API tokens or sensitive information are stored in the repository
- The newsletter subscription is handled directly by MailerLite's embedded form
- All code can be safely pushed to a public GitHub repository
