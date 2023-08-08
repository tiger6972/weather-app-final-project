function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day}, ${hours}:${minutes}`;
}

function displayForecast(response) {
  console.log(response.data.day);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div  class = "row">`;
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class = "col-2">
  <div class = "forecast-date">${day}</div>
<img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/scattered-clouds-day.png"
          alt="cloudy"
          id = "forecast-icon"
          width="50"
  />
  <div class = "forecast-temperature">
<span class = "forecast-max">18</span>  |  <span class="forecast-min">12</span>
</div>
</div>
`;
  });
  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#today-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind-speed`);
  let dateElement = document.querySelector(`#currentDate`);
  let iconElement = document.querySelector(`#icon`);

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
}

function getForecast(city) {
  let apiKey = "05d7e4b8cc452aecc8t7e30oc08edef4";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units${unit}`;

  axios.get(apiUrl).then(displayForecast);
}

function search(city) {
  let apiKey = "05d7e4b8cc452aecc8t7e30oc08edef4";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  search(searchInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#today-temperature");
  let changeUnitElement = document.querySelector("#units");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  changeUnitElement.innerHTML = `°F`;
}

function displayCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#today-temperature");
  let changeUnitElement = document.querySelector("#units");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  changeUnitElement.innerHTML = `°C`;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-convert");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-convert");
celsiusLink.addEventListener("click", displayCelsius);

search("Frankfurt");
getForecast("Frankfurt");
