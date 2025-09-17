/*===== PORTFOLIO MAIN JAVASCRIPT =====*/

// ===== VARIABLES =====
const nav = document.getElementById('nav');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const skillsSection = document.getElementById('skills');
const contactForm = document.getElementById('contact-form');
const filterButtons = document.querySelectorAll('.filter__btn');
const projectCards = document.querySelectorAll('.project__card');

// ===== MOBILE NAVIGATION =====
// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
        document.body.style.overflow = 'hidden';
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
}

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
    }
});

// ===== NAVBAR SCROLL EFFECT =====
function scrollHeader() {
    if (this.scrollY >= 50) {
        nav.classList.add('scroll-header');
    } else {
        nav.classList.remove('scroll-header');
    }
}

window.addEventListener('scroll', scrollHeader);

// Add scroll-header styles dynamically
const style = document.createElement('style');
style.textContent = `
    .scroll-header {
        background: rgba(255, 255, 255, 0.98) !important;
        box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1) !important;
    }
    
    @media (prefers-color-scheme: dark) {
        .scroll-header {
            background: rgba(26, 26, 26, 0.98) !important;
        }
    }
`;
document.head.appendChild(style);

// ===== ACTIVE SECTION HIGHLIGHTING =====
function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const correspondingNavLink = document.querySelector(`.nav__link[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            correspondingNavLink?.classList.add('active');
        } else {
            correspondingNavLink?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ===== PROJECT FILTERING =====
function initProjectFiltering() {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            filterProjects(filterValue);
            
            // Track filter usage
            trackEvent('project_filter', {
                filter: filterValue
            });
        });
    });
}

function filterProjects(filter) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
            // Staggered animation for showing cards
            setTimeout(() => {
                card.style.transform = 'scale(1)';
                card.style.opacity = '1';
            }, Math.random() * 200);
        } else {
            card.classList.add('hidden');
        }
    });
}

// ===== SMOOTH SCROLLING =====
// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = nav.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Smooth scrolling for hero scroll button
const heroScrollLink = document.querySelector('.hero__scroll-link');
if (heroScrollLink) {
    heroScrollLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSection = document.querySelector('#about');
        if (targetSection) {
            const headerHeight = nav.offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== SCROLL ANIMATIONS =====
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Trigger skill bar animations when skills section is visible
            if (entry.target.id === 'skills') {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Add animation classes and observe elements
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(`
        .section__header,
        .about__text,
        .about__visual,
        .project__card,
        .skills__category,
        .contact__info,
        .contact__form
    `);

    animatedElements.forEach((el, index) => {
        // Add staggered delay for project cards
        if (el.classList.contains('project__card')) {
            el.style.transitionDelay = `${index * 0.1}s`;
        }
        
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== SKILLS BAR ANIMATION =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width + '%';
        }, 200);
    });
}

// ===== TYPING ANIMATION =====
function initTypingAnimation() {
    const titleMain = document.querySelector('.hero__title-main');
    if (!titleMain) return;

    const text = titleMain.textContent;
    titleMain.textContent = '';
    titleMain.style.borderRight = '2px solid var(--primary-color)';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            titleMain.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        } else {
            setTimeout(() => {
                titleMain.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing animation after a short delay
    setTimeout(typeWriter, 500);
}

// ===== CONTACT FORM HANDLING =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.contact__submit');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Get form data
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData);
        
        try {
            // Here you would integrate with your preferred form service
            // Example: Formspree, Netlify Forms, EmailJS, etc.
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success state
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #27ae60, #2ecc71)';
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            
        } catch (error) {
            // Error state
            submitButton.textContent = 'Failed to Send';
            submitButton.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
            
            showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
        }
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.background = '';
        }, 3000);
    });
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <span class="notification__message">${message}</span>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification--success {
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
        }
        
        .notification--error {
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
        }
        
        .notification--info {
            background: linear-gradient(135deg, #3498db, #2980b9);
            color: white;
        }
        
        .notification__content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification__close {
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification.show {
            transform: translateX(0);
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification__close');
    closeButton.addEventListener('click', () => {
        clearTimeout(autoRemove);
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

// ===== PARALLAX EFFECTS =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero__avatar-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// ===== THEME TOGGLE (BONUS FEATURE) =====
function initThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark mode');
    
    // Add theme toggle styles
    const themeStyles = `
        .theme-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
        }
        
        [data-theme="dark"] {
            --text-color: #ffffff;
            --text-color-light: #b0b0b0;
            --bg-color: #1a1a1a;
            --bg-color-alt: #2a2a2a;
            --border-color: #404040;
            --shadow-color: rgba(0, 0, 0, 0.3);
            --shadow-color-dark: rgba(0, 0, 0, 0.5);
        }
    `;
    
    if (!document.querySelector('#theme-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'theme-styles';
        styleSheet.textContent = themeStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Add theme toggle to page
    document.body.appendChild(themeToggle);
    
    // Theme toggle functionality
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        
        // Save preference
        localStorage.setItem('theme', newTheme);
        
        // Track theme change
        trackEvent('theme_toggle', {
            theme: newTheme
        });
    });
    
    // Load saved theme or detect system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
        themeToggle.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
        themeToggle.setAttribute('aria-label', savedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    } else if (systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '☀️';
        themeToggle.setAttribute('aria-label', 'Switch to light mode');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '🌙';
        themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        localStorage.setItem('theme', 'light');
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
            themeToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        }
    });
}

// ===== PERFORMANCE OPTIMIZATIONS =====
// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', throttle(scrollHeader, 16));
window.addEventListener('scroll', throttle(scrollActive, 16));

// ===== ACCESSIBILITY IMPROVEMENTS =====
// Keyboard navigation for mobile menu
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        document.body.style.overflow = 'auto';
        navToggle.focus();
    }
});

// Focus management for mobile menu
navToggle.addEventListener('click', () => {
    setTimeout(() => {
        const firstNavLink = navMenu.querySelector('.nav__link');
        firstNavLink?.focus();
    }, 300);
});

// Prefers reduced motion check
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initTypingAnimation();
    initParallaxEffects();
    initThemeToggle();
    initProjectFiltering();
    
    // Set initial active nav link
    const homeLink = document.querySelector('.nav__link[href="#home"]');
    homeLink?.classList.add('active');
    
    // Smooth reveal of hero section
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease';
            heroSection.style.opacity = '1';
        }, 100);
    }
});

// ===== SERVICE WORKER REGISTRATION (PWA SUPPORT) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ===== LAZY LOADING FOR IMAGES =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    // You could send this to an error tracking service
});

// ===== ANALYTICS HELPER =====
function trackEvent(eventName, properties = {}) {
    // Helper function for analytics tracking
    // You can integrate with Google Analytics, Plausible, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log(`Event tracked: ${eventName}`, properties);
}

// Track navigation clicks
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        trackEvent('navigation_click', {
            section: link.getAttribute('href')
        });
    });
});

// Track form submissions
if (contactForm) {
    contactForm.addEventListener('submit', () => {
        trackEvent('form_submission', {
            form_type: 'contact'
        });
    });
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showNotification,
        trackEvent,
        throttle
    };
}
