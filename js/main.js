console.log("JavaScript file is connected!");
(() => {

//Variables
const hotspots = document.querySelectorAll(".Hotspot");
const infoBoxes = [
{
    title: 'Powerful Sound',
    text: 'At the heart of RESN8R is a high-performance 50mm full-range dynamic driver, engineered to deliver crisp highs, detailed mids, and deep, punchy bass. With 10 watts of output power, RESN8R produces rich, room-filling sound from a compact design.',
    image: 'images/speaker.svg'
},
{
    title: 'Tactile Controls',
    text: 'Take control with three integrated tactile buttons designed for effortless operation. Strategically positioned for easy access, the responsive controls put your music at your fingertips.',
    image: 'images/power-button.svg'
},
{
    title: 'USB-C Fast Charging',
    text: 'Power up faster with USB-C charging and a built-in 2,000mAh rechargeable lithium-ion battery. Enjoy up to 12 hours of continuous playback on a single charge, with a full recharge in approximately 2.5 hours.',
    image: 'images/usb-c-charging.svg'
},
{
    title: 'Anti-Slip Silicone Pads',
    text: 'Four precision-positioned silicone grip pads keep RESN8R firmly planted on smooth surfaces. Designed to absorb vibrations and reduce unwanted movement, the durable, non-marking pads provide a stable foundation, even at higher volumes.',
    image: 'images/anti-slip-pads.svg'
},
]

//Functions

function loadInfo() {
infoBoxes.forEach((infoBox, index) => {
    //console.log(index);
    //console.log(index+1);
    let selected = document.querySelector(`#hotspot-${index+1}`);

    //need to create title
    const titleElement = document.createElement("h2");
    titleElement.textContent = infoBox.title;
    //need to create text
    const textElement = document.createElement("p");
    textElement.textContent = infoBox.text;
    //need to create image
    const imageElement = document.createElement('img');
    imageElement.src= infoBox.image;


    //apppend the title
    selected.appendChild(imageElement);
    selected.appendChild(titleElement);
    selected.appendChild(textElement);
    //append the image
});
}

loadInfo();

})();

