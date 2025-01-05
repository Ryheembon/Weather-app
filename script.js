<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ryheem's Weather App</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <script src="script.js" defer></script>
</head>
<body>
  <header class="app-header">
    <div class="header-content">
      <h1 class="weather-today" style="text-decoration: underline;">What's the weather today?</h1>
      <!-- Music Player Section -->
      <footer class="app-footer">
        <audio controls autoplay>
          <source src="New Light - .m4a" type="audio/m4a">
          <source src="New Light - .m4a" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </footer>
    </div>
  </header>

  <main class="app-main">
    <div class="card">
      <img src="landscape.jpeg" class="picture" alt="Landscape" />
      <div class="search">
        <input type="text" class="search-bar" placeholder="Enter city name..." />
        <button class="search-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="24" width="24">
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path>
          </svg>
        </button>
        <button class="unit-toggle">C</button> <!-- Toggle button placed below search bar -->
      </div>
      <div class="weather loading">
        <h2 class="city">Weather in Charlotte</h2>
        <h1 class="temp">51°</h1>
        <div class="flex">
          <img src="cloud.png" alt="Weather Icon" class="icon" />
          <div class="description">Cloudy</div>
        </div>
        <div class="humidity">Humidity: 60%</div>
        <div class="wind">Wind Speed: 6.2 km/h</div>
      </div>
    </div>
  </main>
</body>
</html>
