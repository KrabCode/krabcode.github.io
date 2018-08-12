function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight);
	background(150);
	noSmooth();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
/*
let cx = 0;
let cy = 0;
let easing = 0.1;
*/
function draw() {
	background(150);
	rectMode(CENTER);
	noStroke();

/*
	var targetX = mouseX;
  var dx = targetX - cx;
  cx += dx * easing;

  var targetY = mouseY;
  var dy = targetY - cy;
  cy += dy * easing;
*/
	var scl = width/50;
	for(var x = -scl+frameCount%scl; x < width+scl; x += scl){
		for(var y = 0; y < height+scl; y += scl){

			var mx = mouseX;
			var my = mouseY;
			if(mouseX == 0 && mouseY == 0){
				mx = width/2;
				my = height/2;
			}

			var d = dist(mx,my,x,y);
			//var size = map(d, 0, width, scl, 0);
			d *= 1.5+.2*sin(radians(frameCount));
			fill(d%255, 20,255);
			rect(x, y, scl+1, scl+1);
		}
	}
}
