// Common Components - Dynamic injection for all pages

// Define the current page for active navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

// Background Component
const backgroundHTML = `
    <!-- Dynamic Background -->
    <div class="bg-grid">
        <div class="grid-canvas" id="gridCanvas"></div>
    </div>
    
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
`;

// Navigation Component
const navigationHTML = `
    <!-- Navigation -->
    <nav class="nav-container">
        <button class="hamburger" onclick="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
        </button>
        <div class="nav-tabs" id="navTabs">
            <a href="../pages/index.html" class="nav-tab ${currentPage === 'index.html' ? 'active' : ''}">
                <i class="fas fa-home"></i> Home
            </a>
            <a href="../pages/photo.html" class="nav-tab ${currentPage === 'photo.html' ? 'active' : ''}">
                <i class="fas fa-paint-brush"></i> Graphic
            </a>
            <a href="../pages/website.html" class="nav-tab ${currentPage === 'website.html' ? 'active' : ''}">
                <i class="fas fa-globe"></i> Web
            </a>
            <a href="../pages/app.html" class="nav-tab ${currentPage === 'app.html' ? 'active' : ''}">
                <i class="fas fa-mobile-alt"></i> App
            </a>
        </div>
    </nav>
`;

// Function to toggle mobile menu
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navTabs = document.getElementById('navTabs');
    hamburger.classList.toggle('active');
    navTabs.classList.toggle('active');
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
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navTabs.classList.remove('active');
            }
        });
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
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', injectComponents);
