

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	colorMode(HSB, 1, 1, 1, 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	var detail = 25;
	var mx = map(mouseX, 0, width, .00001, .00026);
  background(0);
  stroke(255);
  strokeWeight(8);
  var cx = width/2;
  var cy = height/2;
  var r = 449;
  for (var x = 0; x < width; x+= detail) {
    for (var y = 0; y < height; y+= detail) {
      var d = dist(x, y, cx, cy);
      if (d<r) {
				if(mouseX == 0 && mouseY == 0){
					mx = .00012;
				}
        var a = radians(.6*d*d*frameCount*mx)%PI;
        var p = map(a, 0, PI, 0, 1);
				noStroke();
				fill(p,1,1);
        //stroke(p, 1, 1);
				push();
				translate(x,y);
				//rotate(a);
				rect(0,0,detail*.7,detail*.7);
				//line(-detail*.36, 0, detail*.36,0);
				pop();
      }
    }
  }
	noStroke();
	fill(1);
	textSize(26);
	text("speed: " + nf(mx*10000, 1,1), width-150, 50);
}
