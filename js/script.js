// Tab Switching
const tabs = document.querySelectorAll('.nav-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        // Show corresponding tab content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Create 3D Grid Background
function createGrid() {
    const gridCanvas = document.getElementById('gridCanvas');
    if (!gridCanvas) return;
    
    const gridSize = 60;
    const gridCount = 20;
    
    // Create horizontal lines
    for (let i = 0; i <= gridCount; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line';
        line.style.top = (i * gridSize) + 'px';
        line.style.opacity = (i % 2 === 0) ? '0.3' : '0.15';
        gridCanvas.appendChild(line);
    }
    
    // Create vertical lines
    for (let i = 0; i <= gridCount; i++) {
        const line = document.createElement('div');
        line.className = 'grid-line vertical';
        line.style.left = (i * gridSize) + 'px';
        line.style.opacity = (i % 2 === 0) ? '0.3' : '0.15';
        gridCanvas.appendChild(line);
    }
}

// Initialize grid when DOM is loaded
document.addEventListener('DOMContentLoaded', createGrid);

// Mouse parallax effect for floating objects
document.addEventListener('mousemove', (e) => {
    const floatingObjects = document.querySelectorAll('.floating-object');
    const glowOrbs = document.querySelectorAll('.glow-orb');
    
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    floatingObjects.forEach((obj, index) => {
        const speed = (index + 1) * 10;
        obj.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
    
    glowOrbs.forEach((orb, index) => {
        const speed = (index + 1) * 15;
        orb.style.transform = `translate(${-x * speed}px, ${-y * speed}px) scale(${1 + Math.abs(x) * 0.2})`;
    });
});

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const carousel = document.querySelector('.carousel');

function updateCarousel() {
    carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlide].classList.add('active');
}

function moveCarousel(direction) {
    currentSlide += direction;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    if (currentSlide >= slides.length) currentSlide = 0;
    updateCarousel();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
}

// Auto-advance carousel
setInterval(() => {
    moveCarousel(1);
}, 5000);

// Trifolds Carousel Functionality
function changeSlide(btn, direction) {
    const container = btn.closest('.carousel-container');
    const slides = container.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    
    // Find current active slide
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            currentIndex = index;
        }
    });
    
    // Remove active from current slide
    slides[currentIndex].classList.remove('active');
    
    // Calculate new index
    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    // Add active to new slide
    slides[newIndex].classList.add('active');
}

// Auto-advance Trifolds carousel
document.querySelectorAll('.carousel-container').forEach(container => {
    setInterval(() => {
        const btn = container.querySelector('.next');
        if (btn) changeSlide(btn, 1);
    }, 4000);
});
