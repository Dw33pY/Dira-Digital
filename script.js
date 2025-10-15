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
    const elements = document.querySelectorAll('.service-card, .benefit, .service-detail, .stat, .blog-post, .portfolio-item, .team-member');
    
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
document.querySelectorAll('.service-card, .benefit, .service-detail, .stat, .blog-post, .portfolio-item, .team-member').forEach(element => {
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

// Portfolio Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Blog Search Functionality
function initializeBlogSearch() {
    const searchInput = document.querySelector('.search-widget input');
    const searchButton = document.querySelector('.search-widget button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function() {
            performBlogSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performBlogSearch(searchInput.value);
            }
        });
    }
}

function performBlogSearch(query) {
    if (query.trim()) {
        // In a real implementation, this would make an API call
        // For now, we'll just show an alert
        alert(`Searching for: ${query}`);
        // You would typically redirect to a search results page
        // window.location.href = `blog-search.html?q=${encodeURIComponent(query)}`;
    }
}

// Newsletter Form Handling
function initializeNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (validateEmail(email)) {
                // Simulate newsletter subscription
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Social Share Functionality
function initializeSocialShare() {
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList[1]; // facebook, twitter, linkedin
            const url = window.location.href;
            const title = document.title;
            
            let shareUrl;
            
            switch(platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'twitter':
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
                    break;
                case 'linkedin':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// Blog Post Reading Time
function calculateReadingTime() {
    const article = document.querySelector('.article-content');
    if (article) {
        const text = article.textContent;
        const wordCount = text.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 words per minute
        
        const readingTimeElement = document.querySelector('.post-read-time');
        if (readingTimeElement) {
            readingTimeElement.innerHTML = `<i class="fas fa-clock"></i> ${readingTime} min read`;
        }
    }
}

// Initialize all blog functionality
function initializeBlogFeatures() {
    initializeBlogSearch();
    initializeNewsletterForm();
    initializeSocialShare();
    calculateReadingTime();
}

// Form handling (placeholder for contact form)
document.addEventListener('DOMContentLoaded', function() {
    // Add any form handling logic here when you add a contact form
    console.log('Dira Digital website loaded successfully!');
    
    // Initialize any other interactive elements
    initializeInteractiveElements();
    initializeBlogFeatures();
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

// Update smooth scrolling to only work for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Only prevent default if it's a same-page anchor
        if (this.getAttribute('href') !== '#' && 
            this.pathname === window.location.pathname) {
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
        }
    });
});