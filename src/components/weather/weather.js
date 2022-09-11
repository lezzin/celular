import { displayMessage } from "../../js/main.js";

// variables
const loader = document.querySelector(".loader"),

    date_text = document.querySelector("#weather__date"),
    city_text = document.querySelector("#weather__city"),
    temp_text = document.querySelector("#weather__temp"),
    icon = document.querySelector("#weather__icon"),
    desc_text = document.querySelector("#weather__description"),
    max_min_temp = document.querySelector("#weather__min__max"),
    sensation_text = document.querySelector("#weather__sensation"),

    input_searcher = document.querySelector("#search__input"),
    button_searcher = document.querySelector("#search__button"),
    automatic_location_button = document.querySelector("#location__button"),

    weather_result_container = document.querySelector(".weather__info"),
    weather_search_container = document.querySelector(".weather__search"),

    key = "43cb4641a9d1f7f2240700bdc05440d5";


export class Weather {
    constructor() {
        this.api = "";
    }

    async getWeather() {
        const response = await fetch(this.api);

        if (response.status == 200) {
            const data = await response.json();

            return data;
        } else {
            displayMessage("Cidade não encontrada");
            return false;
        }
    }

    changeLocation(city) {
        if (city) {
            this.api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

            this.displayWeather();
        } else displayMessage("Digite o nome de uma cidade");
    }

    userLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                this.api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;

                this.displayWeather();
            })
        } else displayMessage("Não foi possível obter sua localização");
    }

    displayWeather() {
        loader.classList.remove("inactive");

        this.getWeather().then((data) => {
            if (data) {
                let desc = data.weather[0].description;
                let max = Math.round(data.main.temp_max - 273.15);
                let min = Math.round(data.main.temp_min - 273.15);

                weather_search_container.classList.add("inactive");
                weather_result_container.classList.add("active");

                city_text.innerHTML = data.name;
                temp_text.innerHTML = Math.round(data.main.temp - 273.15) + "°";
                icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                sensation_text.innerHTML = `Sensação térmica de ${Math.round(data.main.feels_like - 273.15)}°`;
                desc_text.innerHTML = this.translateWeather(desc);
                max_min_temp.innerHTML = `${max}° / ${min}°`;
                date_text.innerHTML = this.dateNow("date-time");

                setTimeout(() => {
                    displayMessage("Dados carregados com sucesso");
                    setTimeout(() => loader.classList.add("inactive"), 500);

                    if (input_searcher.value) input_searcher.value = "";
                }, 1000);
            } else {
                setTimeout(() => {
                    loader.classList.add("inactive");
                    if (input_searcher.value) input_searcher.value = "";
                }, 1000);
            }
        });
    }

    translateWeather(description) {
        switch (description) {
            case "broken clouds":
                description = "Nuvens quebradas";
                break;
            case "clear sky":
                description = "Céu limpo";
                break;
            case "few clouds":
                description = "Poucas nuvens";
                break;
            case "light rain":
                description = "Chuva leve";
                break;
            case "moderate rain":
                description = "Chuva moderada";
                break;
            case "overcast clouds":
                description = "Nuvens encobertas";
                break;
            case "scattered clouds":
                description = "Nuvens dispersas";
                break;
            case "shower rain":
                description = "Chuva de banho";
                break;
            case "thunderstorm":
                description = "Trovoada";
                break;
            case "mist":
                description = "Neblina";
                break;
            default:
                description = "Não foi possível traduzir";
        }

        return description;
    }

    dateNow(event) {
        let date = new Date(),
            week = date.getDay(),
            day = date.getDate(),
            month = date.getMonth();

        switch (week) {
            case 0:
                week = "dom.";
                break;
            case 1:
                week = "seg.";
                break;
            case 2:
                week = "ter.";
                break;
            case 3:
                week = "quar.";
                break;
            case 4:
                week = "quin.";
                break;
            case 5:
                week = "sex.";
                break;
            case 6:
                week = "sab.";
                break;
        }

        switch (month) {
            case 0:
                month = "janeiro";
                break;
            case 1:
                month = "fevereiro";
                break;
            case 2:
                month = "março";
                break;
            case 3:
                month = "abril";
                break;
            case 4:
                month = "maio";
                break;
            case 5:
                month = "junho";
                break;
            case 6:
                month = "julho";
                break;
            case 7:
                month = "agosto";
                break;
            case 8:
                month = "setembro";
                break;
            case 9:
                month = "outubro";
                break;
            case 10:
                month = "novembro";
                break;
            case 11:
                month = "dezembro";
                break;
        }

        let hour = date.getHours().toString().padStart(2, "0");
        let minutes = date.getMinutes().toString().padStart(2, "0");

        let hours = `${hour}:${minutes}`;

        if (event == "date-time") return `${week}, ${day} de ${month}  ${hours}`;
        else return `${week}, ${day} de ${month}`;
    }
}

export const weather = new Weather();


// events
window.addEventListener("load", () => {
    automatic_location_button.addEventListener("click", () => {
        weather.userLocation();
    });

    input_searcher.addEventListener("keypress", (e) => {
        if (e.key == "Enter" && input_searcher.value != "")
            weather.changeLocation(input_searcher.value);
    });

    button_searcher.addEventListener("click", () => {
        if (input_searcher.value != "")
            weather.changeLocation(input_searcher.value);
    });
});