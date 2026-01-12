/**
 * Frida & Diego - Mexican Restaurant Website
 * Interactive functionality and language toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initLanguageToggle();
    initScrollReveal();
    initSmoothScroll();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Only run if navbar exists (main page)
    if (!navbar || !navToggle || !navMenu) return;

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Language toggle functionality (EN/DE)
 */
function initLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    if (!langToggle) return;
    
    const langActive = langToggle.querySelector('.lang-active');
    const langInactive = langToggle.querySelector('.lang-inactive');
    if (!langActive || !langInactive) return;
    
    // Check for saved language preference
    let currentLang = localStorage.getItem('fridaDiegoLang') || 'en';
    
    // Apply saved language on load
    if (currentLang === 'de') {
        switchLanguage('de');
        updateToggleUI('de');
    }

    langToggle.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'de' : 'en';
        switchLanguage(currentLang);
        updateToggleUI(currentLang);
        localStorage.setItem('fridaDiegoLang', currentLang);
    });

    function updateToggleUI(lang) {
        if (lang === 'de') {
            langActive.textContent = 'DE';
            langInactive.textContent = 'EN';
        } else {
            langActive.textContent = 'EN';
            langInactive.textContent = 'DE';
        }
    }

    function switchLanguage(lang) {
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Find all elements with data-en and data-de attributes
        const translatableElements = document.querySelectorAll('[data-en][data-de]');
        
        translatableElements.forEach(element => {
            const text = lang === 'en' ? element.dataset.en : element.dataset.de;
            
            // Check if the element contains HTML (like <br> tags)
            if (text.includes('<br>') || text.includes('<')) {
                element.innerHTML = text;
            } else {
                element.textContent = text;
            }
        });

        // Update page title based on language
        if (lang === 'de') {
            document.title = 'Frida & Diego | Mexikanisches Restaurant & Cocktailbar Berlin';
        } else {
            document.title = 'Frida & Diego | Mexican Restaurant & Cocktail Bar Berlin';
        }

        // Announce language change for screen readers
        announceLanguageChange(lang);
    }

    function announceLanguageChange(lang) {
        const announcement = document.createElement('div');
        announcement.setAttribute('role', 'status');
        announcement.setAttribute('aria-live', 'polite');
        announcement.className = 'sr-only';
        announcement.textContent = lang === 'en' 
            ? 'Language changed to English' 
            : 'Sprache auf Deutsch umgestellt';
        document.body.appendChild(announcement);
        
        setTimeout(() => announcement.remove(), 1000);
    }
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.about-card, .menu-category, .drink-featured, .contact-card, .feature'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        element.classList.add('reveal');
        observer.observe(element);
    });
}

/**
 * Smooth scroll for anchor links
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Update URL without scrolling
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Utility: Add screen reader only styles if not present
 */
(function addSROnlyStyles() {
    if (!document.querySelector('style[data-sr-only]')) {
        const style = document.createElement('style');
        style.setAttribute('data-sr-only', 'true');
        style.textContent = `
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
        `;
        document.head.appendChild(style);
    }
})();

