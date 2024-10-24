const apiKey = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/iran?unitGroup=us&key=VSRHEL89K87LGNC5SXTDV6FC9&contentType=json'; // جایگزینی با کلید API Visual Crossing

function fetchWeather(lat, lon) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?unitGroup=metric&key=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const weatherData = `
                Weather: ${data.currentConditions.conditions} <br>
                Temperature: ${data.currentConditions.temp}°C <br>
                Humidity: ${data.currentConditions.humidity}% <br>
                Wind Speed: ${data.currentConditions.windspeed} m/s
            `;
            document.getElementById("weather").innerHTML = weatherData;
        })
        .catch(error => {
            document.getElementById("weather").innerHTML = "Failed to fetch weather data.";
        });
}