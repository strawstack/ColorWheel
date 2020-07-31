const fs = require("fs");
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
    generateWheelPreview(cw);
}

function generateWheelPreview(colorWheel) {
    const INDEX_FILEPATH  = "template/index.html";
    const SCRIPT_FILEPATH = "template/main.js";
    const INDEX_NAME  = "index.html";
    const SCRIPT_NAME = "main.js";

    // Read file data
    let index_data = fs.readFileSync(INDEX_FILEPATH, 'utf8');
    let main_data  = fs.readFileSync(SCRIPT_FILEPATH, 'utf8');

    // Insert color data into main
    let color_data = JSON.stringify(colorWheel.colors);
    main_data = main_data.replace("__COLOR_LIST_DATA__", color_data);

    // Write files
    fs.writeFileSync(INDEX_NAME, index_data);
    fs.writeFileSync(SCRIPT_NAME, main_data);
}

// Main
main();
