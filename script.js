const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

const temperature = document.getElementById("temperature");
const cityName = document.getElementById("cityName");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const weatherIcon = document.getElementById("weatherIcon");

// Put your API key here
const API_KEY = "5c022fc490efce11384c4535e0f9cf0d";

// Get weather
async function getWeather(city) {
  try {
    city = city.trim();

    const cityEncoded = encodeURIComponent(city);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityEncoded}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    console.log(data);

    // Check if city was found
    if (!response.ok) {
      alert(`Error ${response.status}: ${data.message}`);

      return;
    }

    // Temperature
    temperature.textContent = `${Math.round(data.main.temp)}°C`;

    // City
    cityName.textContent = data.name;

    // Humidity
    humidity.textContent = `${data.main.humidity}%`;

    // Wind speed
    const wind = (data.wind.speed * 3.6).toFixed(1);

    windSpeed.textContent = `${wind} km/h`;

    // Weather icon
    const icon = data.weather[0].icon;

    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  } catch (error) {
    console.log(error);

    alert("Unable to connect to the weather API.");
  }
}

// Search button
searchButton.addEventListener("click", function () {
  const city = searchInput.value.trim();

  if (city === "") {
    alert("Please enter a city");

    return;
  }

  getWeather(city);
});

// Press Enter to search
searchInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const city = searchInput.value.trim();

    if (city !== "") {
      getWeather(city);
    }
  }
});
