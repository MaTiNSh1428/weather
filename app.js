const apiKey = '950a330e0fdb4cf2872121843242410'; // کلید API شما از WeatherAPI

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            document.getElementById('location').innerText = `Latitude: ${lat}, Longitude: ${lon}`;
            fetchWeather(lat, lon);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function fetchWeather(lat, lon) {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = `
                Location: ${data.location.name}, ${data.location.country} <br>
                Temperature: ${data.current.temp_c}°C <br>
                Condition: ${data.current.condition.text} <br>
                Humidity: ${data.current.humidity}% <br>
                Wind Speed: ${data.current.wind_kph} kph
            `;
            document.getElementById("weather").innerHTML = weatherData;
        })
        .catch(error => {
            document.getElementById("weather").innerHTML = "Failed to fetch weather data.";
        });
}