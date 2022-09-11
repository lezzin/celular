import { alertMessage } from '../../js/main.js';

const input_change_message = document.querySelector('#config__name');

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
        input_change_message.value = "";
        alertMessage("Sucesso!", "Mensagem alterada com sucesso!");
    }
}

input_change_message.addEventListener('keyup', e => { if (e.keyCode == 13) changeInitialMessage(); });