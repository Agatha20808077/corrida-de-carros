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
    }

}//class