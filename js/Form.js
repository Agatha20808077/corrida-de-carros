class Form {
    constructor(){
        this.title = createImg("./assets/TITULO.png", "nome do jogo");
        this.playButton = createButton("Jogar");
        this.input = createInput("").attribute("placeholder", "Digite seu nome");
        this.greeting = createElement("h2");
    }

    setElementsPosition(){
        this.title.position(120,160);
        this.playButton.position(width/2 - 90, height/2 -20);
        this.input.position(width/2 - 110, height/2 -80);
        this.greeting.position(width/2 - 300, height/2 -100);
    }

    setElementsStyle(){
        this.title.class("gameTitle");
        this.playButton.class("customButton");
        this.input.class("customInput");
        this.greeting.class("greeting");
    }

    display(){
        this.setElementsPosition();
        this.setElementsStyle();
        this.playButtonPressed();
    }

    //detecção de aperto do botão play
    playButtonPressed(){
        this.playButton.mousePressed(()=>{
            this.input.hide();
            this.playButton.hide();
            //mensagem a ser exibida
            var mensagem = `Seja Bem Vindo ${this.input.value()} </br> espere o outro jogador entrar`; 
            //exibir a mensagem
            this.greeting.html(mensagem);
            //pegar o nome
            player.name = this.input.value()
            playerCount += 1;
            player.index = playerCount;
            player.addPlayer(); //adiciona o player no BD
            player.updateCount(playerCount);
        })
    }

}//class