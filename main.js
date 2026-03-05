/* ============================================================
   ADÁN HERNÁNDEZ — PORTAFOLIO
   main.js
   ============================================================ */

/* ── SCROLL PROGRESS BAR ── */
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    const pct = (scrolled / total) * 100;
    document.getElementById('scrollLine').style.width = pct + '%';
});

/* ── HAMBURGER MENU ── */
function toggleMenu() {
    const navLinks = document.getElementById('navLinks');
    navLinks.classList.toggle('open');
}

// Cerrar el menú al tocar cualquier link (móvil)
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
    });
});

/* ── REVEAL SECTIONS AL HACER SCROLL ── */
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

/* ── SKILL BARS ANIMADAS ── */
const skillsSection = document.getElementById('skills');

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }
    });
}, { threshold: 0.3 });

if (skillsSection) {
    skillBarObserver.observe(skillsSection);
}

/* ── NAV LINK ACTIVO SEGÚN SECCIÓN VISIBLE ── */
const allSections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    allSections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + currentSection) {
            link.style.color = 'var(--text)';
        } else {
            link.style.color = '';
        }
    });
});

/* ── CARDS CON ENTRADA ESCALONADA ── */
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.glass');
            cards.forEach((card, index) => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    cardObserver.observe(section);
});