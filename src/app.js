let apiKey = "5201594abea9f3e38b70e65b11a80c24";
let city = document.querySelector("#City");
let currentPlace = document.querySelector("#cityNow");
let topText = document.querySelector("#resultsFor");

function updateTemperature(response) {
    let temp = document.querySelector("#temperatureValue");
    temp.innerHTML = Math.trunc(response.data.main.temp);
    currentPlace.innerHTML = response.data.name;
    topText.innerHTML = response.data.name;
}

function updateCity(event) {
    event.preventDefault();

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(updateTemperature);
}

let citySearch = document.querySelector("#citySearch");

citySearch.addEventListener("submit", updateCity);

//curent location button
function updateCurrentCity(position) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl).then(updateTemperature);
}
function detectMe(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(updateCurrentCity);
}
let currentLocationBtn = document.querySelector("#currentLocation");
currentLocationBtn.addEventListener("click", detectMe);
