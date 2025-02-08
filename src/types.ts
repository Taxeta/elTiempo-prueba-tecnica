export interface ApiWeatherData {
  name: string;
  timezone: number;
  cod: number;
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
}

export interface WeatherError {
  WeatherError: null | string;
}
