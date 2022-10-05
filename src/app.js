let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
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
let day = days[now.getDay()];
let h3 = document.querySelector("h3");
h3.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/un/${response.data.weather[0].icon}@2xpng`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showTemperature(response) {
  document.querySelector("h1").innerHTML = `${Math.round(
    response.data.main.temp
  )}°F`;
  document.querySelector("h2").innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = `eae061c95483dd066657bfc7525418ed`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = `eae061c95483dd066657bfc7525418ed`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let searchForm = document.querySelector("#selector-city-search");
searchForm.addEventListener("submit", handleSubmit);

let searchButton = document.querySelector("#button-search");
searchButton.addEventListener("click", handleSubmit);

let currentButton = document.querySelector("#button-current");
currentButton.addEventListener("click", getCurrentPosition);

searchCity("Chicago");
