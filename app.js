"use strict";

let imagesContainer = document.getElementById("images-container");
let imgOneContainer = document.getElementById("img1-container");
let imgTwoContainer = document.getElementById("img2-container");
let imgThreeContainer = document.getElementById("img3-container");
let resultsButton = document.getElementById('show-results');

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
let maxVotes = 10;

function NoodleDishes(name, path) {
  this.name = name;
  this.path = path;
  this.viewed = 0;
  this.votes = 0;
  this.width = 300;
  this.height = 200;
  allNoodleDishes.push(this);
}

function constructNoodleDishes() {
  for (let i in noodleTypes) {
    let dishName = noodleTypes[i];
    let path = `./images/${dishName}.jpeg`;
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
  imgOne.viewed++;
  imgTwo.viewed++;
  imgThree.viewed++;
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
      allNoodleDishes[i].votes++;
    }
  }
  if (voteCounter === maxVotes) {
    imagesContainer.removeEventListener("click", handleEventListener);
    showResultsButton();    
  } else {
    displayImages();
  }
  imgOneContainer.removeChild(imgOneContainer.lastChild.previousSibling);
  imgTwoContainer.removeChild(imgTwoContainer.lastChild.previousSibling);
  imgThreeContainer.removeChild(imgThreeContainer.lastChild.previousSibling);
}


function showResultsButton() {
  resultsButton.hidden = false;
  resultsButton.addEventListener("click",  displayChart);
}

function displayChart() {
  resultsButton.hidden = true;

  const ctx = document.getElementById("myChart").getContext("2d");

  const labels = [];
  const viewsDataset = {
    label: "Times Viewed",
    data: [], 
    backgroundColor: ["orange"],
    borderColor: ["grey"],
    borderWidth: 1,
  };
  const votesDataset = {
    label: "Times Voted",
    data: [],
    backgroundColor: ["green"],
    borderColor: ["grey"],
    borderWidth: 2,
  };

  for (let i in allNoodleDishes) {
    let noodleDish = allNoodleDishes[i];
    labels[i] = noodleDish.name;
    viewsDataset.data[i] = noodleDish.viewed;
    votesDataset.data[i] = noodleDish.votes;
  }

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        viewsDataset,
        votesDataset,
      ],
    },
    options: {
      // responsive: true,
      scales: {
        y: {
          grace: '5%',
          ticks: {
            stepSize: 1,
          },
        },
      },
    },
  });
}


constructNoodleDishes();
displayImages();
