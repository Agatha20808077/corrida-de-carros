var game, player, form;
var database;
var bgImg;
var gameState, playerCount;

function preload(){
    bgImg = loadImage("./assets/planodefundo.png");
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    database = firebase.database();
    game = new Game();
    game.getState();
    game.start();
}

function draw(){
  background(bgImg);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

