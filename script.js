const API_KEY = "caeadf0d8564584e1e10aed28c8fdf35";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const feelsLike = document.getElementById("feelsLike");
const weatherIcon = document.getElementById("weatherIcon");
const date = document.getElementById("date");
const error = document.getElementById("error");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        error.textContent = "Please enter a city name.";
        return;
    }

    getWeather(city);
});

cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

async function getWeather(city) {

    error.textContent = "Loading...";

    const URL =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {

        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        error.textContent = "";

        cityName.textContent = `${data.name}, ${data.sys.country}`;

        temperature.textContent =
            `${Math.round(data.main.temp)}°C`;

        description.textContent =
            data.weather[0].description;

        humidity.textContent =
            `${data.main.humidity}%`;

        wind.textContent =
            `${(data.wind.speed * 3.6).toFixed(1)} km/h`;

        feelsLike.textContent =
            `${Math.round(data.main.feels_like)}°C`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        date.textContent =
            new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            });

    } catch (err) {

        error.textContent =
            "City not found. Please enter a valid city name.";

        cityName.textContent = "City Name";
        temperature.textContent = "--°C";
        description.textContent = "Weather condition";
        humidity.textContent = "--%";
        wind.textContent = "-- km/h";
        feelsLike.textContent = "--°C";
        weatherIcon.src = "";
    }
}