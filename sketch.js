var game, player, form;
var database;
var bgImg;
var gameState, playerCount;
var allPlayers, fundoImg;
var carro1, carro2, carro1Img, carro2Img;
var carros = [];

function preload(){
    bgImg = loadImage("./assets/planodefundo.png");
    fundoImg = loadImage("./assets/track.jpg");
    carro1Img = loadImage("./assets/car1.png");
    carro2Img = loadImage("./assets/car2.png");
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
  if(playerCount === 2){
    game.update(1);
  }
  if(gameState === 1){
    game.play();
  }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }

