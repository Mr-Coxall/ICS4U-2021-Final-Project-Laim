/**
 * The Triangle Program
 *
 * @author  Liam Fletcher
 * @version 1.0
 * @since   2022-01-06
 */

let ourText = "Hello World!";

function setup() {
  // place comment here
  createCanvas(400, 400);
}

function draw() {
  // place comment here
  background(220);
  fill(0);
  textSize(32);
  //Creating the frame
  textLeading(sin(frameCount * 0.01) * 100);
  text(ourText, 40, height / 2, 300, 350);
}
