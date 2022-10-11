import { displayMessage, openAlarm } from '../../js/main.js';

const hourInput = document.querySelector('#hours'),
    minuteInput = document.querySelector('#minutes'),
    showAlarm = document.querySelector('#display__alarm'),
    setAlarmBtn = document.querySelector('#set__alarm'),
    resetAlarmBtn = document.querySelector('#stop__alarm'),
    stopAlarmBtn = document.querySelector('#stop__alarm__ring'),

    notifyNavAlarmIcon = document.querySelector("#clock_icon"),

    sound = new Audio('src/sounds/alarm.mp3');

let alarmInterval;

export class Alarm {
    constructor(hour, minute) {
        this.hour = hour;
        this.minute = minute;
    }

    setAlarm() {
        if (this.hour == '' || this.minute == '') {
            showAlarm.innerHTML = 'Preencha os campos';
            return;
        } else {
            resetAlarmBtn.style.display = 'block';
            setAlarmBtn.style.display = 'none';

            hourInput.value = '';
            minuteInput.value = '';
        }

        if (this.hour < 0 || this.hour > 23) {
            showAlarm.innerHTML = 'Hora inválida!<br>digite um valor entre 0 e 23';
            return;
        } else if (this.minute < 0 || this.minute > 59) {
            showAlarm.innerHTML = 'Minuto inválido!<br>digite um valor entre 0 e 59';
            return;
        } else {
            showAlarm.innerHTML = `Alarme definido para ${this.hour.padStart(2, '0')}:${this.minute.padStart(2, '0')}`;
            notifyNavAlarmIcon.style.display = 'block';

            displayMessage("Alarme definido!");

            alarmInterval = setInterval(() => {
                const date = new Date();

                if (this.hour == date.getHours() && this.minute == date.getMinutes()) {
                    this.playAlarm();

                    openAlarm();
                }
            }, 1000);
        }
    }

    stopAlarm() {
        sound.pause();
        stopAlarmBtn.style.display = 'none';
        resetAlarmBtn.style.display = 'none';
        setAlarmBtn.style.display = 'block';

        notifyNavAlarmIcon.style.display = 'none';
        notifyNavAlarmIcon.classList.remove('alarm__icon--active');
        showAlarm.innerHTML = 'Alarme desativado';

        displayMessage('Alarme desativado!');
        setTimeout(() => showAlarm.innerHTML = '', 1000)
    }

    resetAlarm() {
        resetAlarmBtn.style.display = 'none';
        stopAlarmBtn.style.display = 'none';

        clearInterval(alarmInterval);

        notifyNavAlarmIcon.style.display = 'none';
        notifyNavAlarmIcon.classList.remove('alarm__icon--active');
        showAlarm.innerHTML = 'Alarme desativado';

        setTimeout(() => showAlarm.innerHTML = '', 1000)
    }

    playAlarm() {
        sound.play();
        sound.loop = true;

        notifyNavAlarmIcon.style.display = 'block';
        stopAlarmBtn.style.display = 'block';
        notifyNavAlarmIcon.classList.add('alarm__icon--active');

        showAlarm.innerHTML = "O alarme está tocando!";

        displayMessage('O alarme está tocando!');

        clearInterval(alarmInterval);
    }
}

window.addEventListener('load', () => {
    setAlarmBtn.addEventListener('click', () => {
        const alarm = new Alarm(hourInput.value, minuteInput.value);

        alarm.setAlarm();
    });

    stopAlarmBtn.addEventListener('click', () => {
        const alarm = new Alarm(hourInput.value, minuteInput.value);

        alarm.stopAlarm();
    });

    resetAlarmBtn.addEventListener('click', () => {
        const alarm = new Alarm(hourInput.value, minuteInput.value);

        alarm.resetAlarm();
    });

    notifyNavAlarmIcon.addEventListener('click', openAlarm);
});