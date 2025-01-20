# Ryheem's Weather App

## Overview
Ryheem's Weather App is a responsive and interactive web application that provides real-time weather updates for cities worldwide. Built with HTML, CSS, and JavaScript, the app integrates the OpenWeather API to fetch and display current weather data, including temperature, humidity, wind speed, and a descriptive icon. Additional features include a unit toggle for Celsius and Fahrenheit, as well as a dynamic gradient background that enhances user experience.

---

## Features

### Core Functionalities
- **Search for City Weather:**
  Users can input any city name into the search bar and receive instant weather information.

- **Unit Toggle:**
  Switch between Celsius (°C) and Fahrenheit (°F) with a simple toggle button.

- **Dynamic Background:**
  A gradient animation enhances visual appeal, and an optional feature to set background images based on city searches is planned.

### Interactive Elements
- **Search Bar & Button:**
  Styled with CSS for a polished look and optimized for both desktop and mobile devices.

- **Music Player:**
  An embedded audio player allows background music to play while browsing the app.

---

## Technologies Used

### Frontend
- **HTML:**
  Structure and semantic markup.
- **CSS:**
  Styling and responsiveness, including:
  - Linear-gradient background animation.
  - Fully responsive design for devices of all sizes.
  - Styled search bar, buttons, and weather cards with shadows and transitions.
- **JavaScript:**
  - Fetch API for OpenWeather API integration.
  - Event listeners for interactive features (e.g., unit toggle, search functionality).
  - Dynamic DOM manipulation for real-time updates.

### Backend
- **API Integration:**
  - OpenWeather API for live weather data.
  - Planned: Unsplash API for city-specific background images.

---

## Code Breakdown

### HTML
The HTML file establishes the structure of the application. Key elements include:

- **Header Section:**
  Contains the app's title and embedded audio player.
- **Main Section:**
  Features a weather card displaying city-specific weather information, search bar, and buttons.

```html
<header class="app-header">
  <div class="header-content">
    <h1 class="weather-today" style="text-decoration: underline;">What's the weather today?</h1>
    <footer class="app-footer">
      <audio controls autoplay>
        <source src="New Light - .m4a" type="audio/m4a">
        <source src="New Light - .m4a" type="audio/mpeg">
        Your browser does not support the audio element.
      </audio>
    </footer>
  </div>
</header>
```

### CSS
- **Global Styles:**
  - Linear gradient background with smooth animations.
  - Centered and responsive layout.

- **Key Animations:**
  ```css
  @keyframes gradientBG {
      0% {
          background-position: 0% 50%;
      }
      50% {
          background-position: 100% 80%;
      }
      100% {
          background-position: 0% 60%;
      }
  }
  ```

- **Responsive Design:**
  - Adjustments for screens smaller than 600px using media queries.

### JavaScript
- **Core Functions:**
  - Fetch weather data from OpenWeather API and display it dynamically.
  ```javascript
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
      });
  },
  ```

- **Event Listeners:**
  - Handles user actions like search and unit toggling.

- **Planned Feature:**
  - Integrate Unsplash API for dynamic background images.

---

## Future Improvements
- Add city-specific background images using the Unsplash API.
- Implement hourly and weekly weather forecasts.
- Enhance the UI with additional weather animations.
- Optimize API calls for better performance.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ryheem/Weather-App.git
   ```

2. Open the `index.html` file in your browser to view the app.

3. To customize:
   - Add your OpenWeather API key in `script.js`.
   - (Optional) Add your Unsplash API key for background images.

---

## Acknowledgments
- [OpenWeather API](https://openweathermap.org/)
- [Unsplash API](https://unsplash.com/developers)
- Background music: "New Light"

---

## License
This project is licensed under the MIT License. Feel free to modify and distribute.

