var game, player, form;
var database;
var bgImg;

function preload(){
    bgImg = loadImage("./assets/planodefundo.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    game = new Game();
    game.start();
   
}

function draw(){
  background(bgImg);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

