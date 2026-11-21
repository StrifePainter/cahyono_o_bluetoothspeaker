(function initPulse() {

// Variables
const divisor = document.querySelector("#divisor");
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

canvas.width = 1920;
canvas.height = 1080;

const frameCount = 450; //how many still frames do we have
const images = []; //array to hold all of our images

//lets create an object called buds to hold the current frame
//we are going to animate its frame property
const buds = {
    frame: 0
};

//run a for loop to populate our images array
for(let i = 0; i < frameCount; i++) {
    const img = new Image();
    //images/explode_dynamicNumber.webp
    img.src = `images/sequence/ToWebP/sequence_${(i + 1).toString().padStart(4, '0')}.webp`;
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

function moveDivisor() {
  divisor.style.width = `${slider.value}%`
}

function resetSlider() {
  slider.value = "%50";
}

gsap.to(buds, {
  frame: frameCount - 1,
  ease: "none",
  snap: "frame",
  scrollTrigger: {
      trigger: "#explode-view",
      pin: true,
      start: "top top",
      markers: true,
      scrub: 1
  },
  onUpdate: render
});

//when the first image is loaded in the array, call the render fcuntion
//so we don't have an empty canvas

images[0].addEventListener("load", render);

function render() {
  context.clearRect(0,0, canvas.width, canvas.height);
  //console.log(buds.frame);
  //console.log(images[buds.frame]);
  context.drawImage(images[buds.frame], 0, 0);
}

function updateInfoContent(data) {
  infoImage.src = data.image;
  infoTitle.textContent = data.title;
  infoText.textContent = data.text;
}

function showInfo(key) {
  const data = infoBoxes[key];

  gsap.timeline()
    .to(info, { autoAlpha: 0, y: 16, duration: 0.2, onComplete: updateInfoContent, onCompleteParams: [data] })
    .to(info, { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" });
}

function selectHotspot(event) {
  const clickedHotspot = event.currentTarget;

  for (const hotspot of hotspots) {
    if (hotspot === clickedHotspot) {
      hotspot.classList.add("active");
    } else {
      hotspot.classList.remove("active");
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

function playHeroIntro() {
  gsap.timeline({ defaults: { ease: "power3.out" } })
    .from(".nav", { yPercent: -100, duration: 0.6 })
    .from(".hero-title", { y: 40, autoAlpha: 0, duration: 0.8 }, "-=0.2")
    .from(".hero-text", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.4")
    .from(".hero .btn", { y: 20, autoAlpha: 0, duration: 0.5 }, "-=0.3");
}

showInfo("intro");
playHeroIntro();

// Event Listeners

slider.addEventListener ("input", moveDivisor);
window.addEventListener ("load", resetSlider");
  
for (const hotspot of hotspots) {
  hotspot.addEventListener("click", selectHotspot);
}

for (const link of navLinks) {
  link.addEventListener("click", closeNav);
}

viewer.addEventListener("progress", updateProgress);
viewer.addEventListener("load", revealHotspots);
navToggle.addEventListener("click", toggleNav);

})();
