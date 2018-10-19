var h = 1;
var v = 1000;
var r = 0;
var rs = 1.2795625;
var as;

var rotPos = 0;
var rotSpd = 0;

function setup(){
	createCanvas(windowWidth, windowHeight, WEBGL);
	as = TWO_PI*1.61803398875;
  colorMode(HSB,1,1,1,1);
  background(0);
}

function draw(){
  background(0);
  mouseRotation();
	strokeWeight(1);
  beginShape();
  recur(0);
  endShape();

  if(h<v){
    h++;
  }
}

function recur(g){
  if(g > h){
    return;
  }
  var n = map(g, 0, h, 0, 1);
  var t = sin(radians(frameCount/50));
  var myAs = as + .005*(n-t);
  var a = g*myAs;
  var x = (r+g*rs)*sin(a);
  var y = (r+g*rs)*cos(a);
  var hue = abs((n/2-t)%1);
  var sat = 1-n*.5;
  var br = 1;
  var al = 1;
  stroke(hue,sat,br,al);
  noFill();
  vertex(x,y);
  recur(++g);
}

function mouseRotation(){
  if(mouseIsPressed){
    var a0 = getAngle(width/2,height/2,pmouseX,pmouseY);
    var a1 = getAngle(width/2,height/2,mouseX,mouseY);
    rotSpd = a1-a0;
  }
  rotSpd *= .98;
  rotPos += rotSpd;
  rotate(rotPos);
}

function getAngle(originX, originY, endX, endY) {
  return atan2(endY - originY, endX - originX);
}
