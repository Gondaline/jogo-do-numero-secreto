let listaDeNumerosSorteados = []
let limiteNumerosSorteados = 10

let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

let inputElement = document.getElementsByClassName("container__input")[0]; //Usar o Focus no input

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2})
}

function exibirMensagemIniciar() {
    exibirTextoNaTela("h1", "Jogo do número secreto")
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${limiteNumerosSorteados}`)
}

exibirMensagemIniciar()

function verificarChute() {

    let inputPlayer = document.getElementsByClassName("container__input")[0].value

    if (inputPlayer == numeroSecreto) {

        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"

        exibirTextoNaTela("h1", `Acertou!`)
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`

        exibirTextoNaTela("p", mensagemTentativas)

        //Ativando o botão
        document.getElementById("reiniciar").removeAttribute("disabled")
    } else {

        if (inputPlayer > numeroSecreto) {
            exibirTextoNaTela("p", `O número secreto é menor!`)
            limparCampo()
            inputElement.focus()

        } else {
            exibirTextoNaTela("p", `O número secreto é maior!`)
            limparCampo()
            inputElement.focus()

        }

        tentativas++

    }
}

function gerarNumeroAleatorio() {

    let numeroEscolhido = Math.floor(Math.random() * 10 + 1)
    let quantidadeElementosNaLista = listaDeNumerosSorteados.length

    if(quantidadeElementosNaLista == limiteNumerosSorteados) {
        quantidadeElementosNaLista = []
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) { // Verifica se o número sorteado já está na lista
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push()
        return numeroEscolhido
    }

}

function limparCampo() {
    chute = document.querySelector('input')
    chute.value = ""
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    exibirMensagemIniciar()
    document.getElementById("reiniciar").setAttribute("disabled", true)
    inputElement.focus()

}