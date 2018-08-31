function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);
	colorMode(HSB, 255,255,255,255);
	easycam = new Dw.EasyCam(this._renderer, {distance : windowWidth});
}

function draw(){
  background(0);
  var w = windowWidth;
  var scl = w/25;

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
		  //for every box on the plane: we'll have to find how tall to make it and what color to give it
			//using only distance and time to inform these properties gets kind of boring as you can see in the Honeycomb example
			//so this'll take the smaller of the two distances from center to mix things up a bit
			var md  = min(abs(x), abs(y)); //md(minimumDistance) is a number between 0 and w/2 that is closely related to the distance of the box from the center
			var d = map(abs(x)+abs(y), 0, w, 0, 1); //d(distance) is the actual distance from center but mapped to a range from 0 to 1

			var td = .5+.5*sin(radians(md-frameCount)); //td (timeDistance) is also a number between 0 and 1 that is related to the minimumDistance and time (frameCount)
			//md-frameCount is the main part of finding this variable
			//the radians() just make it a lot smaller so that the changes are smoother
			//there's sine involved because I want the changes that time supplies to loop forever between known values
			// and .5+.5* is to map the output of the sine function which ranges from -1 to 1 to what I actually want: 0 - 1

	    		var zscl = 4*scl*td; //zscl is the height of each individual box - I take the timeDistance and inform the height with it

	    		var h = map(d*td,0,1,0,512)%200; //h (hue) is found by multiplying d and td.
			//seeing as d and td are both in the 0-1 range the multiplied values will also never exit the 0-1 range
			//this fact allows me to map this to any other range I want really easily.
			//I map it to a range of 0-512 just because I played with it for a while and this looked pretty I guess
			//%200 means there's a hue range between 200 and 255 I'm not interested, I'd otherwise have to say %255 here to stay in the hue range
			//512 and 200 are not set in stone, feel free to play with them to get different gradients, for example I like the final hue range between 130 and 200 a lot for this sketch too

			//so now that we know everything about this box we're about to draw, let's draw it
			push(); //push a new matrix on the matrix stack because I want to be able to go back where I came from really easily
	    translate(x,y); //move the matrix to my box position
	    noStroke(); //outlines slow this down a lot, we don't need them anyhow
	    fill(h, 150, 255); //fill the boxes with a color of the hue, desaturate it a tiny bit (150) and give it full brightness (255)
	    box(scl, scl, zscl); //draw the box, two of its sides will always be the same, only the height changes
			pop(); //return to the original matrix. this would also work without push and pop by calling translate(-x,-y) here but whatevs, push and pop are really comfy to use

	  }
	}
}
