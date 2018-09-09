var angle;

var len = 80;
var axiom = "F";
var sentence = axiom;
var rules = [];
rules[0] = {
  a: "F",
  b: "F+[+F-F-F]-[-F+F]"
}


var bestAngle = 22;

var generations = 3;
var maxDepth = 3;

var leafCount = 4;
var maxLeafSize = 15;

var season = 0;
var maxSeason = 4;

function setup() {
  colorMode(HSB, 400, 100, 100, 100);
  createCanvas(windowWidth, windowHeight);
/*
  easycam = createEasyCam({
    center: [0, -height / 6, 0]
  });*/
  background(0);
  /*
  print("Behold the mighty L-System magic")
  print("axiom: " + axiom.toString());
  for (var r = 0; r < rules.length; r++) {
    print("rule " + r + ": " + rules[r].a + "->" + rules[r].b);
  }*/
  for (var i = 0; i < generations; i++) {
    generate();
  }
}

function draw() {
  season = (frameCount/100);
  season = season%maxSeason;
  print(season);
  background(0);
  strokeWeight(1);
  translate(width*.5, height);
  angle = radians(bestAngle);
  var depth = 0;
  for (var i = 0; i < sentence.length; i++) {
    var curr = sentence.charAt(i);
    if (curr == 'F') {
      //LEAVES
      if(depth == maxDepth){
        var leafSize = maxLeafSize;
        var summerLeafFill = color(113,90,80);
        var autumnLeafFill = color(map(i, 0, sentence.length, 0, 50),90,80);
        if(season >= 0 && season <= 1){
          fill(summerLeafFill);
          leafSize = season*maxLeafSize;
          drawLeaves(leafSize);
        }
        if(season > 1 && season <= 2){
          fill(summerLeafFill);
          drawLeaves(maxLeafSize);
        }
        if(season > 2 && season <= 3){
          var current = map(season, 1, 3, 0, 1);
          fill(lerpColor(summerLeafFill, autumnLeafFill, current));
          drawLeaves(leafSize);
        }if(season > 3){
          fill(autumnLeafFill);
          scatterLeaves(leafSize, season-3);
        }
      }

      //BRANCH
      strokeWeight(map(depth, 0, maxDepth, 10,2));
      stroke(40,65,38);
      line(0, 0, 0, -len);

      translate(0, -len);
    } else if (curr == '+') {
      rotate(angle);
    } else if (curr == '-') {
      rotate(-angle);
    } else if (curr == '[') {
      push();
      depth++;
      if(depth > maxDepth){
        maxDepth = depth;
        print("maxDepth: " + maxDepth)
      }
    } else if (curr == ']') {
      pop();
      depth--;
    }
  }
}

function drawLeaves(leafSize){
  var scl = len/leafCount;
  for(var j = 0; j <= leafCount; j++){
    noStroke();
    quad(leafSize+leafSize*sin(j),-scl*j,
       0,-scl*j-leafSize,
       -leafSize+leafSize*sin(j), -scl*j,
       0, -scl*j+leafSize);
  }
}

function scatterLeaves(leafSize, percent){
  var scl = len/leafCount;
  for(var j = 0; j < leafCount; j++){
    push();
    
    translate(percent*100, percent*100);
    leafSize = leafSize-percent*leafSize;
    noStroke();
    quad(leafSize+leafSize*sin(j-radians(frameCount)),-scl*j,
       0,-scl*j-leafSize,
       -leafSize+leafSize*sin(j-radians(frameCount)), -scl*j,
       0, -scl*j+leafSize);
    pop();
  }
}

function generate() {
  var nextSentence = "";
  for (var i = 0; i < sentence.length; i++) {
    var curr = sentence.charAt(i);
    var found = false;
    for (var j = 0; j < rules.length; j++) {
      if (curr == rules[j].a) {
        nextSentence += rules[j].b;
        found = true;
        break;
      }
    }
    if (!found) {
      nextSentence += curr;
    }
  }
  sentence = nextSentence;
  // print("sentence: " + sentence);
}
