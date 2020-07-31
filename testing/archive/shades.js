function main() {
    render();
}
function render() {
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

main();
