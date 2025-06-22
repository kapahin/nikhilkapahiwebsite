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

// Handle newsletter subscription for the placeholder form
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
      // This is a placeholder form - simulate subscription
      await simulateSubscription(emailInput.value);
      
      // Show success message
      showStatus('Thank you for subscribing! (Note: This is a placeholder form. To collect real subscribers, replace it with your MailerLite embedded form)', 'success');
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
      
      // Remove success message after 8 seconds
      if (type === 'success') {
        setTimeout(() => {
          statusMessage.remove();
        }, 8000);
      }
    }
  });
}

// Simulate subscription for the placeholder form
async function simulateSubscription(email) {
  console.log(`Simulating subscription for ${email}`);
  console.log('IMPORTANT: This is a placeholder form. To collect real subscribers, replace it with your MailerLite embedded form.');
  
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
