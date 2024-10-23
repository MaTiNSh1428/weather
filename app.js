const apiKey = 'c9a4f275e624bc5e0f1f74643b945e88';

function getWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("location").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById("location").innerHTML = `Latitude: ${lat}, Longitude: ${lon}`;

    fetchWeather(lat, lon);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            document.getElementById("location").innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            document.getElementById("location").innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            document.getElementById("location").innerHTML = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            document.getElementById("location").innerHTML = "An unknown error occurred.";
            break;
    }
}

function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = `
                Weather: ${data.weather[0].description} <br>
                Temperature: ${data.main.temp}°C <br>
                Humidity: ${data.main.humidity}% <br>
                Wind Speed: ${data.wind.speed} m/s
            `;
            document.getElementById("weather").innerHTML = weatherData;
        })
        .catch(error => {
            document.getElementById("weather").innerHTML = "Failed to fetch weather data.";
        });
}

window.onload = getWeather;