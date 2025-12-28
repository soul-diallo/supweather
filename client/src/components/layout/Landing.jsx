import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWeather } from "../../actions/weatherActions";
import WeatherDisplay from "../weather/WeatherDisplay.jsx";

function Landing({ weather, getWeather }) {
  const [city, setCity] = useState("");
  const { data, loading, error } = weather;

  const onChange = (e) => {
    setCity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      getWeather(city);
      setCity("");
    }
  };

  return (
    <main className="min-h-screen min-h-[100dvh] pt-20 sm:pt-28 pb-8 sm:pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Hero - Only when no data */}
        {!data && (
          <div className="text-center mb-8 sm:mb-12 fade-in-up">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 sm:mb-4 leading-tight">
              Quelle météo fait-il
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
                chez vous ?
              </span>
            </h1>
            <p className="text-white/50 text-base sm:text-lg mt-4 sm:mt-6 px-4">
              Des prévisions météo simples et élégantes
            </p>
          </div>
        )}

        {/* Search */}
        <div className="fade-in-up stagger-1">
          {/* Mobile: stacked layout, Desktop: inline */}
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:relative">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <input
                onChange={onChange}
                value={city}
                type="text"
                placeholder="Rechercher une ville..."
                className="
                  w-full
                  bg-white/[0.04]
                  border border-white/[0.08]
                  rounded-xl sm:rounded-2xl
                  pl-12 pr-4 sm:pr-36 py-3.5 sm:py-4
                  text-white text-base
                  placeholder:text-white/30
                  focus:outline-none
                  focus:border-amber-500/40
                  focus:bg-white/[0.06]
                  transition-all duration-200
                "
                disabled={loading}
              />
              {/* Desktop button inside input */}
              <button
                type="submit"
                disabled={loading}
                className="
                  hidden sm:block
                  absolute right-2 top-1/2 -translate-y-1/2
                  px-5 py-2.5
                  bg-gradient-to-r from-amber-500 to-orange-500
                  text-white
                  text-sm font-medium
                  rounded-xl
                  hover:from-amber-400 hover:to-orange-400
                  transition-all duration-200
                  disabled:opacity-50
                "
              >
                {loading ? "..." : "Rechercher"}
              </button>
            </div>
            
            {/* Mobile button full width */}
            <button
              type="submit"
              disabled={loading}
              className="
                sm:hidden
                w-full
                py-3.5
                bg-gradient-to-r from-amber-500 to-orange-500
                text-white
                text-base font-medium
                rounded-xl
                active:scale-[0.98]
                transition-all duration-200
                disabled:opacity-50
              "
            >
              {loading ? "Recherche..." : "Rechercher"}
            </button>
          </form>

          {/* Error */}
          {error && (
            <p className="mt-3 sm:mt-4 text-sm text-rose-400/80 text-center sm:text-left">
              Ville introuvable. Vérifiez l'orthographe.
            </p>
          )}
        </div>

        {/* Quick cities - Only when no data */}
        {!data && !loading && (
          <div className="mt-6 sm:mt-8 fade-in-up stagger-2">
            <p className="text-white/30 text-xs text-center mb-3 sm:hidden">Suggestions</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["Paris", "Tokyo", "New York", "Londres", "Sydney"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => getWeather(suggestion)}
                  className="
                    px-3.5 sm:px-4 py-2
                    text-sm text-white/50
                    bg-white/[0.03]
                    border border-white/[0.06]
                    rounded-full
                    hover:text-amber-400
                    hover:border-amber-500/30
                    hover:bg-amber-500/5
                    active:scale-95
                    transition-all duration-200
                  "
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Weather Display */}
        {data && !loading && (
          <div className="mt-6 sm:mt-10 fade-in-up">
            <WeatherDisplay weatherData={data} />
          </div>
        )}
      </div>
    </main>
  );
}

Landing.propTypes = {
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  weather: state.weather,
});

export default connect(mapStateToProps, { getWeather })(Landing);
