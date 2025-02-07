let weather = {
  apiKey: "81942bc80c6b0bb9e84c0452c495b4cb",
  units: "metric", // Default units to metric (Celsius)
  fetchWeather: function (location) {
    // Split the location input into parts
    const locationParts = location.split(',').map(part => part.trim());
    let searchQuery;

    if (locationParts.length === 3) {
      // If city, state, country are provided
      searchQuery = `${locationParts[0]},${locationParts[1]},${locationParts[2]}`;
    } else if (locationParts.length === 2) {
      // If city and state/country are provided
      searchQuery = `${locationParts[0]},${locationParts[1]}`;
    } else {
      // If only city is provided
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

    // Display city with country code if available
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
    fetch(
      `https://api.unsplash.com/photos/random?query=${city}&client_id=YOUR_UNSPLASH_ACCESS_KEY`
    )
      .then((response) => response.json())
      .then((data) => {
        const imageUrl = data[0].urls.full;
        document.body.style.backgroundImage = `url('${imageUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";

        this.animateBackground();
      });
  },

  animateBackground: function () {
    let backgroundPositionX = 0;
    setInterval(() => {
      backgroundPositionX += 0.5;
      document.body.style.backgroundPosition = `${backgroundPositionX}px center`;
    }, 100);
  },

  toggleUnits: function () {
    this.units = this.units === "metric" ? "imperial" : "metric";
    const unitButton = document.querySelector(".unit-toggle");
    unitButton.innerText = this.units === "metric" ? "C" : "F"; // Update button text
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
    audio.volume = 0.3; // Set volume to 30%
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

// Add click event to start audio on first user interaction
document.addEventListener('click', function firstClickHandler() {
  weather.initializeAudio();
  document.removeEventListener('click', firstClickHandler);
});

// Fetch initial weather for Charlotte
weather.fetchWeather("Charlotte, NC, US");

if (window.innerWidth < 600) {
  clearInterval(this.animateBackground);
}
