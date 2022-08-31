'use strict';

let imagesContainer = document.getElementById('images-container');
let imgOneContainer = document.getElementById('img1-container');
let imgTwoContainer = document.getElementById('img2-container');
let imgThreeContainer = document.getElementById('img3-container');

const noodleTypes = [
  'banhCanh', 
  'banhHoi', 
  'banhUot',
  'bunBoHue', 
  'bunCha', 
  'bunRieu', 
  'bunThitNuong',  
  'chowFun', 
  'chowMein', 
  'huTieu', 
  'instantNoodle', 
  'miQuang', 
  'padThai', 
  'pho',
  'ramen', 
  'udon', 
  'wontonNoodleSoup'
  ];

let allNoodleDishes = [];

let imgOne = null;
let imgTwo = null;
let imgThree = null;

let leftImg = null;
let midImg = null;
let rightImg = null;

function NoodleDishes(name, path) {
  this.name = name;
  this.path = path
  this.viewed = 0;
  this.vote = 0;
  this.width = 300;
  this.height = 200;
  allNoodleDishes.push(this);
}

function constructNoodleDishes() {
  for (let i in noodleTypes) {
    let dishName = noodleTypes[i].split(/(?=[A-Z])/).join(" ").toLowerCase();
    let path = `images/${noodleTypes[i]}.jpeg`
    new NoodleDishes(dishName, path)
  }
}

function getRandomInt(){
  return (Math.floor(Math.random() * allNoodleDishes.length));
}

function generateThreeRandomImages() {
  imgOne = allNoodleDishes[getRandomInt()];
  imgTwo = allNoodleDishes[getRandomInt()];
  imgThree = allNoodleDishes[getRandomInt()];

  while (imgOne.name === imgTwo.name || imgOne.name === imgThree.name) {
    imgOne = allNoodleDishes[getRandomInt()]
  }

  while (imgTwo.name === imgThree.name) {
    imgTwo = allNoodleDishes[getRandomInt()]
  }
}

function displayImages() {
  leftImg = document.getElementById("img1");
  leftImg.src = imgOne.path;
  leftImg.alt = imgOne.name;
  leftImg.width = imgOne.width;
  leftImg.height = imgOne.height;
  
  let pElementLeft = document.createElement('p');
  pElementLeft.textContent = leftImg.alt;
  imgOneContainer.appendChild(pElementLeft);

  midImg = document.getElementById("img2");
  midImg.src = imgTwo.path;
  midImg.alt = imgTwo.name;
  midImg.width = imgOne.width;
  midImg.height = imgOne.height;

  let pElementMid = document.createElement('p');
  pElementMid.textContent = midImg.alt;
  imgTwoContainer.appendChild(pElementMid);

  rightImg = document.getElementById("img3");
  rightImg.src = imgThree.path;
  rightImg.alt = imgThree.name;
  rightImg.width = imgOne.width;
  rightImg.height = imgOne.height;

  let pElementRight = document.createElement('p');
  pElementRight.textContent = rightImg.alt;
  imgThreeContainer.appendChild(pElementRight);
  
}

constructNoodleDishes();
generateThreeRandomImages();
displayImages();
