var APIkey = "62c84ba4c1043256ff2ab217f0f085f8";
var city;
var inputValue = document.querySelector(".inputValue");
var searchButton = document.querySelector(".search-btn");

function searchForecast(city) {
  return new Promise((resolve, reject) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIkey}`
    )
      .then((r) => r.json())
      .then((forecast) => {
        if (forecast.cod === "200") {
          resolve(forecast);
        } else {
          alert(forecast.message);
          reject(null);
        }
      })
      .catch((error) => {
        console.error("ERROR - ", error);
      });
  });
}

function getLastSearchedLocation() {
  const locations = getSearchedLocations();
  const lastLocation = locations[locations.length - 1];
  return lastLocation;
}

// Get all items from local storage
function getSearchedLocations() {
  return Object.values(localStorage);
}

function init() {
  const finalLocation = getLastSearchedLocation();
  searchForecast(finalLocation).then((forecast) => {
    console.log(forecast);
  });
}
init();

function saveCity(city) {
    const cityName = localStorage.getItem(city);
    if (cityName) {
        localStorage.removeItem(cityName);
        localStorage.setItem(cityName, cityName);
    } else {
        localStorage.setItem(city, city);
    }
}

searchButton.addEventListener("click", () => {
  const searchValue = inputValue.value;
  searchForecast(searchValue).then((forecast) => {
    var cityName = forecast.city.name;
    saveCity(cityName);

  });
});
// display current day on top of the screen
const currentDay = moment().format("dddd LL");
$("#currentDay").append(currentDay);

const currentTime = moment().format("LT");
$("#currentTime").append(currentTime);