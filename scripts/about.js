gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
  toggleActions: "play none none reverse"
});

// HERO
gsap.from(".about-hero h1", {
  y: 80,
  opacity: 0,
  duration: 1
});

gsap.from(".about-hero p", {
  y: 40,
  opacity: 0,
  delay: 0.3
});

// STORY
gsap.from(".story-image", {
  x: -100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".story-image",
    start: "top 80%"
  }
});

gsap.from(".story-text", {
  x: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".story-text",
    start: "top 80%"
  }
});

// STATS
gsap.from(".stat", {
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".status-grid",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

document.querySelectorAll(".stat h2").forEach((el) => {
  const rawText = el.textContent; 
  const targetValue = parseInt(rawText);
  const suffix = rawText.replace(/[0-9]/g, '');

  let countObj = { value: 0 };

  gsap.to(countObj, {
    value: targetValue,
    duration: 2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      toggleActions: "play none none reverse"
    },
    onUpdate: function() {
      el.innerText = Math.floor(countObj.value) + suffix;
    }
  });
});

document.querySelectorAll(".stat").forEach((stat) => {
  stat.addEventListener("mouseenter", () => {
    gsap.to(stat, { y: -10, duration: 0.3, ease: "power2.out" });
  });
  
  stat.addEventListener("mouseleave", () => {
    gsap.to(stat, { y: 0, duration: 0.3, ease: "power2.in" });
  });
});


// VALUES

gsap.from(".value-card", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".values",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

document.querySelectorAll(".value-card").forEach((card) => {
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

gsap.from(".founder-box", {
  scale: 0.9,
  opacity: 0,
  duration: 1.5,
  ease: "expo.out",
  scrollTrigger: {
    trigger: ".founder",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});

gsap.from(".founder-box p, .founder-box h4", {
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 0.5,
  stagger: 0.3,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".founder",
    start: "top 80%"
  }
});


// TEAM
gsap.from(".team-card", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".team",
    start: "top 85%",
    toggleActions: "play none none reverse"
  }
});

document.querySelectorAll(".team-card").forEach((card) => {
  const socials = card.querySelectorAll(".team-socials");
  const icons = card.querySelectorAll(".team-socials a");

  card.addEventListener("mouseenter", () => {

    gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out" });
    

    gsap.to(socials, { opacity: 1, duration: 0.3 });
    

    gsap.to(icons, { 
      y: 0, 
      opacity: 1, 
      stagger: 0.1, 
      duration: 0.4, 
      ease: "back.out(1.7)" 
    });
  });

  card.addEventListener("mouseleave", () => {
    gsap.to(card, { y: 0, duration: 0.3, ease: "power2.in" });
    gsap.to(socials, { opacity: 0, duration: 0.3 });
    gsap.to(icons, { y: 20, duration: 0.3 });
  });
});

ScrollTrigger.refresh();