// Common Components - Dynamic injection for all pages

// Define the current page for active navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isMainPage = currentPage === 'main-page.html';

function getNavHref(pageHref, sectionId) {
    return isMainPage ? `#${sectionId}` : pageHref;
}

function setActiveNavTab(activeSectionId) {
    const navLinks = document.querySelectorAll('.nav-tab');
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-tab') === activeSectionId);
    });
}

function getMainPageActiveSection() {
    const sectionIds = ['home', 'website', 'app'];
    let activeSectionId = sectionIds[0];

    sectionIds.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 160) {
            activeSectionId = sectionId;
        }
    });

    return activeSectionId;
}

function initializeMainPageNavigation() {
    if (!isMainPage) return;

    const navLinks = document.querySelectorAll('.nav-tab');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetSectionId = link.getAttribute('data-tab');
            setActiveNavTab(targetSectionId);
        });
    });

    const syncActiveSection = () => {
        const hashSectionId = window.location.hash.replace('#', '');
        const activeSectionId = hashSectionId || getMainPageActiveSection();
        setActiveNavTab(activeSectionId);
    };

    document.addEventListener('scroll', syncActiveSection, { passive: true });
    window.addEventListener('hashchange', syncActiveSection);
    syncActiveSection();
}

// Background Component
const backgroundHTML = `
    <!-- Dynamic Background -->
    <div class="bg-grid">
        <div class="grid-canvas" id="gridCanvas"></div>
    </div>
    <div class="crt-overlay"></div>
    <div class="vignette-overlay"></div>
    
    <!-- Floating Objects -->
    <div class="floating-object"></div>
    <div class="floating-object"></div>
    <div class="floating-object"></div>
    <div class="floating-object"></div>
    <div class="floating-object"></div>
    
    <!-- Glowing Orbs -->
    <div class="glow-orb"></div>
    <div class="glow-orb"></div>
    <div class="glow-orb"></div>
    <div class="hud-readout">
        <span class="hud-status">CRT Online</span>
        <span class="hud-bars"><span></span><span></span><span></span></span>
    </div>
`;

// Navigation Component
const navigationHTML = `
    <!-- Navigation -->
    <nav class="nav-container">
        <a href="${getNavHref('../pages/index.html', 'home')}" class="nav-logo">
            <img src="../assets/img/LOGO_PUZZ.png" alt="Logo" class="logo-img">
        </a>
        <div class="nav-mobile-title">
            <span class="nav-mobile-kicker">Portfolio</span>
            <span class="nav-mobile-subtitle">Mobile Command</span>
        </div>
        <button class="hamburger" type="button" aria-expanded="false" aria-controls="navTabs" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="nav-tabs" id="navTabs">
            <a href="${getNavHref('../pages/index.html', 'home')}" class="nav-tab ${(currentPage === 'index.html' || isMainPage) ? 'active' : ''}" data-tab="home">
                <i class="fas fa-home"></i> Home
            </a>
            <a href="${getNavHref('../pages/website.html', 'website')}" class="nav-tab ${currentPage === 'website.html' ? 'active' : ''}" data-tab="website">
                <i class="fas fa-globe"></i> Web
            </a>
            <a href="${getNavHref('../pages/app.html', 'app')}" class="nav-tab ${currentPage === 'app.html' ? 'active' : ''}" data-tab="app">
                <i class="fas fa-mobile-alt"></i> App
            </a>
        </div>
    </nav>
    <button class="nav-backdrop" id="navBackdrop" type="button" aria-label="Close navigation"></button>
`;

// Function to toggle mobile menu
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navTabs = document.getElementById('navTabs');
    const navBackdrop = document.getElementById('navBackdrop');
    const shouldOpen = !navTabs.classList.contains('active');

    hamburger.classList.toggle('active', shouldOpen);
    hamburger.setAttribute('aria-expanded', String(shouldOpen));
    navTabs.classList.toggle('active', shouldOpen);
    if (navBackdrop) {
        navBackdrop.classList.toggle('active', shouldOpen);
    }
    document.body.classList.toggle('nav-open', shouldOpen && window.innerWidth <= 768);
}

// Make toggleMenu available globally
window.toggleMenu = toggleMenu;

// Close menu when clicking a nav link on mobile
function closeMenuOnClick() {
    const navLinks = document.querySelectorAll('.nav-tab');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navTabs = document.getElementById('navTabs');
            const navBackdrop = document.getElementById('navBackdrop');
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navTabs.classList.remove('active');
                if (navBackdrop) {
                    navBackdrop.classList.remove('active');
                }
                document.body.classList.remove('nav-open');
            }
        });
    });
}

function initializeMobileNavDismiss() {
    const navBackdrop = document.getElementById('navBackdrop');

    if (navBackdrop) {
        navBackdrop.addEventListener('click', () => {
            const hamburger = document.querySelector('.hamburger');
            const navTabs = document.getElementById('navTabs');

            hamburger?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
            navTabs?.classList.remove('active');
            navBackdrop.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            const hamburger = document.querySelector('.hamburger');
            const navTabs = document.getElementById('navTabs');

            hamburger?.classList.remove('active');
            hamburger?.setAttribute('aria-expanded', 'false');
            navTabs?.classList.remove('active');
            navBackdrop?.classList.remove('active');
            document.body.classList.remove('nav-open');
        }
    });
}

// Function to inject components
function injectComponents() {
    // Insert background at the start of body
    document.body.insertAdjacentHTML('afterbegin', backgroundHTML);
    
    // Insert navigation after background
    const bgGrid = document.querySelector('.bg-grid');
    if (bgGrid) {
        bgGrid.insertAdjacentHTML('afterend', navigationHTML);
    }
    
    // Initialize grid after components are injected
    createGrid();
    
    // Add close menu on click listeners
    closeMenuOnClick();
    initializeMobileNavDismiss();

    // Sync active navigation for the one-page mobile layout
    initializeMainPageNavigation();
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', injectComponents);
