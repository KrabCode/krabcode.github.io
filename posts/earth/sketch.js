
var earthMap;
var moonMap;
var milkyWay;
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
	milkyWay = loadImage("eso0932a.jpg");
}

function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = new Dw.EasyCam(this._renderer, {distance : lunarDistance*1.3});
	background(0);
}

function draw() {
	var earthRotation = frameCount;
	var mx = map(mouseX, 0, width, 0, 360);
	background(0);
	texture(milkyWay);
	sphere(4000);
	//EARTH
	push();
	rotateZ(PI*2);
	rotateZ(-0.401425728);
	rotateY(radians(earthRotation));
	noStroke();
	texture(earthMap);
	ambientLight(150);
	var dirY = (mouseY / height - 0.5) * 4;
	var dirX = (mouseX / width - 0.5) * 4;
	directionalLight(255,255,255, 0, 0, -1);
	sphere(earthRadius);
	pop();
	rotateY(-1.8+radians(earthRotation/27));
	rotateZ(radians(-5.14));
	//MOON
	translate(lunarDistance,0,0);
	rotateZ(radians(-6.68));
	rotateY(1);
	texture(moonMap);
	noStroke();
	sphere(earthRadius*.273);

}
