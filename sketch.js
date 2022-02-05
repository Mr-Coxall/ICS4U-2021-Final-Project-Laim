// Final Project Code
// Created by Liam Fletcher
// Created on Jan 2022

// Variables
var speed = 10;
var newDirection = 30;
var palletW = 18;
var speedC = 7.5;
var balW = 7;
var pointRed = 0;
var pointBlue = 0;
var maxAantalPunten = 3;
var colorComputer = "red";
var yourColor = "blue";
var colorLines = "white";
var colorBagground = "black";
var colorBal = "white";
var scoreX = 260;
var scoreCY = 250;
var scoreYY = 650;
var scoreGrote = 150;

var Ball = [];
var trace = [];
var tekenX = 1;
var botsen = true;
var compX = 300;
var compY = 150;
var move = true;

function setup() {
    createCanvas(600, 800);
    Ball[0] = new bal(width / 2, height / 2, balW);
    paletX = width / 2;
    paletY = height - 150;
    // frameRate(1000)
    angleMode(DEGREES);
}

function draw() {
    background(colorBagground);

    //   Red lines
    strokeWeight(10);
    stroke(colorComputer);
    line(7, 16, 7, height / 2 - 7);
    line(width - 7, 16, width - 7, height / 2 - 7);
    line(16, 7, width / 2 - 75, 7);
    line(width - 16, 7, width / 2 + 75, 7);

    //   blue lines
    stroke(yourColor);
    line(7, height / 2 + 7, 7, height - 16);
    line(width - 7, height / 2 + 7, width - 7, height - 16);
    line(16, height - 7, width / 2 - 75, height - 7);
    line(width - 16, height - 7, width / 2 + 75, height - 7);

    //   white lines
    noFill();
    stroke(colorLines);
    strokeWeight(5);
    ellipse(width / 2, height / 2, 150);
    ellipse(width / 2, height / 2, 5);
    line(16, height / 2, width - 16, height / 2);
    arc(width / 2, 16, 150, 150, 0, 180, OPEN);
    arc(width / 2, height - 16, 150, 150, 180, 0, OPEN);

    //   pallet player
    if (
        mouseX < width - palletW - 7 &&
        mouseX > palletW + 7 &&
        mouseY > height / 2 + palletW &&
        mouseY < height - palletW - 7
    ) {
        paletX = mouseX;
        paletY = mouseY;
    }
    noStroke();
    fill(yourColor);
    ellipse(paletX, paletY, palletW * 2);

    //   pallet computer
    noStroke();
    fill(colorComputer);
    ellipse(compX, compY, palletW * 2);

    // trace bal, angle
    append(trace, Ball[0].x);
    append(trace, Ball[0].y);
    if (trace.length >= 5) {
        vbp1 = createVector(paletX - Ball[0].x, paletY - Ball[0].y);
        vb1 = createVector(
            trace[0] - trace[trace.length - 2],
            trace[1] - trace[trace.length - 1]
        );
        angle = vbp1.angleBetween(vb1);
        vector = createVector(-1, 0);
        differentA = vbp1.angleBetween(vector);
    }
    //   collide pallet

    if (
        (dist(paletX, paletY, Ball[0].x, Ball[0].y) <= Ball[0].w + palletW) &
        (botsen == true)
    ) {
        if (
            (differentA < 90 && differentA > 0) ||
            (differentA > -180 && differentA < -90)
        ) {
            newDirection = 90 - angle + differentA;
        }
        if (
            (differentA <= 180 && differentA >= 90) ||
            (differentA >= -90 && differentA <= 0)
        ) {
            newDirection = 90 - angle + differentA + 180;
        }

        botsen = false;
        setTimeout(Botsen, 500);
    }

    //collide computer
    if (trace.length >= 5) {
        vcb1 = createVector(compX - Ball[0].x, compY - Ball[0].y);
        vb1 = createVector(
            trace[0] - trace[trace.length - 2],
            trace[1] - trace[trace.length - 1]
        );
        angle = vcb1.angleBetween(vb1);
        vector = createVector(-1, 0);
        differentB = vcb1.angleBetween(vector);
        trace = subset(trace, 2, 4);

        // move pallet computer
        compYB = compY;
        if (
            compX < width - palletW - 7 &&
            compX > palletW + 7 &&
            compY < height / 2 - palletW &&
            compY > palletW + 7 &&
            move == true
        ) {
            compX = compX + speedC * cos(-differentB);
            compY = compY + speedC * sin(-differentB);
        }
        if (compX > width - palletW - 7) {
            compX -= 1;
            compY = compY + speedC * sin(-differentB);
        }
        if (compX < palletW + 7) {
            compX += 1;
            compY = compY + speedC * sin(-differentB);
        }
        if (compY > height / 2 - palletW) {
            compX = compX + speedC * cos(-differentB);
            compY -= 1;
        }
        if (compY < palletW + 7) {
            compX = compX + speedC * cos(-differentB);
            compY += 1;
        }
    }

    if (
        (dist(compX, compY, Ball[0].x, Ball[0].y) <= Ball[0].w + palletW) &
        (botsen == true)
    ) {
        move = false;
        if (
            (differentB < 90 && differentB > 0) ||
            (differentB > -180 && differentB < -90)
        ) {
            newDirection = 90 - angle + differentB;
        }
        if (
            (differentB <= 180 && differentB >= 90) ||
            (differentB >= -90 && differentB <= 0)
        ) {
            newDirection = 90 - angle + differentB + 180;
        }
        botsen = false;
        setTimeout(Botsen, 500);
    }
    if (move == false) {
        setTimeout(bewegen, 500);
    }

    //   ball
    fill(colorBal);
    stroke(colorBal);
    Ball[0].speedX = speed * cos(newDirection);
    Ball[0].speedY = speed * sin(newDirection);
    Ball[0].move();
    Ball[0].show();
    Ball[0].bounce();
    Ball[0].goal();

    //   score
    strokeWeight(3);
    textSize(scoreGrote);
    noFill();
    stroke(yourColor);
    text(pointBlue, scoreX, scoreYY);
    stroke(colorComputer);
    text(pointRed, scoreX, scoreCY);

    // end game
    noStroke();
    if (pointBlue === maxAantalPunten) {
        textSize(50);
        fill(yourColor);
        text("You win!", 70, 200);
        text("press R to restart", 70, 250);
        noLoop();
    }
    if (pointRed === maxAantalPunten) {
        textSize(50);
        fill(colorComputer);
        text("computer wins :(", 70, 200);
        text("press R to restart", 70, 250);
        noLoop();
    }
    stroke(colorLines);
    strokeWeight(5);
    point(545, 552);
}

class bal {
    constructor(x, y, w) {
        this.x = x;
        this.y = y;
        this.w = w;
    }
    move() {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    }

    bounce() {
        if (this.x >= width - this.w - 17 || this.x <= this.w + 17) {
            newDirection = 180 - newDirection;
        }

        if (
            (this.y >= height - this.w - 17) & (this.x <= width / 2 - 75) ||
            (this.y >= height - this.w - 17) & (this.x >= width / 2 + 75) ||
            (this.y <= this.w + 17) & (this.x <= width / 2 - 75) ||
            (this.y <= this.w + 17) & (this.x >= width / 2 + 75)
        ) {
            newDirection = -newDirection;
        }
    }

    goal() {
        if (
            (this.y >= height - this.w) &
            (this.x >= width / 2 - 75) &
            (this.x <= width / 2 + 75)
        ) {
            pointRed += 1;
            setTimeout(startPositie, 2000);
            noLoop();
        }

        if (
            (this.y <= this.w) &
            (this.x >= width / 2 - 75) &
            (this.x <= width / 2 + 75)
        ) {
            pointBlue += 1;
            setTimeout(startPositie, 2000);
            noLoop();
        }
    }

    show() {
        ellipse(this.x, this.y, this.w * 2);
    }
}

function Botsen() {
    botsen = true;
}

function startPositie() {
    Ball[0].y = height / 2;
    Ball[0].x = width / 2;
    compX = width / 2;
    compY = 150;
    newDirection = 30;
    loop();
}

function bewegen() {
    move = true;
}

function keyPressed() {
    if (keyCode === 82) {
        pointBlue = 0;
        pointRed = 0;
        newDirection = 30;
        Ball[0].y = height / 2;
        Ball[0].x = width / 2;
        compX = width / 2;
        compY = 150;
        loop();
    }
}

function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}
