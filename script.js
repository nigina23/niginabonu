// ===================================
// Accessibility-focused JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initMobileMenu();
    initSmoothScroll();
    initFormValidation();
    updateYear();
    initKeyboardNavigation();
    announcePageLoad();
});

// ===================================
// Mobile Menu Toggle
// ===================================
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!menuToggle || !navMenu) return;
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle menu visibility
        navMenu.classList.toggle('active');
        
        // Focus first menu item when opening
        if (!isExpanded) {
            const firstMenuItem = navMenu.querySelector('a');
            if (firstMenuItem) {
                setTimeout(() => firstMenuItem.focus(), 100);
            }
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        }
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
            menuToggle.focus();
        }
    });
    
    // Close menu when navigating to a section
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove('active');
        });
    });
}

// ===================================
// Smooth Scroll with Focus Management
// ===================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Don't prevent default for skip link
            if (href === '#main-content') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                // Smooth scroll to target
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Set focus to the target section for keyboard users
                // Make it focusable if it isn't already
                if (!targetElement.hasAttribute('tabindex')) {
                    targetElement.setAttribute('tabindex', '-1');
                }
                
                // Focus after scroll completes
                setTimeout(() => {
                    targetElement.focus();
                }, 500);
            }
        });
    });
}

// ===================================
// Form Validation with Accessibility
// ===================================
function initFormValidation() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    // Real-time validation on blur
    nameInput.addEventListener('blur', () => validateField(nameInput, 'name'));
    emailInput.addEventListener('blur', () => validateField(emailInput, 'email'));
    messageInput.addEventListener('blur', () => validateField(messageInput, 'message'));
    
    // Clear errors on input
    nameInput.addEventListener('input', () => clearError(nameInput));
    emailInput.addEventListener('input', () => clearError(emailInput));
    messageInput.addEventListener('input', () => clearError(messageInput));
    
    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateField(nameInput, 'name');
        const isEmailValid = validateField(emailInput, 'email');
        const isMessageValid = validateField(messageInput, 'message');
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            const formStatus = document.getElementById('form-status');
            formStatus.textContent = 'Thank you for your message! I will get back to you soon.';
            formStatus.className = 'form-status success';
            
            // Reset form
            form.reset();
            
            // Announce success to screen readers
            announceMessage('Form submitted successfully');
            
            // Clear success message after 5 seconds
            setTimeout(() => {
                formStatus.textContent = '';
                formStatus.className = 'form-status';
            }, 5000);
        } else {
            // Focus first invalid field
            const firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) {
                firstInvalid.focus();
            }
            
            // Announce error to screen readers
            announceMessage('Please correct the errors in the form');
        }
    });
}

// Validate individual field
function validateField(field, type) {
    const value = field.value.trim();
    const errorElement = document.getElementById(`${field.id}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    if (value === '') {
        isValid = false;
        errorMessage = 'This field is required.';
    } else if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    } else if (type === 'message' && value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long.';
    }
    
    if (isValid) {
        field.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
    } else {
        field.setAttribute('aria-invalid', 'true');
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

// Clear error message
function clearError(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (field.value.trim() !== '') {
        field.setAttribute('aria-invalid', 'false');
        errorElement.textContent = '';
    }
}

// ===================================
// Update Copyright Year
// ===================================
function updateYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===================================
// Enhanced Keyboard Navigation
// ===================================
function initKeyboardNavigation() {
    // Tab trap for modal-like menu on mobile
    const navMenu = document.querySelector('.nav-menu');
    if (!navMenu) return;
    
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && this.classList.contains('active')) {
            const focusableElements = this.querySelectorAll('a');
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
    
    // Allow Enter and Space to activate buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
}

// ===================================
// Screen Reader Announcements
// ===================================
function announceMessage(message) {
    // Create a visually hidden live region if it doesn't exist
    let liveRegion = document.getElementById('sr-live-region');
    
    if (!liveRegion) {
        liveRegion = document.createElement('div');
        liveRegion.id = 'sr-live-region';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.position = 'absolute';
        liveRegion.style.left = '-10000px';
        liveRegion.style.width = '1px';
        liveRegion.style.height = '1px';
        liveRegion.style.overflow = 'hidden';
        document.body.appendChild(liveRegion);
    }
    
    // Clear and set message
    liveRegion.textContent = '';
    setTimeout(() => {
        liveRegion.textContent = message;
    }, 100);
}

// Announce page load
function announcePageLoad() {
    setTimeout(() => {
        announceMessage('Portfolio page loaded. Use Tab to navigate and Enter to select.');
    }, 1000);
}

// ===================================
// Handle Skip Link Focus
// ===================================
document.addEventListener('DOMContentLoaded', function() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.getElementById('main-content');
    
    if (skipLink && mainContent) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            mainContent.focus();
        });
    }
});

// ===================================
// Intersection Observer for Animations (Optional)
// Only if user hasn't requested reduced motion
// ===================================
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections for subtle animations
    document.addEventListener('DOMContentLoaded', function() {
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(section);
        });
    });
}

// ===================================
// Handle Focus Visible (Polyfill for older browsers)
// ===================================
(function() {
    let hadKeyboardEvent = false;
    
    function handleKeyDown(e) {
        if (e.key === 'Tab') {
            hadKeyboardEvent = true;
        }
    }
    
    function handlePointerDown() {
        hadKeyboardEvent = false;
    }
    
    function handleFocus(e) {
        if (hadKeyboardEvent) {
            e.target.classList.add('focus-visible');
        }
    }
    
    function handleBlur(e) {
        e.target.classList.remove('focus-visible');
    }
    
    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('mousedown', handlePointerDown, true);
    document.addEventListener('focus', handleFocus, true);
    document.addEventListener('blur', handleBlur, true);
})();
