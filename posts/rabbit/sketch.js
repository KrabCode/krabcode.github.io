let rabbit;
var scl = 200;

function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight,WEBGL);
	easycam = createEasyCam();
	background(0);
}

function preload(){
	rabbit = loadImage("rabbit.jpg");
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {

	background(0);
	translate(0,0,-800);
	var cubeSide = 800;
	for(var x = -cubeSide; x <= cubeSide; x += scl*2){
		for(var y = -cubeSide; y <= cubeSide; y += scl*2){
			for(var z = -cubeSide; z <= cubeSide; z += scl*2){
				push();
				translate(x, y, z);
				rotateY(radians(frameCount));
				rotateX(radians(frameCount));
				rotateZ(radians(frameCount));
				tint(255,50);
				texture(rabbit);

				box(scl*1.3);
				pop();
			}
		}
	}
}
