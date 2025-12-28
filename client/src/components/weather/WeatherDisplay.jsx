import React from "react";
import PropTypes from "prop-types";
import { getWeatherIcon, getWeatherDescription } from "../../utils/weatherTheme";

function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  const { location, current, daily, units } = weatherData;
  const maxTemp = Math.round(daily.temperature_2m_max[0]);
  const minTemp = Math.round(daily.temperature_2m_min[0]);
  const currentTemp = Math.round(current.temperature_2m);
  const weatherDescription = getWeatherDescription(current.weather_code, current.is_day);

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Main Card */}
      <div className="card-refined rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 fade-in-up">
        {/* Location & Icon Row */}
        <div className="flex items-start justify-between mb-6 sm:mb-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white truncate">
              {location.city}
            </h2>
            <p className="text-white/40 text-sm sm:text-base mt-0.5 sm:mt-1">
              {location.country} · {current.is_day ? "Jour" : "Nuit"}
            </p>
          </div>
          
          {/* Weather Icon */}
          <div className="text-4xl sm:text-5xl text-amber-400/80 float ml-4 flex-shrink-0">
            <i className={`wi ${getWeatherIcon(current.weather_code, current.is_day)}`} />
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-end gap-2 sm:gap-4">
            <span className="text-6xl sm:text-8xl md:text-9xl font-bold tracking-tighter text-white leading-none">
              {currentTemp}
            </span>
            <span className="text-2xl sm:text-4xl text-amber-400 font-light mb-1 sm:mb-3">°C</span>
          </div>
          <p className="text-white/60 text-lg sm:text-xl mt-3 sm:mt-4">
            {weatherDescription}
          </p>
        </div>

        {/* High / Low */}
        <div className="flex gap-6 sm:gap-8 pt-4 sm:pt-6 border-t border-white/[0.06]">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-rose-500/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m18 15-6-6-6 6"/>
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-[10px] sm:text-xs">Max</p>
              <p className="text-white font-semibold text-sm sm:text-base">{maxTemp}°</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            <div>
              <p className="text-white/40 text-[10px] sm:text-xs">Min</p>
              <p className="text-white font-semibold text-sm sm:text-base">{minTemp}°</p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Grid - 2x2 on mobile, 4 cols on desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <MetricCard
          icon={
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
            </svg>
          }
          label="Ressenti"
          value={`${Math.round(current.apparent_temperature)}°`}
        />
        <MetricCard
          icon={
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
          }
          label="Humidité"
          value={`${current.relative_humidity_2m}%`}
        />
        <MetricCard
          icon={
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
              <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
            </svg>
          }
          label="Vent"
          value={`${current.wind_speed_10m}`}
          unit={units.wind_speed_10m}
        />
        <MetricCard
          icon={
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
              <path d="M16 14v6M8 14v6M12 16v6" />
            </svg>
          }
          label="Pluie"
          value={`${current.precipitation || 0}`}
          unit="mm"
        />
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, unit }) {
  return (
    <div className="card-refined rounded-xl sm:rounded-2xl p-3.5 sm:p-5 group">
      <div className="text-white/30 group-hover:text-amber-400/60 transition-colors duration-200 mb-2 sm:mb-3">
        {icon}
      </div>
      <p className="text-white/40 text-[10px] sm:text-xs uppercase tracking-wide mb-0.5 sm:mb-1">
        {label}
      </p>
      <p className="text-white text-lg sm:text-xl font-semibold">
        {value}
        {unit && <span className="text-white/40 text-xs sm:text-sm font-normal ml-0.5 sm:ml-1">{unit}</span>}
      </p>
    </div>
  );
}

MetricCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  unit: PropTypes.string,
};

WeatherDisplay.propTypes = {
  weatherData: PropTypes.object.isRequired,
};

export default WeatherDisplay;
