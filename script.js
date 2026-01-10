// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = hamburger.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    const headerOffset = 80;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Try Now Button Functionality
    const tryNowButtons = document.querySelectorAll('#tryNowBtn, #tryNowBtnBottom');
    
    tryNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            // Simulate connection delay
            setTimeout(() => {
                // Replace with your actual chatbot URL
              // Redirect to 'page2.html' instead of showing an alert.
                   
                // Reset button
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Uncomment the line below and replace with your chatbot URL
                // window.open('YOUR_CHATBOT_URL', '_blank');
            }, 1500);
        });
    });

    // Navbar scroll effect
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add/remove background opacity based on scroll position
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
        
        // Hide/show navbar based on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // Feature cards animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Typing animation for chatbot mockup
    function simulateTyping() {
        const typingMessage = document.querySelector('.typing');
        if (typingMessage) {
            setTimeout(() => {
                typingMessage.querySelector('.message-content').innerHTML = 
                    'I can help you with that. Based on your symptoms, I recommend consulting with a healthcare provider. Would you like me to help you find nearby clinics?';
                typingMessage.classList.remove('typing');
                
                // Add user response after a delay
                setTimeout(() => {
                    const chatMessages = document.querySelector('.chat-messages');
                    const newMessage = document.createElement('div');
                    newMessage.className = 'message user-message';
                    newMessage.innerHTML = '<div class="message-content">Yes, please help me find a clinic</div>';
                    chatMessages.appendChild(newMessage);
                    
                    // Scroll to bottom
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 2000);
            }, 3000);
        }
    }

    // Start typing simulation
    simulateTyping();

    // Form validation and accessibility
    function validateForm(formData) {
        const errors = [];
        
        // Add your validation logic here
        if (!formData.email || !isValidEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Accessibility: Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        // Enter key activates buttons
        if (e.key === 'Enter' && e.target.classList.contains('cta-button')) {
            e.target.click();
        }
    });

    // Preload important images for better performance
    function preloadImages() {
        const imageUrls = [
            // Add your image URLs here when you add actual images
        ];
        
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }

    preloadImages();

    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime, 'ms');
            
            // Report slow loading if needed
            if (loadTime > 3000) {
                console.warn('Page loaded slowly. Consider optimizing assets.');
            }
        });
    }

    // Error handling
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // You can send this to your error tracking service
    });

    // Service Worker registration for PWA (optional)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered:', registration);
            })
            .catch(error => {
                console.log('Service Worker registration failed:', error);
            });
    }
});

// Utility function to redirect to chatbot
function redirectToChatbot() {
    // Replace with your actual chatbot URL or integration
    // Examples:
    // window.open('https://your-chatbot-url.com', '_blank');
    // window.location.href = '/chat';
    // Or integrate with chat widget APIs like Intercom, Crisp, etc.
    
    console.log('Redirecting to chatbot...');
    alert('Please replace this with your chatbot integration!');
}

// Analytics tracking (replace with your analytics service)
function trackEvent(eventName, properties) {
    // Example: Google Analytics 4
    // gtag('event', eventName, properties);
    
    // Example: Facebook Pixel
    // fbq('track', eventName, properties);
    
    console.log('Event tracked:', eventName, properties);
}

// Track button clicks
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('cta-button')) {
        trackEvent('cta_button_click', {
            button_text: e.target.textContent,
            page_location: window.location.href
        });
    }
});

// GDPR/Privacy compliance helpers
// Add this to your existing script.js file

// Modal Chatbot Implementation
function createChatbotModal() {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'chatbotModal';
    modalOverlay.className = 'chatbot-modal-overlay';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'chatbot-modal-content';
    
    // Create modal header
    const modalHeader = document.createElement('div');
    modalHeader.className = 'chatbot-modal-header';
    modalHeader.innerHTML = `
        <div class="modal-title">
            <i class="fas fa-robot"></i>
            <span>Medicare AI Assistant</span>
        </div>
        <button class="modal-close-btn" onclick="closeChatbotModal()">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Create iframe container
    const iframeContainer = document.createElement('div');
    iframeContainer.className = 'chatbot-iframe-wrapper';
    iframeContainer.innerHTML = `
        <iframe
            src="https://www.chatbase.co/YNIf09EWHXwo9_Nd5UFU2/help"
            width="100%"
            height="100%"
            frameborder="0"
            title="Medicare AI Chatbot"
            allow="microphone; camera"
        ></iframe>
    `;
    
    // Assemble modal
    
    modalContent.appendChild(iframeContainer);
    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
    
    // Show modal with animation
    setTimeout(() => {
        modalOverlay.classList.add('active');
    }, 10);
}

function closeChatbotModal() {
    const modal = document.getElementById('chatbotModal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
        }, 300);
    }
}

// Update the Try Now button functionality
document.addEventListener('DOMContentLoaded', function() {
    const tryNowButtons = document.querySelectorAll('#tryNowBtn, #tryNowBtnBottom');
    
    tryNowButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Option 1: Open dedicated chatbot page
            // window.open('chatbot.html', '_blank');
            
            // Option 2: Open modal (uncomment this and comment above)
            createChatbotModal();
            
            // Option 3: Redirect to chatbot page in same window
            // window.location.href = 'chatbot.html';
        });
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('chatbot-modal-overlay')) {
            closeChatbotModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeChatbotModal();
        }
    });
});
// Chat Widget Toggle Function
function toggleChatWidget() {
    const chatWindow = document.getElementById('chatWindow');
    const notification = document.querySelector('.chat-notification');
    
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
        setTimeout(() => {
            chatWindow.style.display = 'none';
        }, 300);
    } else {
        chatWindow.style.display = 'flex';
        setTimeout(() => {
            chatWindow.classList.add('active');
        }, 10);
        
        // Hide notification badge when opened
        if (notification) {
            notification.style.display = 'none';
        }
    }
}

// Auto-show notification after page load (optional)
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        const notification = document.querySelector('.chat-notification');
        if (notification) {
            notification.style.display = 'flex';
        }
    }, 3000); // Show after 3 seconds
});
 function downloadApk() {
    window.location.href = "MedicareAi.apk";
  }


