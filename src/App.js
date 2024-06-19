import React, { useState } from 'react';
import './App.css';

const api = {
  key: "6398a1c946f0d17f597b7ff3fe5925e4",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});

  const clickSearch = async () => {
    try {
      const response = await fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const result = await response.json();
      console.log(result);
      setWeather(result);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error or display message to the user
    }
  }

  return (
    <div className="App">
      <header className="container">
        <h1 className='header'>Weather App</h1>
        <div className="search-container">
          <input 
            type="text" 
            placeholder='Enter your city name'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={clickSearch}>Search</button>
        </div>
        {!weather.main &&
        <div className='weather-container'>
          <p>Location: </p>
          <p>Temperature: </p>
          <p>Status: </p>
          <p>Atomspheric Conditions: </p>

        </div>
        }
        {weather.main && (
          <div className="weather-container">
            <p><span className='title'>Location:</span>  {weather.name}, {weather.sys.country}</p>
            <p><span className='title'>Temperature: </span>{weather.main.temp} &deg;C</p>
            <p><span className='title'>Status:</span> {weather.weather[0].main}</p>
            <p><span className='title'>Atomspheric Conditions:</span> ({weather.weather[0].description})</p>
          </div>
         )} 
      </header>
    </div>
  );
}

export default App;
