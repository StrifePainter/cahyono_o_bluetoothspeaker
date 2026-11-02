console.log("JavaScript file is connected!");

const icons = document.querySelectorAll("svg");

function logId(event) {

    const elementId = event.currentTarget.id;

    console.log(`Clicked on: ${elementId}`);
}

icons.forEach(item => item.addEventListener('click', logId));