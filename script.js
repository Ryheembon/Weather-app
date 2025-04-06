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
    // Use the weather condition to set an appropriate background
    const weatherDescription = document.querySelector(".description").innerText.toLowerCase();
    let category = '';
    
    // Determine the best category based on weather description
    if (weatherDescription.includes('cloud')) {
      category = 'clouds';
    } else if (weatherDescription.includes('rain')) {
      category = 'rain';
    } else if (weatherDescription.includes('snow')) {
      category = 'snow';
    } else if (weatherDescription.includes('clear')) {
      category = 'sunny';
    } else if (weatherDescription.includes('thunder')) {
      category = 'storm';
    } else {
      category = 'weather'; // default weather category
    }
    
    // Set that we've loaded a weather-related background
    initialBackgroundLoaded = true;
    
    // Use our existing background change function with weather-appropriate category
    changeBackgroundImage(category);
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

// Helper for applying the background image with fade effect
function applyBackgroundImage(url) {
    // Create a new image element to preload the image
    const img = new Image();
    
    // When image loads successfully, apply it to the background
    img.onload = function() {
        document.body.style.transition = 'background-image 1.5s ease';
        document.body.style.backgroundImage = `url('${url}')`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        console.log('Background image applied successfully');
    };
    
    // If image fails to load, use default background
    img.onerror = function() {
        console.error('Failed to load image:', url);
        applyDefaultBackground();
    };
    
    // Start loading the image
    img.src = url;
}

// Helper for applying the default gradient background
function applyDefaultBackground() {
    console.log('Using default background gradient');
    document.body.style.backgroundImage = 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)';
    document.body.style.backgroundSize = 'cover';
}

// Function to change background image with user-selected or random category
function changeBackgroundImage(category = '', customUrl = '') {
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'bg-loading';
    loadingIndicator.textContent = 'Loading background...';
    document.body.appendChild(loadingIndicator);
    
    // If custom URL is provided, use it directly
    if (customUrl) {
        applyBackgroundImage(customUrl);
        setTimeout(() => {
            if (document.body.contains(loadingIndicator)) {
                document.body.removeChild(loadingIndicator);
            }
        }, 2000);
        return;
    }
    
    // Use predefined background images based on category
    let imageUrl;
    
    // Map of categories to specific Unsplash photo URLs
    const categoryImages = {
        'default': 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?q=80&w=1600&auto=format&fit=crop',
        'nature': 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop',
        'weather': 'https://images.unsplash.com/photo-1516490981167-dc990a242afe?q=80&w=1600&auto=format&fit=crop',
        'clouds': 'https://images.unsplash.com/photo-1611928482473-7b27d24eab80?q=80&w=1600&auto=format&fit=crop',
        'rain': 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?q=80&w=1600&auto=format&fit=crop',
        'snow': 'https://images.unsplash.com/photo-1516431883659-655d41c09bf9?q=80&w=1600&auto=format&fit=crop',
        'sunny': 'https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?q=80&w=1600&auto=format&fit=crop',
        'storm': 'https://images.unsplash.com/photo-1537210249814-b9a10a161ae4?q=80&w=1600&auto=format&fit=crop',
        'mountains': 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?q=80&w=1600&auto=format&fit=crop',
        'beach': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600&auto=format&fit=crop'
    };
    
    // Determine which category to use
    if (category) {
        // Find best match from the provided category string
        for (const key in categoryImages) {
            if (category.includes(key)) {
                imageUrl = categoryImages[key];
                break;
            }
        }
    }
    
    // If no match found, use a random image from our collection
    if (!imageUrl) {
        const categories = Object.keys(categoryImages);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        imageUrl = categoryImages[randomCategory];
    }
    
    applyBackgroundImage(imageUrl);
    
    // Remove loading indicator after some time
    setTimeout(() => {
        if (document.body.contains(loadingIndicator)) {
            document.body.removeChild(loadingIndicator);
        }
    }, 2000);
}

// Change background image when page loads - but only if we're not already loading weather 
let initialBackgroundLoaded = false;

window.addEventListener('load', () => {
  // Only set initial background if weather hasn't already done it
  if (!initialBackgroundLoaded) {
    initialBackgroundLoaded = true;
    changeBackgroundImage();
  }
});

// Add background change buttons to HTML
function addBackgroundControls() {
    const footer = document.querySelector('.app-footer');

    // Create container for background controls
    const bgControlsContainer = document.createElement('div');
    bgControlsContainer.className = 'bg-controls';

    // Main button to change background with default categories
    const changeBtn = document.createElement('button');
    changeBtn.className = 'bg-change-btn';
    changeBtn.textContent = 'Random Background';
    changeBtn.addEventListener('click', () => {
        initialBackgroundLoaded = true; // Prevent weather from changing it
        changeBackgroundImage();
    });

    // Create category buttons
    const categories = [
        { name: 'Nature', query: 'nature' },
        { name: 'Weather', query: 'weather' },
        { name: 'Clouds', query: 'clouds' },
        { name: 'Rain', query: 'rain' },
        { name: 'Snow', query: 'snow' },
        { name: 'Sunny', query: 'sunny' },
        { name: 'Storm', query: 'storm' },
        { name: 'Mountains', query: 'mountains' },
        { name: 'Beach', query: 'beach' }
    ];

    // Add category selector
    const categorySelect = document.createElement('select');
    categorySelect.className = 'category-select';

    // Add default option
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select category...';
    categorySelect.appendChild(defaultOption);

    // Add category options
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.query;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
    
    // Add change event to select
    categorySelect.addEventListener('change', (e) => {
        if (e.target.value) {
            initialBackgroundLoaded = true; // Prevent weather from changing it
            changeBackgroundImage(e.target.value);
        }
    });
    
    // Create custom URL input
    const customUrlContainer = document.createElement('div');
    customUrlContainer.className = 'custom-url-container';
    
    const customUrlInput = document.createElement('input');
    customUrlInput.type = 'text';
    customUrlInput.className = 'custom-url-input';
    customUrlInput.placeholder = 'Paste image URL here...';
    
    const applyCustomUrlBtn = document.createElement('button');
    applyCustomUrlBtn.className = 'custom-url-btn';
    applyCustomUrlBtn.textContent = 'Apply';
    applyCustomUrlBtn.addEventListener('click', () => {
        const url = customUrlInput.value.trim();
        if (url) {
            // Check if URL is valid - must start with http:// or https://
            if (url.match(/^(https?:\/\/)/i)) {
                // Try to validate if it's an image URL
                validateImageUrl(url)
                    .then(isValid => {
                        if (isValid) {
                            initialBackgroundLoaded = true; // Prevent weather from changing it
                            changeBackgroundImage('', url);
                        } else {
                            showErrorMessage('URL does not appear to be a valid image. Please try a direct image URL ending with jpg, png, etc.');
                        }
                    })
                    .catch(() => {
                        // Try anyway in case our validation failed
                        initialBackgroundLoaded = true; // Prevent weather from changing it
                        changeBackgroundImage('', url);
                    });
            } else {
                showErrorMessage('Please enter a valid URL starting with http:// or https://');
            }
        }
    });
    
    // Helper to show error message
    function showErrorMessage(message) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'url-error';
        errorMsg.textContent = message;
        
        // Remove any existing error messages
        document.querySelectorAll('.url-error').forEach(el => el.remove());
        
        // Add the new error message
        customUrlContainer.appendChild(errorMsg);
        
        // Remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(errorMsg)) {
                errorMsg.remove();
            }
        }, 5000);
    }
    
    // Helper to validate if a URL is likely an image
    function validateImageUrl(url) {
        return new Promise((resolve) => {
            // First check if URL ends with common image extensions
            if (/\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url)) {
                resolve(true);
                return;
            }
            
            // Otherwise try to fetch headers to check content type
            fetch(url, { method: 'HEAD', mode: 'no-cors' })
                .then(response => {
                    // Since we're using no-cors, we can't actually check the content-type
                    // So we'll just assume success since the request didn't fail
                    resolve(true);
                })
                .catch(() => {
                    // If this fails, we'll still allow the user to try
                    resolve(true);
                });
        });
    }
    
    customUrlContainer.appendChild(customUrlInput);
    customUrlContainer.appendChild(applyCustomUrlBtn);
    
    // Append all elements to container
    bgControlsContainer.appendChild(changeBtn);
    bgControlsContainer.appendChild(categorySelect);
    bgControlsContainer.appendChild(customUrlContainer);
    
    // Append container to footer
    footer.appendChild(bgControlsContainer);
}

// Add the controls when DOM is loaded
document.addEventListener('DOMContentLoaded', addBackgroundControls);