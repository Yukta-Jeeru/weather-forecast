let apiKey = `043e251fc42d46b2bff35960c014d358`;


async function fetchWeatherData(city) {
    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) throw new Error("City not found. Please check the spelling and try again.");

        let data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        showMessage(error.message, true);
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city-name").textContent = data.name;
    document.querySelector(".temp-info").textContent = `${Math.round(data.main.temp)}°C`;
    document.querySelector(".wind-speed").textContent = `${Math.round(data.wind.speed)} KM/H`;
    document.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    document.querySelector(".visibility").textContent = `${(data.visibility / 1000).toFixed(1)} KM`;
    document.querySelector(".description-text").textContent = data.weather[0].description;
    showMessage("", false);
}

function showMessage(message, hideContent) {
   let messageContainer = document.querySelector(".message");
   let weatherContent = document.querySelector(".weatherapp");
    messageContainer.textContent = message;
    messageContainer.style.color = hideContent ? "red" : "";
    weatherContent.style.display = hideContent ? "none" : "block";
}

document.querySelector(".search-form").addEventListener("submit", function (e) {
    e.preventDefault();
   let city = document.querySelector(".search-input").value.trim();
    if (city === "") {
        alert("Please enter a city name.");
    } else {
        document.querySelector(".weatherapp").style.display = "block";
        fetchWeatherData(city);
        document.querySelector(".search-input").value = "";
    }
});

fetchWeatherData("Bengaluru");
