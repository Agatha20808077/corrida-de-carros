class Game {
    constructor(){
        this.resetTitle = createElement("h2");
        this.resetButton = createButton("");
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
        carro1 = createSprite(width/2 - 100, height-100);
        carro1.addImage("car1", carro1Img);
        carro1.scale = 0.07;
        carro2 = createSprite(width/2 + 100, height-100);
        carro2.addImage("car2", carro2Img);
        carro2.scale = 0.07;

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
    }

    //inicio do jogo
    play(){
        this.handleElements();
        this.reset();
        Player.getPlayersInfo();

        if(allPlayers !== undefined){
            image(fundoImg,0,-height*5, width,height*6);

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

                if(index === player.index){
                    //marcar o carro
                    fill("red"); 
                    ellipse(x, y, 60, 50);
                    //camêra para seguir o carro
                    camera.position.y = carros[index -1].position.y;
                }

            }
            this.playerControl();
            drawSprites();
        }
    }

    //controle do carro
    playerControl(){
        if(keyIsDown(UP_ARROW)){
            player.positionY += 10;
            player.update();
        }
        if(keyIsDown(LEFT_ARROW)){
            player.positionX -= 5;
            player.update();
        }
        if(keyIsDown(RIGHT_ARROW)){
            player.positionX += 5;
            player.update();
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
}//class