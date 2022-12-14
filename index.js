function currentTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes <= 10) {
    minutes = `0${hours}`;
  }

  let currentDay = date.getDay();
  let day = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  return `${day[currentDay]} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https:///api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function currentTemp(response) {
  document.querySelector("#location").innerHTML = response.data.name;
  document.querySelector("#cTemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#discription").innerHTML =
    response.data.weather[0].main;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  celsius = response.data.main.temp;
  getForecast(response.data.coord);
}
function newCity(city) {
  let apiKey = "a43564c91a6c605aeb564c9ed02e3858";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
function searching(event) {
  event.preventDefault();
  let city = document.querySelector("#change").value;
  newCity(city);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFar(event) {
  event.preventDefault();
  let temp = document.querySelector("#cTemp");
  temp.innerHTML = Math.round((celsius * 9) / 5 + 32);
}
function convertToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#cTemp");
  temp.innerHTML = Math.round(celsius);
}

let far = document.querySelector("#fahrenheit-link");
far.addEventListener("click", convertToFar);
let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", convertToCel);

let city = document.querySelector("#time");
let now = new Date();
city.innerHTML = currentTime(now);

let celsius = null;

newCity("");
let cLocationButton = document.querySelector("#cLocation");
cLocationButton.addEventListener("click", currentLocation);

let search = document.querySelector("#searches");
search.addEventListener("submit", searching);
