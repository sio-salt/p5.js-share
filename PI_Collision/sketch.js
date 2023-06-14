//Calculate Pi with Collision!

let digits = 5;
let timeSteps = (7 ** (digits - 1));
let block1 = new Block();
let hitCount = 0;
let countDiv;
let vel = -1.5;
let block2Speed = vel / timeSteps;
let j = 0;
let clack;

function preload() {
  clack = loadSound("data/clack.wav");
}

function setup() {
  // frameRate(200);
  createCanvas(windowWidth, 400);
  rectMode(RADIUS);
  textAlign(CENTER, CENTER);
  textSize(20);
  block1 = new Block(width / 4, 0, 1, 20);
  let m2 = 100 ** (digits - 1);
  let size2 = 20 + (digits - 1) * 15;
  block2 = new Block((width * 2.3) / 4, block2Speed, m2, size2);
  countDiv = createDiv(hitCount);
  countDiv.style("font-size", "60pt");
  clack.setVolume(0.4);
}

function draw() {
  background(200);
  clackSound = false;

  for (let i = 0; i < timeSteps; i++) {
    block1.wallCollide();
    block1.blockCollide(block2);
    block1.update();
    block2.update();
  }

  if (clackSound) {
    clack.play();
  }

  block1.finishCheck(block2);
  block1.display();
  block2.display();

  countDiv.html(nf(hitCount, digits));
}
