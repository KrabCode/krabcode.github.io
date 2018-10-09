function setup() {
	createCanvas(windowWidth, windowHeight);
	background(.7);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  stroke(255);
  noFill();
  translate(width/2, height/2);
  rotate(HALF_PI);
  var detail = 80+20*sin(radians(frameCount/4));
  var step = PI/detail;
  var t = frameCount;
  var r = 300;
  var cx = 0;
  var cy = 0;
  for(var a0 = 0; a0 < TWO_PI; a0+= step){
    var a1 = TWO_PI*sin(a0+PI);
    var top = pointAtAngle(cx, cy,r, a0);
    var bot = pointAtAngle(cx, cy,r, a1);
    line(top.x, top.y, bot.x, bot.y);
  }
}

function pointAtAngle(centerX, centerY, radius, angle) {
  return createVector(
    centerX + radius * cos(angle),
    centerY + radius * sin(angle)
    );
}
