// Custom Cursor Logic
const cursorDot = document.getElementById('cursorDot');
const cursorGlow = document.getElementById('cursorGlow');

document.addEventListener('mousemove', (e) => {
    // Dot follows exactly
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    
    // Glow follows with a slight delay using transform/transition for smooth effect
    // But since we want it instant or slight spring, we update left/top
    // To make it smooth, we use requestAnimationFrame, or CSS transition.
    // CSS transition is applied on left/top is okay, but using JS interpolation is better.
    // Since we applied transition on width/height/background, we can just set left/top.
    setTimeout(() => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    }, 50);
});

// Profile Image Upload Logic
const profileImgWrapper = document.getElementById('profileImgWrapper');
const profileImage = document.getElementById('profileImage');
const profileUpload = document.getElementById('profileUpload');

if (profileImgWrapper && profileUpload && profileImage) {
    // Load from local storage if exists
    const savedImage = localStorage.getItem('portfolioProfileImage');
    if (savedImage) {
        profileImage.src = savedImage;
    }

    profileImgWrapper.addEventListener('click', () => {
        profileUpload.click();
    });

    profileUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                profileImage.src = e.target.result;
                localStorage.setItem('portfolioProfileImage', e.target.result); // Save for persistence
            };
            
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// Hover effect for interactive elements
const interactives = document.querySelectorAll('a, button, .skill-pill, .project-card, .highlight-card');
interactives.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.style.width = '60px';
        cursorGlow.style.height = '60px';
        cursorGlow.style.background = 'rgba(0, 229, 255, 0.2)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.style.width = '40px';
        cursorGlow.style.height = '40px';
        cursorGlow.style.background = 'rgba(0, 229, 255, 0.1)';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Remove active class when leaving viewport to allow re-triggering
            entry.target.classList.remove('active');
        }
    });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Form Submission Prevention
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        const subject = encodeURIComponent("Portfolio Contact");
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
        
        window.location.href = `mailto:papireddygariuday@gmail.com?subject=${subject}&body=${body}`;

        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Opening Email Client...';
        btn.style.background = 'var(--neon-blue)';
        btn.style.color = '#000';
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = 'transparent';
            btn.style.color = 'var(--neon-blue)';
            contactForm.reset();
        }, 3000);
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        // Simple toggle for mobile view (requires additional CSS for full menu, 
        // but adding basic toggle logic here)
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
            navActions.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 15, 0.9)';
            navLinks.style.padding = '1rem';
            navLinks.style.borderRadius = '10px';
            
            navActions.style.display = 'flex';
            navActions.style.flexDirection = 'column';
            navActions.style.position = 'absolute';
            navActions.style.top = '100%';
            navActions.style.marginTop = '200px'; 
            navActions.style.left = '0';
            navActions.style.width = '100%';
            navActions.style.background = 'rgba(10, 10, 15, 0.9)';
            navActions.style.padding = '1rem';
        }
    });
}

// Initialize tsParticles with Tiny Floating Particles (Anti-Gravity feel)
tsParticles.load("particles-js", {
    fpsLimit: 60,
    particles: {
        number: {
            value: 60,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#00e5ff"
        },
        shape: {
            type: "circle"
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false
            }
        },
        move: {
            enable: true,
            speed: 0.6,
            direction: "top", // Floating upwards (anti-gravity)
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: true,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "bubble"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 200,
                size: 6,
                duration: 2,
                opacity: 0.8,
                speed: 3
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Timeline Filter Logic
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active state
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                timelineItems.forEach(item => {
                    const itemType = item.getAttribute('data-type');
                    
                    // First fade out
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                    
                    setTimeout(() => {
                        if (filterValue === 'all' || itemType === filterValue) {
                            item.style.display = 'block';
                            // Trigger reflow
                            void item.offsetWidth;
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        } else {
                            item.style.display = 'none';
                        }
                    }, 400); // Wait for fade out transition length
                });
            });
        });
    }
});

// Certifications horizontal parallax scroll
(function() {
    const track = document.getElementById('certTrack');
    const wrapper = document.getElementById('certTrackWrapper');
    if (!track || !wrapper) return;

    // --- Vertical parallax: gentle upward drift as section scrolls into view ---
    let currentY = 0;
    let targetY = 0;
    const maxDrift = 20; // subtle vertical parallax (px), won't conflict with h-scroll

    function lerp(a, b, t) { return a + (b - a) * t; }

    function updateParallax() {
        currentY = lerp(currentY, targetY, 0.05);
        track.style.transform = `translateY(${currentY}px)`;
        requestAnimationFrame(updateParallax);
    }

    window.addEventListener('scroll', () => {
        const rect = wrapper.getBoundingClientRect();
        const winH = window.innerHeight;
        const progress = Math.max(0, Math.min(1, (winH - rect.top) / (winH + rect.height)));
        targetY = -(progress * maxDrift); // drift slightly upward (anti-gravity)
    }, { passive: true });

    requestAnimationFrame(updateParallax);

    // --- Mouse drag-to-scroll for desktop ---
    let isDown = false;
    let startX, scrollLeft;

    wrapper.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - wrapper.offsetLeft;
        scrollLeft = wrapper.scrollLeft;
    });
    wrapper.addEventListener('mouseleave', () => { isDown = false; });
    wrapper.addEventListener('mouseup', () => { isDown = false; });
    wrapper.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - wrapper.offsetLeft;
        const walk = (x - startX) * 1.5;
        wrapper.scrollLeft = scrollLeft - walk;
    });
})();

// Achievements count-up animation
(function () {
    const statItems = document.querySelectorAll('.stat-item[data-target]');
    if (!statItems.length) return;

    function animateCount(el, target, suffix, duration) {
        const valueEl = el.querySelector('.stat-value');
        if (!valueEl) return;
        let start = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            start = Math.min(start + step, target);
            valueEl.textContent = Math.floor(start) + suffix;
            if (start >= target) clearInterval(timer);
        }, 16);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                const suffix = el.getAttribute('data-suffix') || '';
                animateCount(el, target, suffix, 1000);
            } else {
                // Reset value when out of view so it can animate again
                const valueEl = entry.target.querySelector('.stat-value');
                if (valueEl) {
                    const suffix = entry.target.getAttribute('data-suffix') || '';
                    valueEl.textContent = '0' + suffix;
                }
            }
        });
    }, { threshold: 0.3 });

    statItems.forEach(item => observer.observe(item));
})();
