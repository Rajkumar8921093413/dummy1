// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = document.querySelector('.menu-btn i');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    if (navLinks.classList.contains('active')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
});

// Close menu when link is clicked
document.querySelectorAll('.nav-links li a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Sticky Navbar Background on Scroll
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Typewriter Effect
const roles = ["Software Developer", "Full Stack Developer", "Tech Enthusiast"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;
const typewriterElement = document.getElementById('typewriter');

function type() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 2000; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500; // Pause before new word
    }
    
    setTimeout(type, typeSpeed);
}

// Start typewriter effect
if (typewriterElement) {
    setTimeout(type, 1000);
}

// Scroll Animation with Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Staggered animation for cards
document.querySelectorAll('.skill-category, .project-card, .timeline-item').forEach((el, index) => {
    el.style.transitionDelay = `${index * 0.1}s`;
    el.classList.add('fade-in');
    observer.observe(el);
});

// Form Submission (Prevent Default)
const form = document.getElementById('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.style.opacity = '0.8';
        
        // Simulate API call
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#10b981';
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        }, 1500);
    });
}
