function setup() {
			  createCanvas(windowWidth, windowHeight);
	      background(0);
        ellipseMode(CENTER);
        rectMode(CENTER);
    }

    function draw(){
        background(0);
        noFill();
        inputX = map(mouseX, width, 0, 1.03,20);
        inputY = map(mouseY, height, 0, 1.03, 1.5);
        drawRecursively(width/2, height/2, 6, sin(radians(frameCount/6)));
    }

    function drawRecursively(x , y, size, orientation){
        push();
        if((size < height+height/3 || size < width+width/3) && size > 5){
            stroke(0,0,255);
            translate(x,y);
            rotate(orientation);
            rect(0,0,size,size);
            pop();
            drawRecursively(x,y, size*inputY, orientation+orientation/inputX);
        }else{
            pop();
        }
}
