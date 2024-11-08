let ordem = [];
let ordemClicada = [];
let pontuacao = 0;

const azul = document.querySelector('.azul');
const vermelho = document.querySelector('.vermelho');
const verde = document.querySelector('.verde');
const amarelo = document.querySelector('.amarelo');

let gerarOrdemAleatoria = () => {
    let corAleatoria = Math.floor(Math.random() * 4);
    ordem[ordem.length] = corAleatoria;
    ordemClicada = [];

    for (let i in ordem) {
        let elementoCor = criarElementoCor(ordem[i]);
        iluminarCor(elementoCor, Number(i) + 1);
    }
}

let iluminarCor = (elemento, numero) => {
    numero = numero * 500;
    setTimeout(() => {
        elemento.classList.add('selecionado');
    }, numero - 250);
    setTimeout(() => {
        elemento.classList.remove('selecionado');
    }, 1400);
}

let verificarOrdem = () => {
    for (let i in ordemClicada) {
        if (ordemClicada[i] != ordem[i]) {
            fimDeJogo();
            break;
        }
    }
    if (ordemClicada.length == ordem.length) {
        alert(`Pontuação: ${pontuacao}\nVocê acertou! Iniciando próximo nível!`);
        proximoNivel();
    }
}

let clicar = (cor) => {
    ordemClicada[ordemClicada.length] = cor;
    criarElementoCor(cor).classList.add('selecionado');

    setTimeout(() => {
        criarElementoCor(cor).classList.remove('selecionado');
        verificarOrdem();
    }, 250);
}

let criarElementoCor = (cor) => {
    if (cor == 0) {
        return verde;
    } else if (cor == 1) {
        return vermelho;
    } else if (cor == 2) {
        return amarelo;
    } else if (cor == 3) {
        return azul;
    }
}

// função para próximo nível do jogo
let proximoNivel = () => {
    pontuacao++;
    gerarOrdemAleatoria();
}

// função para fim de jogo
let fimDeJogo = () => {
    alert(`Pontuação: ${pontuacao}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    ordem = [];
    ordemClicada = [];

    iniciarJogo();
}

// função de início do jogo
let iniciarJogo = () => {
    alert('Bem-vindo ao Gênesis! Iniciando novo jogo!');
    pontuacao = 0;

    proximoNivel();
}

// eventos de clique para as cores
verde.onclick = () => clicar(0);
vermelho.onclick = () => clicar(1);
amarelo.onclick = () => clicar(2);
azul.onclick = () => clicar(3);

// início do jogo
iniciarJogo();
