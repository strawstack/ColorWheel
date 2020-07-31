const ColorWheel = require("./ColorWheel.js");

function main() {

    const cw = new ColorWheel();

    const _FF0000 = cw.colorFromAngle(90);
    console.log(`_FF0000: ${_FF0000}\n`);

    const _FF00FF = cw.colorFromAngle(150);
    console.log(`_FF00FF: ${_FF00FF}\n`);

    const _FF0040 = cw.colorFromAngle(105);
    console.log(`_FF0040: ${_FF0040}\n`);

    console.log(`Number of Colors: ${cw.colors.length}`);
}

// Main
main();
