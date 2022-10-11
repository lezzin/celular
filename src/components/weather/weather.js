import { displayMessage } from "../../js/main.js";

// variables
const loader = document.querySelector(".loader"),

    dateText = document.querySelector("#weather__date"),
    cityText = document.querySelector("#weather__city"),
    tempText = document.querySelector("#weather__temp"),
    icon = document.querySelector("#weather__icon"),
    descText = document.querySelector("#weather__description"),
    max_min_temp = document.querySelector("#weather__min__max"),
    sensationText = document.querySelector("#weather__sensation"),

    inputSearcher = document.querySelector("#search__input"),
    buttonSearcher = document.querySelector("#search__button"),
    automaticLocationBtn = document.querySelector("#location__button"),

    weatherResultContainer = document.querySelector(".weather__info"),
    weatherSearchContainer = document.querySelector(".weather__search"),

    key = "43cb4641a9d1f7f2240700bdc05440d5";


export class Weather {
    constructor() {
        this.api = "";
        this.init();
    }

    init() {
        automaticLocationBtn.addEventListener("click", () => {
            weather.userLocation();
        });

        inputSearcher.addEventListener("keypress", (e) => {
            if (e.key == "Enter" && inputSearcher.value != "")
                weather.changeLocation(inputSearcher.value);
        });

        buttonSearcher.addEventListener("click", () => {
            if (inputSearcher.value != "")
                weather.changeLocation(inputSearcher.value);
        });
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
                let latitude = position.coords.latitude,
                    longitude = position.coords.longitude;

                this.api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

                this.displayWeather();
            })
        } else displayMessage("Não foi possível obter sua localização");
    }

    displayWeather() {
        loader.classList.remove("inactive");

        this.getWeather().then((data) => {
            if (data) {
                let description = data.weather[0].description;
                let maxTemp = Math.round(data.main.temp_max - 273.15);
                let minTemp = Math.round(data.main.temp_min - 273.15);

                weatherSearchContainer.classList.add("inactive");
                weatherResultContainer.classList.add("active");

                cityText.innerHTML = data.name;
                tempText.innerHTML = Math.round(data.main.temp - 273.15) + "°";
                icon.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                sensationText.innerHTML = `Sensação térmica de ${Math.round(data.main.feels_like - 273.15)}°`;
                descText.innerHTML = this.translateWeather(description);
                max_min_temp.innerHTML = `${maxTemp}° / ${minTemp}°`;
                dateText.innerHTML = this.dateNow("date-time");

                setTimeout(() => {
                    displayMessage("Dados carregados com sucesso");
                    setTimeout(() => loader.classList.add("inactive"), 500);

                    if (inputSearcher.value) inputSearcher.value = "";
                }, 1000);
            } else {
                setTimeout(() => {
                    loader.classList.add("inactive");
                    if (inputSearcher.value) inputSearcher.value = "";
                }, 1000);
            }
        });
    }

    translateWeather(description) {
        let translatedItems = {
            "broken clouds": "Nuvens quebradas",
            "clear sky": "Céu limpo",
            "few clouds": "Poucas nuvens",
            "light rain": "Chuva leve",
            "moderate rain": "Chuva moderada",
            "overcast clouds": "Nuvens encobertas",
            "scattered clouds": "Nuvens dispersas",
            "shower rain": "Chuva de banho",
            "sky is clear": "Céu limpo",
            "thunderstorm": "Trovoada",
            "thunderstorm with heavy rain": "Trovoada com chuva forte",
            "thunderstorm with light rain": "Trovoada com chuva leve",
            "thunderstorm with rain": "Trovoada com chuva",
            "very heavy rain": "Chuva muito forte"
        };

        return translatedItems[description] ?? "Não foi possível traduzir a descrição";
    }

    dateNow(event) {
        let date = new Date(),

            week = date.getDay(),
            day = date.getDate(),
            month = date.getMonth(),

            hour = date.getHours().toString().padStart(2, "0"),
            minutes = date.getMinutes().toString().padStart(2, "0"),
            hours = `${hour}:${minutes}`,

            translatedWeek = ["dom.", "seg.", "ter.", "qua.", "qui.", "sex.", "sab."],
            translatedMonth = ["janeiro", "fevereiro", "março", "abril", "maio", "junho",
                "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];

        if (event == "date-time") return `${translatedWeek[week]}, ${day} de ${translatedMonth[month]} ${hours}`;
        else return `${translatedWeek[week]}, ${day} de ${translatedMonth[month]}`;
    }
}

export const weather = new Weather();