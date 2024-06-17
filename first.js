document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "88749285603c9f6d5103b3fcf79b3b7d";
  const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");

  const displayError = (message) => {
    document.querySelector(".error").textContent = message;
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  };

  const checkWeather = async (city) => {
    city = city.trim()

    if(!city){
        displayError("Please enter a City Name !!")
        return;
    }
  
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        displayError("City not Found")
    } else {
      var data = await response.json();
     
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

      if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  };

  searchBox.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) {
      event.preventDefault();
      checkWeather(searchBox.value);
    }
  });

  searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
  });

  searchBox.addEventListener("input",()=>{
    document.querySelector(".error").style.display="none"
  })
});
