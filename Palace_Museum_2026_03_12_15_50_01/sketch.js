
let bandColors = [];
const numBands = 45;
let wavePhase = 0;
let navHeight = 70;

let isDetailView = false;
let museumData = null;
let artifactImg = null;
let loadingStatus = "";

// --- 最终版：纯艺术品/画作/珠宝关键词池 (45组) ---
const searchPool = [
  ["Ding ware", "White jade carving", "White porcelain"], ["White Tara painting", "Marble sculpture"], ["White porcelain", "Marble"], ["Ivory carving", "White plum painting"], ["White ceramics", "White embroidery"], // 白色系
   ["Black lacquer", "Onyx"],  ["Ink wash painting", "Black pottery", "Obsidian"],  ["Black stone", "Coal"], ["Black glaze", "Basalt"], ["Black silk", "Shungite"], // 黑色系
  ["Oxblood glaze", "Cinnabar lacquer", "Red coral carving"], ["Red vase", "Carnelian"], ["Red coral", "Garnet"], ["Red lacquer", "Jasper"], ["Red temple painting", "Red lacquer"], // 红色系
 ["Amber", "Bronze artifact", "Citrine"], ["Bronze mirror", "Sun painting"],["Copper", "Sunstone"], ["Terracotta", "Spessartine"], ["Terracotta warrior", "Orange lacquer"], // 橙/铜系
   ["Yellow jade", "Amber"], ["Gold statue", "Pyrite"], ["Yellow porcelain", "Heliodor"], ["Yellow silk", "Sulfur"], ["Gold jewelry", "Yellow embroidery"], // 黄色/金系
  ["Green glaze", "Peridot"], ["Green jade", "Emerald", "Malachite"], ["Celadon", "Aventurine"], ["Longquan celadon", "Green embroidery"], ["Green silk", "Dioptase"], // 绿色系
  ["Turquoise", "Aquamarine", "Cyan vase"], ["Cyan pottery", "Amazonite"], ["Kingfisher feather", "Apatite"], ["Cyan silk", "Hemimorphite"], ["Cyan glaze", "Larimar"],  // 青/蓝系
  ["Lapis lazuli carving", "Blue and white porcelain", "Sapphire jewelry"], ["Lapis lazuli", "Blue and white porcelain", "Sapphire"],  ["Blue glaze", "Azurite"], ["Blue textile", "Blue glass"], ["Cloisonne", "Blue painting"], // 深蓝系
 ["Amethyst", "Purple jade", "Purple silk"], ["Purple enamel", "Fluorite"], ["Purple vase painting", "Purple embroidery"], ["Purple glass", "Charoite"], ["Violet silk", "Lepidolite"] // 紫色系
];



function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100);
  createCuratedPalette();
}

function draw() {
  background(8);
  drawNavBar();

  if (!isDetailView) {
    drawVisuals();
  } else {
    displayDetail();
  }
}

// --- 1. 视觉动效：鼠标悬停提亮 ---
function drawVisuals() {
  push();
  wavePhase += 0.006;
  let w = width * 0.9;
  let h = height * 0.7;
  let startX = width * 0.05;
  let startY = navHeight + height * 0.05;
  
  for (let i = 0; i < numBands; i++) {
    let waveY = sin(i * 0.15 + wavePhase) * 10;
    let clr = bandColors[i];
    
    push();
    translate(startX + (i * (w / numBands)), startY + waveY);
    
    if (isMouseOverBand(i, startX, w)) {
      // 保持原色相，提升亮度和降低饱和度，形成“发光”效果
      fill(hue(clr), saturation(clr) * 0.8, brightness(clr) + 20);
    } else {
      fill(clr);
    }
    
    noStroke();
    let yt = getBottleCurve(i/numBands, 'top') * h;
    let yb = getBottleCurve(i/numBands, 'bottom') * h;
    rect(0, yt, (w/numBands)-1.5, yb - yt, 5);
    pop();
  }
  pop();
}

// --- 2. 实时抓取逻辑 ---
async function mousePressed() {
  if (isDetailView) {
    isDetailView = false;
    museumData = null;
    artifactImg = null;
    return;
  }

  let w = width * 0.9;
  let startX = width * 0.05;
  for (let i = 0; i < numBands; i++) {
    if (isMouseOverBand(i, startX, w)) {
      isDetailView = true;
      loadingStatus = "SEARCHING MUSEUM ARCHIVES...";
      tryFetchSequence(searchPool[i]);
      break;
    }
  }
}

async function tryFetchSequence(terms) {
  for (let term of terms) {
    loadingStatus = `FETCHING: ${term.toUpperCase()}...`;
    let success = await fetchWiki(term);
    if (success) return; 
  }
  loadingStatus = "NO DATA IN ARCHIVE. TRY ANOTHER COLOR.";
}

async function fetchWiki(term) {
  // 排除掉任何可能导致风景的词
  const blacklist = ["tree", "zelkova", "plant", "forest", "nature"];
  if (blacklist.some(word => term.toLowerCase().includes(word))) return false;

  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${term.replace(/ /g, '_')}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return false;
    const data = await res.json();
    
    let imgSrc = (data.originalimage && data.originalimage.source) || 
                 (data.thumbnail && data.thumbnail.source);

    if (imgSrc) {
      museumData = data;
      return new Promise((resolve) => {
        loadImage(imgSrc, (img) => {
          artifactImg = img;
          resolve(true);
        }, () => resolve(false));
      });
    }
  } catch (e) {
    return false;
  }
  return false;
}

// --- 3. 详情页显示：解决重叠与乱码 ---
function displayDetail() {
  fill(0, 0, 0, 245);
  rect(width * 0.05, height * 0.15, width * 0.9, height * 0.7, 20);

  if (artifactImg) {
    // 左侧图片
    imageMode(CENTER);
    let dw = min(width * 0.4, 450);
    let dh = dw * (artifactImg.height / artifactImg.width);
    if (dh > height * 0.6) {
      dh = height * 0.6;
      dw = dh * (artifactImg.width / artifactImg.height);
    }
    image(artifactImg, width * 0.3, height * 0.5, dw, dh);

    // 右侧文字
    push();
    fill(255);
    textAlign(LEFT, TOP);
    textSize(32); textStyle(BOLD);
    text(museumData.title, width * 0.55, height * 0.25, width * 0.35);
    
    textSize(18); textStyle(NORMAL); fill(200);
    // 设置第四个参数实现自动换行，防止乱码重叠
    text(museumData.extract, width * 0.55, height * 0.38, width * 0.35, height * 0.4);
    pop();
  } else {
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(20);
    text(loadingStatus, width/2, height/2);
  }
  
  fill(255, 120);
  textAlign(CENTER);
  textSize(14);
  text("Click anywhere to return", width/2, height * 0.82);
}

// --- 4. 辅助函数 ---
function getBottleCurve(nx, type) {
  let d = abs(nx - 0.5);
  return type === 'top' ? (d < 0.08 ? 0.05 : lerp(0.05, 0.4, pow(map(d, 0.08, 0.5, 0, 1), 0.5))) : lerp(0.95, 0.85, pow(map(d, 0, 0.5, 0, 1), 2));
}

function drawNavBar() {
  fill(15); 
  noStroke();
  rect(0, 0, width, navHeight);
  
  // 绘制左侧 Logo 和标题
  //if (logoImg) image(logoImg, 30, 10, 50, 50);
  fill(255); 
  textSize(16); 
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  text("THE PALACE MUSEUM ｜ DATA VISUALIZATION", 20, navHeight / 2);

  // --- 新增：顶部中间的导航选项 ---
  let navOptions = ["HOME", "ABOUT", "VISIT", "EDUCATION", "SERVICES", "NEWS", "COLLECTIONS"];
  textSize(12);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  
  let spacing = width * 0.08; // 选项之间的间距
  let startX = width * 0.4;   // 起始 X 坐标
  
  for (let i = 0; i < navOptions.length; i++) {
    // 鼠标悬停变色效果（可选）
    let x = startX + i * spacing;
    if (mouseX > x - 30 && mouseX < x + 30 && mouseY < navHeight) {
      fill(200, 100, 100); // 悬停时颜色
    } else {
      fill(255, 180);      // 默认半透明白色
    }
    text(navOptions[i], x, navHeight / 2);
  }
  
  // 右侧搜索图标（放大镜符号）
  fill(255, 180);
  textSize(18);
  text("🔍", width - 60, navHeight / 2);
}
function isMouseOverBand(i, sx, tw) {
  let x = sx + (i * (tw / numBands));
  return mouseX > x && mouseX < x + (tw / numBands) && mouseY > navHeight;
}

function createCuratedPalette() {
  let hCenters = [0, 0, 5, 28, 50, 145, 190, 225, 285];
  for (let g = 0; g < 9; g++) {
    for (let s = 0; s < 5; s++) {
      let h = (g < 2) ? 0 : hCenters[g] + (s * 2);
      let sat = (g === 0) ? 2 : (g === 1) ? 5 : 30 + (s * 8);
      let br = (g === 0) ? 95 - (s * 8) : (g === 1) ? 10 + (s * 6) : 75 - (s * 4);
      bandColors.push(color(h, sat, br));
    }
  }
}