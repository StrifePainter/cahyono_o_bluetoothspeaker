(() => {

//Variables
const hotspots = document.querySelectorAll(".Hotspot");

const infoBoxes = {
  sound: {
    title: 'Maximum Sound Coverage',
    text: 'Small footprint, effortless sound. PULSE puts a high-output 50mm full-range driver right at the center of your listening environment, projecting from both sides of the speaker. Delivering 10W of clear, room-filling sound, it balances sparkling high frequencies and rich vocal clarity with surprisingly robust bass performance.',
    image: 'images/speaker.svg'
  },
  controls: {
    title: 'Tactile Controls',
    text: 'Take control with three integrated tactile buttons designed for effortless operation. Strategically positioned for easy access, the responsive controls put your music at your fingertips.',
    image: 'images/power-button.svg'
  },
  usbc: {
    title: 'USB-C Fast Charging',
    text: 'Power up faster with USB-C charging and a built-in 2,000mAh rechargeable lithium-ion battery. Enjoy up to 12 hours of continuous playback on a single charge, with a full recharge in approximately 2.5 hours. The USB-C port allows you to manually connect if that is your preference to bluetooth!',
    image: 'images/usb-c-charging.svg'
  },
  pads: {
    title: 'Silicone Wrapped',
    text: 'Covered in the highest grade silicone, this coverage keeps PULSE protected, non-slip, and easy to press and play. Designed to provide a stable foundation, even at higher volumes. A silicon strap is flexible and versatile to take on the go, or hang it up wherever you want!',
    image: 'images/anti-slip-pads.svg'
  }
};

//Functions

function loadInfo() {
  hotspots.forEach((hotspot) => {
    const infoBox = infoBoxes[hotspot.dataset.info];
    const annotation = hotspot.querySelector(".HotspotAnnotation");
    if (!infoBox || !annotation) return;

    const imageElement = document.createElement("img");
    imageElement.src = infoBox.image;
    imageElement.alt = "";
    // Hide the image if the file doesn't exist yet
    imageElement.addEventListener("error", () => imageElement.remove());

    const titleElement = document.createElement("h2");
    titleElement.textContent = infoBox.title;

    const textElement = document.createElement("p");
    textElement.textContent = infoBox.text;

    // Replace the placeholder label with the full info box
    annotation.replaceChildren(imageElement, titleElement, textElement);
  });
}

// Tap/click toggles the info box (hover doesn't exist on touch screens)
function toggleInfo(event) {
  const clicked = event.currentTarget;
  hotspots.forEach((h) => {
    if (h !== clicked) h.classList.remove("active");
  });
  clicked.classList.toggle("active");
}

loadInfo();
hotspots.forEach((hotspot) => hotspot.addEventListener("click", toggleInfo));

})();
