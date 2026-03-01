let logoImg;
let bandColors = [];
let bandImages = [];
const numBands = 45; // 索引范围 0-44，避免越界
let wavePhase = 0;
let navHeight = 70;
let selectedImage = null;
let selectedColor = null; // 记录点击色块的颜色

function preload() {
  logoImg = loadImage("logo.png");
  
  // 加载各色系图片（按你原代码的命名）
  let img1 = loadImage("red_vase.png");
  let img2 = loadImage("red_teapot1.png");
  let img3 = loadImage("red_vase2.png");
  let img4 = loadImage("red_teapot2.png");
  let img5 = loadImage("red_purple.png");
  let img6 = loadImage("orange1.png");
  let img7 = loadImage("orange2.png");
  let img8 = loadImage("orange3.png");
  let img9 = loadImage("orange4.png");
  let img10 = loadImage("orange5.png");
  let img11 = loadImage("yellow1.png");
  let img12 = loadImage("yellow2.png");
  let img13 = loadImage("yellow3.png");
  let img14 = loadImage("yellow4.png");
  let img15 = loadImage("yellow5.png");
  let img16 = loadImage("green1.png");
  let img17 = loadImage("green2.png");
  let img18 = loadImage("green3.png");
  let img19 = loadImage("green4.png");
  let img20 = loadImage("green5.png");
  let img21 = loadImage("cyan1.png");
  let img22 = loadImage("cyan2.png");
  let img23 = loadImage("cyan3.png");
  let img24 = loadImage("cyan4.png");
  let img25 = loadImage("cyan5.png");
  let img26 = loadImage("blue1.png");
  let img27 = loadImage("blue2.png");
  let img28 = loadImage("blue3.png");
  let img29 = loadImage("blue4.png");
  let img30 = loadImage("blue5.png");
  let img31 = loadImage("purple1.png");
  let img32 = loadImage("purple2.png");
  let img33 = loadImage("purple3.png");
  let img34 = loadImage("purple4.png");
  let img35 = loadImage("purple5.png");
  let img36 = loadImage("white1.png");
  let img37 = loadImage("white2.png");
  let img38 = loadImage("white3.png");
  let img39 = loadImage("white4.png");
  let img40 = loadImage("white5.png");
  let img41 = loadImage("black1.png");
  let img42 = loadImage("black2.png");
  let img43 = loadImage("black3.png");
  let img44 = loadImage("black4.png");
  let img45 = loadImage("black5.png");

  // 按索引分配图片（仅到 39，避免越界）
  for (let i = 0; i < numBands; i++) {
    if (i >= 10 && i <= 10) bandImages[i] = img1;
    else if (i >= 11 && i <= 11) bandImages[i] = img2;
    else if (i >= 12 && i <= 12) bandImages[i] = img3;
    else if (i >= 13 && i <= 13) bandImages[i] = img4;
    else if (i >= 14 && i <= 14) bandImages[i] = img5;
    else if (i >= 15 && i <= 15) bandImages[i] = img6;
    else if (i >= 16 && i <= 16) bandImages[i] = img7;
    else if (i >= 17 && i <= 17) bandImages[i] = img8;
    else if (i >= 18 && i <= 18) bandImages[i] = img9;
    else if (i >= 19 && i <= 19) bandImages[i] = img10;
    else if (i >= 20 && i <= 20) bandImages[i] = img11;
    else if (i >= 21 && i <= 21) bandImages[i] = img12;
    else if (i >= 22 && i <= 22) bandImages[i] = img13;
    else if (i >= 23 && i <= 23) bandImages[i] = img14;
    else if (i >= 24 && i <= 24) bandImages[i] = img15;
    else if (i >= 25 && i <= 25) bandImages[i] = img16;
    else if (i >= 26 && i <= 26) bandImages[i] = img17;
    else if (i >= 27 && i <= 27) bandImages[i] = img18;
    else if (i >= 28 && i <= 28) bandImages[i] = img19;
    else if (i >= 29 && i <= 29) bandImages[i] = img20;
    else if (i >= 30 && i <= 30) bandImages[i] = img21;
    else if (i >= 31 && i <= 31) bandImages[i] = img22;
    else if (i >= 32 && i <= 32) bandImages[i] = img23;
    else if (i >= 33 && i <= 33) bandImages[i] = img24;
    else if (i >= 34 && i <= 34) bandImages[i] = img25;
    else if (i >= 35 && i <= 35) bandImages[i] = img26;
    else if (i >= 36 && i <= 36) bandImages[i] = img27;
    else if (i >= 37 && i <= 37) bandImages[i] = img28;
    else if (i >= 38 && i <= 38) bandImages[i] = img29;
    else if (i >= 39 && i <= 39) bandImages[i] = img30;
    else if (i >= 40 && i <= 40) bandImages[i] = img31;
    else if (i >= 41 && i <= 41) bandImages[i] = img32;
    else if (i >= 42 && i <= 42) bandImages[i] = img33;
    else if (i >= 43 && i <= 43) bandImages[i] = img34;
    else if (i >= 44 && i <= 44) bandImages[i] = img35;
    else if (i >= 0 && i <= 0) bandImages[i] = img36;
    else if (i >= 1 && i <= 1) bandImages[i] = img37;
    else if (i >= 2 && i <= 2) bandImages[i] = img38;
    else if (i >= 3 && i <= 3) bandImages[i] = img39;
    else if (i >= 4 && i <= 4) bandImages[i] = img40;
    else if (i >= 5 && i <= 5) bandImages[i] = img41;
    else if (i >= 6 && i <= 6) bandImages[i] = img42;
    else if (i >= 7 && i <= 7) bandImages[i] = img43;
    else if (i >= 8 && i <= 8) bandImages[i] = img44;
    else if (i >= 9 && i <= 9) bandImages[i] = img45;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  createCuratedPalette();
  textFont('Helvetica, Arial');
}

function draw() {
  background(8);

  drawNavBar();

  push();
  wavePhase += 0.006; 
  
  let w = width * 0.9;  
  let h = height * 0.7; 
  let startX = width * 0.05; 
  let startY = navHeight + height * 0.05;

  for (let i = 0; i < numBands; i++) {
    let waveY = sin(i * 0.15 + wavePhase) * 10;
    let clr = bandColors[i];
    let isHovered = isMouseOverBand(i, startX, w);
    
    push();
    translate(startX + (i * (w / numBands)), startY + waveY);
    
    if (isHovered) {
      fill(hue(clr), saturation(clr) * 1.3, brightness(clr) * 1.2);
      scale(1.03); 
    } else {
      fill(clr);
    }
    
    noStroke();
    let bandW = (w / numBands) - 1.5; 
    drawBottleSlice(i / numBands, bandW, h);
    pop();
  }
  pop();
  
  // 绘制选中的图片与对应颜色的遮罩
  if (selectedImage && selectedColor) {
    push();
    imageMode(CENTER);
    
    // 使用选中色块的颜色作为半透明遮罩
    let h = hue(selectedColor);
    let s = saturation(selectedColor);
    let b = brightness(selectedColor) * 0.3; // 调暗
    fill(h, s, b, 230); // 透明度 230
    rect(0, 0, width, height);
    
    let imgW = min(400, width * 0.4);
    let imgH = imgW * selectedImage.height / selectedImage.width;
    image(selectedImage, width/2, height/2, imgW, imgH);
    
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    text("Click outside or on image to close", width/2, height/2 + imgH/2 + 20);
    pop();
  }
}

// 核心修改：鼠标点击处理（点击图片/外部都关闭，不切换）
function mousePressed() {
  // 情况1：当前有图片显示 → 只处理关闭逻辑
  if (selectedImage) {
    let imgW = min(400, width * 0.4);
    let imgH = imgW * selectedImage.height / selectedImage.width;
    // 计算图片的边界
    let imgLeft = width/2 - imgW/2;
    let imgRight = width/2 + imgW/2;
    let imgTop = height/2 - imgH/2;
    let imgBottom = height/2 + imgH/2;

    // 点击图片内 或 图片外 → 都关闭
    selectedImage = null;
    selectedColor = null;
    return; // 直接结束，不执行下面的色块点击逻辑
  }

  // 情况2：无图片显示 → 正常处理色块点击
  let w = width * 0.9;
  let startX = width * 0.05;
  
  let clickedBand = -1;
  for (let i = 0; i < numBands; i++) {
    if (isMouseOverBand(i, startX, w)) {
      clickedBand = i;
      break;
    }
  }
  
  if (clickedBand !== -1) {
    selectedImage = bandImages[clickedBand];
    selectedColor = bandColors[clickedBand];
  } else {
    selectedImage = null;
    selectedColor = null;
  }
}

// 以下函数保持不变
function drawNavBar() {
  fill(10, 0, 15, 230);
  noStroke();
  rect(0, 0, width, navHeight);
  
  imageMode(CORNER);
  image(logoImg, 30, (navHeight - 50) / 2, 50, 50);
  
  textAlign(LEFT, CENTER);
  fill(0, 0, 95);
  textSize(17);
  textStyle(BOLD);
  text("THE PALACE MUSEUM", 90, navHeight / 2);
  
  textStyle(NORMAL);
  textSize(10);
  let menus = ["HOME", "ABOUT", "VISIT","EDUCATION", "SERVICES", "NEWS","COLLECTIONS"];
  let spacing = 75;
  let menuStartX = width - 700;
  
  for (let i = 0; i < menus.length; i++) {
    let x = menuStartX + i * spacing;
    let d = dist(mouseX, mouseY, x + 40, navHeight / 2);
    
    if(d < 30) fill(200, 80, 100);
    else fill(0, 0, 80);
    
    text(menus[i], x, navHeight / 2);
  }
  
  stroke(0, 0, 80);
  strokeWeight(1.5);
  noFill();
  ellipse(width - 50, navHeight / 2 - 2, 12, 12);
  line(width - 43, navHeight / 2 + 5, width - 38, navHeight / 2 + 10);
}

function drawBottleSlice(nx, bw, totalH) {
  beginShape();
  let yTop = getBottleCurve(nx, 'top') * totalH;
  let yBottom = getBottleCurve(nx, 'bottom') * totalH;
  rect(0, yTop, bw, yBottom - yTop, 5); 
  endShape(CLOSE);
}

function getBottleCurve(nx, type) {
  let distFromCenter = abs(nx - 0.5);
  if (type === 'top') {
    if (distFromCenter < 0.08) return 0.05; 
    let curve = pow(map(distFromCenter, 0.08, 0.5, 0, 1), 0.5);
    return lerp(0.05, 0.4, curve);
  } else {
    let curve = pow(map(distFromCenter, 0, 0.5, 0, 1), 2);
    return lerp(0.95, 0.85, curve);
  }
}

function isMouseOverBand(i, sx, tw) {
  let bandX = sx + (i * (tw / numBands));
  let bandW = tw / numBands;
  return mouseX > bandX && mouseX < bandX + bandW;
}

function createCuratedPalette() {
  bandColors = [];
  let hCenters = [0, 0, 5, 28, 50, 145, 190, 225, 285];
  for (let g = 0; g < 9; g++) {
    for (let s = 0; s < 5; s++) {
      let h, sat, br;
      if (g === 0) { h = 0; sat = 2; br = 95 - (s * 8); }
      else if (g === 1) { h = 0; sat = 5; br = 10 + (s * 6); }
      else {
        h = hCenters[g] + (s * 2);
        sat = 30 + (s * 8);
        br = 75 - (s * 4);
      }
      bandColors.push(color(h, sat, br));
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}