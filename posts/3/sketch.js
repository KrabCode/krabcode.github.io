let xDetail = 177.36375;
let yDetail = 9.558333;


function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight);
	background(0);
	mouseX = windowWidth/3;
	mouseY = windowHeight/3;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {  
  translate(windowWidth/2, windowHeight/2);
  if (mouseX != 0 || mouseY != 0) {
    xDetail = map(mouseX, 0, windowWidth, windowWidth/8, windowWidth/4);
    yDetail = map(mouseY, 0, windowHeight, 2, 30);
  }

  fill(0);
  noStroke();
  rect(-windowWidth, -windowHeight, windowWidth*2, windowHeight*2);
  noFill();
  var t = radians(frameCount);
  for (var x0 = -windowWidth*.7; x0 < windowWidth*.7; x0 += xDetail) {
    var last = null;
    for (var y = -windowHeight*.7; y < windowHeight*.7; y+= yDetail) {
      var x = x0+xDetail*sin(y-t);
      var me = createVector(x, y);
      if (last!=null) {
        var hue = 20*sin(y-t);
        var d = dist(last.x, last.y, me.x, me.y);
        d *= .7;
        d += hue;
        stroke(d%255, 255, 255);
        line(last.x, last.y, me.x, me.y);
      }
      last = createVector(x, y);
    }
  }
}