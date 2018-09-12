
var earthMap;
var moonMap;
var stars;
var starCount = 150;
var earthRadius = 250; //6,371km

var scaledKm = earthRadius/6371;
var distanceDownscale = 10; //distance not to scale :(
var lunarDistance = scaledKm*400000 / distanceDownscale; //400'000 km

//the sacred texts
//https://en.wikipedia.org/wiki/Orbit_of_the_Moon#/media/File:Lunar_Orbit_and_Orientation_with_respect_to_the_Ecliptic.tif

function preload() {
	moonMap = loadImage("moon.jpg");
	earthMap = loadImage("earthmap.jpg");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = new Dw.EasyCam(this._renderer, {distance : 1000});
	background(0);
}

function draw() {
	var earthRotation = frameCount;
	var mx = map(mouseX, 0, width, 0, 360);
	background(0);
	//EARTH
	push();
	rotateZ(PI*2);
	rotateZ(-0.401425728);
	rotateY(radians(earthRotation));
	noStroke();
	texture(earthMap);
	ambientLight(25);
	directionalLight(255, 255, 255, 1, 0, 0);
	sphere(earthRadius);
	pop();
	rotateY(.5+radians(earthRotation/27));
	rotateZ(radians(-5.14));
	//MOON
	translate(lunarDistance,0,0);
	rotateZ(radians(-6.68));
	rotateY(1);
	texture(moonMap);
	noStroke();
	sphere(earthRadius*.273);

}
