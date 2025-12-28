const express = require("express");
const router = express.Router();
const axios = require("axios");

// @route GET api/weather
// @desc Get weather data for a specific city
// @access Public
router.get("/", async (req, res) => {
  const city = req.query.city;
  
  if (!city) {
    return res.status(400).json({ message: "City parameter is required" });
  }

  try {
    // Ideally, this API key should be in a .env file
    // For now, I'll use a placeholder or public API.
    // Using OpenMeteo as a free alternative that doesn't require a key for this demo,
    // First, we need to geocode the city name to lat/lon.
    
    // Geocoding
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
    const geoResponse = await axios.get(geoUrl);
    
    if (!geoResponse.data.results || geoResponse.data.results.length === 0) {
        return res.status(404).json({ message: "City not found" });
    }

    const { latitude, longitude, name, country } = geoResponse.data.results[0];

    // Fetch Weather Data
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
    
    const weatherResponse = await axios.get(weatherUrl);
    
    const weatherData = {
        location: {
            city: name,
            country: country,
            lat: latitude,
            lon: longitude
        },
        current: weatherResponse.data.current,
        daily: weatherResponse.data.daily,
        units: weatherResponse.data.current_units
    };

    res.json(weatherData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error fetching weather data" });
  }
});

module.exports = router;
