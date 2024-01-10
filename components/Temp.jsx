import React, { useState, useEffect } from "react";
import Weathercard, { ResultNotFound } from "./Weathercard";
import "./style.css";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("");
  const [tempInfo, setTempInfo] = useState({});
  const [result, setResult] = useState(false);

  const getWeatherInfo = async () => {
    try {
      let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=72537434ed65f388ad35309589d2ea38`;

      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };
      setResult(true)
      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
      setResult(false)
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="Enter City Name..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>

      {result?<Weathercard tempInfo={tempInfo} />:<ResultNotFound searchValue ={searchValue} />}
      
    </>
  );
};

export default Temp;
