// Lista para guardar os números já sorteados e limitar repetições
let listaDeNumerosSorteados = []
let limiteNumerosSorteados = 100

// Número secreto sorteado e contador de tentativas
let numeroSecreto = gerarNumeroAleatorio()
let tentativas = 1

// Campo de input do jogador
let inputElement = document.getElementsByClassName("container__input")[0]

// Exibe texto na tela e também utiliza voz com a Web Speech API
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag)
    campo.innerHTML = texto
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 })
}

// Mensagem inicial ao carregar o jogo
function exibirMensagemIniciar() {
    exibirTextoNaTela("h1", "Jogo do número secreto")
    exibirTextoNaTela("p", `Escolha um número entre 1 e ${limiteNumerosSorteados}`)
}

// Chamada ao iniciar o jogo
exibirMensagemIniciar()

// Verifica o número digitado pelo jogador
function verificarChute() {
    let inputPlayer = inputElement.value

    if (inputPlayer == numeroSecreto) {
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa"
        exibirTextoNaTela("h1", `Acertou!`)
        exibirTextoNaTela("p", `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`)
        document.getElementById("reiniciar").removeAttribute("disabled") // ativa o botão
    } else {
        if (inputPlayer > numeroSecreto) {
            exibirTextoNaTela("p", `O número secreto é menor!`)
        } else {
            exibirTextoNaTela("p", `O número secreto é maior!`)
        }
        limparCampo()
        inputElement.focus()
        tentativas++
    }
}

// Gera número aleatório não repetido entre 1 e limite
function gerarNumeroAleatorio() {
    let numeroEscolhido = Math.floor(Math.random() * limiteNumerosSorteados + 1)

    // Se todos os números já foram sorteados, reinicia a lista
    if (listaDeNumerosSorteados.length === limiteNumerosSorteados) {
        listaDeNumerosSorteados = []
    }

    // Se número já foi sorteado, chama novamente
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido)
        return numeroEscolhido
    }
}

// Limpa o campo do input
function limparCampo() {
    let chute = document.querySelector('input')
    chute.value = ""
}

// Reinicia o jogo do zero
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio()
    limparCampo()
    tentativas = 1
    exibirMensagemIniciar()
    document.getElementById("reiniciar").setAttribute("disabled", true)
    inputElement.focus()
}

// Personalização do popup de voz

// Texto do popup da voz
const popupInterval = setInterval(() => {
    const rvRow = document.querySelector('.rvTextRow')
    if (rvRow) {
        rvRow.innerHTML = "<strong>Pronto para ouvir o desafio?</strong> Ative o som!"
        clearInterval(popupInterval)
    }
}, 100)

// Alterando os botões "Deny" e "Allow" para "Negar" e "Permitir"
const btnInterval = setInterval(() => {
    const btnDeny = document.getElementsByClassName("rvButton rvButtonDeny")
    const btnAllow = document.getElementsByClassName("rvButton rvButtonAllow")

    if (btnDeny.length > 0) {
        btnDeny[0].innerHTML = "Negar"
    }

    if (btnAllow.length > 0) {
        btnAllow[0].innerHTML = "Permitir"
    }

    if (btnDeny.length > 0 && btnAllow.length > 0) {
        clearInterval(btnInterval)
    }
}, 100)
