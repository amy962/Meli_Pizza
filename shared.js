// Shared JavaScript functionality

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Mobile navigation toggle
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
    });
}

// Lazy loading images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
});

// Form validation and enhancement
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Add loading state
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.classList.add('loading');
            submitButton.disabled = true;
        }

        try {
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            showNotification('Form submitted successfully!', 'success');
        } catch (error) {
            showNotification('An error occurred. Please try again.', 'error');
        } finally {
            if (submitButton) {
                submitButton.classList.remove('loading');
                submitButton.disabled = false;
            }
        }
    });
});

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-top-button';
scrollTopButton.innerHTML = '↑';
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.classList.add('show');
    } else {
        scrollTopButton.classList.remove('show');
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effects to cards
document.querySelectorAll('.card').forEach(card => {
    card.classList.add('card-effect');
});

// Add hover effects to buttons
document.querySelectorAll('button, .button').forEach(button => {
    button.classList.add('button-effect');
});

// Add hover effects to images
document.querySelectorAll('img').forEach(img => {
    img.classList.add('image-effect');
});

// Add input effects to form fields
document.querySelectorAll('input, textarea, select').forEach(input => {
    input.classList.add('input-effect');
});

// Dynamic header background
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Add animation to elements when they come into view
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    animateOnScroll.observe(element);
});

// Add touch support for mobile devices
document.addEventListener('touchstart', () => {}, {passive: true});

// Handle orientation changes
window.addEventListener('orientationchange', () => {
    // Refresh layout if needed
    window.location.reload();
});

// Add loading state to buttons
document.querySelectorAll('button[type="submit"]').forEach(button => {
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => this.classList.remove('loading'), 1000);
        }
    });
}); 