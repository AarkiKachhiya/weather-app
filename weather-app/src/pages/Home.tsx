import { useEffect } from "react";
import { useWeather } from "../hooks/useWeather";
import { motion } from "framer-motion";
import { SearchBar } from "../components/SearchBar";
import { WeatherCard } from "../components/WeatherCard";
import { Forecast } from "../components/Forecast";
import { Settings } from "../components/Settings";
import { useParams } from "react-router-dom";

const Home = () => {
  const {
    weather,
    forecast,
    error,
    isLoading,
    unit,
    handleSearch,
    handleLocationRequest,
    handleUnitChange,
    fetchWeatherByCity,
  } = useWeather();

  const { name } = useParams();

  useEffect(() => {
    if (name) fetchWeatherByCity(name, unit);
  }, [name]);

  return (
    <div className="min-h-screen w-full px-4 py-8 md:p-8 flex flex-col items-center transition-all duration-500 bg-gradient-to-br from-blue-500 via-blue-400 to-blue-300 text-black dark:bg-gray-900  dark:bg-none dark:text-white">
      {" "}
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <SearchBar
            onSearch={handleSearch}
            onLocationRequest={handleLocationRequest}
            isLoading={isLoading}
          />
          <Settings unit={unit} onUnitChange={handleUnitChange} />
        </div>

        {isLoading && (
          <div className="mt-20 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4">Loading weather data...</p>
          </div>
        )}

        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-center bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-full max-w-md mx-auto"
          >
            {error}
          </motion.p>
        )}

        {weather?.alerts && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {weather.alerts.map((alert, index) => (
              <div
                key={index}
                className="bg-red-500/20 backdrop-blur-md rounded-lg p-4 mb-4"
              >
                <h3 className="font-bold text-lg">{alert.event}</h3>
                <p className="mt-2 text-sm opacity-90">{alert.description}</p>
                <div className="mt-2 text-xs opacity-70">
                  <span>
                    From: {new Date(alert.start * 1000).toLocaleString()}
                  </span>
                  <span className="ml-4">
                    To: {new Date(alert.end * 1000).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <div className="mt-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
          {weather && <WeatherCard data={weather} unit={unit} />}
          {forecast && <Forecast data={forecast} unit={unit} />}
        </div>

        {!weather && !error && !isLoading && (
          <div className="mt-20 text-center">
            <p className="text-2xl">Welcome to Weather App</p>
            <p className="mt-2 opacity-70">
              Allow location access or search for a city to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
