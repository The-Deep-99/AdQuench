/**
 * AdQuench Website JavaScript
 * All interactive functionality and animations
 */

// ========================================
// Mobile Menu Toggle
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // ========================================
    // Smooth Scrolling for Navigation Links
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });

    // ========================================
    // Navbar Scroll Effect
    // ========================================
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('shadow-md');
            } else {
                nav.classList.remove('shadow-md');
            }
        });
    }

    // ========================================
    // Form Validation and Submission
    // ========================================
    const customerForm = document.getElementById('customerForm');
    const advertiserForm = document.getElementById('advertiserForm');
    const successModal = document.getElementById('successModal');

    // Customer Form Handler
    if (customerForm) {
        customerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('[name="name"]').value.trim();
            const email = this.querySelector('[name="email"]').value.trim();
            const message = this.querySelector('[name="message"]').value.trim();
            
            if (!name || !email || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showModal();
            this.reset();
        });
    }

    // Advertiser Form Handler
    if (advertiserForm) {
        advertiserForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const company = this.querySelector('[name="company"]').value.trim();
            const email = this.querySelector('[name="email"]').value.trim();
            const package = this.querySelector('[name="package"]').value;
            
            if (!company || !email || !package) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            showModal();
            this.reset();
        });
    }

    // ========================================
    // Modal Functions
    // ========================================
    function showModal() {
        if (successModal) {
            successModal.classList.remove('hidden');
            successModal.classList.add('flex');
            document.body.style.overflow = 'hidden';
        }
    }

    window.closeModal = function() {
        if (successModal) {
            successModal.classList.add('hidden');
            successModal.classList.remove('flex');
            document.body.style.overflow = '';
        }
    };

    // Close modal on outside click
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && successModal && !successModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // ========================================
    // Live Counter Animation
    // ========================================
    const counters = document.querySelectorAll('.counter[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ========================================
    // Scroll Animations
    // ========================================
    const animatedElements = document.querySelectorAll('.fade-in, .card-hover, .stat-card, .testimonial-card');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        scrollObserver.observe(el);
    });

    // ========================================
    // Bottles Pause on Hover
    // ========================================
    const bottles = document.querySelectorAll('.bottle-3d');
    bottles.forEach(bottle => {
        bottle.addEventListener('mouseenter', () => {
            bottle.style.animationPlayState = 'paused';
        });
        bottle.addEventListener('mouseleave', () => {
            bottle.style.animationPlayState = 'running';
        });
    });

    // ========================================
    // Kiosk Cards Interaction
    // ========================================
    const kioskCards = document.querySelectorAll('.kiosk-card');
    kioskCards.forEach(card => {
        card.addEventListener('click', () => {
            showNotification('Location details coming soon!', 'info');
        });
    });

    // ========================================
    // Button Click Handlers
    // ========================================
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        if (!btn.type || btn.type !== 'submit') {
            btn.addEventListener('click', (e) => {
                if (!btn.closest('form')) {
                    const text = btn.textContent.trim().toLowerCase();
                    if (text.includes('get started') || text.includes('advertise')) {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (text.includes('find')) {
                        document.getElementById('bottles')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (text.includes('view all')) {
                        showNotification('Full location map coming soon!', 'info');
                    }
                }
            });
        }
    });

    // ========================================
    // View Details Buttons
    // ========================================
    document.querySelectorAll('button').forEach(btn => {
        if (btn.textContent.includes('View Details')) {
            btn.addEventListener('click', () => {
                showNotification('Detailed location information coming soon!', 'info');
            });
        }
    });

});

// ========================================
// Utility Functions
// ========================================

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(n => n.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 flex items-center gap-3`;
    
    // Set colors based on type
    if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    } else if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
        notification.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// Dynamic Stats Update (Simulated)
// ========================================
function updateLiveStats() {
    const counter = document.querySelector('.counter[data-target="52347"]');
    if (counter) {
        let current = parseInt(counter.textContent.replace(/,/g, ''));
        current += Math.floor(Math.random() * 5);
        counter.textContent = current.toLocaleString();
    }
}

// Update stats every 10 seconds
setInterval(updateLiveStats, 10000);

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener('scroll', () => {
    const heroSection = document.getElementById('home');
    if (heroSection) {
        const scrolled = window.pageYOffset;
        const parallaxElements = heroSection.querySelectorAll('.relative > div');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrolled * 0.1}px)`;
        });
    }
});

// ========================================
// Lazy Loading for Images
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Console Welcome Message
// ========================================
console.log('%c Welcome to AdQuench! ', 'background: linear-gradient(135deg, #547792, #1A3263); color: white; font-size: 20px; padding: 10px 20px; border-radius: 10px;');
console.log('%c Free Water, Smart Advertising ', 'color: #547792; font-size: 14px;');
