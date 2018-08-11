let planet;
let planetR = 200;
let seaR = 		200;
let planetDetail = 10;
let planetMtnHeight = 150;



let beachHue;
let grassHue;
let mountHue;

let center;

let player;
let playerSphereVector;
let playerButtonForce = .01;
let playerAcc;
let playerSpd;
let highestPoint;

var playerInputU = false;
var playerInputD = false;
var playerInputL = false;
var playerInputR = false;
var playerDetail = 4;
var playerR = 5;
var playerRotX = 0;
var playerRotZ = 0;

var easycam;

function setup() {
	colorMode(HSB, 255,255,255);
	createCanvas(windowWidth, windowHeight, WEBGL);
  setAttributes('antialias', true);
	background(0);
	beachHue = color(50, 150, 200);
	mountHue = color(255, 150, 50);
	center = createVector(planetDetail/4, planetDetail/2);
	player = createVector(planetDetail/4, planetDetail/2);
	highestPoint = createVector();
	playerSpd = createVector();
	playerAcc = createVector();
	playerSphereVector = createVector();
	planet = new Array(planetDetail);
	for(var i = 0; i < planetDetail; i++){
		planet[i] = new Array(planetDetail);
	}
	drawPlanet();
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	rotateX(PI/2);
	rotateZ(HALF_PI+map(-player.x, 0, planetDetail, 0, TWO_PI));
	updatePlayer();
	drawPlayer();
	drawSea();
	drawPlanet();
}

function drawSea(){
	fill(160, 90, 150);
	push();
	noStroke();
	sphere(seaR);
	pop();
}

function keyPressed(){
	if(key=='W'){
		playerInputU = true;
	}
	if(key=='S'){
    playerInputD = true;
	}
	if(key=='A'){
		playerInputL = true;
	}
	if(key=='D'){
		playerInputR = true;
	}
}


function keyReleased(){
	if(key=='W'){
		playerInputU = false;
	}
	if(key=='S'){
    playerInputD = false;
	}
	if(key=='A'){
		playerInputL = false;
	}
	if(key=='D'){
		playerInputR = false;
	}
}

function drawPlanet(){
	noStroke();
	let highestPointElev = 0;
	for (var y = 0; y < planetDetail; y++) {
			beginShape(TRIANGLE_STRIP);
			for (var x = 0; x <= planetDetail; x++) {

				var elev0 = getElev(x,y);
				var elev1 = getElev(x,y+1);

				if(elev0 > highestPointElev){
					highestPointElev = elev0;
					highestPoint = createVector(x,y);
				}

				var v0 = getPointOnSphere(x, y, planetDetail, planetDetail,planetR+elev0);
				var v1 = getPointOnSphere(x, y+1,planetDetail, planetDetail,planetR+elev1);

				if(v0.y<planetDetail/2){
					//continue;
				}

				fill(getColorAt(elev0));
				vertex(v0.x, v0.y, v0.z);
				fill(getColorAt(elev1));
				vertex(v1.x, v1.y, v1.z);
			}
			endShape();
	}
}

function getColorAt(elev0){
	return lerpColor(beachHue, mountHue, map(elev0, 0, planetMtnHeight, 0, 1));
}

function updatePlayer(){

	if(playerInputU){
		playerSpd.add(createVector(0, -playerButtonForce));
	}
	if(playerInputD){
		playerSpd.add(createVector(0,playerButtonForce));
	}
	if(playerInputL){
		playerSpd.add(createVector(playerButtonForce, 0));
	}
	if(playerInputR){
		playerSpd.add(createVector(-playerButtonForce, 0));
	}
	player.add(playerSpd);
	playerSpd.mult(.85);

	if(player.x < 0) player.x += planetDetail;
	if(player.x >= planetDetail) player.x -= planetDetail;
	if(player.y < 0) player.y += planetDetail;
	if(player.y >= planetDetail) player.y -= planetDetail;

}

function drawPlayer(){
	push();
	var elev = playerR/2+getElev(player.x, player.y) ;
	if(elev < playerR/2 ){
		elev = playerR/2;
	}
	print(elev);
	playerSphereVector = getPointOnSphere(player.x, player.y, planetDetail, planetDetail, planetR+elev);
	translate(playerSphereVector.x,playerSphereVector.y,playerSphereVector.z);
  noFill();
	stroke(255, 0, 255);
	strokeWeight(0.5);

	playerRotZ += playerSpd.x*5;
	playerRotX -= playerSpd.y*5;
	rotateZ(playerRotZ);
	rotateX(playerRotX);
	for (var y = 0; y < playerDetail; y++) {
			beginShape(TRIANGLE_STRIP);
			for (var x = 0; x <= playerDetail; x++) {
				var v0 = getPointOnSphere(x, y, playerDetail, playerDetail,playerR);
				var v1 = getPointOnSphere(x, y+1,playerDetail, playerDetail,playerR);
				vertex(v0.x, v0.y, v0.z);
				vertex(v1.x, v1.y, v1.z);
			}
			endShape();
	}
	pop();
}

function getElev(x,y){
	let noiseScl = .5;
	var elev = (noise(x*noiseScl,y*noiseScl, radians(frameCount/16))*planetMtnHeight*2)-planetMtnHeight;
	var d = dist(x,y,center.x, center.y) ;
	elev -= d*.5;
	if(elev < -planetMtnHeight){
		elev = -planetMtnHeight;
	}
	return elev;
}

function getPointOnSphere(x, y, xMax, yMax, r){
		var s = map(x, 0, xMax, 0, TWO_PI);
		var t = map(y, 0, yMax, 0, PI);
		var resultX = r * cos(s) * sin(t);
		var resultY = r * sin(s) * sin(t);
		var resultZ = r * cos(t);
		return createVector(resultX, resultY, resultZ);
}
