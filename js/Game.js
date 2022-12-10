class Game {
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");

        this.leaderboardTitle = createElement("h2");
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");

        this.leftKeyActive = false;
        this.playerMoving = false;
        this.blast = false;
    }
    //pega o estado do jogo no banco de dados
    getState(){
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value",function(data){
            gameState = data.val();
        
        });
    }

    //atualizar o estado do jogo no banco de dados
    update(state){
        database.ref("/").update({
            gameState: state
        });
    }

    //botão reset
    reset(){
        this.resetButton.mousePressed(()=>{
            //acessar o BD
            database.ref("/").set({
                carsAtEnd:0,
                gameState: 0,
                playerCount:0,
                players: {}
            });
            //recarregar a página
            window.location.reload();
        });
    }

    //antes de iniciar o jogo (primeira tela do form)
    start(){
        form = new Form();
        form.display();
        player = new Player();
        playerCount = player.getCount();

        //criar os sprites
        carro1 = createSprite(width/2 - 50, height-100);
        carro1.addImage("car1", carro1Img);
        carro1.scale = 0.07;
        carro2 = createSprite(width/2 + 50, height-100);
        carro2.addImage("car2", carro2Img);
        carro2.scale = 0.07;
        carro1.addImage("batida", blastImg);
        carro2.addImage("batida", blastImg);


        carros = [carro1,carro2];
        // i         0     1

        gCoin = new Group();
        gFuel = new Group();
        gObstacles = new Group();

        //matriz de posições dos obstáculos
        var obstaclesPositions = [
            { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
            { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
            { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
            { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
            { x: width / 2, y: height - 2800, image: obstacle2Image },
            { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
            { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
            { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
            { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
            { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
            { x: width / 2, y: height - 5300, image: obstacle1Image },
            { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
          ];

        //criar os sprites de moeda e combustível
        this.addSprites(gCoin,20,coinImg,0.09);
        this.addSprites(gFuel,8,fuelImg,0.02);
        //obstáculos
        this.addSprites(gObstacles,obstaclesPositions.length,obstacle1Image,0.04,obstaclesPositions);
          
    }

    //lidando com os elementos na tela
    handleElements(){
        form.hide();
        form.title.position(40,50);
        form.title.class("gameTitleAfterEffect");

        this.resetTitle.position(width/2 + 200, 40);
        this.resetTitle.class("resetText");
        this.resetTitle.html("Reiniciar jogo");

        this.resetButton.position(width/2 + 200, 100);
        this.resetButton.class("resetButton");

        this.leaderboardTitle.position(width/3 -60, 40);
        this.leaderboardTitle.class("resetText");
        this.leaderboardTitle.html("Placar");

        this.leader1.position(width/3 -50, 80);
        this.leader1.class("resetText");

        this.leader2.position(width/3 -50, 130);
        this.leader2.class("resetText");

    }

    //inicio do jogo
    play(){
        this.handleElements();
        this.reset();
        Player.getPlayersInfo();
        player.getCarsAtEnd();

        if(allPlayers !== undefined){
            image(fundoImg,0,-height*5, width,height*6);

            this.showLife();
            this.mostrarPlacar();
            this.showFuel();

            //índice da matriz
            var index = 0;

            //percorrer o OJS allPlayers
            for (var plr in allPlayers){
                index = index + 1;

                //usar os dados do BD para os carros
                var x = allPlayers[plr].positionX;
                var y = height - allPlayers[plr].positionY;

                carros[index -1].position.x = x;
                // deu erro na linha 89 .20/10
                carros[index -1].position.y = y;

                var vida = allPlayers[plr].life;
                if(vida <=0){
                carros[index - 1].changeImage("batida");
                carros[index - 1].scale = 0.3;    
                }

                //cada carro individualmente
                if(index === player.index){
                    if(player.life <=0){
                            this.blast = true;
                            this.playerMoving = false;
                    }
                    
                    //marcar o carro
                    fill("red"); 
                    ellipse(x, y, 60, 50);
                    //camêra para seguir o carro
                    camera.position.y = carros[index -1].position.y;
                    //coletar
                    this.handleCoins(index);
                    this.handleFuel(index);
                    this.handleObstacles(index);
                    this.handleCars(index);
                }

            }
            this.playerControl();
            //verifica se passou pela linha de chegada
            const finishLine = height*6 - 100;
            if(player.positionY > finishLine){
                gameState = 2;
                player.rank += 1;
                Player.updateCarsAtEnd(player.rank);
                player.update();
                this.showRank();
            }
            drawSprites();
        }
    }

    //controle do carro
    playerControl(){
        if(! this.blast){
        if(keyIsDown(UP_ARROW)){
            player.positionY += 10;
            player.update();
            this.playerMoving = true;
        }
        if(keyIsDown(LEFT_ARROW)){
            this.leftKeyActive = true;
            player.positionX -= 5;
            player.update();
        }
        if(keyIsDown(RIGHT_ARROW)){
            this.leftKeyActive = false;
            player.positionX += 5;
            player.update();
        }
    }
    }

    //adicionar os sprites de moedas, combustíveis e obstáculos
    addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []){
        for(var i=0; i<numberOfSprites; i++){
            var x,y;

            if(positions.length > 0){
                x = positions[i].x;
                y = positions[i].y;
                spriteImage = positions[i].image;
            }else{
                x = random(width/2 - 150, width/2 + 150);
                y = random(-height*4.5, height-400);
            }
            var sprite = createSprite(x,y);
            sprite.addImage("sprite", spriteImage);

            sprite.scale = scale;
            spriteGroup.add(sprite);
        }
    }

    mostrarPlacar(){
        var leader1, leader2;
        var players = Object.values(allPlayers);
        if((players[0].rank ===0 && players[0].rank ===0) || players[0].rank === 1){
            leader1 = 
                players[0].rank + 
                "&emsp;" + 
                players[0].name + 
                "&emsp;" + 
                players[0].score;

            leader2 = 
                players[1].rank + 
                "&emsp;" + 
                players[1].name + 
                "&emsp;" + 
                players[1].score;
        }
        if(players[1].rank === 1){
            leader1 = 
                players[1].rank + 
                "&emsp;" + 
                players[1].name + 
                "&emsp;" + 
                players[1].score;

            leader2 = 
                players[0].rank + 
                "&emsp;" + 
                players[0].name + 
                "&emsp;" + 
                players[0].score;
        }
        //mostrar
        this.leader1.html(leader1);
        this.leader2.html(leader2);
    }

    handleFuel(index){
        carros[index-1].overlap(gFuel, function(collector,collected){
            player.fuel += 40;
            player.update();
            collected.remove(); //remove o combustível
        })

        if(player.fuel >0 && this.playerMoving){
            player.fuel -= 0.3;
        }
        if(player.fuel <=0){
            gameState = 2;
            this.gameOver();

        }

    }

    handleCoins(index){
        carros[index-1].overlap(gCoin, function(collector,collected){
            player.score += 30;
            player.update();
            collected.remove(); //remove o combustível
        });
    }

    handleObstacles(index){
        if(carros[index-1].collide(gObstacles)){
            if(this.leftKeyActive){
                player.positionX += 100;
            }else{
                player.positionX -= 100;
            }
            if(player.life >0){
                player.life -= 185/4;
            }
            player.update();
        }
    }

    handleCars(index){
        if(index === 1){
            if(carros[index-1].collide(carros[1])){
                if(this.leftKeyActive){
                    player.positionX += 100;
                }else{
                    player.positionX -= 100;
                }
                if(player.life >0){
                    player.life -= 185/4;
                }
                player.update();
            }
        }
        if(index === 2){
            if(carros[index-1].collide(carros[0])){
                if(this.leftKeyActive){
                    player.positionX += 100;
                }else{
                    player.positionX -= 100;
                }
                if(player.life >0){
                    player.life -= 185/4;
                }
                player.update();
            }
        }
    }


    //sweet alert
    showRank(){
        swal({ 
            title: `Incrível!${"\n"}Rank${"\n"}${player.rank}`,
            text: "Você alcançou a linha de chegada com sucesso!",
            imageUrl:
            "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
        });
    }
    
    gameOver(){
        swal({ 
            title: "acabou o combustivel",
            text: "Você perdeu a corrida",
            imageUrl:
            "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
        });
    }

    end(){
        console.log("fim de jogo")

    }

    //barra de vida
    showLife(){
        push();
        image(lifeImg, width/2 - 130, height - player.positionY - 200, 20,20);
        fill("white");
        rect(width/2 - 100,height - player.positionY - 200, 185,20);
        fill("red");
        rect(width/2 - 100,height - player.positionY - 200, player.life,20);
        pop();
    }

    //barra de combustivel
    showFuel(){
        push();
        image(fuelImg, width/2 - 130, height - player.positionY - 100, 20,20);
        fill("white");
        rect(width/2 - 100,height - player.positionY - 100, 185,20);
        fill("yellow");
        rect(width/2 - 100,height - player.positionY - 100, player.fuel,20);
        pop();
    }

}//class
