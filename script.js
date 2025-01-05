let weather = {
  apiKey: "81942bc80c6b0bb9e84c0452c495b4cb",
  units: "metric", // Default units to metric (Celsius)
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=" +
        this.units +
        "&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => {
        this.displayWeather(data);
        this.setBackgroundImage(city);
      });
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const unitSymbol = this.units === "metric" ? "°C" : "°F";
    const windSpeedUnit = this.units === "metric" ? "km/h" : "mph";

    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + unitSymbol;
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " " + windSpeedUnit;
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

weather.fetchWeather("Charlotte");

if (window.innerWidth < 600) {
  clearInterval(this.animateBackground);
}
