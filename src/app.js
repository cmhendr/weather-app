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

function showTemperature(response) {
  let city = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${temperature}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#selector-text-input").value;
  searchCity(city);
}

function showPosition(position) {
  let lat = position.coords.lat;
  let lon = position.coords.lon;
  let apiKey = `c95d60a1e3adbeb286133f1ebebc2579`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#selector-city-search");
searchForm.addEventListener("submit", handleSubmit);

let currentButton = document.querySelector("#button-current");
currentButton.addEventListener("click", getCurrentPosition);
