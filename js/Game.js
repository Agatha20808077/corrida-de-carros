class Game {
    constructor(){

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

    start(){
        form = new Form();
        form.display();
        player = new Player();
        playerCount = player.getCount();

        //criar os sprites
        carro1 = createSprite(width/2 - 100, height-100);
        //carro1.addImage("car1", carro1Img);
        carro1.scale = 0.07;
        carro2 = createSprite(width/2 + 100, height-100);
        //carro2.addImage("car2", carro2Img);
        carro2.scale = 0.07;

        carros = [carro1,carro2];
    }

    //inicio do jogo
    play(){
        form.hide();
        form.title.position(40,50);
        form.title.class("gameTitleAfterEffect");
        Player.getPlayersInfo();

        if(allPlayers !== undefined){
            image(fundoImg,0,-height*5, width,height*6);

            drawSprites();
        }
    }
}//class