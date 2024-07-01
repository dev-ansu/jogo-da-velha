let tabuleiro;
let board;
let aviso;
let jogador;
let linha;
let coluna;
let resultado;
let tabuleiroSize;

const iniciar = ()=>{
    tabuleiro = [];
    board = document.getElementById("board")
    aviso = document.getElementById("aviso");
    resultado = document.getElementById("resultado")
    jogador = 1;
    aviso.innerHTML = `O jogador ${jogador} começa.`
 
    for(let i = 0; i < 3;i++){
        tabuleiro[i] = [];            
        for(let j = 0; j < 3; j++){
            tabuleiro[i][j] = 0;            
        }
    }
    tabuleiroSize = tabuleiro.length;
}

const exibir = ()=>{
    let tabela = document.createElement("table");
    let tbody = document.createElement("tbody");
    const jogo = document.getElementById("jogo")
    jogo.innerHTML = '';
    Object.assign(tabela, {classList: 'table ', id:'actualGameBoard'})

    for(let i = 0; i < tabuleiroSize;i++){
        let tr = document.createElement('tr');
        for(let j = 0; j < tabuleiroSize; j++){

            switch (tabuleiro[i][j]){
                case 1: marcador = "X"; break;
                case -1: marcador = "O"; break;
                default: marcador = "-";
            }

            let td = document.createElement('td');
            td.textContent = marcador;
            td.setAttribute("data-row", i);
            td.setAttribute("data-col", j);
            td.classList.add("cursor-pointer")
            tr.appendChild(td);
            tbody.appendChild(tr);
        }
        tabela.appendChild(tbody);
    }
    jogo.appendChild(tabela);
    document.getElementById("actualGameBoard").querySelectorAll("td").forEach(i =>{
        i.addEventListener("click", jogar)
    });
}


const jogar = (e)=>{
    
    aviso.innerHTML = `Vez do jogador: ${numeroJogador()}`
    linha = e.target.dataset.row;
    coluna = e.target.dataset.col;
   
    if(tabuleiro[linha][coluna] == 0){
        tabuleiro[linha][coluna] = numeroJogador() == 1 ? 1:-1;
    }else{
        aviso.innerHTML = "Esse campo já foi marcado.";
    }
    jogador++;
    exibir();
    checar();
}

const fim = ()=>{
    iniciar();
    exibir();
    setTimeout(() => {
        resultado.innerHTML = '';
    }, 3 * 1000);
}

const checar = ()=>{
    const mensagemResultado = document.createElement("div");
    Object.assign(mensagemResultado, {classList:'rounded p-2 text-center text-white my-2'})

    let tabuleiroCompleto = true;
    // Verificar as linhas e colunas
    for(let i = 0; i < tabuleiroSize; i++){
        let somaLinhas = 0;
        let somaColunas = 0;

        for(let j =0; j < tabuleiro.length;j++){
            somaLinhas += tabuleiro[i][j];
            somaColunas += tabuleiro[j][i];

            if(tabuleiro[i][j] === 0){
                tabuleiroCompleto = false;
            }
        }

        if(somaLinhas == 3 || somaLinhas == -3 || somaColunas == 3 || somaColunas == -3){
            mensagemResultado.classList.add("bg-success")
            mensagemResultado.textContent = `O jogador ${numeroJogador()} ganhou.`
            resultado.appendChild(mensagemResultado)
            fim();
            return;
        }
    }

    let diagonalPrincipal = 0;
    let diagonalSecundaria = 0;

    for(let i = 0; i < tabuleiro.length; i++){
        diagonalPrincipal += tabuleiro[i][i];
        diagonalSecundaria += tabuleiro[i][tabuleiro.length - 1 - i]; 
    }

    if((diagonalPrincipal == 3 || diagonalPrincipal == -3) || (diagonalSecundaria == 3 || diagonalSecundaria == -3)){
        mensagemResultado.classList.add("bg-success")

        mensagemResultado.textContent = `O jogador ${numeroJogador()} ganhou.`
        resultado.appendChild(mensagemResultado)
        fim();
        return;
    }
       
    if(tabuleiroCompleto){
        mensagemResultado.classList.add("bg-warning")
        mensagemResultado.textContent = `O jogo empatou! Ninguém venceu.`
        resultado.appendChild(mensagemResultado)
        fim();
        return;
    }
}

const numeroJogador = ()=>{
    return (jogador % 2) + 1;
}

document.addEventListener("DOMContentLoaded", ()=>{
    iniciar();
    exibir();
})