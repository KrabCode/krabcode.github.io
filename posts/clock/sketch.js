
      var bigSecondHandSize = .3;
      var mSize = .28;
      var hSize = .2;
      var size = 0;
      var lastSecond = 0;
      var lastSecondMillis = 0;

      var clockTop = 0;
      var totalHours = 12;
      var totalMinutes = 60;

      var sStroke = 105;
      var mStroke = 160;
      var hStroke = 200;
      var sStrokeW = 10;
      var mStrokeW = 10;
      var hStrokeW = 20;

      var dPos = 0;
      var aPos = 0;
      var aSpd = 0;
      var aAcc = 0;
      var accHP = .2;
      var aDamp = .7;
    var center;

       function settings() {
        fullScreen(1);
        smooth(8);
    }

       function mousePressed() {
        dPos = clockTop + atan2(center.y - mouseY, center.x - mouseX);
    }

       function mouseDragged() {
        dPos = clockTop + atan2(center.y - mouseY, center.x - mouseX);
    }

  function setup() {
				createCanvas(windowWidth, windowHeight);
				clockTop = -HALF_PI;
        strokeCap(PROJECT);
        ellipseMode(CENTER);
        rectMode(CENTER);
        colorMode(HSB, 360, 255, 255, 100);
        aPos = clockTop + (second() / 60) * TWO_PI;
        dPos = clockTop + (second() / 60) * TWO_PI;
        center = createVector(width / 2, height * .35);
    }

       function draw() {
        size = min(width, height);
        background(0);
        translate(center.x, center.y);
        stroke(sStroke);
        drawSecondsKinematically();
       	stroke(0, 255, 255, 80);
       	// drawSecondsNaively(2.8);
        drawHoursAndMinutesSmoothly();
        saveMillisSinceLastSecond();
    }

      function drawHoursAndMinutesSmoothly() {
        noFill();
        var tM = clockTop + (minute() / totalMinutes + second() / (totalMinutes * totalMinutes)) * TWO_PI;
        var tH = clockTop + (hour() / totalHours + minute() / (totalMinutes * totalMinutes)) * TWO_PI;

        //hours
        var x = size * hSize * cos(tH);
        var y = size * hSize * sin(tH);
        strokeWeight(hStrokeW);
        stroke(hStroke);
        line(0, 0, x, y);

        //minutes
        x = size * mSize * cos(tM);
        y = size * mSize * sin(tM);
        strokeWeight(mStrokeW);
        stroke(mStroke);
        line(0, 0, x, y);
    }

      function drawSecondsNaively(wiggleIntensity) {
        var tS = clockTop + (second() / 60) * TWO_PI;
        var offsetAngle = wiggleIntensity * max(0, (1 - 2 * secondsSinceLastWholeSecond()));
        var offsetStrength = max(0, radians(offsetAngle));
        var offsetDir = sin(offsetStrength * 10000);
        var wiggle = offsetDir * offsetStrength;
        drawSecondHandAtAngle(tS + wiggle);
    }

      function drawSecondsKinematically() {
        aPos = aPos % TWO_PI;
        if (!mouseIsPressed) {
            dPos = (second() / 60) * TWO_PI;
        }
        var diff = dPos - aPos;
        if (diff < -PI) {
            diff += TWO_PI;
        }
        if (diff > PI) {
            diff -= TWO_PI;
        }
        aAcc = diff * accHP;
        aSpd += aAcc;
        aSpd *= aDamp;
        aPos += aSpd;
        drawSecondHandAtAngle(clockTop + aPos);
    }

    function mx() {
        var val = map(mouseX, 0, width, 0, 1);
        prvarln("mx: " + val);
        return val;
    }

      function drawSecondHandAtAngle(angle) {
        var x = size * bigSecondHandSize * cos(angle);
        var y = size * bigSecondHandSize * sin(angle);
        // stroke(sStroke);
        strokeWeight(sStrokeW);
        line(0, 0, x, y);
    }

    function secondsSinceLastWholeSecond() {
        return (millis() - lastSecondMillis) / 1000;
    }

      function saveMillisSinceLastSecond() {
        if (second() > lastSecond || (second() == 0 && lastSecond == 59)) {
            lastSecondMillis = millis();
        }
        lastSecond = second();
    }

      function timeOfDayNormalized() {
        return hour() / 24 + minute() / (24 * 60);
    }
