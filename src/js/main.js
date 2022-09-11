import { Alarm } from '../components/alarm/alarm.js';
import { calc, Calculator } from '../components/calculator/calculator.js';
import { music_player, Player } from '../components/player/player.js';
import { weather, Weather } from '../components/weather/weather.js';
import { game, Game } from '../components/game/game.js';

export function displayMessage(text) {
    var message = document.querySelector('#phone__notify'),
        message_text = document.querySelector('#message__notify__text');

    message_text.innerHTML = text;
    message.classList.toggle('active');

    setTimeout(() => message.classList.toggle('active'), 3000);
}

const loader = document.querySelector('.loader'),
    center_button = document.querySelector('#nav__center__button'),
    right_button = document.querySelector('#nav__right__button'),
    left_button = document.querySelector('#nav__left__button'),

    power_button = document.querySelector('#power__button'),

    calculator = document.querySelector('.calculator'),

    music_screen = document.querySelector('.player'),
    menu_screen = document.querySelector('.menu__items'),
    alarm_screen = document.querySelector('.alarm'),
    phone_screen = document.querySelector('.container'),
    weather_screen = document.querySelector('.weather'),
    video_screen = document.querySelector('.video__player'),
    initial__screen = document.querySelector('.initial__screen'),
    game_screen = document.querySelector('.game'),

    initial_hour_display = document.querySelector('#hour__initial__screen'),
    initial_date_display = document.querySelector('#date__initial__screen'),

    weather_result_container = document.querySelector(".weather__info"),
    weather_search_container = document.querySelector(".weather__search"),

    bg_setter = document.querySelector('#set__bg'),
    alarm_oppener = document.querySelector('#open__clock'),
    calculator_oppener = document.querySelector('#open__calculator'),
    music_oppener = document.querySelector('#open__music'),
    weather_oppener = document.querySelector('#open__weather'),
    video_oppener = document.querySelector('#open__video'),
    game_oppener = document.querySelector('#open__game'),

    form_music = document.querySelector('.form'),
    add_music_btn = document.querySelector('#form__add__music__toggler'),

    hour_display = document.querySelector('#display__hour'),
    battery_display = document.querySelector('#battery'),

    battery_icon = document.querySelector('#battery__icon'),

    battery_levels = {
        0: 'fas fa-battery-empty',
        25: 'fas fa-battery-quarter',
        50: 'fas fa-battery-half',
        75: 'fas fa-battery-three-quarters',
        100: 'fas fa-battery-full'
    },

    // modal elements
    modal = document.querySelector('#modal'),
    modal_oppener = document.querySelector('#modal__toggler'),
    modal_close = document.querySelector('#modal__closer'),
    input_change_message = document.querySelector('#config__name');


// functions
function setHour() {
    const date = new Date();
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    hour_display.innerHTML = `${hour}:${minutes}`;
    initial_hour_display.innerHTML = `${hour}:${minutes}`;
    initial_date_display.innerHTML = weather.dateNow("date");
}

function getBattery() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function (battery) {
            let level = Math.floor(battery.level * 100);

            battery_display.innerHTML = `${level}%`;

            battery.addEventListener('levelchange', () => battery_display.innerHTML = `${level}%`);
        });

    } else {
        console.log('Battery API not supported');
        setInterval(falseBattery, 10000);
    }

    setInterval(verifyBattery, 1000);
}

function verifyBattery() {
    var batteryNumber = parseInt(battery_display.innerHTML.replace('%', ''));

    Object.keys(battery_levels).forEach(function (level) {
        if (batteryNumber >= level) {
            battery_icon.className = battery_levels[level];
        }
    });

    if (batteryNumber <= 20) {
        battery_icon.style.color = '#c91111';
        battery_display.style.color = '#c91111';
    }
    else {
        battery_icon.style.color = 'white';
        battery_display.style.color = 'white';
    }

    if (navigator.getBattery) {
        navigator.getBattery().then(function (battery) {
            if (battery.charging) {
                battery_icon.style.color = '#00ff00';
                battery_display.style.color = '#00ff00';
            }
        });
    }
}

function falseBattery() {
    battery_display.innerHTML = '100%';

    let level = parseInt(battery_display.innerHTML.replace('%', ''));
    battery_display.innerHTML = `${level--}%`;
}


// Função para melhorar a legibilidade do código
const isActive = (elem, arr) => {
    arr.forEach(function (item) {
        if (item.classList.contains('active')) item.classList.remove('active');
    });

    if (elem == "") return;
    elem.classList.add('active');
}

function openMenu() {
    if (!initial__screen.classList.contains('inactive')) initial__screen.classList.add('inactive');
    if (right_button.style.opacity == 0) right_button.style.opacity = 1;
    if (left_button.style.opacity == 0) left_button.style.opacity = 1;
    isActive(menu_screen, [phone_screen, music_screen, alarm_screen, calculator, weather_screen, video_screen, game_screen]);
    
    game.resetAll();
}

export const openAlarm = () => { isActive(alarm_screen, [menu_screen, calculator, alarm_screen, video_screen, weather_screen]); }
export const openMusic = () => { isActive(music_screen, [menu_screen, calculator, alarm_screen, video_screen, weather_screen]); }
const openVideo = () => { isActive(video_screen, [menu_screen, calculator, alarm_screen, music_screen, weather_screen]); }
const openCalculator = () => { isActive(calculator, [phone_screen, music_screen, alarm_screen, menu_screen, weather_screen, video_screen, game_screen]); }
const openWeather = () => { isActive(weather_screen, [menu_screen, calculator, alarm_screen, music_screen, video_screen]); weather.getWeather(); }
const openGame = () => { isActive(game_screen, [menu_screen, calculator, alarm_screen, music_screen, video_screen, weather_screen]); }

const openModal = () => { modal.classList.add('active'); modal_oppener.style.opacity = '0'; };
const closeModal = () => { modal.classList.remove('active'); modal_oppener.style.opacity = '1'; };

function toggleMusicForm() {
    form_music.classList.toggle('active');

    if (form_music.classList.contains('active')) add_music_btn.style.transform = 'rotate(45deg)';
    else add_music_btn.style.transform = 'rotate(0deg)';
}

function turnOnOff() {
    setTimeout(() => {
        if (!phone_screen.classList.contains('inactive')) {
            phone_screen.classList.add('inactive');
            initial__screen.classList.add('inactive');
        }
        else {
            phone_screen.classList.remove('inactive');
            initial__screen.classList.remove('inactive');
            right_button.style.opacity = 0;
            left_button.style.opacity = 0;
        }

        isActive("", [menu_screen, calculator, alarm_screen, music_screen, weather_screen]);

        setTimeout(() => { calc.processClearOperator(); game.resetAll(); }, 500);
    }, 1000);
}

function setPhoneBackground() {
    bg_setter.addEventListener("click", () => input.click());

    var input = document.querySelector("#file");
    input.addEventListener("change", function () {
        var reader = new FileReader();

        reader.onload = function () {
            var result = reader.result;
            document.querySelector(".black__screen").style.background = "url(" + result + ") no-repeat center center/cover";
        }

        reader.readAsDataURL(input.files[0]);
    });
}

function rightArrowAction() {
    if (calculator.classList.contains('active'))
        calculator.classList.remove('active');
    else if (alarm_screen.classList.contains('active'))
        alarm_screen.classList.remove('active');
    else if (music_screen.classList.contains('active'))
        music_screen.classList.remove('active');
    else if (weather_result_container.classList.contains('active')) {
        weather_result_container.classList.remove('active');
        weather_search_container.classList.remove('inactive');
    }

    if (!menu_screen.classList.contains('active')) {
        menu_screen.classList.add('active');

        isActive("", [phone_screen, music_screen, alarm_screen, calculator, weather_screen, video_screen, game_screen]);
    }
}

function alertMessage(title, message) {
    var alert_container = document.querySelector("#alert"),
        alert_status = document.querySelector("#alert__status"),
        alert_message = document.querySelector("#alert__message");

    if (alert_container.classList.contains('error')) alert_container.classList.remove('error');
    if (alert_container.classList.contains('success')) alert_container.classList.remove('success');

    if (title == "Sucesso!") alert_container.classList.add("success");
    else alert_container.classList.add("error");

    alert_container.classList.add('active');
    alert_status.innerHTML = title;
    alert_message.innerHTML = message;

    setTimeout(() => alert_container.classList.remove('active'), 5000);
}

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


// events
function eventListeners() {
    setHour(); setInterval(setHour, 1000);
    getBattery(); setInterval(getBattery, 1000);

    power_button.addEventListener('click', turnOnOff);

    center_button.addEventListener('click', openMenu);
    right_button.addEventListener('click', rightArrowAction);

    calculator_oppener.addEventListener('click', openCalculator);
    music_oppener.addEventListener('click', openMusic);
    alarm_oppener.addEventListener('click', openAlarm);
    weather_oppener.addEventListener('click', openWeather);
    video_oppener.addEventListener('click', openVideo);
    game_oppener.addEventListener('click', openGame);

    bg_setter.addEventListener('click', setPhoneBackground);

    add_music_btn.addEventListener('click', toggleMusicForm);

    form_music.addEventListener('submit', (e) => {
        e.preventDefault();
        music_player.addMusic();
        console.log("music added");
    });

    modal_oppener.addEventListener('click', openModal);
    modal_close.addEventListener('click', closeModal);

    input_change_message.addEventListener('keyup', (e) => { if (e.keyCode == 13) changeInitialMessage(); });
};

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => { loader.classList.add('inactive'); }, 2000);

    eventListeners();
});
