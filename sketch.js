var game, player, form;
var database;
var bgImg;
var gameState, playerCount;
var allPlayers, fundoImg;
var carro1, carro2, carro1Img, carro2Img;
var carros = [];
var gCoin, gFuel, gObstacles;
var coinImg, fuelImg, obstacle1Image, obstacle2Image;

function preload(){
    bgImg = loadImage("./imagens/planodefundo.png");
    fundoImg = loadImage("./imagens/track.jpg");
    carro1Img = loadImage("./imagens/car1.png");
    carro2Img = loadImage("./imagens/car2.png");
    coinImg = loadImage("./imagens/goldCoin.png");
    fuelImg = loadImage("./imagens/fuel.png");
    obstacle1Image = loadImage("./imagens/obstacle1.png");
    obstacle2Image = loadImage("./imagens/obstacle2.png");
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

