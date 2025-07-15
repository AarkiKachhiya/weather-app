import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WeatherData, ForecastData, TemperatureUnit } from "../types/weather";

const API_KEY = "1fa334c4d9d361c25c9746d3505c4a35";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [unit, setUnit] = useState<TemperatureUnit>("celsius");
  const [lastSearchedCity, setLastSearchedCity] = useState<string>("");

  const navigate = useNavigate();

  const getUnitParam = (u: TemperatureUnit) =>
    u === "celsius" ? "metric" : "imperial";

  const fetchWeatherData = async (
    lat: number,
    lon: number,
    u: TemperatureUnit
  ) => {
    try {
      setIsLoading(true);
      setError("");
      const unitParam = getUnitParam(u);

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(
          `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${API_KEY}`
        ),
        axios.get(
          `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unitParam}&appid=${API_KEY}`
        ),
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch {
      setError("Failed to fetch weather data. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCity = async (city: string, u: TemperatureUnit) => {
    try {
      setIsLoading(true);
      setError("");
      setLastSearchedCity(city);
      const unitParam = getUnitParam(u);

      const [weatherRes, forecastRes] = await Promise.all([
        axios.get(
          `${BASE_URL}/weather?q=${city}&units=${unitParam}&appid=${API_KEY}`
        ),
        axios.get(
          `${BASE_URL}/forecast?q=${city}&units=${unitParam}&appid=${API_KEY}`
        ),
      ]);

      setWeather(weatherRes.data);
      setForecast(forecastRes.data);
    } catch {
      setError("City not found. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    navigate(`/${city}`);
  };

  const handleLocationRequest = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLoading(true);
    setLastSearchedCity("");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        fetchWeatherData(pos.coords.latitude, pos.coords.longitude, unit);
      },
      () => {
        setError(
          "Failed to get your location. Please allow location access or search by city."
        );
        setIsLoading(false);
      }
    );
  };

  const handleUnitChange = (newUnit: TemperatureUnit) => {
    if (weather) {
      if (lastSearchedCity) {
        fetchWeatherByCity(lastSearchedCity, newUnit);
      } else if (weather.coord) {
        fetchWeatherData(weather.coord.lat, weather.coord.lon, newUnit);
      }
    }
    setUnit(newUnit);
  };

  return {
    weather,
    forecast,
    error,
    isLoading,
    unit,
    fetchWeatherByCity,
    handleSearch,
    handleLocationRequest,
    handleUnitChange,
  };
};
