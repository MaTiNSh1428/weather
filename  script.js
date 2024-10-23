const apiKey = 'YOUR_API_KEY'; // کلید API خود را اینجا وارد کنید
const currentWeatherDiv = document.getElementById('currentWeather');
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');

getWeatherBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeather(city);
    } else {
        alert('لطفاً نام شهری را وارد کنید.');
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('شهر پیدا نشد!');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        currentWeatherDiv.innerHTML = `<p>${error.message}</p>`;
    }
}

function displayWeather(data) {
    const { main, weather, name } = data;
    currentWeatherDiv.innerHTML = `
        <h2>وضعیت آب و هوا در ${name}</h2>
        <p>دما: ${main.temp} °C</p>
        <p>وضعیت: ${weather[0].description}</p>
        <p>رطوبت: ${main.humidity}%</p>
    `;
}
