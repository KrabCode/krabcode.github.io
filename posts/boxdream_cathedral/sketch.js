function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 255,255,255,255);
	easycam = new Dw.EasyCam(this._renderer, {distance : windowWidth});
}

function draw(){
  background(0);
  var w = windowWidth;
  var scl = w/23;

  rotateX(PI/4);
  rotateZ(PI/4);

	for(var x = -w/2; x < w/2; x+= scl){
		for(var y = -w/2; y < w/2; y+= scl){
			var md  = map(min(abs(x), abs(y)), 0, w/2, 0, 1);
      var d = map(abs(x)+abs(y), 0, w, 0, 1);
      var td = .5+.5*sin(radians(10000*md-frameCount));
      var zscl = 8*scl*td*md/d;
      var h = map(md*td/d,0,1,130,220);
			push();
	    translate(x,y);
	    noStroke();
	    fill(h, 200, 255);
	    box(scl, scl, zscl);
			pop();
	  }
	}
}
