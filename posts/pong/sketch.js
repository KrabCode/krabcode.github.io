
var rectPos, rectSpd, rectSize, rectMaxSpd;
var ballPos, ballSpd, ballRadius;

function setup() {
	createCanvas(windowWidth, windowHeight);
	rectMaxSpd = 5;
	rectPos = createVector(width/2, height-100);
	rectSpd = createVector();
	rectSize = createVector(80, 20);

	ballPos = createVector(width/2, height/2);
	ballSpd = createVector(3,3);
	ballRadius = 10;
}

function draw() {
	background(60);
	updateInput();

	rectPos.add(rectSpd);
	rect(rectPos.x, rectPos.y, rectSize.x, rectSize.y);

	ballPos.add(ballSpd);
	ballWallCollide();
	ballRectCollide();
	ellipse(ballPos.x, ballPos.y, ballRadius*2, ballRadius*2);
}

function ballWallCollide(){
	if(ballPos.x + ballRadius > width || ballPos.x - ballRadius < 0){
		ballSpd.x *= -1;
	}
	if(ballPos.y + ballRadius > height || ballPos.y - ballRadius < 0){
		ballSpd.y *= -1;
	}
}

function ballRectCollide(){
	if(circleRect(ballPos.x, ballPos.y, ballRadius, rectPos.x, rectPos.y, rectSize.x, rectSize.y)){
		if(ballPos.y+ballRadius > rectPos.y && ballSpd.y > 0){
			ballSpd.y *= -1;
			ballSpd.x += rectSpd.x;
		}
	}
}

// CIRCLE/RECTANGLE
// from http://jeffreythompson.org/collision-detection/circle-rect.php
function circleRect( cx,  cy,  radius,  rx,  ry,  rw,  rh) {

  // temporary variables to set edges for testing
  var testX = cx;
  var testY = cy;

  // which edge is closest?
  if (cx < rx)         testX = rx;      // test left edge
  else if (cx > rx+rw) testX = rx+rw;   // right edge
  if (cy < ry)         testY = ry;      // top edge
  else if (cy > ry+rh) testY = ry+rh;   // bottom edge

  // get distance from closest edges
  var distX = cx-testX;
  var distY = cy-testY;
  var distance = sqrt( (distX*distX) + (distY*distY) );

  // if the distance is less than the radius, collision!
  if (distance <= radius) {
    return true;
  }
  return false;
}



function updateInput(){
	if(!keyIsPressed){
		rectSpd.x = 0;
	}else{
		if (key == "a") {
	    rectSpd.x = -rectMaxSpd;
	  } else if (key == "d") {
			rectSpd.x = rectMaxSpd;
	  }
	}
}

function keyPressed(){
	if (keyCode === LEFT_ARROW) {
		rectSpd.x = -rectMaxSpd;
	} else if (keyCode === RIGHT_ARROW) {
		rectSpd.x = rectMaxSpd;
	}
}
