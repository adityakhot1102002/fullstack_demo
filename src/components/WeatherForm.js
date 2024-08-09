import React, { useState } from 'react';
import axios from 'axios';

const WeatherForm = () => {
  const [cityName, setCityName] = useState('');
  const [unit, setUnit] = useState('Celcius');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/weather', {
        params: {
          cityName,
          unit,
        },
      });
      // Assume the response data structure is as follows:
      // {
      //   temperature: number,
      //   cityName: string,
      //   weatherDescription: string,
      //   imageURL: string
      // }
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data Aditya');
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to our Weather Forecasting App</h1>
      <p>Enter your details to get weather info</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='cityInput'>City name:</label>
        <input
          type="text"
          name="cityName"
          placeholder="Enter name of your city"
          id="cityInput"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
        <label htmlFor='unitInput'>Unit:</label>
        <input
          type="text"
          name="unit"
          placeholder="Enter unit (e.g., metric)"
          id="unitPlace"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p>
            The Weather is {weatherData.temperature} Degree Celsius in {weatherData.cityName} and the description is {weatherData.weatherDescription}.
          </p>
          <img src={weatherData.imageURL} alt="Weather" />
        </div>
      )}
    </div>
  );
};

export default WeatherForm;