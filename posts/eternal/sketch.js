//based on the Eternal Something album cover by the artist Daniel Brandt
//because I really enjoy that Chaparral Mesa song and I also liked the art

function setup() {
	createCanvas(800,800);
	background(.7);
	rectMode(CENTER);
}

function draw() {
	background(255, 162, 56);
	drawRect(25,15, 0);
}

function drawRect(sizeX, sizeY, gen){
	 if(sizeX > width*2){
		return;
	 }
	 stroke(255);
	 strokeWeight(2);
	 noFill();
	 var t = radians(frameCount);
	 var x = width/2 + width/4*cos(t-gen/20);
	 var y = height/2 +  height/4*sin(t-gen/20);
	 rect(x,y, sizeX, sizeY);
	 drawRect(sizeX + 20, sizeY + 20, gen+1);
}
