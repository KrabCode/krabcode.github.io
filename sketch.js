function setup() {
	createCanvas(windowWidth, windowHeight);
	noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
	background(255);
	noStroke();
	var scl = width / 50;
	for(var x = -scl*2; x < width; x+= scl){
		for(var y = -scl*2; y < height; y+= scl){
			var d = abs( width/2 - x );
			fill(map(d, 0, width*.5, 255, 150));
			rect(x, y, x+scl+1, y+scl+1);
		}
	}
}
