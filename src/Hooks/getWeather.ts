import axios from "axios";
import { useCallback, useState } from "react";
import { ApiWeatherData, WeatherError } from "../types";

const useWeatherApi = () => {
  const apiUrl = "https://open-weather13.p.rapidapi.com/city";
  const apiKey = import.meta.env.VITE_API_KEY;
  const [weatherData, setWeatherData] = useState<ApiWeatherData | null>(null);
  const [error, setError] = useState<WeatherError>({ WeatherError: null });
  const [isLoading, setIsLoading] = useState(false);
  const fahrenheitToCelsius = (fahrenheit: number) => {
    return ((fahrenheit - 32) * 5) / 9;
  };

  const getWeather = useCallback(
    async (place = "London", countryCode = "EN") => {
      if (isLoading) return;

      setIsLoading(true);
      try {
        setError({ WeatherError: null });

        const response = await axios.get(`${apiUrl}/${place}/${countryCode}`, {
          headers: {
            "x-rapidapi-key": `${apiKey}`,
            "x-rapidapi-host": "open-weather13.p.rapidapi.com",
            Accept: "application/json",
          },
        });

        const tempCelsius = fahrenheitToCelsius(
          response.data.main.temp,
        ).toFixed(2);
        const tempMinCelsius = fahrenheitToCelsius(
          response.data.main.temp_min,
        ).toFixed(2);
        const tempMaxCelsius = fahrenheitToCelsius(
          response.data.main.temp_max,
        ).toFixed(2);
        const feelsLikeCelsius = fahrenheitToCelsius(
          response.data.main.feels_like,
        ).toFixed(2);

        setWeatherData({
          ...response.data,
          main: {
            ...response.data.main,
            temp: tempCelsius,
            temp_min: tempMinCelsius,
            temp_max: tempMaxCelsius,
            feels_like: feelsLikeCelsius,
          },
        });
      } catch (err: any) {
        if (err.response && err.response.status === 429) {
          setError({
            WeatherError:
              "Demasiadas peticiones. Por favor, intenta nuevamente en unos minutos.",
          });
        } else {
          setError({
            WeatherError: "No se encuentra el tiempo para esa localidad.",
          });
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading],
  );

  return { getWeather, error, weatherData, isLoading };
};

export default useWeatherApi;
