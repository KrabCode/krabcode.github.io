var cx;
var cy;
var side;
var t;
var sizeStep = 2;
var timeStep = 1.5;
var genCount = 100;

function setup() {
	createCanvas(800,800);
  noSmooth();
  rectMode(CENTER);
  colorMode(HSB, 360,100,100,100);
}

function draw() {
  background(0);
  cx = width/2;
  cy = height/2;
  t = radians(frameCount*1.2);
  side = min(width, height);
  if(mouseX > 0){
    timeStep = map(mouseX, 0, width, .01, 1);
    sizeStep = map(mouseY, 0, height,.01, 5);
    genCount = 120 - sizeStep*5;
  }
  drawRect(sizeStep, sizeStep, 0);
  noFill();
}

function drawRect(sizeX, sizeY, gen){
   if(gen > genCount){
    return;
   }
   var h = map(gen, 0, genCount, 0, 360);
   var b = 100-50/genCount*gen;
   stroke(h,100,b);
   var x = cx + side/8*cos(t-gen*timeStep);
   var y = cy + side/8*sin(t-gen*timeStep);
   rect(x,y, sizeX, sizeY);
   drawRect(sizeX + sizeStep, sizeY + sizeStep, gen+1);
}
