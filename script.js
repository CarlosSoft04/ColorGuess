// script.js
let ordem = [];
let ordemClicada = [];
let pontuacao = 0;
let exibindoSequencia = false; // Variável para controlar cliques

const azul = document.querySelector('.azul');
const vermelho = document.querySelector('.vermelho');
const verde = document.querySelector('.verde');
const amarelo = document.querySelector('.amarelo');

// Função para gerar a ordem aleatória e exibir a sequência
let gerarOrdemAleatoria = () => {
    exibindoSequencia = true; // Bloqueia cliques durante a exibição
    let corAleatoria = Math.floor(Math.random() * 4);
    ordem.push(corAleatoria);
    ordemClicada = [];

    ordem.forEach((cor, index) => {
        let elementoCor = criarElementoCor(cor);
        setTimeout(() => {
            iluminarCor(elementoCor);
            if (index === ordem.length - 1) {
                exibindoSequencia = false; // Desbloqueia os cliques ao fim da sequência
            }
        }, (index + 1) * 700); // Controla o intervalo entre as cores
    });
}

// Função para iluminar a cor
let iluminarCor = (elemento) => {
    elemento.classList.add('selected');
    setTimeout(() => {
        elemento.classList.remove('selected');
    }, 400); // Tempo que a cor permanece iluminada
}

// Função para verificar a sequência clicada
let verificarOrdem = () => {
    for (let i in ordemClicada) {
        if (ordemClicada[i] != ordem[i]) {
            fimDeJogo();
            return;
        }
    }
    if (ordemClicada.length === ordem.length) {
        alert(`Pontuação: ${pontuacao}\nVocê acertou! Iniciando próximo nível!`);
        proximoNivel();
    }
}

// Função de clique, impedindo cliques enquanto a sequência é exibida
let clicar = (cor) => {
    if (exibindoSequencia) return; // Ignora o clique se a sequência está sendo exibida

    ordemClicada.push(cor);
    criarElementoCor(cor).classList.add('selected');

    setTimeout(() => {
        criarElementoCor(cor).classList.remove('selected');
        verificarOrdem();
    }, 250);
}

// Função para criar o elemento de cor com base no índice
let criarElementoCor = (cor) => {
    switch (cor) {
        case 0: return verde;
        case 1: return vermelho;
        case 2: return amarelo;
        case 3: return azul;
    }
}

// Função para o próximo nível
let proximoNivel = () => {
    pontuacao++;
    setTimeout(gerarOrdemAleatoria, 1000); // Pequena pausa entre os níveis
}

// Função para encerrar o jogo e reiniciar
let fimDeJogo = () => {
    alert(`Pontuação: ${pontuacao}!\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo`);
    ordem = [];
    ordemClicada = [];
    iniciarJogo();
}

// Função para iniciar o jogo com uma pausa inicial
let iniciarJogo = () => {
    alert('Bem-vindo ao Gênesis! Iniciando novo jogo!');
    pontuacao = 0;
    ordem = [];
    ordemClicada = [];
    setTimeout(proximoNivel, 1000);
}

// Eventos de clique para as cores
verde.onclick = () => clicar(0);
vermelho.onclick = () => clicar(1);
amarelo.onclick = () => clicar(2);
azul.onclick = () => clicar(3);

// Início do jogo
iniciarJogo();
