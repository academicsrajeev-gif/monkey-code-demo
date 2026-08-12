/* ============================================================
   Rajeev Ranjan — Portfolio JavaScript
   Initializes all CDN libraries & interactions
   ============================================================ */

'use strict';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- PAGE LOADER ---------- */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, prefersReducedMotion ? 0 : 600);
});

/* Prevent scroll while loader visible */
document.body.classList.add('no-scroll');

/* ---------- FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- NAVBAR ---------- */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    scrollTopBtn.classList.toggle('show', window.scrollY > 500);
});

const navOverlay = document.getElementById('navOverlay');

function setMenuOpen(open) {
    hamburger.classList.toggle('active', open);
    navLinks.classList.toggle('open', open);
    if (navOverlay) {
        navOverlay.classList.toggle('show', open);
        navOverlay.hidden = !open;
    }
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('menu-open', open);
}

hamburger.addEventListener('click', () => {
    setMenuOpen(!navLinks.classList.contains('open'));
});

if (navOverlay) {
    navOverlay.addEventListener('click', () => setMenuOpen(false));
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenuOpen(false);
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => setMenuOpen(false));
});

/* Active nav highlight on scroll (ScrollSpy) */
const sections = document.querySelectorAll('section[id], header[id]');
function updateActiveLink() {
    const scrollPos = window.scrollY + 120;
    let currentId = 'home';
    sections.forEach(section => {
        if (section.offsetTop <= scrollPos) {
            currentId = section.id;
        }
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
}
window.addEventListener('scroll', updateActiveLink);

/* ---------- SCROLL TO TOP ---------- */
const scrollTopBtn = document.getElementById('scrollTopBtn');
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
});

/* ---------- THEME TOGGLE (localStorage) ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';

function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    themeToggle.innerHTML = theme === 'dark'
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    localStorage.setItem('portfolio-theme', theme);
}
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ---------- HERO: tsParticles ---------- */
if (!prefersReducedMotion) {
tsParticles.load('particles-js', {
    fullScreen: { enable: false },
    background: { color: 'transparent' },
    fpsLimit: 60,
    interactivity: {
        events: {
            onHover: { enable: true, mode: 'grab' },
            resize: true
        },
        modes: {
            grab: { distance: 160, links: { opacity: 0.4 } },
            bubble: { distance: 200, duration: 2, size: 6, opacity: 0.2 }
        }
    },
    particles: {
        number: { value: 90, density: { enable: true, width: 800, height: 800 } },
        color: { value: ['#00D4FF', '#0078D4', '#FF6B35'] },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: { min: 1, max: 3 }, random: true },
        links: {
            enable: true,
            distance: 130,
            color: '#00D4FF',
            opacity: 0.18,
            width: 1
        },
        move: {
            enable: true,
            speed: 1.2,
            direction: 'none',
            random: false,
            straight: false,
            outModes: { default: 'out' }
        }
    },
    detectRetina: true
});
}

/* ---------- HERO: Typed.js ---------- */
const typedEl = document.getElementById('typed');
if (typedEl) {
    if (prefersReducedMotion) {
        typedEl.textContent = 'Senior Data Engineer';
    } else {
        new Typed('#typed', {
        strings: [
            'Senior Data Engineer',
            'Azure Expert',
            'Databricks Specialist',
            'Cloud ETL Expert'
        ],
        typeSpeed: 55,
        backSpeed: 30,
        backDelay: 1600,
        startDelay: 800,
        loop: true,
        showCursor: true
        });
    }
}

/* ---------- HERO: Download CV (verify file, then download) ---------- */
const downloadBtn = document.getElementById('downloadCvBtn');
if (downloadBtn) {
    const CV_HREF = 'assets/RajeevRanjan_CV.pdf';
    const CV_NAME = 'RajeevRanjan_CV.pdf';
    downloadBtn.setAttribute('href', CV_HREF);
    downloadBtn.setAttribute('download', CV_NAME);

    downloadBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        const original = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Preparing...';
        downloadBtn.setAttribute('aria-busy', 'true');
        try {
            const res = await fetch(CV_HREF, { cache: 'no-cache' });
            if (!res.ok) throw new Error('missing');
            const blob = await res.blob();
            const type = (blob.type || '').toLowerCase();
            if (blob.size < 500 || (type && !type.includes('pdf') && !type.includes('octet-stream'))) {
                throw new Error('invalid');
            }
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = CV_NAME;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
            downloadBtn.innerHTML = '<i class="fas fa-check"></i> CV Downloaded!';
        } catch (_) {
            downloadBtn.innerHTML = '<i class="fas fa-triangle-exclamation"></i> CV unavailable';
            window.open(CV_HREF, '_blank', 'noopener');
        } finally {
            downloadBtn.removeAttribute('aria-busy');
            setTimeout(() => { downloadBtn.innerHTML = original; }, 2500);
        }
    });
}

/* ---------- AOS (Animate On Scroll) ---------- */
if (!prefersReducedMotion) {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });
}

/* ---------- GSAP hero entrance ---------- */
window.addEventListener('load', () => {
    if (prefersReducedMotion) return;
    const heroText = document.querySelector('.hero-text');
    if (heroText) {
        gsap.from(heroText.children, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            stagger: 0.12,
            delay: 0.5,
            ease: 'power3.out'
        });
    }
});

/* ---------- SKILLS: Tab switcher ---------- */
const skillTabs = document.querySelectorAll('.skill-tab');
const skillCategories = document.querySelectorAll('.skill-category');

skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.dataset.category;
        skillCategories.forEach(cat => {
            cat.classList.toggle('active', cat.id === category);
        });
        animateSkillBars();
    });
});

function animateSkillBars() {
    document.querySelectorAll('.skill-category.active .skill-bar-fill').forEach(bar => {
        const level = bar.dataset.level || 80;
        bar.style.setProperty('--level', level + '%');
        bar.parentElement.parentElement.classList.add('in-view');
        if (prefersReducedMotion) {
            bar.style.width = level + '%';
        }
    });
}

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillObs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillObs.disconnect();
            }
        });
    }, { threshold: 0.2 });
    skillObs.observe(skillsSection);
}

/* ---------- COUNTERS: CountUp.js on scroll ---------- */
if (!prefersReducedMotion) {
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const decimals = (target % 1 !== 0) ? 1 : 0;
            const cu = new window.countUp.CountUp(el, target, {
                duration: 2.2,
                decimalPlaces: decimals,
                useEasing: true
            });
            if (!cu.error) {
                cu.start();
            } else {
                el.textContent = target;
            }
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));
}

/* ---------- PROJECTS: Filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        projectCards.forEach(card => {
            const matches = filter === 'all' || card.dataset.category === filter;
            if (matches) {
                card.classList.remove('hide');
                gsap.fromTo(card, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
            } else {
                card.classList.add('hide');
            }
        });
    });
});

/* ---------- PROJECTS: Vanilla Tilt (3D) ---------- */
if (!prefersReducedMotion && typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
        max: 10,
        speed: 400,
        glare: true,
        'max-glare': 0.2,
        scale: 1.02
    });
}

/* ---------- CONTACT: EmailJS ---------- */
(function initEmailJS() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    // Public service ID — replace with your own EmailJS config in production
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = document.getElementById('submitBtn');
        const status = document.getElementById('formStatus');

        btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';
        btn.disabled = true;
        status.className = 'form-status';

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form)
            .then(() => {
                status.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                status.className = 'form-status success';
                btn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                form.reset();
            })
            .catch(() => {
                const name = form.from_name.value;
                const subject = encodeURIComponent(form.subject.value);
                const body = encodeURIComponent(form.message.value + '\n\n— ' + name + ' (' + form.reply_to.value + ')');
                status.innerHTML = 'Could not send via form. <a href="mailto:connectwithrajeevr@gmail.com?subject=' + subject + '&body=' + body + '">Open your email app instead</a>.';
                status.className = 'form-status error';
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            })
            .finally(() => {
                btn.disabled = false;
                setTimeout(() => { btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; }, 3000);
            });
    });
})();

/* ---------- Reveal timeline on scroll ---------- */
if (!prefersReducedMotion) {
gsap.registerPlugin(ScrollTrigger);
gsap.fromTo('.timeline-item', {
    opacity: 0,
    x: -40
}, {
    opacity: 1,
    x: 0,
    duration: 0.9,
    stagger: 0.15,
    scrollTrigger: {
        trigger: '.timeline',
        start: 'top 80%'
    }
});
}
