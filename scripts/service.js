gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {

    // HERO
    const heroTl = gsap.timeline();

    heroTl.from(".service-hero-content", {
        scale: 0.9,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    })
    .from(".service-hero h1", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.8") 
    .from(".service-hero p", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6");

    // 2. Background Parallax Effect
    gsap.to(".service-hero", {
        backgroundPosition: "50% 70%",
        ease: "none",
        scrollTrigger: {
            trigger: ".service-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // 1. Animate the Progress Line
    gsap.to(".process-line-filler", {
        width: "100%",
        ease: "none",
        scrollTrigger: {
            trigger: ".process-wrapper",
            start: "top 70%",
            end: "bottom 70%", 
            scrub: 0.5 
        }
    });
    const steps = document.querySelectorAll(".process-step");

    steps.forEach((step, index) => {
        gsap.from(step, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            scrollTrigger: {
                trigger: step,
                start: "top 80%",
                onEnter: () => step.classList.add("active"),
                onLeaveBack: () => step.classList.remove("active") 
            }
        });
    });

    // POLICY CARDS
    gsap.from(".policy-card", {
        y: 60,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".policy-grid",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    document.querySelectorAll(".policy-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, { 
                y: -15, 
                duration: 0.4, 
                ease: "power2.out",
                overwrite: "auto" 
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, { 
                y: 0, 
                duration: 0.4, 
                ease: "power2.inOut" 
            });
        });
    });

    // SUPPORT SECTION
    gsap.from(".support-text", {
        x: -100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
        trigger: ".support-banner",
        start: "top 80%"
        }
    });

    gsap.from(".support-image", {
        x: 100,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
        trigger: ".support-banner",
        start: "top 80%"
        }
    });

    // FAQ Accordion Toggle
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const currentItem = question.parentElement;
            const allItems = document.querySelectorAll('.faq-item');
            

            const isActive = currentItem.classList.contains('active');

            allItems.forEach(item => {
                item.classList.remove('active');

                const icon = item.querySelector('.faq-question i');
                gsap.to(icon, { rotation: 0, duration: 0.3 });
            });

            if (!isActive) {
                currentItem.classList.add('active');

                const currentIcon = question.querySelector('i');
                gsap.to(currentIcon, { rotation: 180, duration: 0.3 });

                const answerText = currentItem.querySelector('.faq-answer p');
                gsap.fromTo(answerText, 
                    { opacity: 0, y: -10 }, 
                    { opacity: 1, y: 0, duration: 0.4, delay: 0.2 }
                );
            }
        });
    });

    // COUNTDOWN TIMER
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 15);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((distance / (1000 * 60)) % 60);

        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    ScrollTrigger.refresh();
});