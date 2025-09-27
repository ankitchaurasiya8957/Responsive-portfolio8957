// Global Variables
let particles = [];
let isLoaded = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize Website
function initializeWebsite() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize components after loading
    setTimeout(() => {
        hideLoadingScreen();
        initializeParticles();
        initializeNavigation();
        initializeAnimations();
        initializeTypingEffect();
        initializeScrollAnimations();
        initializeFormHandling();
        isLoaded = true;
    }, 800);
}

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'flex';
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.classList.add('loaded');
    
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 500);
}

// Particle System
function initializeParticles() {
    const particleContainer = document.getElementById('particles-container');
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random size between 2-8px
    const size = Math.random() * 6 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    
    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    
    // Random animation duration
    const duration = Math.random() * 10 + 5;
    particle.style.animationDuration = duration + 's';
    
    // Random animation delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
    particles.push(particle);
}

// Navigation Functions
function initializeNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scroll and active link highlighting
    initializeSmoothScroll();
}

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Animation Functions
function initializeAnimations() {
    // Add hover effects to cards
    addCardHoverEffects();
    
    // Initialize floating cards animation
    initializeFloatingCards();
}

function addCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .timeline-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = card.classList.contains('timeline-card') 
                ? 'translateY(-5px)' 
                : 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

function initializeFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const delay = index * 2;
        card.style.animationDelay = delay + 's';
        
        // Add random movement
        setInterval(() => {
            if (isLoaded) {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                card.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }
        }, 3000 + (index * 1000));
    });
}

// Typing Effect
function initializeTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Web Developer',
        'Frontend Designer', 
        'UI/UX Designer',
        'Software Engineer',
        'Problem Solver'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeText, typeSpeed);
    }
    
    typeText();
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all elements with reveal animation
    const revealElements = document.querySelectorAll('.reveal-animation');
    revealElements.forEach(element => {
        observer.observe(element);
    });
}

// Form Handling
function initializeFormHandling() {
    const form = document.querySelector('.contact-form');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Add floating label effect
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value) {
                input.setAttribute('data-filled', 'true');
            } else {
                input.removeAttribute('data-filled');
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormSubmission(form);
    });
}

function handleFormSubmission(form) {
    const submitBtn = form.querySelector('.btn');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success state
        submitBtn.innerHTML = '<i class="bx bx-check"></i> Message Sent!';
        submitBtn.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        
        // Reset form
        form.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
        // Show success notification
        showNotification('Message sent successfully!', 'success');
    }, 2000);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#8b5cf6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Window resize handler
window.addEventListener('resize', debounce(() => {
    // Recalculate particle positions
    particles.forEach(particle => {
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
    });
}, 250));

// Performance optimization
function optimizeForPerformance() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency < 4 || window.innerWidth < 768) {
        document.documentElement.style.setProperty('--transition-slow', '0.3s');
        // Reduce particle count
        const particleCount = particles.length;
        for (let i = particleCount; i > 10; i--) {
            particles[i - 1].remove();
            particles.pop();
        }
    }
}

// Initialize performance optimizations
optimizeForPerformance();

// Error handling
window.addEventListener('error', (e) => {
    console.error('Website error:', e.error);
});

// Console message
console.log('%c🚀 Portfolio Website by Ankit Chaurasiya', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with HTML, CSS, and JavaScript', 'color: #06b6d4; font-size: 12px;');