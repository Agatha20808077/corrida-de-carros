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
    updateState(state){
        database.ref("/").update({
            gameState: state
        });
    }

    start(){
        form = new Form();
        form.display();
        player = new Player();
        playerCount = player.getCount();
    }
}//class