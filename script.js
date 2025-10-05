// Typing Effect for Hero Section
class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }

    type() {
        const current = this.wordIndex % this.words.length;
        const fullTxt = this.words[current];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2;
        }

        if (!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Initialize typing effect when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

function init() {
    const txtElement = document.querySelector('#typing-text');
    const words = ['Web Developer', 'Python Developer', 'AI Enthusiast'];
    const wait = 3000;
    
    new TypeWriter(txtElement, words, wait);
}

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Clear form
    this.reset();
    
    // You can replace this with actual form submission logic
    // For example, using fetch to send to a server or email service
    console.log('Form submitted:', { name, email, message });
});

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .certification-card, .about-content, .experience-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add hover effects for skill items
document.addEventListener('DOMContentLoaded', () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

// Add typing cursor effect
const typingText = document.querySelector('#typing-text');
if (typingText) {
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
        color: #fbbf24;
        animation: blink 1s infinite;
    `;
    
    // Add cursor animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Append cursor to typing text
    typingText.appendChild(cursor);
}

// CV Download Function
function downloadCV() {
    try {
        // Show loading notification
        showNotification('Generating CV document... Please wait.', 'info');
        
        // Create CV content with proper formatting
        const cvContent = `ABDUL REHMAN
Web Developer & AI Enthusiast
=====================================

CONTACT INFORMATION
Email: maharabdulrehman5@gmail.com
Location: Faisalabad, Pakistan
Website: rehmandev.site
LinkedIn: linkedin.com/in/your-profile
GitHub: github.com/your-username
Hugging Face: huggingface.co/Rehman82

EDUCATION
Bachelor of Science in Computer Science
Government College University Faisalabad (GCUF)
7th Semester • CGPA: 3.73

PROFESSIONAL EXPERIENCE
Web Developer
Wowbly Technology, Faisalabad
• Developing and maintaining dynamic web solutions using PHP, HTML, CSS, and JavaScript
• Collaborating with a team to deliver high-quality projects
• Creating responsive and user-friendly web applications

SKILLS

Web Development:
• HTML5 & CSS3
• JavaScript
• PHP
• WordPress

Python Development:
• Data Analysis
• AI Applications
• Scripting

Marketing:
• Digital Marketing
• Social Media Management
• SEO

Tools:
• VS Code
• PyCharm
• Git
• XAMPP
• n8n
• ChatGPT

PROJECTS

dmremovals
• A professional, client-facing website demonstrating functional and user-friendly design
• Link: https://www.dmremovals.com.au

Python Mini-Projects
• A collection of 10+ utility apps and AI tools built with Python and deployed on Hugging Face
• Examples: AI Chatbot, Face Detection, Image Compressor
• Link: https://huggingface.co/Rehman82

CERTIFICATIONS
• Digital Marketing (DigiSkills)
• Freelancing (DigiSkills)
• Social Media Manager (HP LIFE)
• IELTS Certified

ABOUT ME
I am a 7th-semester Computer Science student at Government College University Faisalabad. My journey in tech is driven by a deep interest in software development, artificial intelligence, and digital marketing. I am a hands-on developer, currently working at Wowbly Technology, and I love bringing ideas to life, whether it's a dynamic website or a helpful Python script. My international travel to Dubai has also given me a broader perspective that I bring to my work.

=====================================
Generated on: ${new Date().toLocaleDateString()}`;

        // Create a blob with the CV content
        const blob = new Blob([cvContent], { type: 'text/plain' });
        
        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Abdul_Rehman_CV.txt';
        
        // Trigger the download
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Show success notification
        showNotification('CV downloaded successfully! You can open it in any text editor or Word processor.', 'success');
        
    } catch (error) {
        console.error('Error downloading CV:', error);
        showNotification('Error downloading CV. Please try again.', 'error');
    }
} 
