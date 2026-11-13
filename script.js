/**
 * Frida & Diego - Mexican Restaurant Website
 * Interactive functionality and language toggle
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initCampaignPopup();
    initLandingPortrait();
    initGuestReviews();
});

function initGuestReviews() {
    const section = document.querySelector('.guest-reviews');
    if (!section) return;
    const track = section.querySelector('.guest-review-grid');
    const cards = [...track.children];
    const viewport = document.createElement('div');
    viewport.className = 'guest-review-viewport';
    track.before(viewport);
    viewport.append(track);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let index = 0, timer;
    const firstCopy = cards[0].cloneNode(true);
    firstCopy.setAttribute('aria-hidden', 'true');
    track.append(firstCopy);
    function show(value, animate = true) {
        index = value;
        track.style.transition = animate ? '' : 'none';
        track.style.transform = 'translateX(-' + index * 100 + '%)';
        cards.forEach((card, i) => card.setAttribute('aria-hidden', String(i !== index % cards.length)));
    }
    track.addEventListener('transitionend', (event) => {
        if (event.target === track && event.propertyName === 'transform' && index === cards.length) show(0, false);
    });
    function schedule() {
        clearInterval(timer);
        const staticMode = reducedMotion.matches;
        section.classList.toggle('has-review-carousel', !staticMode);
        firstCopy.hidden = staticMode;
        if (staticMode) {
            track.style.transform = '';
            cards.forEach(card => card.removeAttribute('aria-hidden'));
        } else {
            show(0, false);
            if (!document.hidden) timer = setInterval(() => show(index + 1), 5500);
        }
    }
    document.addEventListener('visibilitychange', schedule);
    reducedMotion.addEventListener('change', schedule);
    schedule();
}

function initLandingPortrait() {
    const portrait = document.querySelector('.landing-page .hero-logo');
    if (!portrait) return;

    const reveal = () => portrait.classList.add('portrait-revealed');
    const poster = document.querySelector('.campaign-popup[open]');
    if (poster) {
        poster.addEventListener('close', reveal, { once: true });
    } else {
        reveal();
    }
}

/** Poster and optional text details are present in the original HTML. */
function initCampaignPopup() {
    const popup = document.querySelector('dialog.campaign-popup');
    if (!popup) return;
    const previousFocus = document.activeElement;
    popup.querySelector('.campaign-popup-close').addEventListener('click', () => popup.close());
    popup.addEventListener('click', event => {
        if (event.target !== popup) return;
        const bounds = popup.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) popup.close();
    });
    popup.addEventListener('close', () => {
        document.body.classList.remove('popup-open');
        if (previousFocus && previousFocus !== document.body) previousFocus.focus({ preventScroll: true });
    });
    document.body.classList.add('popup-open');
    popup.showModal();
}

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
 * Scroll reveal animations
 */
function initScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)) return;
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
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

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
