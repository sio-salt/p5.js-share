// const density = "      _.,-=+:;cba!?0123456789$W#@Ñ";
const density = "  .:░▒▓█"
// const density =" .:#";

//let video;
let video;
let asciiDiv;
let k = 2;

function setup() {
  noCanvas();

  video = createCapture(VIDEO);
  video.size(48*k, 35*k);
  asciiDiv = createDiv();
}
//background(0);
//image(video, 0, 0, width, height);

// let w = width / video.width;
// let h = height / video.height;

function draw() {
  video.loadPixels();
  let asciiImage = "";
  for (let j = 0; j < video.height; j++) {
    for (let i = 0; i < video.width; i++) {
      const pixelIndex = (i + j * video.width) * 4;
      const r = video.pixels[pixelIndex + 0];
      const g = video.pixels[pixelIndex + 1];
      const b = video.pixels[pixelIndex + 2];
      const avg = (r + g + b) / 3;
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, 0, len));
      const sp = density.charAt(charIndex);
      if (sp == " ") asciiImage += "&nbsp;";
      else asciiImage += sp;
    }

    asciiImage += '<br/>';
  }
  asciiDiv.html(asciiImage);
}
