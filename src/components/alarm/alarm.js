import { displayMessage, openAlarm } from '../../js/main.js';

const hour_input = document.querySelector('#hours'),
    minute_input = document.querySelector('#minutes'),
    show_alarm = document.querySelector('#display__alarm'),
    set_alarm_btn = document.querySelector('#set__alarm'),
    reset_alarm_btn = document.querySelector('#stop__alarm'),
    stop_alarm_btn = document.querySelector('#stop__alarm__ring'),

    notify_alarm_icon = document.querySelector("#clock_icon"),

    alarm_sound = new Audio('src/sounds/alarm.mp3');

let alarm_interval;

export class Alarm {
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }

    setAlarm() {
        reset_alarm_btn.style.display = 'block';
        set_alarm_btn.style.display = 'none';

        hour_input.value = '';
        minute_input.value = '';

        if (this.hour == '' || this.minute == '') {
            show_alarm.innerHTML = 'Preencha os campos';
            return;
        }

        if (this.hour < 0 || this.hour > 23) {
            show_alarm.innerHTML = 'Hora inválida!<br>digite um valor entre 0 e 23';
            return;
        } else if (this.minute < 0 || this.minute > 59) {
            show_alarm.innerHTML = 'Minuto inválido!<br>digite um valor entre 0 e 59';
            return;
        } else {
            show_alarm.innerHTML = `Alarme definido para ${this.hour.padStart(2, '0')}:${this.minute.padStart(2, '0')}`;
            notify_alarm_icon.style.display = 'block';

            displayMessage("Alarme definido!");

            alarm_interval = setInterval(() => {
                const date = new Date();

                if (this.hour == date.getHours() && this.minute == date.getMinutes()) {
                    this.playAlarm();

                    openAlarm();
                }
            }, 1000);
        }
    }

    stopAlarm() {
        alarm_sound.pause();
        stop_alarm_btn.style.display = 'none';
        reset_alarm_btn.style.display = 'none';
        set_alarm_btn.style.display = 'block';

        notify_alarm_icon.style.display = 'none';
        notify_alarm_icon.classList.remove('alarm__icon--active');
        show_alarm.innerHTML = 'Alarme desativado';

        displayMessage('Alarme desativado!');
        setTimeout(() => show_alarm.innerHTML = '', 1000)
    }

    resetAlarm() {
        reset_alarm_btn.style.display = 'none';
        stop_alarm_btn.style.display = 'none';

        clearInterval(alarm_interval);

        notify_alarm_icon.style.display = 'none';
        notify_alarm_icon.classList.remove('alarm__icon--active');
        show_alarm.innerHTML = 'Alarme desativado';

        setTimeout(() => show_alarm.innerHTML = '', 1000)
    }

    playAlarm() {
        alarm_sound.play();
        alarm_sound.loop = true;

        notify_alarm_icon.style.display = 'block';
        stop_alarm_btn.style.display = 'block';
        notify_alarm_icon.classList.add('alarm__icon--active');

        show_alarm.innerHTML = "O alarme está tocando!";

        displayMessage('O alarme está tocando!');

        clearInterval(alarm_interval);
    }
}

window.addEventListener('load', () => {
    set_alarm_btn.addEventListener('click', () => {
        const alarm = new Alarm(hour_input.value, minute_input.value);

        alarm.setAlarm();
    });

    stop_alarm_btn.addEventListener('click', () => {
        const alarm = new Alarm(hour_input.value, minute_input.value);

        alarm.stopAlarm();
    });

    reset_alarm_btn.addEventListener('click', () => {
        const alarm = new Alarm(hour_input.value, minute_input.value);

        alarm.resetAlarm();
    });

    notify_alarm_icon.addEventListener('click', openAlarm);
});