import { useState } from "react";
import useWeatherApi from "../../Hooks/getWeather";

const HomePage = () => {
  const { getWeather, isLoading, error, weatherData } = useWeatherApi();
  const [location, setLocation] = useState("");
  const [countryCode, setCountryCode] = useState("ES");

  const fetchWeather = async () => {
    try {
      const weatherData = await getWeather(location);
      console.log(weatherData);
    } catch (error) {
      console.error(
        "Error obteniendo el clima: Selecciona una ciudad válida",
        error,
      );
    }
  };

  return (
    <div>
      <h1>Selecciona la ciudad dónde quieras consultar el clima</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
      >
        <input
          type="text"
          className="tiempo_input"
          placeholder="Introduce una localidad"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          type="text"
          className="tiempo_input"
          placeholder="Código de país (ej. EN, US, ES, IT, DE)"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        />
        <div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Obtener Clima"}
          </button>
        </div>
      </form>

      {error?.WeatherError && <p>{error.WeatherError}</p>}
      {weatherData && (
        <div>
          <h3>
            Clima en {weatherData.name}, {weatherData.coord.lat},
            {weatherData.coord.lon}
          </h3>
          <p>{weatherData.main.temp}ºC</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
