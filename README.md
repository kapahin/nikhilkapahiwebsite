# Nikhil Kapahi Website

A personal website with podcast episodes and newsletter subscription functionality.

## Features

- Clean, responsive design inspired by lexfridman.com
- Multiple pages with navigation (Home and Podcasts)
- Newsletter subscription using MailerLite API
- Server-side implementation for API token security

## Project Structure

```
├── index.html              # Home page
├── podcasts.html           # Podcasts page
├── styles.css              # Global styles
├── script.js               # Client-side JavaScript
├── server/                 # Server-side code
│   ├── config.js           # Server configuration
│   ├── server.js           # Express server
│   ├── subscription.js     # Newsletter subscription handler
│   ├── package.json        # Server dependencies
│   ├── .env                # Environment variables (not committed to git)
│   └── .env.example        # Example environment variables
└── .gitignore              # Git ignore file
```

## Setup Instructions

### Static Website (GitHub Pages)

1. Clone the repository
2. Make any desired changes to the HTML, CSS, or JavaScript files
3. Deploy to GitHub Pages or any static hosting service

In this mode, the newsletter subscription will be simulated (no actual API calls).

### Full Stack Website (with API Integration)

1. Clone the repository
2. Install server dependencies:
   ```
   cd server
   npm install
   ```
3. Set up environment variables:
   ```
   cp .env.example .env
   ```
4. Edit the `.env` file and add your MailerLite API token
5. Start the server:
   ```
   npm start
   ```
6. Access the website at http://localhost:3000

## Environment Variables

The following environment variables are used:

- `MAILERLITE_API_TOKEN`: Your MailerLite API token
- `PORT`: The port for the server (default: 3000)
- `NODE_ENV`: The environment (development, production)

## Development

To run the server in development mode with auto-restart:

```
cd server
npm run dev
```

## Deployment

### Static Website

The static website can be deployed to GitHub Pages or any static hosting service.

### Full Stack Website

For the full stack version with API integration, you can deploy to platforms like:

- Heroku
- Vercel
- Netlify (with serverless functions)
- DigitalOcean App Platform

Make sure to set the environment variables in your deployment platform.

## Security Notes

- The MailerLite API token is stored in the `.env` file, which is not committed to git
- The server-side implementation ensures the API token is never exposed to the client
- For static deployments, the newsletter subscription is simulated
