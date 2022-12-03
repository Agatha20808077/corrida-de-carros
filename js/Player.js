class Player {
    constructor(){
        this.name = null;
        this.index = null;
        this.positionX = 0;
        this.positionY = 0;
        this.fuel = 185;
        this.life = 185;
        this.rank = 0;
        this.score = 0;
    }
    //pega a contagem dos players no banco de dados
    getCount(){
        var playerCountRef = database.ref("playerCount");
        playerCountRef.on("value",data => {
            playerCount = data.val();
        });
    }

    //atualizar a contagem dos players no banco de dados
    updateCount(count){
        database.ref("/").update({
            playerCount: count
        });
    }

    //adicionar o player no banco de dados
    addPlayer(){
        var playerIndex = "players/player" + this.index;
        if(this.index === 1){
            this.positionX = width/2 - 100;
        }else{
            this.positionX = width/2 + 100;
        }
        database.ref(playerIndex).set({
            name: this.name,
            positionX: this.positionX,
            positionY: this.positionY,
            fuel: this.fuel,
            life: this.life,
            rank: this.rank,
            score: this.score,
        });
    }

    //trazer as informações dos players do BD
    static getPlayersInfo(){
        var playerInfoRef = database.ref("players");
        playerInfoRef.on("value", data =>{
            allPlayers = data.val();
        });
    }

    //atualizar o BD
    update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
        positionX: this.positionX,
        positionY: this.positionY,
        fuel: this.fuel,
        life: this.life,
        rank: this.rank,
        score: this.score,
    });
    }

    //pega o valor do BD
    getCarsAtEnd(){
        database.ref('carsAtEnd').on("value", (data)=>{
            this.rank = data.val();
        })
    }

    //atualiza o valor no banco de dados
    static updateCarsAtEnd(rank){
        database.ref("/").update({
            carsAtEnd: rank
        })
    }

}//classe