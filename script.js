let order = [];
let clickedOrder = [];
let score = 0;


const azul = document.querySelector('.azul');
const vermelho = document.querySelector('.vermelho');
const verde = document.querySelector('.verde');
const amarelo = document.querySelector('.amarelo');


let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    },1400);
}


let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);
}

let createColorElement = (color) => {
    if(color == 0) {
        return verde;
    } else if(color == 1) {
        return vermelho;
    } else if (color == 2) {
        return amarelo;
    } else if (color == 3) {
        return azul;
    }
}

//funcao para proximo nivel do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

//funcao para game over
let gameOver = () => {
    alert(`Pontuação: ${score}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

//funcao de inicio do jogo
let playGame = () => {
    alert('Bem vindo ao Gênesis! Iniciando novo jogo!');
    score = 0;

    nextLevel();
}

//eventos de clique para as cores
verde.onclick = () => click(0);
vermelho.onclick = () => click(1);
amarelo.onclick = () => click(2);
azul.onclick = () => click(3);

//inicio do jogo
playGame();