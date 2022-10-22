function currentTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
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
  document.querySelector("discription").innerHTML =
    response.data.weather[0].main;
}
function newCity(city) {
  let apiKey = "88e0d667a1fd1dd87882eeeb4f42a013";
  let apiUrl = `https://api.openweathermap.org/data/3.0/weather?${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(currentTemp);
}
function searching(event) {
  event.preventDefault();
  let city = document.querySelector("#location").value;
  city(city);
}
function searchLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let key = "88e0d667a1fd1dd87882eeeb4f42a013";
  let url = `https://api.openweathermap.org/data/3.0/weather&lat=${lat}&lon=${lon}&appid=${key}/units=metric`;
  axios.get(url).then(currentTemp);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFar(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = 66;
}
function convertToCel(event) {
  event.preventDefault();
  let temp = document.querySelector("#currentTemp");
  temp.innerHTML = 19;
}

let far = document.querySelector("#fahrenheit-link");
far.addEventListener("click", convertToFar);
let cel = document.querySelector("#celsius-link");
cel.addEventListener("click", convertToCel);

let city = document.querySelector("#time");
let now = new Date();
city.innerHTML = currentTime(now);

let search = document.querySelector("#searches");
search.addEventListener("submit", searching);

newCity("Paris");
let cLocationButton = document.querySelector("#cLocation");
cLocationButton.addEventListener("click", currentLocation);