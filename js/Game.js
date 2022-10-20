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
                carros[index -1].position.y = y;

                if(index === player.index){
                    //marcar o carro

                    //camêra para seguir o carro
                    
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
}//class