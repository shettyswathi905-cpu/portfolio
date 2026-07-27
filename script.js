/**
 * Swathi's Enhanced Portfolio Script
 * - Dashboard Analytics Counter
 * - Smooth Navigation
 * - Advanced Reveal Engine
 * - Particles Visuals
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. THEME ENGINE
       ========================================== */
    const themeBtn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    const setTheme = (theme) => {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const icon = themeBtn.querySelector('i');
        const text = themeBtn.querySelector('span');
        
        if(theme === 'light') {
            icon.className = 'fas fa-moon';
            text.textContent = 'Dark Mode';
        } else {
            icon.className = 'fas fa-sun';
            text.textContent = 'Light Mode';
        }
    };

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    themeBtn.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });

    /* ==========================================
       2. STATS COUNTER
       ========================================== */
    const stats = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target;
                const finalVal = parseFloat(target.getAttribute('data-val'));
                let currentVal = 0;
                const duration = 2000;
                const increment = finalVal / (duration / 16);

                const updateCount = () => {
                    currentVal += increment;
                    if(currentVal < finalVal) {
                        target.innerText = (finalVal % 1 === 0) ? Math.floor(currentVal) : currentVal.toFixed(2);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = finalVal;
                    }
                };
                updateCount();
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 1 });

    stats.forEach(s => counterObserver.observe(s));

    /* ==========================================
       3. REVEAL ENGINE
       ========================================== */
    const revealItems = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealItems.forEach(item => revealObserver.observe(item));

    /* ==========================================
       4. TYPING EFFECT
       ========================================== */
    const typingSpan = document.querySelector('.typing-text');
    const phrases = ['Driven Software Developer', 'AI & Data Science Enthusiast'];
    let phraseIdx = 0;
    let charIdx = 0;
    let isRemoving = false;

    function typeEffect() {
        const current = phrases[phraseIdx];
        if(!typingSpan) return;

        typingSpan.textContent = isRemoving 
            ? current.substring(0, charIdx - 1) 
            : current.substring(0, charIdx + 1);
        
        charIdx = isRemoving ? charIdx - 1 : charIdx + 1;

        let delay = isRemoving ? 60 : 150;

        if(!isRemoving && charIdx === current.length) {
            delay = 2000;
            isRemoving = true;
        } else if(isRemoving && charIdx === 0) {
            isRemoving = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            delay = 500;
        }
        setTimeout(typeEffect, delay);
    }
    if(typingSpan) typeEffect();

    /* ==========================================
       5. SCROLL PROGRESS & ACTIVE LINKS
       ========================================== */
    const progress = document.getElementById('scrollProgress');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Progress
        const winScroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        if(progress) progress.style.width = (winScroll / height) * 100 + '%';

        // Active Link
        let activeId = '';
        sections.forEach(s => {
            if(winScroll >= s.offsetTop - 250) activeId = s.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${activeId}`) link.classList.add('active');
        });
    });

    /* ==========================================
       6. PARTICLES
       ========================================== */
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let dots = [];

    function init() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        dots = [];
        for(let i = 0; i < 60; i++) {
            dots.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 2
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const isDark = html.getAttribute('data-theme') === 'dark';
        ctx.fillStyle = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)';
        
        dots.forEach(d => {
            d.x += d.vx;
            d.y += d.vy;
            if(d.x < 0 || d.x > canvas.width) d.vx *= -1;
            if(d.y < 0 || d.y > canvas.height) d.vy *= -1;
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    init();
    draw();
    window.addEventListener('resize', init);

    /* ==========================================
       7. MOBILE MENU
       ========================================== */
    const hamburger = document.getElementById('mobile-toggle');
    const sidebar = document.querySelector('.sidebar');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            hamburger.querySelector('i').classList.toggle('fa-bars');
            hamburger.querySelector('i').classList.toggle('fa-times');
        });
    }

});
