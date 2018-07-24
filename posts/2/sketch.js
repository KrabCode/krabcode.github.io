let xMax      =0;
let yMax      =0;
let xNoiseScl =0;
let yNoiseScl =0;
let zNoiseScl =0;
let seaR      =0;
let terR      =0;
let timeScale =0;
let startHue  =0;
let endHue    =0;
let sat       =0;
let br        =0;

function reset(){
	xMax      = 35;
	yMax      = 35;
	xNoiseScl = .15;
	yNoiseScl = .15;
	zNoiseScl = 20;
	seaR      = 200;
	terR      = 200;
	timeScale = 6;
	startHue  = 45;
	endHue    = 255;
	sat       = 200;
	br        = 255;
}

function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = createEasyCam();
	reset();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	drawSea();
	drawPlane();
}

function drawSea() {
	push();
	translate(0,0, 0);
    noStroke();
	fill(150,150,200);
	sphere(seaR);
	pop();
}

function drawPlane() {
	push();
	for(var y = 0; y < yMax; y++){
		beginShape(TRIANGLE_STRIP);
		for(var x = 0; x <= xMax; x++){
			var e0 = getElevationAt(x,y);
			var e1= getElevationAt(x,y+1);
			var h = map(max(e0, e1), 0, zNoiseScl, startHue, endHue);
			var v0 = getPointOnSphere(terR+e0, x,y);
			var v1 = getPointOnSphere(terR+e1, x,y+1);
			noStroke();
			fill(h, sat,br);
			vertex(v0.x,v0.y,v0.z);
			vertex(v1.x,v1.y,v1.z);
		}
		endShape();
	}
	pop();
}

function getPointOnSphere(r, x, y){
	var s = map(x, 0, xMax, 0, TWO_PI);
	var t = map(y, 0, yMax, 0, PI);
	var resultX = r * cos(s) * sin(t);
	var resultY = r * sin(s) * sin(t);
	var resultZ = r * cos(t);
	return createVector(resultX, resultY, resultZ);
}

function getElevationAt(x, y) {
	if(x > xMax/2){
		x = xMax-x;
	}
	return zNoiseScl*(-1+2*noise(x*xNoiseScl,y*yNoiseScl, radians(frameCount/timeScale)));
}
