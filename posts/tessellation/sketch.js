var sphereTop;
var topPentagon;
var bottomPentagon;
var bottom;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
	easycam = new Dw.EasyCam(this._renderer, {distance : windowWidth*1.5});
  // Precalculating icosahedron vertex arrays
  sphereTop = createVector(0, 1, 0);
  bottom = createVector(0, -1, 0);
  var deg5 = TWO_PI/5; // Pentagon angle
  var deg = acos((1+sqrt(5))/(5+sqrt(5))); // Degree between vectors from the center to two neighbor vertices
  // Array of vertices on the top pentagon
  // The pentagon is created by rotating a vertex that is deg radians away from the top vertex by one-fifths of TWO_PI
  // Bottom pentagon is just inverted top pentagon. Rotation order stays the same, but indexes are shifted by 2
  // Recursively draw triangles. For each detail level each triangle is divided varo four
	topPentagon = new Array();
	bottomPentagon = new Array();
  for (var i = 0; i < 5; i++) {
    topPentagon[i] = createVector(
      sin(deg)*cos(-deg5*i),
      cos(deg),
      sin(deg)*sin(-deg5*i)
    );
    var j = (i+2)%5;
    bottomPentagon[j] = topPentagon[i].copy();
    bottomPentagon[j].mult(-1);
  }
}

function draw() {
  background(0);
  noFill();
  stroke(255);
  // translate(width/2, height/2,-width/2);
  //lightSpecular(256, 256, 256);
  //ambientLight(64, 64, 64);
  //directionalLight(60, 60, 60, -1, 1, -1);
  rotateX(-PI/6);
  rotateY(frameCount*0.01);
  drawSphere(400, 3);
}

// main sphere rendering call
function drawSphere(r, detail) {
  beginShape(TRIANGLES);
  for (var i = 0; i < 5; i++) {
    var j = (i+1)%5;
    var topR = p5.Vector.mult(sphereTop, r);
    var bottomR = p5.Vector.mult(bottom, r);
    var topPentagonRi = p5.Vector.mult(topPentagon[i], r);
    var topPentagonRj = p5.Vector.mult(topPentagon[j], r);
    var bottomPentagonRi = p5.Vector.mult(bottomPentagon[i], r);
    var bottomPentagonRj = p5.Vector.mult(bottomPentagon[j], r);
    // Triangles defined by vertices on the top pentagon and the top
    trig(r, topR, topPentagonRj, topPentagonRi, detail);
    // Triangles connecting the top pentagon and the bottom pentagon
    trig(r, topPentagonRj, bottomPentagonRi, bottomPentagonRj, detail);
    trig(r, bottomPentagonRi, topPentagonRj, topPentagonRi, detail);
    // Triangles connecting the bottom pentagon and the bottom vertex
    trig(r, bottomR, bottomPentagonRj, bottomPentagonRi, detail);
  }
  endShape();
}

// Recursive triangle division
function trig(r, p1, p2, p3, detail) {
  if (detail > 1) {
    // Mid-povar vertex (angle-wise) is the same as a linear mid-povar but scaled to r

    var mid12 = p1.copy();
    mid12.add(p2);
    mid12.setMag(r);
    var mid23 = p2.copy();
    mid23.add(p3);
    mid23.setMag(r);
    var mid13 = p1.copy();
    mid13.add(p3);
    mid13.setMag(r);

    // Decreasing the detail level
    detail--;
    // Recursive triangle divison
    // Vertex order is important for lighting
    trig(r, p1, mid12, mid13, detail);
    trig(r, p2, mid23, mid12, detail);
    trig(r, p3, mid13, mid23, detail);
    trig(r, mid12, mid23, mid13, detail);
  } else {
    // If reached the desired subdivisoion level
    // Normal is a mid-povar level for low-poly like effect
    // If you want smooth lighting call normal before each vertex
    // For a sphere with center at the origin povar vertex is the same as the normal
    // The shader will normalize the normal anyway, so there is no need to do it here
    // var norm = p1.copy();
    // norm.add(p2);
    // norm.add(p3);
    // normal(norm);
    vertexx(p1);
    vertexx(p2);
    vertexx(p3);
  }
}

function vertexx(v) {
  vertex(v.x, v.y, v.z);
}

function normal(v) {
  normal(v.x, v.y, v.z);
}
