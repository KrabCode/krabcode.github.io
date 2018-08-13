function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight, WEBGL);
	background(0);
	easycam = createEasyCam();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	rotateZ(-PI/8);
	rotateX(PI/8);
	rotateY(PI/8);
	
	strokeWeight(0.9);
	stroke(255);

	noFill();
	var greatside = 200;
	var side = greatside/12;
	translate(-greatside/2, -greatside/2);
	for(var x = 0; x < greatside; x+= side){
		for(var y = 0; y < greatside; y+= side){
				push();
				let d = dist(x,y, greatside/2,greatside/2);
				let a = radians(frameCount/2+d*2);
				let h = map(sin(a), -1, 1, 0,greatside);
				translate(x,y);
				stroke(map(a%TWO_PI, 0, TWO_PI, 0, 255), 255, 255);
				box(side, side, h);
				pop();
			}
		}

}
