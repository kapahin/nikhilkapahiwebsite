// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', () => {
  // Get current page path and filename
  const currentPath = window.location.pathname;
  const currentFilename = currentPath.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('nav a');
  
  // Set active class on current page link
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if the current filename matches the link's href
    if (linkPath === currentFilename || 
        (linkPath === 'index.html' && (currentFilename === '' || currentPath.endsWith('/')))) {
      link.classList.add('active');
    }
  });

  // Initialize newsletter form if it exists
  initializeNewsletterForm();
});

// Handle newsletter subscription
function initializeNewsletterForm() {
  const form = document.querySelector('.newsletter-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button');
    const statusMessage = document.createElement('div');
    statusMessage.className = 'newsletter-status';
    
    // Validate email
    if (!emailInput.value || !isValidEmail(emailInput.value)) {
      showStatus('Please enter a valid email address.', 'error');
      return;
    }
    
    // Disable form while submitting
    emailInput.disabled = true;
    submitButton.disabled = true;
    submitButton.textContent = 'Subscribing...';
    
    try {
      // For static site deployment, we'll use the simulated subscription
      // In a real implementation with a server, we would use the API endpoint
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // If running locally with server, use the API endpoint
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: emailInput.value }),
        });
        
        if (!response.ok) {
          throw new Error('Subscription failed');
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || 'Subscription failed');
        }
      } else {
        // For static site deployment without a server, simulate subscription
        await simulateSubscription(emailInput.value);
      }
      
      // Show success message
      showStatus('Thank you for subscribing!', 'success');
      emailInput.value = '';
    } catch (error) {
      // Show error message
      showStatus('Failed to subscribe. Please try again later.', 'error');
      console.error('Subscription error:', error);
    } finally {
      // Re-enable form
      emailInput.disabled = false;
      submitButton.disabled = false;
      submitButton.textContent = 'Subscribe';
    }
    
    function showStatus(message, type) {
      statusMessage.textContent = message;
      statusMessage.className = `newsletter-status ${type}`;
      
      // Remove any existing status message
      const existingStatus = form.querySelector('.newsletter-status');
      if (existingStatus) {
        existingStatus.remove();
      }
      
      // Add new status message after the form
      form.after(statusMessage);
      
      // Remove success message after 5 seconds
      if (type === 'success') {
        setTimeout(() => {
          statusMessage.remove();
        }, 5000);
      }
    }
  });
}

// Simulate subscription API call for static site deployment
async function simulateSubscription(email) {
  console.log(`Simulating subscription for ${email}`);
  console.log('In a production environment, this would call the MailerLite API using a server-side endpoint');
  
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, email });
    }, 1000);
  });
}

// Email validation helper
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
