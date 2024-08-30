// Call Modules
import * as func from "./func.js";
import * as ls from "./localStorage.js";
let backOption = true;
let backInterval;
let backOpt = document.querySelectorAll(".bg-controls span");
let currentOpt = "yes";
// [2] Show Setting Box
let greaBtn = document.querySelector(".icon-container");
greaBtn.addEventListener("click", function () {
  document.querySelector(".settings").classList.toggle("open"); // open setting bar
  document.querySelector(".icon").classList.toggle("fa-spin"); // rotate grea icon
});
// change page  color
let lis = document.querySelectorAll(".colors li");
lis.forEach((li) => {
  // add event on li to deal with lis
  li.addEventListener("click", (e) => {
    setMainColor(li);
  });
});
// set main color
function setMainColor(li) {
  // Set --o-color
  document.documentElement.style.setProperty("--o-color", li.dataset.color);
  // toggle active class
  toggleActive(lis, li);
  localStorage.setItem("color", li.dataset.color);
}
// toggle active class
function toggleActive(container, target) {
  // toggle active class active class
  container.forEach((ele) => {
    ele.classList.remove("active"); // remove active Class From All Elements
    target.classList.add("active"); // Add Active Class To selected Element
  });
}
// [1] background Option
if (ls.HasProperty("bg-option")) {
  localStorage.getItem("bg-option") === "true"
    ? (backOption = true)
    : (backOption = false);
  // Update active Class
  toggleActive(
    backOpt,
    document.querySelector(
      `.bg-controls span[data-background="${backOption ? "yes" : "no"}"]`
    )
  );
}
backOpt.forEach((ele) => {
  ele.addEventListener("click", function () {
    // check more click
    if (this.dataset === currentOpt) return;
    else currentOpt = this.dataset;
    // toggle active class
    toggleActive(backOpt, this);
    // Control background Interval
    if (this.dataset.background === "yes") {
      backOption = true;
      backRand();
      localStorage.setItem("bg-option", true);
    } else {
      backOption = false;
      clearInterval(backInterval);
      localStorage.setItem("bg-option", false);
    }
  });
});
// [1] Create Random Background
// Select Ele
let land = document.querySelector(".land");
// Generate Array Of Imgs
let imgArr = [];
if (imgArr.length === 0) {
  for (let i = 0; i < 4; i++) {
    let fix = "bg-";
    imgArr.push(`${fix}${i + 1}.jpg`);
  }
}
// Deal With LocalStorage
if (ls.HasProperty("color")) {
  let color = localStorage.getItem("color");
  // update main color
  setMainColor(document.querySelector(`.colors li[data-color="${color}"`));
}

// Generate Random Background
function backRand() {
  if (backOption) {
    backInterval = setInterval(() => {
      // Generate Random Number
      let randIndex = func.genran(imgArr);
      // Update Landing Background
      land.style.backgroundImage = `url("../assets/images/${imgArr[randIndex]}")`;
    }, 5000);
  }
}
backRand();

// select Element
let skillSec = document.querySelector(".skills");

window.onscroll = function () {
  // All Offset
  let skillsOffset = skillSec.offsetTop;
  // Offset Height
  let skillsHeight = skillSec.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Page Y Offset
  let PageYOffset = this.scrollY;
  // Limit
  let limit = 200;
  if (PageYOffset > skillsOffset + skillsHeight - windowHeight - limit) {
    let skillsBars = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    skillsBars.forEach((bar) => {
      bar.style.width = bar.dataset.progress;
    });
  } else {
    let skillsBars = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    skillsBars.forEach((bar) => {
      bar.style.width = "0%";
    });
  }
};
// Create Popup To Image @ Gallery
let imgs = document.querySelectorAll(".gallery .box-imgs img");

// Loop @ Imgs And Create Popup @ Click
imgs.forEach((img) => {
  img.addEventListener("click", (e) => {
    // create Overlay
    let overlay = document.createElement("div");
    // Add Overlay Class
    overlay.className = "popup-overlay";
    // Append Overlay Element To Page
    document.body.append(overlay);
    // Create Popup Element
    let popupEle = document.createElement("div");
    popupEle.className = "popup-box";
    // Append PopupBox To Body
    document.body.append(popupEle);
    // create image
    let image = document.createElement("img");
    image.src = img.src;
    // Append Image To Popup
    popupEle.append(image);
    // Add title To image
    if (img.alt) {
      // create header to image
      let imgHeader = document.createElement("h3");
      // create Text Node with image Alt
      let imgAlt = document.createTextNode(img.alt);
      // add text to imgHeader
      imgHeader.append(imgAlt);
      // add image header to popup
      popupEle.prepend(imgHeader);
    }
    // Create Close Button
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    // Add Text To Close Button
    closeButton.append(closeButtonText);
    closeButton.className = "close-btn";
    // Append To Page
    popupEle.append(closeButton);
    // Append Popup To Body
    document.body.append(popupEle);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  // find popup element
  if (e.target.classList.contains("close-btn")) {
    // remove popup Element
    e.target.parentElement.remove();
    // remove overlay
    document.querySelector(".popup-overlay").remove();
  }
});
