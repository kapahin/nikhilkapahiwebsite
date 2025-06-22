const https = require('https');
const config = require('./config');

/**
 * Subscribe an email to the MailerLite newsletter
 * @param {string} email - The email to subscribe
 * @returns {Promise<Object>} - The response from MailerLite API
 */
function subscribeToNewsletter(email) {
  return new Promise((resolve, reject) => {
    // Validate email
    if (!email || !isValidEmail(email)) {
      return reject(new Error('Invalid email address'));
    }

    // MailerLite API endpoint for adding subscribers
    const apiUrl = 'https://api.mailerlite.com/api/v2/subscribers';
    
    // Request data
    const data = JSON.stringify({
      email: email,
      resubscribe: true
    });

    // Request options
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': config.MAILERLITE_API_TOKEN,
        'Content-Length': data.length
      }
    };

    // Make the request
    const req = https.request(apiUrl, options, (res) => {
      let responseData = '';

      // Collect response data
      res.on('data', (chunk) => {
        responseData += chunk;
      });

      // Process the complete response
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(responseData);
          
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsedData);
          } else {
            reject(new Error(`API Error: ${res.statusCode} - ${JSON.stringify(parsedData)}`));
          }
        } catch (error) {
          reject(new Error(`Failed to parse API response: ${error.message}`));
        }
      });
    });

    // Handle request errors
    req.on('error', (error) => {
      reject(new Error(`Request failed: ${error.message}`));
    });

    // Send the request
    req.write(data);
    req.end();
  });
}

/**
 * Validate email format
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = {
  subscribeToNewsletter
};
