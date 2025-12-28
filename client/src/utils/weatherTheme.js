/**
 * Weather Theme Utilities - Ocean Deep Theme
 * Maps weather codes to theme names and background classes
 */

/**
 * Get theme name based on weather code and day/night status
 * @param {Object} data - Weather data object with current conditions
 * @returns {string} - Theme class name
 */
export const getWeatherTheme = (data) => {
  if (!data) return "base";

  const { weather_code: code, is_day: isDay } = data.current;

  // Clear sky
  if (code === 0) return isDay ? "clear" : "night";

  // Mainly clear, partly cloudy, or overcast
  if ([1, 2, 3].includes(code)) return "cloudy";

  // Fog and depositing rime fog
  if ([45, 48].includes(code)) return "foggy";

  // Drizzle: light, moderate, dense
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "rainy";

  // Snow: slight, moderate, heavy
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snowy";

  // Thunderstorm
  if ([95, 96, 99].includes(code)) return "stormy";

  return "base";
};

/**
 * Get weather icon class based on weather code and day/night status
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - Weather icon class name (from weather-icons library)
 */
export const getWeatherIcon = (code, isDay) => {
  if (code === 0) return isDay ? "wi-day-sunny" : "wi-night-clear";
  if ([1, 2, 3].includes(code)) return isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy";
  if ([45, 48].includes(code)) return "wi-fog";
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "wi-rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "wi-snow";
  if ([95, 96, 99].includes(code)) return "wi-thunderstorm";
  return "wi-cloud";
};

/**
 * Get background gradient class based on theme (Ocean theme)
 * @param {string} theme - Theme name
 * @returns {string} - Tailwind background class
 */
export const getBackgroundClass = (theme) => {
  const themeMap = {
    clear: "bg-ocean-clear",
    night: "bg-ocean-night",
    cloudy: "bg-ocean-cloudy",
    rainy: "bg-ocean-rainy",
    stormy: "bg-ocean-stormy",
    snowy: "bg-ocean-snowy",
    foggy: "bg-ocean-foggy",
    base: "bg-ocean-base",
  };

  return themeMap[theme] || themeMap.base;
};

/**
 * Get accent color based on weather condition
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - Whether it's daytime
 * @returns {Object} - Color values for various use cases
 */
export const getWeatherAccentColors = (code, isDay) => {
  // Clear / Sunny
  if (code === 0) {
    return isDay
      ? {
          primary: "#14b8a6", // turquoise
          secondary: "#22d3ee", // cyan
          glow: "rgba(20, 184, 166, 0.3)",
        }
      : {
          primary: "#6366f1", // indigo
          secondary: "#8b5cf6", // violet
          glow: "rgba(99, 102, 241, 0.3)",
        };
  }

  // Cloudy
  if ([1, 2, 3].includes(code)) {
    return {
      primary: "#64748b", // slate
      secondary: "#94a3b8", // lighter slate
      glow: "rgba(100, 116, 139, 0.3)",
    };
  }

  // Rainy
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) {
    return {
      primary: "#3b82f6", // blue
      secondary: "#60a5fa", // lighter blue
      glow: "rgba(59, 130, 246, 0.3)",
    };
  }

  // Snowy
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return {
      primary: "#e0f2fe", // sky-100
      secondary: "#bae6fd", // sky-200
      glow: "rgba(224, 242, 254, 0.3)",
    };
  }

  // Stormy
  if ([95, 96, 99].includes(code)) {
    return {
      primary: "#7c3aed", // violet
      secondary: "#a78bfa", // lighter violet
      glow: "rgba(124, 58, 237, 0.3)",
    };
  }

  // Foggy
  if ([45, 48].includes(code)) {
    return {
      primary: "#9ca3af", // gray
      secondary: "#d1d5db", // lighter gray
      glow: "rgba(156, 163, 175, 0.3)",
    };
  }

  // Default (base)
  return {
    primary: "#14b8a6",
    secondary: "#22d3ee",
    glow: "rgba(20, 184, 166, 0.3)",
  };
};

/**
 * Get weather description based on weather code
 * @param {number} code - WMO weather code
 * @param {boolean} isDay - Whether it's daytime
 * @returns {string} - Human-readable weather description
 */
export const getWeatherDescription = (code, isDay) => {
  const descriptions = {
    0: isDay ? "Ciel dégagé" : "Nuit claire",
    1: "Plutôt dégagé",
    2: "Partiellement nuageux",
    3: "Couvert",
    45: "Brouillard",
    48: "Brouillard givrant",
    51: "Bruine légère",
    53: "Bruine modérée",
    55: "Bruine dense",
    61: "Pluie légère",
    63: "Pluie modérée",
    65: "Forte pluie",
    71: "Neige légère",
    73: "Neige modérée",
    75: "Forte neige",
    77: "Grésil",
    80: "Averses légères",
    81: "Averses modérées",
    82: "Fortes averses",
    85: "Averses de neige légères",
    86: "Fortes averses de neige",
    95: "Orage",
    96: "Orage avec grêle légère",
    99: "Orage avec forte grêle",
  };

  return descriptions[code] || "Inconnu";
};
