import { alertMessage, displayMessage } from '../../js/main.js';

const input_change_message = document.querySelector('#config__name'),
    remove_bg_btn = document.querySelector('#remove__bg__btn'),
    menu_screen = document.querySelector('.menu__items');

function changeInitialMessage() {
    let user__message = document.querySelector('#user__message');

    if (input_change_message.value == "") {
        alertMessage("Erro!", "Digite uma mensagem!");
        return;
    } else if (input_change_message.value.length > 25) {
        alertMessage("Erro!", "Mensagem muito longa!");
        return;
    } else if (input_change_message.value.length < 3) {
        alertMessage("Erro!", "Mensagem muito curta!");
        return;
    } else {
        user__message.innerHTML = input_change_message.value;
        alertMessage("Sucesso!", "Mensagem alterada com sucesso!");
    }
    
    input_change_message.value = "";
}

function removeBackground() {
    background = window.getComputedStyle(menu_screen).getPropertyValue('background');

    if (background == "none") {
        displayMessage("Erro!", "Não há fundo para remover!"); return;
    }

    menu_screen.style.background = "none";
    displayMessage("Sucesso!", "Fundo removido com sucesso!");
}

input_change_message.addEventListener('keyup', e => { if (e.keyCode == 13) changeInitialMessage(); });
remove_bg_btn.addEventListener('click', removeBackground);