import { alertMessage, displayMessage } from '../../js/main.js';

const inputChangeMessage = document.querySelector('#config__name'),
    removeBackgroundBtn = document.querySelector('#remove__bg__btn'),
    menuScreen = document.querySelector('.menu__items');

function changeInitialMessage() {
    let userMessage = document.querySelector('#user__message');

    if (inputChangeMessage.value == "") {
        alertMessage("Erro!", "Digite uma mensagem!");
        return;
    } else if (inputChangeMessage.value.length > 25) {
        alertMessage("Erro!", "Mensagem muito longa!");
        return;
    } else if (inputChangeMessage.value.length < 3) {
        alertMessage("Erro!", "Mensagem muito curta!");
        return;
    } else {
        userMessage.innerHTML = inputChangeMessage.value;
        alertMessage("Sucesso!", "Mensagem alterada com sucesso!");
    }
    
    inputChangeMessage.value = "";
}

function removeBackground() {
    let background = window.getComputedStyle(menuScreen).getPropertyValue('background');

    if (background == "none") {
        displayMessage("Erro!", "Não há fundo para remover!"); return;
    }

    menuScreen.style.background = "none";
    displayMessage("Sucesso!", "Fundo removido com sucesso!");
}

inputChangeMessage.addEventListener('keyup', e => { if (e.keyCode == 13) changeInitialMessage(); });
removeBackgroundBtn.addEventListener('click', removeBackground);

removeBackgroundBtn.addEventListener('touchstart', e => {
    e.preventDefault();
    removeBackground();
});
