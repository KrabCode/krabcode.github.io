var cx, cy, side, t, sizeStep, timeStep, genCount;

function setup() {
	createCanvas(800,800);
	strokeWeight(1);
  noFill();
  rectMode(CENTER);
  colorMode(HSB, 360,100,100,100);
}

function draw() {
	genCount = 100;
  background(0);
  cx = width/2;
  cy = height/2;
  t = radians(frameCount*1.2);
  side = min(width, height);
  timeStep = map(sin(t/150), -1,1, -PI, PI);
  sizeStep = map(sin(t/50), -1,1, 1, 2);
  drawRect(sizeStep, sizeStep, 0);

}

function drawRect(sizeX, sizeY, gen){
   if(gen > genCount){
    return;
   }
   var b = 100-map(gen, 0, genCount, 0, 50);
   stroke(0,0,b);
   var x = cx + side/4*cos(t-gen*timeStep);
   var y = cy + side/4*sin(t-gen*timeStep);
   rect(x,y, sizeX, sizeY);
   drawRect(sizeX + sizeStep, sizeY + sizeStep, gen+1);
}
