function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 255,255,255,255);
	easycam = createEasyCam();
}

function draw(){
  background(0);
  var w = windowWidth;
  var scl = w/25;  
  translate(0,0,-windowWidth);
  rotateX(PI/4);
  rotateZ(PI/4);
  for(var x = -w/2; x < w/2; x+= scl){
	for(var y = -w/2; y < w/2; y+= scl){
      var md  = min(abs(x), abs(y));
      var d = map(abs(x)+abs(y), -w, w, 0, 1);
      var td = .5+.5*sin(radians(md-frameCount));
      var zscl = 4*scl*td;
      var h = map(d*td,0,1,0,512)%200;

	  push();
      translate(x,y);
      noStroke();
      fill(h, 150, 255);
      box(scl, scl, zscl);
	pop();
	  }
	}
}