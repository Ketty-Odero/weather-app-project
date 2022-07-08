let weekDay = document.querySelector("#weekday");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
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
  "Saturday"
];
let day = days[currentTime.getDay()];
weekDay.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(time){
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  return days[day];

}

function displayForecast(response){
  let forecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
  
  let forecastHTML=`<div class="row">`;
  forecast.forEach(function(forecastDay,index){
    if (index < 6){
forecastHTML= forecastHTML + `
            <div class="col-2">
              <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}°</span>
              </div>
            </div>
          `;
          }
  })

  forecastHTML=forecastHTML + `</div>`
  forecastElement.innerHTML=forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates);
  let apiKey = "32915c315fc97b9c6cd118efe79e51b5";
  let apiUrl= `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
 console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
    let iconElement=document.querySelector("#icon")
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",response.data.weather[0].description);
    getForecast(response.data.coord);
}

function search(event) {
  event.preventDefault();
  let apiKey = "32915c315fc97b9c6cd118efe79e51b5";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
let searchButton = document.querySelector("button");
searchButton.addEventListener("click", search);

