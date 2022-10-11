import * as configApp from '../components/config/config.js';
import * as calculatorApp from '../components/calculator/calculator.js';
import * as musicApp from '../components/player/player.js';
import * as weatherApp from '../components/weather/weather.js';
import * as gameApp from '../components/game/game.js';
import * as alarmApp from '../components/alarm/alarm.js';
import * as calendar from '../components/calendar/calendar.js';

function displayMessage(text) {
    var message = document.querySelector('#phone__notify'),
        messageText = document.querySelector('#message__notify__text');

    messageText.innerHTML = text;
    message.classList.toggle('active');

    setTimeout(() => message.classList.toggle('active'), 3000);
}

function alertMessage(title, message) {
    var alertContainer = document.querySelector("#alert"),
        alertStatus = document.querySelector("#alert__status"),
        alertMessage = document.querySelector("#alert__message");

    if (alertContainer.classList.contains('error')) alertContainer.classList.remove('error');
    if (alertContainer.classList.contains('success')) alertContainer.classList.remove('success');

    if (title == "Sucesso!")
        alertContainer.classList.add("success");
    else
        alertContainer.classList.add("error");

    alertContainer.classList.add('active');
    alertStatus.innerHTML = title;
    alertMessage.innerHTML = message;

    setTimeout(() => alertContainer.classList.remove('active'), 5000);
}

const phoneContainer = document.querySelector('#phone__container'),
    loader = document.querySelector('.loader'),
    centerButton = document.querySelector('#nav__center__button'),
    rightButton = document.querySelector('#nav__right__button'),
    leftButton = document.querySelector('#nav__left__button'),

    powerButton = document.querySelector('#power__button'),

    calculator = document.querySelector('.calculator'),

    musicScreen = document.querySelector('.player'),
    playlist = document.querySelector('.playlist'),

    menuScreen = document.querySelector('.menu__items'),
    alarmScreen = document.querySelector('.alarm'),
    phoneScreen = document.querySelector('.phone .container.main'),
    weatherScreen = document.querySelector('.weather'),
    videoScreen = document.querySelector('.video__player'),
    initialScreen = document.querySelector('.initial__screen'),
    gameScreen = document.querySelector('.game'),
    configScreen = document.querySelector('.config__screen'),
    calendarScreen = document.querySelector('.calendar'),

    initialHourDisplay = document.querySelector('#hour__initial__screen'),
    initialDateDisplay = document.querySelector('#date__initial__screen'),

    weatherResultContainer = document.querySelector(".weather__info"),
    weatherSearchContainer = document.querySelector(".weather__search"),

    bgSetter = document.querySelector('#set__bg'),
    alarmOpener = document.querySelector('#open__clock'),
    calculatorOpener = document.querySelector('#open__calculator'),
    musicOpener = document.querySelector('#open__music'),
    weatherOpener = document.querySelector('#open__weather'),
    videoOpener = document.querySelector('#open__video'),
    gameOpener = document.querySelector('#open__game'),
    configOpener = document.querySelector('#open__config'),
    calendarOpener = document.querySelector('#open__calendar'),

    formMusicScreen = document.querySelector('.form'),
    addMusicBtn = document.querySelector('#form__add__music__toggler'),

    hourNavDisplay = document.querySelector('#display__hour'),
    batteryNavDisplay = document.querySelector('#battery'),

    batteryNavIcon = document.querySelector('#battery__icon'),

    batteryLevelsList = {
        0: 'fas fa-battery-empty',
        25: 'fas fa-battery-quarter',
        50: 'fas fa-battery-half',
        75: 'fas fa-battery-three-quarters',
        100: 'fas fa-battery-full'
    };


// funções
function setHour() {
    const date = new Date(),
        hour = date.getHours().toString().padStart(2, '0'),
        minutes = date.getMinutes().toString().padStart(2, '0');

    hourNavDisplay.innerHTML = `${hour}:${minutes}`;
    initialHourDisplay.innerHTML = `${hour}:${minutes}`;
    initialDateDisplay.innerHTML = weatherApp.weather.dateNow("date");
}

function flipPhone() {
    phoneContainer.classList.toggle('flip');
}

function getBattery() {
    if (navigator.getBattery) {
        navigator.getBattery().then(function (battery) {
            let level = Math.floor(battery.level * 100);

            batteryNavDisplay.innerHTML = `${level}%`;
            battery.addEventListener('levelchange', () => batteryNavDisplay.innerHTML = `${level}%`);
        });

    } else {
        console.log('Battery API not supported');
        setInterval(falseBattery, 10000);
    }

    setInterval(verifyBattery, 1000);
}

function verifyBattery() {
    var batteryNumber = parseInt(batteryNavDisplay.innerHTML.replace('%', ''));

    Object.keys(batteryLevelsList).forEach(function (level) {
        if (batteryNumber >= level)
            batteryNavIcon.className = batteryLevelsList[level];
    });

    if (batteryNumber <= 20) {
        batteryNavIcon.style.color = '#c91111';
        batteryNavDisplay.style.color = '#c91111';
    }
    else {
        batteryNavIcon.style.color = 'white';
        batteryNavDisplay.style.color = 'white';
    }

    if (navigator.getBattery) {
        navigator.getBattery().then(function (battery) {
            if (battery.charging) {
                batteryNavIcon.style.color = '#00ff00';
                batteryNavDisplay.style.color = '#00ff00';
            }
        });
    }
}

function falseBattery() {
    batteryNavDisplay.innerHTML = '100%';

    let level = parseInt(batteryNavDisplay.innerHTML.replace('%', ''));
    batteryNavDisplay.innerHTML = `${level--}%`;
}

// Função para melhorar a legibilidade do código
const isActive = (elem, arr) => {
    arr.forEach(function (item) { if (item.classList.contains('active')) item.classList.remove('active'); });

    if (elem == "") return;

    if (Array.isArray(elem)) elem.forEach(function (item) {
        if (!item.classList.contains('active')) item.classList.add('active');
        if (item.classList.contains('inactive')) item.classList.remove('inactive');
    });
    else if (!elem.classList.contains('active')) elem.classList.add('active');
    else displayMessage('Erro: O elemento já está ativo');
}

function openMenu() {
    if (!initialScreen.classList.contains('inactive')) initialScreen.classList.add('inactive');
    if (rightButton.style.opacity == 0) rightButton.style.opacity = 1;
    if (leftButton.style.opacity == 0) leftButton.style.opacity = 1;

    isActive(menuScreen, [
        configScreen,
        calendarScreen,
        phoneScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        alarmScreen,
        calculator,
        weatherScreen,
        weatherSearchContainer,
        weatherResultContainer,
        videoScreen,
        gameScreen
    ]);

    gameApp.game.resetAll();
}

const openAlarm = () => {
    isActive(alarmScreen, [
        configScreen,
        calendarScreen,
        menuScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        calculator,
        alarmScreen,
        videoScreen,
        weatherScreen
    ]);
}

const openMusic = () => {
    isActive(musicScreen, [
        configScreen,
        calendarScreen,
        menuScreen,
        calculator,
        alarmScreen,
        videoScreen,
        weatherScreen
    ]);
}

const openVideo = () => {
    isActive(videoScreen, [
        configScreen,
        calendarScreen,
        menuScreen,
        calculator,
        alarmScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        weatherScreen
    ]);
}

const openCalculator = () => {
    isActive(calculator, [
        configScreen,
        calendarScreen,
        phoneScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        alarmScreen,
        menuScreen,
        weatherScreen,
        videoScreen,
        gameScreen
    ]);
}

const openWeather = () => {
    isActive([
        weatherScreen, weatherSearchContainer], [
        configScreen,
        calendarScreen,
        menuScreen,
        calculator,
        alarmScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        videoScreen
    ]);
}

const openGame = () => {
    isActive(gameScreen, [
        configScreen,
        calendarScreen,
        menuScreen,
        calculator,
        alarmScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        videoScreen,
        weatherScreen
    ]);
}

const openConfig = () => {
    isActive(configScreen, [
        menuScreen,
        calendarScreen,
        calculator,
        alarmScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        videoScreen,
        weatherScreen
    ]);
}

const openCalendar = () => {
    isActive(calendarScreen, [
        configScreen,
        menuScreen,
        calculator,
        alarmScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        videoScreen,
        weatherScreen
    ]);
}

function toggleMusicForm() {
    formMusicScreen.classList.toggle('active');

    if (formMusicScreen.classList.contains('active'))
        addMusicBtn.style.transform = 'rotate(45deg)';
    else
        addMusicBtn.style.transform = 'rotate(0deg)';
}

function turnOnOff() {
    setTimeout(() => {
        if (!phoneScreen.classList.contains('inactive')) {
            phoneScreen.classList.add('inactive');
            initialScreen.classList.add('inactive');
        }
        else {
            phoneScreen.classList.remove('inactive');
            initialScreen.classList.remove('inactive');
            rightButton.style.opacity = 0;
            leftButton.style.opacity = 0;
        }

        isActive("", [
            configScreen,
            calendarScreen,
            menuScreen,
            calculator,
            alarmScreen,
            musicScreen,
            playlist,
            formMusicScreen,
            weatherScreen
        ]);

        setTimeout(() => {
            calculatorApp.calc.processClearOperator();
            gameApp.game.resetAll();
        }, 500);

    }, 1000);
}

function setPhoneBackground() {
    var input = document.querySelector("#input__change__bg");
    bgSetter.addEventListener("click", () => input.click());

    input.addEventListener("change", function () {
        var reader = new FileReader();

        reader.onload = () => menuScreen.style.background = "url(" + reader.result + ") no-repeat center center/cover";
        reader.readAsDataURL(input.files[0]);
    });
}

function rightArrowAction() {
    if (weatherResultContainer.classList.contains('active')) {
        weatherResultContainer.classList.remove('active');
        weatherSearchContainer.classList.remove('inactive');
    } else if (!weatherSearchContainer.classList.contains('inactive')) {
        weatherSearchContainer.classList.add('inactive');
        weatherScreen.classList.remove('active');
        menuScreen.classList.add('active');
    } else if (!menuScreen.classList.contains('active'))
        menuScreen.classList.add('active');

    isActive("", [
        calendarScreen,
        configScreen,
        phoneScreen,
        musicScreen,
        playlist,
        formMusicScreen,
        alarmScreen,
        calculator,
        videoScreen,
        gameScreen]);
}


// events
function eventListeners() {
    setHour(); setInterval(setHour, 1000);
    getBattery(); setInterval(getBattery, 1000);

    powerButton.addEventListener('click', turnOnOff);

    centerButton.addEventListener('click', openMenu);
    rightButton.addEventListener('click', rightArrowAction);

    calculatorOpener.addEventListener('click', openCalculator);
    musicOpener.addEventListener('click', openMusic);
    alarmOpener.addEventListener('click', openAlarm);
    weatherOpener.addEventListener('click', openWeather);
    videoOpener.addEventListener('click', openVideo);
    gameOpener.addEventListener('click', openGame);
    configOpener.addEventListener('click', openConfig);
    calendarOpener.addEventListener('click', openCalendar);

    bgSetter.addEventListener('click', setPhoneBackground);

    addMusicBtn.addEventListener('click', toggleMusicForm);

    formMusicScreen.addEventListener('submit', (e) => {
        e.preventDefault();
        musicApp.music_player.addMusic();
    });

    window.addEventListener("keydown", e => {
        if (e.code === "KeyF") flipPhone();
    });
};

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => { loader.classList.add('inactive'); }, 2000);
    eventListeners();
});

export { alertMessage, displayMessage, openAlarm, openMusic };
