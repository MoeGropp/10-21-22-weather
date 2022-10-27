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

  celsius = response.data.main.temp;
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
