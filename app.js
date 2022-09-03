"use strict";

let imagesContainer = document.getElementById("images-container");
let imgOneContainer = document.getElementById("img1-container");
let imgTwoContainer = document.getElementById("img2-container");
let imgThreeContainer = document.getElementById("img3-container");

const noodleTypes = [
  "Banh Canh",
  "Banh Hoi",
  "Banh Uot",
  "Bun Bo Hue",
  "Bun Cha",
  "Bun Rieu",
  "Bun Thit Nuong",
  "Chow Fun",
  "Chow Mein",
  "Hu Tieu",
  "Instant Noodle",
  "Mi Quang",
  "Pad Thai",
  "Pho",
  "Ramen",
  "Udon",
  "Wonton Noodle Soup",
];

let allNoodleDishes = [];

let imgOne = null;
let imgTwo = null;
let imgThree = null;

let leftImg = null;
let midImg = null;
let rightImg = null;

let voteCounter = 0;
let maxVotes = 5;

function NoodleDishes(name, path) {
  this.name = name;
  this.path = path;
  this.viewed = 0;
  this.vote = 0;
  this.width = 300;
  this.height = 200;
  allNoodleDishes.push(this);
}

function constructNoodleDishes() {
  for (let i in noodleTypes) {
    let dishName = noodleTypes[i];
    let formatDishName = noodleTypes[i].replace(/\s+/g, "");
    let path = `images/${formatDishName}.jpeg`;
    new NoodleDishes(dishName, path);
  }
}

function getRandomInt() {
  return Math.floor(Math.random() * allNoodleDishes.length);
}

function generateThreeRandomImages() {
  imgOne = allNoodleDishes[getRandomInt()];
  imgTwo = allNoodleDishes[getRandomInt()];
  imgThree = allNoodleDishes[getRandomInt()];

  while (
    imgOne.name === imgTwo.name ||
    imgOne.name === imgThree.name ||
    imgTwo.name === imgThree.name
  ) {
    imgOne = allNoodleDishes[getRandomInt()];
    imgTwo = allNoodleDishes[getRandomInt()];
  }
  img1.viewed++;
  img2.viewed++;
  img3.viewed++;
}

function displayImages() {
  generateThreeRandomImages();

  leftImg = document.getElementById("img1");
  leftImg.src = imgOne.path;
  leftImg.alt = imgOne.name;
  leftImg.width = imgOne.width;
  leftImg.height = imgOne.height;

  midImg = document.getElementById("img2");
  midImg.src = imgTwo.path;
  midImg.alt = imgTwo.name;
  midImg.width = imgOne.width;
  midImg.height = imgOne.height;

  rightImg = document.getElementById("img3");
  rightImg.src = imgThree.path;
  rightImg.alt = imgThree.name;
  rightImg.width = imgOne.width;
  rightImg.height = imgOne.height;

  let pElementLeft = document.createElement("p");
  pElementLeft.textContent = leftImg.alt;
  imgOneContainer.appendChild(pElementLeft);

  let pElementMid = document.createElement("p");
  pElementMid.textContent = midImg.alt;
  imgTwoContainer.appendChild(pElementMid);

  let pElementRight = document.createElement("p");
  pElementRight.textContent = rightImg.alt;
  imgThreeContainer.appendChild(pElementRight);
}

imagesContainer.addEventListener("click", handleEventListener);

function handleEventListener(event) {
  voteCounter++;
  let imgAlt = event.target.alt;
  for (let i in allNoodleDishes) {
    if (imgAlt === allNoodleDishes[i].name) {
      allNoodleDishes[i].vote++;
    }
  }
  if (voteCounter === maxVotes) {
    imagesContainer.removeEventListener("click", handleEventListener);
    
    displayChart();
  } else {
    displayImages();
  }
  imgOneContainer.removeChild(imgOneContainer.lastChild.previousSibling);
  imgTwoContainer.removeChild(imgTwoContainer.lastChild.previousSibling);
  imgThreeContainer.removeChild(imgThreeContainer.lastChild.previousSibling);
}


function displayChart() {
  const ctx = document.getElementById("myChart").getContext("2d");

  const labels = [];
  const viewsDataset = {
    label: "Times shown",
    data: [], // Fill with views
    backgroundColor: ["rgba(255, 0, 0, 0.8)"],
  };
  const clicksDataset = {
    label: "Times voted",
    data: [], // Fill with clicks
    backgroundColor: ["rgba(0, 0, 255, 0.8)"],
  };

  for (let i in allNoodleDishes) {
    let noodleDish = allNoodleDishes[i];
    labels[i] = noodleDish.name;
    viewsDataset.data[i] = noodleDish.views;
    clicksDataset.data[i] = noodleDish.vote;
  }

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels, // product names
      datasets: [
        viewsDataset, // Dataset for number of clicks
        clicksDataset, // Dataset for number of clicks
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
console.log(myChart);
}


constructNoodleDishes();
displayImages();
