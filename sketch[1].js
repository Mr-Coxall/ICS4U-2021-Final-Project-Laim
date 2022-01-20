// Variables
var speed = 10
var newDirection = 30
var palletW = 18
var speedC = 7.5
var balW = 7
var pointRed = 0
var pointBlue = 0
var maxAantalPunten = 3
var colorComputer='red'
var yourColor='blue'
var colorLines='white'
var colorBagground='black'
var colorBal='white'
var scoreX = 260
var scoreCY=250
var scoreYY=650
var scoreGrote = 150

var Ball = []
var trace = []
var tekenX = 1
var botsen = true
var compX = 300
var compY = 150
var move = true


function setup() {
  createCanvas(600, 800);
  Ball[0] = new bal(width / 2, height / 2, balW)
  paletX = width / 2
  paletY = height - 150
  // frameRate(1000)
  angleMode(DEGREES)
}

function draw() {
  background(colorBagground)

  //   Red lines
  strokeWeight(10)
  stroke(colorComputer)
  line(7, 16, 7, height / 2 - 7)
  line(width - 7, 16, width - 7, height / 2 - 7)
  line(16, 7, width / 2 - 75, 7)
  line(width - 16, 7, width / 2 + 75, 7)

  //   blue lines
  stroke(yourColor)
  line(7, height / 2 + 7, 7, height - 16)
  line(width - 7, height / 2 + 7, width - 7, height - 16)
  line(16, height - 7, width / 2 - 75, height - 7)
  line(width - 16, height - 7, width / 2 + 75, height - 7)

  //   white lines
  noFill()
  stroke(colorLines)
  strokeWeight(5)
  ellipse(width / 2, height / 2, 150)
  ellipse(width / 2, height / 2, 5)
  line(16, height / 2, width - 16, height / 2)
  arc(width / 2, 16, 150, 150, 0, 180, OPEN)
  arc(width / 2, height - 16, 150, 150, 180, 0, OPEN)

  //   pallet player
  if (mouseX < width - palletW - 7 && mouseX > palletW + 7 && mouseY > height / 2 + palletW && mouseY < height - palletW - 7) {
    paletX = mouseX
    paletY = mouseY
  }
  noStroke()
  fill(yourColor)
  ellipse(paletX, paletY, palletW * 2)
