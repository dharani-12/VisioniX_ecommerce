gsap.registerPlugin(ScrollTrigger);


const contactTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});

contactTl.from(".section-header", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
})
.from(".info-card", {
    y: 40,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.4")
.from(".contact-form-container", {
    x: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
}, "-=0.6");


gsap.from(".quick-support-box", {
    scale: 0.9,
    opacity: 0,
    scrollTrigger: {
        trigger: ".quick-support",
        start: "top 85%"
    }
});

document.querySelectorAll('.info-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, { 
            y: -10, 
            duration: 0.4, 
            ease: "power2.out",
            overwrite: "auto" 
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, { 
            y: 0, 
            duration: 0.4, 
            ease: "power2.inOut" 
        });
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');

        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            btn.style.background = '#28a745';
            contactForm.reset();
        }, 1500);
    });
}

document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', () => {
        gsap.to(input, { scale: 1.02, duration: 0.3 });
    });
    input.addEventListener('blur', () => {
        gsap.to(input, { scale: 1, duration: 0.3 });
    });
});