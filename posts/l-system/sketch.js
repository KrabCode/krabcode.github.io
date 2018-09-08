var angle;
var summerAngle = 22;
var generations = 3;
var len = 30;
var axiom = "F";
var sentence = axiom;
var rules = [];
rules[0] = {
  a: "F",
  b: "F+[+F-F-F]-[-F+F]"
}

function setup() {
  colorMode(HSB, 1, 1, 1, 1);
  createCanvas(windowWidth, windowHeight, WEBGL);
  easycam = createEasyCam({
    center: [0, -height / 6, 0]
  });
  background(0);
  print("Behold the mighty L-System magic")
  print("axiom: " + axiom.toString());
  for (var r = 0; r < rules.length; r++) {
    print("rule " + r + ": " + rules[r].a + "->" + rules[r].b);
  }
  for (var i = 0; i < generations; i++) {
    generate();
  }
}

var lastMaxHeight = 100;

function draw() {
  background(0);
  strokeWeight(1);
  rotateY(-PI / 6);
  angle = radians(summerAngle + 3 * sin(frameCount / 50));

  var height = 0;
  var remember = 0;

  for (var i = 0; i < sentence.length; i++) {
    var curr = sentence.charAt(i);
    if (curr == 'F') {
      height++;
      if(height > lastMaxHeight){
        lastMaxHeight = height;
      }
      stroke(map(height+frameCount, 0, lastMaxHeight, 0, 1)%1,1,1);
      line(0, 0, 0, -len);
      translate(0, -len);

    } else if (curr == '+') {
      rotateX(angle);
      rotateZ(angle * .6);
    } else if (curr == '-') {
      rotateX(-angle);
      rotateZ(-angle * .6);
    } else if (curr == '[') {
      push();
      remember = height;
    } else if (curr == ']') {
      pop();
      height = remember;
    }
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
  print("sentence: " + sentence);
}
