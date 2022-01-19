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