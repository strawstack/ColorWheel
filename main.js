function main(CANVAS_ID) {
    const c = document.querySelector(`#${CANVAS_ID}`);
    const ctx = c.getContext("2d");
    render(ctx);
}
function render(ctx) {
    // Background
    ctx.fillStyle = "#EEE";
    ctx.fillRect(0, 0, 1000, 1000);

    let color_list = getColorList();
    for (let color of color_list) {
        let angle = color[0];
        let hex_color = color[1].hex;
        drawLine(ctx, angle, hex_color);
    }

    let color_sets = getColorSets();
    displaySets(color_sets);

    displayShades();
}
function degToRad(deg) {
    return deg/180 * Math.PI;
}
function coordFromAngle(angle, radius) {
    let x = radius * Math.cos(degToRad(angle));
    let y = radius * Math.sin(degToRad(angle));
    return {
        x: x,
        y: y
    };
}
function drawLine(ctx, angle, color) {
    const CTR = 500; // Center
    const RAD = 400; // Radius
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(CTR, CTR);
    let coord = coordFromAngle(angle, RAD);
    ctx.lineTo(CTR + coord.x, CTR + coord.y);
    ctx.stroke();
}
function displaySets(color_sets) {
    const cw = new ColorWheel();
    let colorSets = document.querySelector(".color-sets");
    for (let cs of color_sets) {
        let colorSet = document.createElement('div');
        colorSet.className = "color-set";
        for (let color of cs) {
            let colorSpot = document.createElement('div');
            colorSpot.className = "color-spot";
            let _color = cw.lighten(color, 0.4);
            colorSpot.style.background = _color.hex;
            colorSet.appendChild(colorSpot);
        }
        colorSets.appendChild(colorSet);
    }
}
function displayShades() {
    const cw = new ColorWheel();
    let red = cw.getColors(1, 90)[0];

    // Ref to container
    let colorSets = document.querySelector(".color-sets");

    // Darken
    let colorSetDark = document.createElement('div');
    colorSetDark.className = "color-set";
    for (let i = 0; i < 10; i++) {
        let colorSpot = document.createElement('div');
        colorSpot.className = "color-spot";
        colorSpot.style.background = red.hex;
        colorSetDark.appendChild(colorSpot);
        red = cw.darken(red, 0.2);
    }
    colorSets.appendChild(colorSetDark);

    // Lighten
    let blue = cw.getColors(1, 210)[0];
    let colorSetLight = document.createElement('div');
    colorSetLight.className = "color-set";
    for (let i = 0; i < 10; i++) {
        let colorSpot = document.createElement('div');
        colorSpot.className = "color-spot";
        colorSpot.style.background = blue.hex;
        colorSetLight.appendChild(colorSpot);
        blue = cw.lighten(blue, 0.3);
    }
    colorSets.appendChild(colorSetLight);
}

// Main
const _CW = new ColorWheel();
const CANVAS_ID = document.currentScript.dataset.canvas;
main(CANVAS_ID);

// Data
function getColorList() {
    return _CW.colors;
}
function getColorSets() {
    let color_sets = [];
    for (let i = 1; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            color_sets.push(
                _CW.getColors(i)
            );
        }
    }
    return color_sets;
}
