
var earthMap;
var moonMap;
var stars;
var starCount = 150;

function preload() {
	moonMap = loadImage("moon.png");
	earthMap = loadImage("earthmap.jpg");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = new Dw.EasyCam(this._renderer, {distance : 1000});
	background(0);
}

function draw() {
	background(0);
	//EARTH
	rotateZ(PI*2);
	rotateZ(0.401425728);
	rotateY(-2.1+radians(frameCount/3));
	noStroke();
	texture(earthMap);
	ambientLight(25);
	directionalLight(204, 204, 204, 1, 1, -1);
	sphere(200);
	//MOON
	translate(850,0,0);
	texture(moonMap);
	sphere(10);
}
