// Loader
window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    setTimeout(function() {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
    }, 2000);
});

// Mobile Menu Toggle - FIXED POSITIONING
const mobileMenu = document.querySelector('.mobile-menu');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;

// Create overlay element
const navOverlay = document.createElement('div');
navOverlay.className = 'nav-overlay';
document.body.appendChild(navOverlay);

mobileMenu.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
    navOverlay.classList.toggle('active');
    
    // Toggle body scroll
    body.style.overflow = navMenu.classList.contains('show') ? 'hidden' : '';
});

// Close mobile menu when clicking on overlay
navOverlay.addEventListener('click', function() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('show');
    navOverlay.classList.remove('active');
    body.style.overflow = '';
});

// Close mobile menu when clicking on links
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('show');
        navOverlay.classList.remove('active');
        body.style.overflow = '';
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Carousel Functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.carousel-dot');
const totalSlides = slides.length;

function showSlide(n) {
    // Remove active class from all slides and dots
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Update current slide index
    currentSlide = (n + totalSlides) % totalSlides;
    
    // Add active class to current slide and dot
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

// Next/previous controls
document.querySelector('.carousel-arrow.next').addEventListener('click', () => {
    showSlide(currentSlide + 1);
});

document.querySelector('.carousel-arrow.prev').addEventListener('click', () => {
    showSlide(currentSlide - 1);
});

// Dot controls
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto advance carousel
let carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
}, 5000);

// Pause carousel on hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
});

carousel.addEventListener('mouseleave', () => {
    carouselInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
});

// Testimonial Carousel
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
const totalTestimonials = testimonials.length;

function showTestimonial(n) {
    // Remove active class from all testimonials and dots
    testimonials.forEach(testimonial => testimonial.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));
    
    // Update current testimonial index
    currentTestimonial = (n + totalTestimonials) % totalTestimonials;
    
    // Add active class to current testimonial and dot
    testimonials[currentTestimonial].classList.add('active');
    testimonialDots[currentTestimonial].classList.add('active');
}

// Dot controls for testimonials
testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showTestimonial(index);
    });
});

// Auto advance testimonials
setInterval(() => {
    showTestimonial(currentTestimonial + 1);
}, 6000);

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.padding = '10px 0';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'var(--secondary)';
        header.style.padding = '20px 0';
        header.style.backdropFilter = 'none';
    }
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animation on scroll
const animateOnScroll = function() {
    const elements = document.querySelectorAll('.service-card, .benefit, .service-detail, .stat');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service-card, .benefit, .service-detail, .stat').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Counter animation for stats
const stats = document.querySelectorAll('.stat h3');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.textContent);
            let current = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
            }, 30);
            observer.unobserve(stat);
        }
    });
}, observerOptions);

stats.forEach(stat => {
    observer.observe(stat);
});

// Form handling (placeholder for contact form)
document.addEventListener('DOMContentLoaded', function() {
    // Add any form handling logic here when you add a contact form
    console.log('Dira Digital website loaded successfully!');
    
    // Initialize any other interactive elements
    initializeInteractiveElements();
});

function initializeInteractiveElements() {
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// WhatsApp button interaction
const whatsappButton = document.querySelector('.whatsapp-float');
whatsappButton.addEventListener('click', function(e) {
    // You can add any tracking or analytics here
    console.log('WhatsApp button clicked');
});