function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 255,255,255,255);
	easycam = new Dw.EasyCam(this._renderer, {distance : windowWidth*1.5});
}

function draw(){
  background(0);
  var w = windowWidth;
  var scl = w/20;

  rotateX(PI/4);
  rotateZ(PI/4);
	//this is originally based on
	//Daniel Shiffman's Coding Challenge #86: Cube Wave by Bees and Bombs §
	//https://www.youtube.com/watch?v=H81Tdrmz2LA
	//and basically extending my older sketch
	//https://krabcode.github.io/posts/honeycomb/post

	//loop through all possible box positions, x and y will be the box coordinates
	//notice the loop doesn't start at 0 -
	//this means the center is at x = 0, y = 0
	//which is useful for finding your distance from it as well as drawing it in 3D
	for(var x = -w/2; x < w/2; x+= scl){
		for(var y = -w/2; y < w/2; y+= scl){

			var md  = map(min(abs(x), abs(y)), 0, w/2, 0, 1);
			var d = map(abs(x)+abs(y), 0, w, 0, 2);
			var td = .5+.5*sin(radians(100000*d*md-frameCount*4));
	    var zscl = 3*scl*td*d;
			var h = map(d*md*td,0,1,150,400)%255;


			//so now that we know everything about this box we're about to draw, let's draw it
			push(); //push a new matrix on the matrix stack because I want to be able to go back where I came from really easily
	    translate(x,y); //move the matrix to my box position
	    noStroke(); //outlines slow this down a lot, we don't need them anyhow
	    fill(h, 180, 255); //fill the boxes with a color of the hue, desaturate it a tiny bit (150) and give it full brightness (255)
	    box(scl, scl, zscl); //draw the box, two of its sides will always be the same, only the height changes
			pop(); //return to the original matrix. this would also work without push and pop by calling translate(-x,-y) here but whatevs, push and pop are really comfy to use

	  }
	}
}
