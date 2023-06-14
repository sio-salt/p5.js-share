//
// How to use
// Upper slider to adjust parameters roughly
// Lower slider to adjust parameters precisely
// Left click and drag to zoom
// Right click and drag to zoom out
// Wheel click and drag to quick zoom out
//




const iteration = 250;
const alphavalue = 255;
let inia = -0.8;
let inib = 0.156;
const framerate = 15;
let finea = 0;
let fineb = 0;

class direction {
  constructor(left, right, up, down) {
    this.left = left;
    this.right = right;
    this.up = up;
    this.down = down;
  }

  mulAll(p) {
    let d = this;
    return new direction(d.left * p, d.right * p, d.up * p, d.down * p);
  }

  translateAll(Tx, Ty) {
    //Tx、Tyを原点にする。
    let d = this;
    return new direction(d.left - Tx, d.right - Tx, d.up - Ty, d.down - Ty);
  }
}

//描画範囲の初期値群
const inileft = -2;
const iniright = 2;
const iniup = 2;
const inidown = -2;

let d = new direction(inileft, iniright, iniup, inidown);

class CN {
  constructor(re, im) {
    this.re = re;
    this.im = im;
  }

  add(c2) {
    let c1 = this;
    return new CN(c1.re + c2.re, c1.im + c2.im);
  }

  sub(c2) {
    let c1 = this;
    return new CN(c1.re - c2.re, c1.im - c2.im);
  }

  mul(c2) {
    let c1 = this;
    return new CN(c1.re * c2.re - c1.im * c2.im, c1.im * c2.re + c1.re * c2.im);
  }

  zsquare() {
    let c = this;
    return c.re ** 2 + c.im ** 2;
  }
}

let mouse = 0;
// function mouseWheel(event) {
//   //console.log(mouse);
//   mouse = event.delta / abs(event.delta);
//   return mouse;
// }

// let startX = 0;
// let startY = 0;
// let dragX = 0;
// let dragY = 0;

// function mousePressed() {
//   startX = mouseX;
//   startY = mouseY;
// }

// function mouseDragged() {
//   let diffX = startX - mouseX;
//   let diffY = startY - mouseY;
//   dragX = dragX - diffX;
//   dragY = dragY -diffY;
//   startX = mouseX;
//   startY = mouseY;
// }

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
  loadPixels();
  frameRate(framerate);
  colorMode(HSB);
  slidera = createSlider(-1, 1, -0.8, 0.001);
  sliderb = createSlider(-1, 1, 0.156, 0.001);
  sliderfinea = createSlider(-0.02, 0.02, 0, 0.000001);
  sliderfinea.position(0, height + 30);
  sliderfineb = createSlider(-0.02, 0.02, 0, 0.000001);
  sliderfineb.position(133, height + 30);
  
  // noLoop;
}

function draw() {
  
  //Zoom機能
  if (mouseIsPressed == true) {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
      if (mouseButton == LEFT) mouse = 2;
      if (mouseButton == RIGHT) mouse = -1;
      if (mouseButton == CENTER) mouse = -5;
    }
    else mouse = 0;
  }
  
  let MouseX = map(mouseX, 0, width, d.left, d.right);
  let MouseY = map(mouseY, 0, height, d.down, d.up);
  let percent = 1 - mouse / 30;
  d = d
    .translateAll(MouseX, MouseY)
    .mulAll(percent)
    .translateAll(-MouseX, -MouseY);
  //d = d.mulAll(percent);
  mouse = 0;

  let sign;
  if (MouseY > 0) sign = " + " + MouseY + " i";
  else if (MouseY == 0) sign = "";
  else sign = " - " + abs(MouseY) + " i";
  let cursor = MouseX + sign;
  //text(cursor, 100, 100);
  console.log(cursor);

  //drag機能
  // let dragXmap = map(dragX, 0, width, 0, d.right-d.left);
  // let dragYmap = map(dragY, 0, height, 0, d.up-d.down);
  // d = d.translateAll(dragXmap, dragYmap);

  // print(dragX, dragY, dragXmap, dragYmap);

  //cの発散までの計算回数を出力する関数、cは初期値、zは漸化式の項
  inia = slidera.value() + sliderfinea.value();
  inib = sliderb.value() + sliderfineb.value();
  let f = (c) => {
    let z = c; //zは初期値0
    let n = 0;
    let ini = new CN(inia, inib);
    for (n = 0; n < iteration; n++) {
      //nは計算回数
      // let prez = new CN(z.re, z.im);
      z = z.mul(z).add(ini);
      if (z.zsquare() > 4) break;
    }
    return n;
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let a = map(x, 0, width, d.left, d.right);
      let b = map(y, 0, height, d.down, d.up);
      let c = new CN(a, b);

      //cに対して計算
      let n = f(c);
      // console.log(n);

      let pix = (x + y * width) * 4; //ピクセルの番号
      let brightness = map(n, 0, iteration, 0, 200);
      // if (n == iteration) {
      //   for (let i = 0; i < 3; i++) {
      //     pixels[pix + i] = 255;
      //   }
      // } else {
        let hu = color(brightness,100,100);
      //   pixels[pix/4] = color(hu, 255, 255);
      // }

      pixels[pix + 0] = 0;
      pixels[pix + 1] = brightness;
      pixels[pix + 2] = brightness;
      pixels[pix + 3] = alphavalue;
    }
  }
  updatePixels();
}

document.oncontextmenu = (e) => {
  e.preventDefault();
};
