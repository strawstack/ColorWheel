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

// Main
const CANVAS_ID = document.currentScript.dataset.canvas;
main(CANVAS_ID);

// Data
function getColorList(test) {
    if (test === true) {
        return [
            [90, "#FF0000"],  // Red
            [210, "#0000FF"], // Blue
            [330, "#00FF00"]  // Green
        ];
    } else {
        return __COLOR_LIST_DATA__;
    }
}
