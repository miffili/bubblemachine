
const autoBtn = document.querySelector("#toggle");
const extraBtn = document.querySelector("#extra");
const colorBtn = document.querySelector("#color");
const modeBtn = document.querySelector("#mode");
var intervalId;

let toggle = false;
let colored = false;
let speedmodus = false;
let vis = 0;
let speed = 600;

function toggleButton(){
  toggle = !toggle;
  if(toggle){
    autoBtn.innerHTML = "Stop Bubbles";
  } else {
    autoBtn.innerHTML = "Start Bubbles";
  }
}

function runAutomatic() {
  console.log(speed);
  intervalId = setInterval(automatic, speed);
}

function stopAutomatic() {
  clearInterval(intervalId);
}

function toggleAutomatic() {
  if(toggle){
    runAutomatic();
  } else {
    stopAutomatic();
  }
}

function toggleColor() {
  colored = !colored;
  if(colored){
    colorBtn.innerHTML = "White"
    vis = 0.8;
  } else {
    colorBtn.innerHTML = "Color"
    vis = 0;
  }
}

function toggleMode() {
  speedmodus = !speedmodus;
  if(speedmodus){
    modeBtn.innerHTML = "Chill!";
    speed = 300;
  } else {
    modeBtn.innerHTML = "Speed!";
    speed = 600;
  }
  if(toggle){
    stopAutomatic();
    runAutomatic();
  }
}

autoBtn.addEventListener("click", toggleButton);
autoBtn.addEventListener("click", toggleAutomatic);
extraBtn.addEventListener("click", oneBubble);
colorBtn.addEventListener("click", toggleColor);
modeBtn.addEventListener("click", toggleMode);

window.addEventListener("dblclick", () => bubbles.splice(0));

// p5-related JavaScript

let bubbles = [];

function setup() {
  createCanvas(displayWidth, displayHeight+20);
}

function automatic(){
  let b = new Bubble();
  bubbles.push(b);
}

function oneBubble(){
  let b = new Bubble();
  bubbles.push(b);
}

function draw() {
  background('#2D2D2D');
  for(let i = 0; i < bubbles.length; i++){
    bubbles[i].move();
    bubbles[i].show();
  }
  for(let i = bubbles.length-1; i >= 0; i--){
    if(bubbles[i].out() || bubbles[i].contains(mouseX, mouseY)){
      bubbles.splice(i, 1);
    };
  }
}

class Bubble {
  constructor() {
    this.dBig = floor(random(40, 201));
    this.x = this.dBig/2;
    this.yAx = random(50, windowHeight-50);
    this.fun = random(0,1);
    this.hue = floor(random(0, 361));
    this.dSma = 0.97*this.dBig;
    this.strokeS = 0.05*this.dBig;
    this.strokeL = 0.08*this.dBig;
    this.dHl = 0.74*this.dBig;
    this.step = random(1, 3)
  }

  contains(px, py){
    let d = dist(px, py, this.x, this.y);
    return(d < this.dBig/2);
  }

  out() {
    return(this.x + this.dBig/2 >= windowWidth || this.y + this.dBig/2 >= windowHeight);
  }

  move() {
    this.x = this.x + this.step;
    if(this.yAx > windowHeight/2 ){
      this.y = windowHeight/2 + 0.1*this.x + this.fun*(this.yAx)/2*sin(this.x/(this.step*100));
    } else {
      this.y = windowHeight/2 + 0.1*this.x - this.fun*(this.yAx)/2*sin(this.x/(this.step*100));
    }
  }

  show() {
    noFill();
    strokeWeight(2);
    stroke(color('rgba(255, 255, 255, 0.8)'));
    ellipse(this.x, this.y, this.dBig);
    stroke(color('hsla(' + this.hue + ', 100%, 64%, ' + vis + ')'));
    ellipse(this.x, this.y, this.dSma);

    strokeWeight(this.strokeL);
    strokeCap(SQUARE);
    stroke(color('rgba(255, 255, 255, 0.7)'));
    arc(this.x, this.y, this.dHl, this.dHl, 13/8*PI, 15/8*PI);
    strokeWeight(this.strokeS);
    arc(this.x, this.y, this.dHl, this.dHl, 31/16*PI, 65/32*PI);
  }
}
