const apiKey = "3e55d109c62f08dd2108a75c8b32fd26";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const country = document.getElementById("countryInput").value.trim();

  if (!city) {
    alert("Please enter a city or village name.");
    return;
  }

  const location = country ? `${city},${country}` : city;

  // Current Weather
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => showCurrentWeather(data))
    .catch(() => alert("Could not fetch current weather."));

  // 5-Day Forecast
  fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`)
    .then(res => res.json())
    .then(data => showForecast(data))
    .catch(() => alert("Could not fetch forecast."));
}

function showCurrentWeather(data) {
  const weatherDiv = document.getElementById("weatherInfo");

  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p class="text-danger fw-bold">❌ Location not found.</p>`;
    return;
  }

  const html = `
    <h4 class="text-dark">${data.name}, ${data.sys.country}</h4>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" class="weather-icon" alt="">
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡 Temp: ${data.main.temp}°C | 💧 Humidity: ${data.main.humidity}% | 🌬 Wind: ${data.wind.speed} m/s</p>
  `;

  weatherDiv.innerHTML = html;
}

function showForecast(data) {
  const forecastDiv = document.getElementById("forecast");
  forecastDiv.innerHTML = "";

  const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

  dailyForecasts.forEach(item => {
    const date = new Date(item.dt_txt);
    const card = `
      <div class="col-md-2 col-sm-4">
        <div class="forecast-card">
          <h6>${date.toDateString()}</h6>
          <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" class="weather-icon" alt="">
          <p class="mb-0"><strong>${item.weather[0].main}</strong></p>
          <p>${item.main.temp}°C</p>
        </div>
      </div>
    `;
    forecastDiv.innerHTML += card;
  });
}
