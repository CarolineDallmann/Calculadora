let valorDigInput = null
let resultadoParcial = null
let sinalOperacao = ''
let virgula = ''

let inputDeBaixo = document.getElementById("inputDeBaixo")
let inputDeCima = document.getElementById("inputDeCima")

function numeroTec(num) {// vem como tipo number
    if (ehMenorQueDez()) {
        valorDigInput = Number(`${valorDigInput || 0}${virgula}${num}`)
        escreveInputDeBaixo()
        virgula = ''
    }
}

document.addEventListener("keydown", (dig) => {// vem como tipo string
    let teclaDigitada = dig.key
    if (Number(teclaDigitada) || (Number(teclaDigitada) === 0)) {
        focoBotao(teclaDigitada)
        numeroTec(teclaDigitada)
    }
    if (teclaDigitada === "+" || teclaDigitada === "-" || teclaDigitada === "*" || teclaDigitada === "/") {
        focoBotao(teclaDigitada)
        operacao(teclaDigitada)
    }
    if (teclaDigitada === "Backspace") {
        focoBotao(teclaDigitada)
        backspace()
    }
    if (teclaDigitada === "Escape") {
        focoBotao(teclaDigitada)
        resetEsc()
    }
    if (teclaDigitada === 'Enter') {
        focoBotao(teclaDigitada)
    }
    if (teclaDigitada === ',') {
        focoBotao(teclaDigitada)
        botaoVirgula()
    }
})

function botaoVirgula() {
    if (Number.isInteger(valorDigInput))
        virgula = '.'
}

function formatacao(numero) {
    if (numero === null) {
        return numero
    }
    return numero.toLocaleString('pt-BR', { maximumFractionDigits: 20 })
}

function escreveInputDeBaixo() {
    inputDeBaixo.value = formatacao(valorDigInput)
}

function escreveInputDeCima(texto) {
    if (texto) {
        inputDeCima.value = texto
    } else {
        let operacaoFormatada = ''
        switch (sinalOperacao) {
            case '/':
                operacaoFormatada = '÷'
                break;
            case '*':
                operacaoFormatada = '×'
                break;
            default:
                operacaoFormatada = sinalOperacao
                break;
        }
        inputDeCima.value = `${formatacao(resultadoParcial)}${operacaoFormatada}`
    }
}


function atualizaSinalOperacao(tecla) {
    sinalOperacao = tecla
}

function focoBotao(valor) { //foca nos números da tela
    document.getElementById(`dig${valor}`).focus()
}

function ehMenorQueDez() {//verifica a qtde de digitos do input
    if (!valorDigInput) {
        return true
    }
    return valorDigInput.toString().length < 12
}

function backspace() { //apaga elemento por elemento
    let apagandoNumero = valorDigInput.toString().split("")
    apagandoNumero.pop()
    valorDigInput = Number(apagandoNumero.join(""))
    escreveInputDeBaixo()
}

function resetEsc() { //apaga todos os valores ao teclar C ou Esc
    valorDigInput = null
    resultadoParcial = null
    sinalOperacao = ''
    escreveInputDeBaixo()
    escreveInputDeCima(' ')
}

function cleanInput() { // limpa o campo input 
    valorDigInput = null
    escreveInputDeBaixo()
}

function calculador() {//realiza os cálculos matemáticos
    switch (sinalOperacao) {
        case "+":
            resultadoParcial = resultadoParcial + valorDigInput
            break;
        case "-":
            resultadoParcial = resultadoParcial - valorDigInput;
            break;
        case "/":
            resultadoParcial = resultadoParcial / valorDigInput
            break;
        case "*":
            resultadoParcial = resultadoParcial * valorDigInput
            break;
    }
    escreveInputDeCima()
}

function operacao(op) { 
// ao teclar "+ - / * " realiza as verificações e define comportamentos e métodos antes de liberar para os cálculos

    if (resultadoParcial === null && valorDigInput === null
        //se não existir nenhum n° armazenado e não tiver sido digitado um n°
        ||
        valorDigInput === null && resultadoParcial === 0) {
        //se não tiver sido digitado um n° e n° armazenado for igual a 0

        resultadoParcial = 0
        atualizaSinalOperacao(op)
        escreveInputDeCima()
    } else if (resultadoParcial === null && valorDigInput !== null
        //se não existir nenhum n° armazenado e tiver sido digitado um n°
        ||
        resultadoParcial === 0 && valorDigInput !== null && sinalOperacao === ''
        //se n° armazedo for 0, tiver sido digitado um n° e não tiver sinal armazenado
        ||
        resultadoParcial !== null && sinalOperacao === '' && valorDigInput !== null) {
        //se existir n° armazenado, não tiver sinal armazenado e for digitado um n°

        resultadoParcial = valorDigInput
        atualizaSinalOperacao(op)
        escreveInputDeCima()
    } else if (resultadoParcial === 0 && valorDigInput !== null && sinalOperacao !== '') {
        //se n° armazedo for 0, tiver sido digitado um n° e tiver sinal armazenado

        calculador()
        if (isNaN(resultadoParcial)) {
            escreveInputDeCima('Resultado indefinido')
        } else {
            atualizaSinalOperacao(op)
            escreveInputDeCima()
        }
    } else if (valorDigInput === null && resultadoParcial !== 0) {
        //se não tiver sido digitado um n° e n° armazenado for diferente de 0
        ;
        atualizaSinalOperacao(op)
        escreveInputDeCima()
    } else {
        //se existir n° armazenado, tiver sinal armazenado e for digitado um n°

        calculador()
        if (resultadoParcial === Infinity) {
            escreveInputDeCima('Não é possível dividir por zero')
        } else {
            atualizaSinalOperacao(op)
            escreveInputDeCima()
        }
    }
    cleanInput()
}

function igual() {
// ao teclar "=" realiza as verificações e define comportamentos e métodos antes de liberar para os cálculos

    if (resultadoParcial === null && valorDigInput === null) {
        //se não existir nenhum n° armazenado e tiver sido digitado um n°
        
        resultadoParcial = 0
        escreveInputDeCima(formatacao(resultadoParcial) + '=')
        cleanInput()
    } else if (resultadoParcial === null && valorDigInput !== null
        //se não existir nenhum n° armazenado e tiver sido digitado um n°
        ||
        resultadoParcial !== null & sinalOperacao === '' && valorDigInput !== null) {
        // se existir n° armazenado, não tiver sinal armazenado e tiver sido digitado um n°

        resultadoParcial = valorDigInput
        escreveInputDeCima(formatacao(resultadoParcial) + '=')
        cleanInput()
    } else if (resultadoParcial === 0 && valorDigInput !== null && sinalOperacao !== '') {
        //se n° armazedo for 0, tiver sido digitado um n° e tiver sinal armazenado
        
        calculador()
        if (isNaN(resultadoParcial)) {
            escreveInputDeCima('Resultado indefinido')
        } else {
            escreveInputDeCima(formatacao(resultadoParcial) + '=')
            cleanInput()
        }
    } else if ((resultadoParcial !== 0 || resultadoParcial === 0)
        && valorDigInput === null) {
        // se n° armazenado for diferente de 0 ou se n° armazenado for igual 
        //e não tiver sido digitado um n°
        
        escreveInputDeCima(formatacao(resultadoParcial) + '=')
    } else {
        //se existir n° armazenado, tiver sinal armazenado e for digitado um n°
        
        calculador()
        if (resultadoParcial === Infinity) {
            escreveInputDeCima('Não é possível dividir por zero')
        } else {
            escreveInputDeCima(formatacao(resultadoParcial) + '=')
        }
        cleanInput()
    }
    sinalOperacao = ''
}