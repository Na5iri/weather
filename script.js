async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const resultDiv = document.getElementById("weatherResult");
  
    if (!city) {
      alert("Please enter a city name.");
      return;
    }
  
    const apiKey = "YOUR_API_KEY"; // <-- Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("City not found");
      }
  
      const data = await response.json();
      const { name, main, weather, wind } = data;
      const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  
      resultDiv.innerHTML = `
        <h2>${name}</h2>
        <img src="${iconUrl}" alt="${weather[0].description}" />
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Condition:</strong> ${weather[0].main}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
        <p><strong>Wind Speed:</strong> ${wind.speed} m/s</p>
      `;
    } catch (error) {
      alert("Error: " + error.message);
      resultDiv.innerHTML = "";
    }
  }
  