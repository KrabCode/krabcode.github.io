let ps;
var pCount = 512;
var minm = 16;
var maxm = 64;
var bgalpha = .1;
var fgalpha = .5;
var w,h;

function setup() {
	createCanvas(windowWidth, windowHeight, P2D);
	colorMode(HSB, 1,1,1,1);
  background(0);
  w = width;
  h = height;

	ps = new Array(pCount);
  for(var i = 0; i < pCount; i++){
      ps[i] = new P();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  w = width;
  h = height;

  noStroke();
  fill(0,bgalpha);
  rect(0,0,w,h);

  //lines();

  for(var i = 0; i < pCount; i++){
    ps[i].updateParticle();
  }
}

function lines(){
  var s = 300;
  for(var x = 0; x < w; x+=s){
    for(var y = 0; y < h; y+=s){
      pushMatrix();
      translate(x,y);
      rotate(getAngleAt(x,y));
      stroke(1);
      line(-s/8, 0, s/2, 0);
      popMatrix();
    }
  }
}

function getAngleAt(x,  y){
  return getNoiseAt(x,y)*TWO_PI*2;
}

function getNoiseAt(x,  y){
  var ns = 0.0005;
  return noise(x*ns, y*ns,radians(frameCount));
}

function P(){
	this.pos = createVector(random(w), random(h));
	this.spd = createVector();
	this.acc = createVector();
	this.m = 	random(minm,maxm);
	this.l = 	maxm/this.m;
	this.hue = map(this.m,minm,maxm,.65,1);
	this.sat = random(.2,1);

	this.updateParticle = function(p){
		//apply acceleration in a random direction decided by noise
		var a = getAngleAt(this.pos.x, this.pos.y);
		this.acc.add(p5.Vector.fromAngle(a).div(this.m));

		//apply acceleration in the same direction as the mouse,
		//apply it less on more massive objects
		//the force get smaller with the square of the distance from the mouse
		if(mouseIsPressed){
			 var ma = angle(pmouseX, pmouseY, mouseX, mouseY);
			 var mm = dist(mouseX, mouseY, pmouseX, pmouseY);
			 var md = dist(this.pos.x, this.pos.y, mouseX, mouseY);
			 this.acc.add(p5.Vector.fromAngle(ma).mult(20*maxm*(mm*mm/(md*md))/this.m));
		}

		this.spd.add(this.acc);
		this.spd.limit(this.l);
		this.pos.add(this.spd);
		this.acc.mult(0);

		if(this.pos.x <  -this.m*2) this.pos.x+=w+this.m*4;
		if(this.pos.x > w+this.m*2) this.pos.x-=w+this.m*4;
		if(this.pos.y <  -this.m*2) this.pos.y+=h+this.m*4;
		if(this.pos.y > h+this.m*2) this.pos.y-=h+this.m*4;
		this.drawParticle();
	}

	this.drawParticle = function(p){
		strokeWeight(this.m);
		stroke(this.hue,this.sat,1,fgalpha);
		point(this.pos.x,this.pos.y);
	}
}

function angle(x0, y0, x1, y1){
    return atan2(y1 - y0, x1 - x0);
}
