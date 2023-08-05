function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#today-temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector(`#description`);
  let humidityElement = document.querySelector(`#humidity`);
  let windElement = document.querySelector(`#wind-speed`);
  let iconElement = document.querySelector(`#icon`);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.innerHTML = response.data.condition.icon;
}

let apiKey = "05d7e4b8cc452aecc8t7e30oc08edef4";
let unit = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);
