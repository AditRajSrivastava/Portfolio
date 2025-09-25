// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a, .cta-buttons a[href^="#"], .back-to-top').forEach(anchor => {
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

// Scroll animations for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Typing effect for hero subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const subtitleText = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < subtitleText.length) {
            heroSubtitle.textContent += subtitleText.charAt(i);
            i++;
            setTimeout(typeWriter, 75);
        }
    }
    setTimeout(typeWriter, 1200);
}

// Image slideshow logic
let currentSlide = 0;
const slides = document.querySelectorAll('.profile-slide');
const slideInterval = 3000;

function nextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
}

if (slides.length > 1) {
    setInterval(nextSlide, slideInterval);
}

// Modal Logic
const modal = document.getElementById('project-modal');
const closeButton = document.querySelector('.close-button');

document.querySelectorAll('.project-details-btn').forEach(button => {
    button.addEventListener('click', () => {
        const card = button.closest('.project-card');
        
        // Populate modal with data from the card
        document.getElementById('modal-title').textContent = card.dataset.title;
        document.getElementById('modal-duration').textContent = card.dataset.duration;
        document.getElementById('modal-tech').textContent = "Tech: " + card.dataset.tech;
        
        const descriptionDiv = document.getElementById('modal-description');
        descriptionDiv.innerHTML = '';
        let i = 1;
        while(card.dataset['desc-' + i]) {
            const p = document.createElement('p');
            p.textContent = card.dataset['desc-' + i];
            descriptionDiv.appendChild(p);
            i++;
        }
        
        // *** THIS IS THE FIX: It takes the links from the card and applies them to the modal buttons ***
        document.getElementById('modal-github').href = card.dataset.githubLink;
        document.getElementById('modal-live').href = card.dataset.liveLink;
        
        modal.style.display = 'flex';
    });
});

const closeModal = () => {
    modal.style.display = 'none';
};

if(closeButton) {
    closeButton.addEventListener('click', closeModal);
}


window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Form handling simulation
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.btn-primary');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.style.opacity = '0.7';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.background = 'var(--gradient-orange)';
                submitButton.style.opacity = '1';
                submitButton.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}


// --- Unified Canvas Animation Setup ---
const canvas = document.getElementById('background-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let orbsArray = [];
    let particlesArray = [];

    const setCanvasSize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    setCanvasSize();

    // --- Orb Logic ---
    class Orb {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 100;
            this.size = Math.random() * 100 + 20;
            this.speed = Math.random() * 2 + 0.5;
            this.color = `hsla(${Math.random() * 40 + 10}, 100%, 55%, ${Math.random() * 0.2 + 0.1})`;
        }
        update() {
            this.y -= this.speed;
            if (this.y < -this.size) {
                this.y = canvas.height + Math.random() * 100;
                this.x = Math.random() * canvas.width;
            }
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initOrbs() {
        orbsArray = [];
        const numberOfOrbs = 20;
        for (let i = 0; i < numberOfOrbs; i++) {
            orbsArray.push(new Orb());
        }
    }

    // --- Constellation Logic ---
    const mouse = {
        x: null,
        y: null,
        radius: (canvas.height / 120) * (canvas.width / 120)
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', function() {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    class Particle {
        constructor(x, y, directionX, directionY, size) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = 'rgba(255, 107, 53, 0.8)'; // Brighter particles
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
            if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function initConstellation() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 15000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = Math.random() * innerWidth;
            let y = Math.random() * innerHeight;
            let directionX = (Math.random() * 0.4) - 0.2;
            let directionY = (Math.random() * 0.4) - 0.2;
            particlesArray.push(new Particle(x, y, directionX, directionY, size));
        }
    }

    function connect() {
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                             + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                   let opacity = 1 - (distance/20000);
                   ctx.strokeStyle = `rgba(255, 107, 53, ${opacity})`;
                   ctx.lineWidth = 1;
                   ctx.beginPath();
                   ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                   ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                   ctx.stroke();
                }
            }
        }
        if (mouse.x !== undefined && mouse.y !== undefined) {
             for (let i = 0; i < particlesArray.length; i++) {
                let distance = ((particlesArray[i].x - mouse.x) * (particlesArray[i].x - mouse.x))
                             + ((particlesArray[i].y - mouse.y) * (particlesArray[i].y - mouse.y));
                if (distance < (canvas.width/7) * (canvas.height/7)) {
                    let opacity = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(255, 215, 0, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);

        for (let i = 0; i < orbsArray.length; i++) {
            orbsArray[i].update();
            orbsArray[i].draw();
        }
        
        const heroSection = document.getElementById('home');
        const heroRect = heroSection.getBoundingClientRect();
        
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            const fadeZone = 300;
            let constellationOpacity = 1;

            if (heroRect.top < 0) {
                constellationOpacity = Math.max(0, 1 - (Math.abs(heroRect.top) / fadeZone));
            }
            
            ctx.globalAlpha = constellationOpacity;

            if (constellationOpacity > 0) {
                for (let i = 0; i < particlesArray.length; i++) {
                    particlesArray[i].update();
                }
                connect();
            }
            
            ctx.globalAlpha = 1;
        }
    }
    
    initOrbs();
    initConstellation();
    animate();

    window.addEventListener('resize', () => {
        setCanvasSize();
        mouse.radius = ((canvas.height / 120) * (canvas.width / 120));
        initOrbs();
        initConstellation();
    });
}

// --- Railway Animation ---
const journeySection = document.querySelector('.journey-container');
if (journeySection) {
    const train = journeySection.querySelector('.train');
    const stations = journeySection.querySelectorAll('.station-item');
    const track = journeySection.querySelector('.railway-track');

    let currentTrainPos = 0;
    let targetTrainPos = 0;

    function updateTrainPosition() {
        const sectionRect = journeySection.getBoundingClientRect();
        const scrollableHeight = sectionRect.height - window.innerHeight;
        let scrollProgress = 0;

        if (sectionRect.top < 0 && sectionRect.bottom > window.innerHeight) {
            scrollProgress = -sectionRect.top / scrollableHeight;
        } else if (sectionRect.top >= 0) {
            scrollProgress = 0;
        } else {
            scrollProgress = 1;
        }

        targetTrainPos = Math.min(1, Math.max(0, scrollProgress));

        stations.forEach(station => {
            const stationRect = station.getBoundingClientRect();
            if (stationRect.top < window.innerHeight * 0.8) {
                station.classList.add('is-visible');
            }
        });
    }

    function smoothTrainAnimation() {
        currentTrainPos += (targetTrainPos - currentTrainPos) * 0.1; // Easing factor
        
        const trackHeight = track.offsetHeight;
        const trainOffset = train.offsetHeight / 2;
        const newTop = (currentTrainPos * trackHeight) - trainOffset;

        train.style.transform = `translate(-50%, ${newTop}px)`;

        requestAnimationFrame(smoothTrainAnimation);
    }

    window.addEventListener('scroll', updateTrainPosition);
    updateTrainPosition(); 
    smoothTrainAnimation();
}


// --- Infinite Scroller Logic ---
const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {
    scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".skill-list");
        const scrollerContent = Array.from(scrollerInner.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

// --- Back to Top Button ---
const backToTopButton = document.querySelector('.back-to-top');
if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}

