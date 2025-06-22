// Environment variables configuration
// In production, these would be set in the environment
// For development, you can use a .env file (not committed to git)

module.exports = {
  // MailerLite API token - this should be set as an environment variable
  // and not hardcoded in the source code
  MAILERLITE_API_TOKEN: process.env.MAILERLITE_API_TOKEN || '',
  
  // Other configuration options
  PORT: process.env.PORT || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development'
};
