

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMode(CENTER);
	colorMode(HSB, 1, 1, 1, 1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	var detail = 30;
	var mx = map(mouseX, 0, width, .00001, .00026);
  background(0);
	noStroke();
  var r = width/5;
	push();
	translate(width/2, height/2);
  for (var x = -width/2; x < width/2; x+= detail) {
    for (var y = -width/2; y < height/2; y+= detail) {
      var d = dist(x, y, 0, 0);
      if (d<r) {
				if(mouseX == 0 && mouseY == 0){
					mx = .00012;
				}
        var a = radians(.6*d*d*frameCount*mx)%PI;
        var p = map(a, 0, PI, 0, 1);
				fill(p,.9,1);
        //stroke(p, 1, 1);
				push();
				translate(x,y);
				rotate(a);
				rect(0,0,detail*.75,detail*.75);
				//line(-detail*.36, 0, detail*.36,0);
				pop();
      }
    }
  }
	pop();
	noStroke();
	fill(255);
	textSize(26);
	text("speed: " + nf(mx*10000, 1,1), width-150, 50);
	stroke(255);
	line(width/2, 0, width/2, height);
	line(0, height/2,width,  height/2);
}
