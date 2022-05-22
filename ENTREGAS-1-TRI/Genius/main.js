const divPontuacao = document.querySelector("div.pontuacao")
const divMain = document.getElementById("genius")
const divs = Array.from(divMain.querySelectorAll("div"))
const painel = document.getElementById("painel")

let sequencia = []
let animatingColors = false
let currentColorPosition = 0

const botao = document.querySelector("button")
botao.addEventListener("click", ev => {

    inicio()
})
divMain.addEventListener("click", ev => {
    if (animatingColors) {
        console.log("espere a animação terminar")
        return
    }
    
    const idxClickedElement = divs.indexOf(ev.target)
    
    if (idxClickedElement !== sequencia[currentColorPosition]) {
            painel.innerHTML = "PERDEU"
        divPontuacao.innerHTML = ""
        return
    }

    currentColorPosition++
    ev.target.classList.add("animate")
    
    if (currentColorPosition >= sequencia.length) {
        currentColorPosition = 0
        divPontuacao.innerHTML = sequencia.length
        setTimeout(() => turno(), 1500)
    }
})


divs.forEach(div => {
    div.addEventListener("animationend", () => {
        div.classList.remove("animate")
    })
})

function playAnimationColors() {
    sequencia.forEach((current, index) => {
        setTimeout(() => {
            divs[current].classList.add("animate");
            animatingColors = index < sequencia.length - 1
        }, 1000 * index);
    })
}

function inicio() {
    divPontuacao.innerHTML = ""
    painel.innerHTML = ""
    let cnt = 3
    sequencia = []
    currentColorPosition = 0
    let idx = setInterval(() => {
        painel.innerHTML = cnt
        cnt--
        if(cnt <= -1) {
            painel.innerHTML = "PONTOS"
            turno()
            clearInterval(idx)
        }
    }, 1000)
}

function turno() {
    // divPontuacao.innerHTML = "sequencia.length"
    if (divPontuacao.innerHTML == ""){
        divPontuacao.innerHTML = "0"
    }
    const rnd = Math.round(Math.random() * 3)
    sequencia.push(rnd)
    playAnimationColors()
}