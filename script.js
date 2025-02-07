let weather = {
  apiKey: "81942bc80c6b0bb9e84c0452c495b4cb",
  units: "metric",
  fetchWeather: function (location) {
    const locationParts = location.split(',').map(part => part.trim());
    let searchQuery;

    if (locationParts.length === 3) {
      searchQuery = `${locationParts[0]},${locationParts[1]},${locationParts[2]}`;
    } else if (locationParts.length === 2) {
      searchQuery = `${locationParts[0]},${locationParts[1]}`;
    } else {
      searchQuery = locationParts[0];
    }

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery}&units=${this.units}&appid=${this.apiKey}`
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found. Please check the location format.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
        this.setBackgroundImage(searchQuery);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  displayWeather: function (data) {
    const { name, sys } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const unitSymbol = this.units === "metric" ? "°C" : "°F";
    const windSpeedUnit = this.units === "metric" ? "km/h" : "mph";

    const cityDisplay = sys.country ? `${name}, ${sys.country}` : name;

    document.querySelector(".city").innerText = `Weather in ${cityDisplay}`;
    document.querySelector(".icon").src =
      `https://openweathermap.org/img/wn/${icon}.png`;
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + unitSymbol;
    document.querySelector(".humidity").innerText =
      `Humidity: ${humidity}%`;
    document.querySelector(".wind").innerText =
      `Wind speed: ${speed} ${windSpeedUnit}`;
    document.querySelector(".weather").classList.remove("loading");
  },

  setBackgroundImage: function (city) {
    document.body.style.backgroundImage = 'url("cool-background-scene.svg")';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
  },

  toggleUnits: function () {
    this.units = this.units === "metric" ? "imperial" : "metric";
    const unitButton = document.querySelector(".unit-toggle");
    unitButton.innerText = this.units === "metric" ? "C" : "F";
    const city = document.querySelector(".city").innerText.split("Weather in ")[1];
    if (city) {
      this.fetchWeather(city);
    }
  },

  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },

  initializeAudio: function () {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.3;
    audio.play().catch(error => {
      console.log('Autoplay was prevented. User interaction required.');
    });
  }
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

document.querySelector(".unit-toggle").addEventListener("click", function () {
  weather.toggleUnits();
});

document.addEventListener('click', function firstClickHandler() {
  weather.initializeAudio();
  document.removeEventListener('click', firstClickHandler);
});

weather.fetchWeather("Charlotte, NC, US");
