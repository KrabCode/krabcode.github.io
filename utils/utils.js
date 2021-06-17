// utils
let PI = Math.PI;
let TAU = Math.PI * 2;

function pow(x, p) {
    return Math.pow(x, p);
}

function cos(x) {
    return Math.cos(x);
}

function sin(x) {
    return Math.sin(x);
}

function max(a, b) {
    return Math.max(a, b);
}

function min(a, b) {
    return Math.min(a, b);
}

function map(n, start1, stop1, start2, stop2) {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function lerp(a, b, n) {
    return (b - a) * n + a;
}

function lerpColor(colorA, colorB, amt) {
    let r = lerp(colorA.r, colorB.r, amt);
    let g = lerp(colorA.g, colorB.g, amt);
    let b = lerp(colorA.b, colorB.b, amt);
    return 'rgba(' + r + ',' + g + ',' + b + ',1)';
}

function color(x) {
    return 'rgba(' + x.r + ',' + x.g + ',' + x.b + ',1)'
}

function constrain(x, min, max) {
    x = Math.max(x, min);
    x = Math.min(x, max);
    return x;
}

let historicalFps = [];
let lastLoop = new Date();

function averageFps() {
    let thisLoop = new Date();
    let fps = 1000 / (thisLoop - lastLoop);
    fps = constrain(fps, 0, 200);
    lastLoop = thisLoop;
    let averagingRange = 120;
    historicalFps.push(fps);
    if (historicalFps.length > averagingRange) {
        historicalFps.shift();
    }
    let sum = 0;
    historicalFps.forEach((item) => {
        sum += item;
    });
    let avg = sum / historicalFps.length;
    return Math.round(avg) + " fps";
}

function setTransform(c, x, y) {
    c.setTransform(1, 0, 0, 1, x, y);
}

// https://stackoverflow.com/questions/45070033/replace-html-title-with-file-name
function setTitleToFilename() {
    let url = window.location.pathname; // gets the pathname of the file
    let str = url.substring(url.lastIndexOf('/') + 1); // removes everything before the filename
    str = str.substring(0, str.length - 5); // removes the extension
     // if the filename has multiple words separated by spaces, browsers do not like that and replace each space with a %20. This replaces %20 with a space.
    document.getElementById("title").innerHTML = str.replace(/%20/g, " ");
}