(function initPulse() {

// Variables
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const xray = document.querySelector("#xray");
const slider = document.querySelector("#slider");

const viewer = document.querySelector("model-viewer");
const hotspots = document.querySelectorAll(".Hotspot");
const loader = document.querySelector(".progress-bar");
const updateBar = document.querySelector(".update-bar");
const nav = document.querySelector("#nav");
const navToggle = document.querySelector("#nav-toggle");
const navLinks = document.querySelectorAll(".navigation-links a");
const info = document.querySelector("#info");
const infoImage = document.querySelector("#info-img");
const infoTitle = document.querySelector("#info-title");
const infoText = document.querySelector("#info-text");

const canvas = document.querySelector("#explode-view");
const context = canvas.getContext("2d");

canvas.width = 1280;
canvas.height = 720;

const frameCount = 640;
const images = [];
const buds = {
    frame: 0
};

gsap.registerPlugin(ScrollTrigger);
for(let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = `images/ToWebP/sequence_${i.toString().padStart(5, '0')}.webp`;
    images.push(img);
};

const infoBoxes = {
  intro: {
    title: 'Meet Pulse',
    text: 'Tap a hotspot on the speaker to explore its features!',
    image: 'images/hotspot.svg'
  },
  sound: {
    title: 'Powerful Sound',
    text: 'Small footprint, effortless sound. PULSE puts a high-output 50mm full-range driver right at the center of your listening environment, projecting from both sides of the speaker. Delivering 10W of clear, room-filling sound, it balances sparkling high frequencies and rich vocal clarity with surprisingly robust bass performance.',
    image: 'images/speaker.svg'
  },
  controls: {
    title: 'Tactile Controls',
    text: 'Take control with three integrated tactile buttons designed for effortless operation. Strategically positioned for easy access, the responsive controls put your music at your fingertips.',
    image: 'images/play-button.svg'
  },
  usbc: {
    title: 'USB-C Fast Charging',
    text: 'Power up faster with USB-C charging and a built-in 2,000mAh rechargeable lithium-ion battery. Enjoy up to 12 hours of continuous playback on a single charge, with a full recharge in approximately 2.5 hours. The USB-C port allows you to manually connect if that is your preference to bluetooth!',
    image: 'images/energy.svg'
  },
  pads: {
    title: 'Silicone Wrapped',
    text: 'Covered in the highest grade silicone, this coverage keeps PULSE protected, non-slip, and easy to press and play. Designed to provide a stable foundation, even at higher volumes. A silicon strap is flexible and versatile to take on the go, or hang it up wherever you want!',
    image: 'images/on-the-go.svg'
  }
};

// Functions

function loadImage(img) {
  img.src = img.dataset.src;
  img.removeAttribute("data-src");
}

function lazyLoadImages() {
  const lazyImages = document.querySelectorAll("img[data-src]");
  if (!("IntersectionObserver" in window)) {
    lazyImages.forEach(loadImage);
    return;
  }

  const observer = new IntersectionObserver(function checkImages(entries) {
    entries.forEach(function checkEntry(entry) {
      if (entry.isIntersecting) {
        loadImage(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: "300px 0px" });

  lazyImages.forEach(function watchImage(img) {
    observer.observe(img);
  });
}

function moveDivisor() {
  xray.style.setProperty("--ratio", slider.value / 100);
  slider.setAttribute("aria-valuetext", Math.round(slider.value) + "% of the way across, showing the inside on the left");
}

function resetSlider() {
  slider.value = 50;
  moveDivisor();
}

gsap.to(buds, {
  frame: frameCount - 1,
  ease: "none",
  snap: "frame",
  scrollTrigger: {
      trigger: ".scroll-section",
      pin: true,
      start: "top top",
      end: "+=3000", 
      scrub: 1
  },
  onUpdate: render
});

images[0].addEventListener("load", render);

function render() {
  const img = images[buds.frame];
  if (!img.complete || img.naturalWidth === 0) {
    return;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function updateInfoContent(data) {
  infoImage.src = data.image;
  infoTitle.textContent = data.title;
  infoText.textContent = data.text;
}

function showInfo(key) {
  const data = infoBoxes[key];
  if (reduceMotion.matches) {
    updateInfoContent(data);
    return;
  }

  gsap.timeline()
    .to(info, { autoAlpha: 0, y: 16, duration: 0.2, onComplete: updateInfoContent, onCompleteParams: [data] })
    .to(info, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
}

function selectHotspot(event) {
  const clickedHotspot = event.currentTarget;

  for (const hotspot of hotspots) {
    if (hotspot === clickedHotspot) {
      hotspot.classList.add("active");
      hotspot.setAttribute("aria-pressed", "true");
    } else {
      hotspot.classList.remove("active");
      hotspot.setAttribute("aria-pressed", "false");
    }
  }

  showInfo(clickedHotspot.dataset.info);
}

function updateProgress(event) {
  const progress = event.detail.totalProgress;
  updateBar.style.transform = `scaleX(${progress})`;

  if (progress === 1) {
    loader.classList.add("hide");
  } else {
    loader.classList.remove("hide");
  }
}

function revealHotspots() {
  if (reduceMotion.matches) {
    return;
  }

  gsap.from(hotspots, { scale: 0, duration: 0.6, stagger: 0.15, ease: "back.out(2)" });
}

function toggleNav() {
  const isOpen = nav.classList.toggle("nav--open");
  navToggle.setAttribute("aria-expanded", isOpen);
}

function closeNav() {
  nav.classList.remove("nav--open");
  navToggle.setAttribute("aria-expanded", false);
}

function handleKeydown(event) {
  if (event.key === "Escape" && nav.classList.contains("nav--open")) {
    closeNav();
    navToggle.focus();
  }
}

function playHeroIntro() {
  if (reduceMotion.matches) {
    return;
  }

  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".nav", { yPercent: -100, duration: 0.6 })
    .from(".hero-title", { y: 40, autoAlpha: 0, duration: 0.8 }, "-=0.2")
    .from(".hero-text", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.4")
    .from(".hero .btn", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.3");
}

function revealOnScroll() {
  const blocks = gsap.utils.toArray(".about-intro, .about-xray, .feature-text, .specs-content .section-title, .specs-intro, .cta-text");

  for (const block of blocks) {
    gsap.from(block, {
      y: 40,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: block, start: "top 85%" }
    });
  }

  const sideImages = gsap.utils.toArray(".about-image, .feature-image, .cta-image");

  for (const image of sideImages) {
    const isRight = image.matches(".about-image, .feature-reverse .feature-image");

    gsap.from(image, {
      x: isRight ? 60 : -60,
      autoAlpha: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: { trigger: image, start: "top 85%" }
    });
  }
}

function animateSpecs() {
  gsap.from(".spec", {
    y: 40,
    autoAlpha: 0,
    duration: 0.6,
    stagger: 0.12,
    ease: "power2.out",
    scrollTrigger: { trigger: ".spec-grid", start: "top 85%" }
  });

  const values = document.querySelectorAll(".spec-value");

  for (const value of values) {
    const target = parseFloat(value.dataset.count);
    const decimals = Number(value.dataset.decimals || 0);
    const suffix = value.dataset.suffix;
    const counter = { number: 0 };

    value.textContent = (0).toFixed(decimals) + suffix;

    gsap.to(counter, {
      number: target,
      duration: 1.5,
      ease: "power1.out",
      scrollTrigger: { trigger: ".spec-grid", start: "top 85%", once: true },
      onUpdate: function () {
        value.textContent = counter.number.toFixed(decimals) + suffix;
      }
    });
  }
}

function startScrollAnimations() {
  const motion = gsap.matchMedia();

  motion.add("(prefers-reduced-motion: no-preference)", function () {
    revealOnScroll();
    animateSpecs();
  });
}

if (reduceMotion.matches) {
  viewer.removeAttribute("auto-rotate");
}

lazyLoadImages();
showInfo("intro");
playHeroIntro();
startScrollAnimations();

// Event Listeners

slider.addEventListener ("input", moveDivisor);
window.addEventListener ("load", resetSlider);
window.addEventListener("load", function refreshTriggers() {
  ScrollTrigger.refresh();
});

for (const hotspot of hotspots) {
  hotspot.addEventListener("click", selectHotspot);
}

for (const link of navLinks) {
  link.addEventListener("click", closeNav);
}

viewer.addEventListener("progress", updateProgress);
viewer.addEventListener("load", revealHotspots);
navToggle.addEventListener("click", toggleNav);
document.addEventListener("keydown", handleKeydown);

})();