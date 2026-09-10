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

        let typeSpeed = 100;

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

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = document.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    // TypeWriter
    const txtElement = document.querySelector('#typing-text');
    if (txtElement) {
        const words = [
            'AI & NLP Researcher',
            'Mobile & Cloud Systems Engineer',
            'Top 100 Startup Founder',
            'National Hackathon Builder',
            'Aspiring Graduate Scholar'
        ];
        new TypeWriter(txtElement, words, 2500);
    }

    // Scroll to Top
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
            
            // Navbar scroll effect
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.style.padding = '0.8rem 0';
                    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                } else {
                    navbar.style.padding = '1.2rem 0';
                    navbar.style.background = 'rgba(30, 41, 59, 0.7)';
                }
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Certification Category Filtering & Modal Lightbox
    const filterBtns = document.querySelectorAll('.cert-filter-btn');
    const certCards = document.querySelectorAll('.certification-card');
    const certModal = document.getElementById('certModal');
    const certModalImg = document.getElementById('certModalImg');
    const certModalBadge = document.getElementById('certModalBadge');
    const certModalTitle = document.getElementById('certModalTitle');
    const certModalIssuer = document.getElementById('certModalIssuer');
    const certModalClose = document.querySelector('.cert-modal-close');
    const certModalBackdrop = document.querySelector('.cert-modal-backdrop');
    const certModalPrev = document.querySelector('.cert-modal-prev');
    const certModalNext = document.querySelector('.cert-modal-next');

    let currentVisibleCards = Array.from(certCards);
    let currentModalIndex = 0;

    // Filter Logic
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');
                currentVisibleCards = [];

                certCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'flex';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        currentVisibleCards.push(card);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => {
                            if (card.style.opacity === '0') {
                                card.style.display = 'none';
                            }
                        }, 300);
                    }
                });
            });
        });
    }

    // Function to open Modal with specific card index in currentVisibleCards
    function openCertModal(index) {
        if (!currentVisibleCards.length || !certModal) return;
        currentModalIndex = (index + currentVisibleCards.length) % currentVisibleCards.length;
        const card = currentVisibleCards[currentModalIndex];

        const imgEl = card.querySelector('.cert-image-frame img');
        const badgeEl = card.querySelector('.cert-badge');
        const titleEl = card.querySelector('h3');
        const issuerEl = card.querySelector('.cert-details p');

        if (imgEl) {
            certModalImg.src = imgEl.src;
            certModalImg.style.display = 'block';
        } else {
            certModalImg.style.display = 'none';
        }

        if (badgeEl) {
            certModalBadge.textContent = badgeEl.textContent;
            certModalBadge.className = badgeEl.className;
        }

        if (titleEl) {
            certModalTitle.textContent = titleEl.textContent;
        }

        if (issuerEl) {
            certModalIssuer.innerHTML = issuerEl.innerHTML;
        }

        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    // Direct modal opener for standalone buttons (e.g. Hackathon certificates)
    function openDirectModal(src, title, issuer, badgeText) {
        if (!certModal) return;
        if (certModalImg) {
            certModalImg.src = src;
            certModalImg.style.display = 'block';
        }
        if (certModalTitle) certModalTitle.textContent = title;
        if (certModalIssuer) certModalIssuer.innerHTML = `<i class="fas fa-award"></i> ${issuer}`;
        if (certModalBadge) {
            certModalBadge.textContent = badgeText || 'Achievement';
            certModalBadge.className = 'cert-badge tech-ai';
        }

        // Hide prev/next navigation for single direct views
        if (certModalPrev) certModalPrev.style.display = 'none';
        if (certModalNext) certModalNext.style.display = 'none';

        certModal.classList.add('active');
        certModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCertModal() {
        if (!certModal) return;
        certModal.classList.remove('active');
        certModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (certModalPrev) certModalPrev.style.display = '';
        if (certModalNext) certModalNext.style.display = '';
    }

    // Attach click event to all certification cards
    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const index = currentVisibleCards.indexOf(card);
            if (index !== -1) {
                openCertModal(index);
            } else {
                openCertModal(0);
            }
        });
    });

    // Attach click events to Hackathon & standalone certificate buttons
    const directCertButtons = document.querySelectorAll('.btn-cert-modal');
    directCertButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const src = btn.getAttribute('data-cert-src');
            const title = btn.getAttribute('data-cert-title');
            const issuer = btn.getAttribute('data-cert-issuer');
            const badge = btn.getAttribute('data-cert-badge');
            openDirectModal(src, title, issuer, badge);
        });
    });

    if (certModalClose) certModalClose.addEventListener('click', closeCertModal);
    if (certModalBackdrop) certModalBackdrop.addEventListener('click', closeCertModal);

    if (certModalPrev) {
        certModalPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            openCertModal(currentModalIndex - 1);
        });
    }

    if (certModalNext) {
        certModalNext.addEventListener('click', (e) => {
            e.stopPropagation();
            openCertModal(currentModalIndex + 1);
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!certModal || !certModal.classList.contains('active')) return;
        if (e.key === 'Escape') closeCertModal();
        if (e.key === 'ArrowLeft') openCertModal(currentModalIndex - 1);
        if (e.key === 'ArrowRight') openCertModal(currentModalIndex + 1);
    });

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .certification-card, .experience-item, .stat, .recognition-info, .roller-item, .hackathon-card, .academic-card, .research-spotlight-card, .interest-card, .contact-card'
    );
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(25px)';
        el.style.transition = 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
});

// Add animation class via JS for simplicity
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .nav-menu.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: var(--bg-dark);
        padding: 2rem;
        border-bottom: 1px solid var(--glass-border);
        gap: 1.5rem;
    }
    
    @media (max-width: 768px) {
        .hamburger { display: flex; }
        .nav-menu { display: none; }
    }
`;
document.head.appendChild(style);
