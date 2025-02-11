import { useState } from "react";
import useWeatherApi from "../../Hooks/getWeather";
import "./HomePage.css";

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
      <h1 className="titulo_consultas">
        Selecciona la ciudad dónde quieras consultar el clima
      </h1>
      <form
        className="tiempo_form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!location.trim()) {
            alert("Por favor, intrduce una localidad");
            return;
          }
          fetchWeather();
        }}
      >
        <div className="input_container">
          <input
            type="text"
            className="tiempo_input"
            placeholder="Introduce una localidad"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <input
            type="text"
            className="tiempo_input"
            placeholder="Código de país (ej. EN, US, ES, IT, DE)"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
          />
        </div>
        <div>
          <button className="tiempo_button" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Obtener Clima"}
          </button>
        </div>
      </form>

      {error?.WeatherError && <p>{error.WeatherError}</p>}
      {weatherData && (
        <div className="weather_box">
          <div className="weather_titulos">
            <h2>Clima en {weatherData.name}</h2>
            <h3>
              {weatherData.coord.lat},{weatherData.coord.lon}
            </h3>
          </div>
          <div></div>
          <div className="weather_info">
            <p>{weatherData.main.temp}ºC</p>
            <p>{weatherData.main.humidity}% Humedad</p>
            <p>{weatherData.wind.speed} Km/H</p>
            <p>{weatherData.main.temp_max}ºC Max.</p>
            <p>{weatherData.main.temp_min}ºC Min.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
