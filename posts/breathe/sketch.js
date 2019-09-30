
var coreR, outR, currR;
var expanding; //boolean which means shrinking if false
var spd = 3;
var pathToConfig = "/config.txt";

function setup() {
	createCanvas(windowWidth, windowHeight);
  smooth(8);
  background(0);

  //some default values
  coreR = 50;
  outR = min(width, height)-10;
  currR = coreR;
}

function draw() {
  noStroke();
  fill(0, 15);
  rect(0, 0, width, height);

  if (expanding) {
    currR+=spd;
  } else {
    currR-=spd;
  }
  if (currR <= coreR && !expanding) {
    expanding = !expanding;
  }
  if (currR >= outR && expanding) {
    expanding = !expanding;
  }

  push();
  translate(width/2, height/2);
  noStroke();

  //2D simple ellipse in center for maximum elegance
  noStroke();
  fill(150);
  circle(coreR);

  /*
  3D rotating ball in center for when minimalism just won't do
   pushMatrix();
   fill(0);
   sphereDetail(8);
   strokeWeight(1);
   stroke(255);
   rotateY(radians(frameCount));
   sphere(coreR/2);
   popMatrix();
   */

  strokeWeight(8);
  noFill();
  stroke(150);
  circle(outR);
  stroke(255);
  noFill();
  circle(currR);
  pop();

  fill(255);
  translate(width-100, 0);
  text("r = " + nf(outR, 3, 0), 20, 20);
  text("v = " + nf(spd, 1, 1),  20, 40);
}

function circle( r) {
  ellipse(0, 0, r, r);
}

function mouseDragged() {
  outR += (mouseY - pmouseY) *2;
  outR = max(coreR+50, outR);
  spd = map(mouseX, 0, width, 1, 5);
}
