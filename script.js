let weather = {
  apiKey: "81942bc80c6b0bb9e84c0452c495b4cb",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
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
        this.setBackgroundImage(city); // Set dynamic background image
      });
  },

  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Wind speed: " + speed + " km/h";
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

        // Add a simple animation to move the background
        this.animateBackground();
      });
  },

  animateBackground: function () {
    let backgroundPositionX = 0; // Starting position
    setInterval(() => {
      backgroundPositionX += 0.5; // Change the background position to simulate movement
      document.body.style.backgroundPosition = `${backgroundPositionX}px center`;
    }, 100); // Adjust the interval time for the animation speed
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

weather.fetchWeather("Denver");
