import React, { useState } from "react";
import styled from "styled-components";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const WeatherApp = () => {
  let api_key = "c78774f1e70dc369353cb335fb4267b8";
  const [cityInput, setCityInput] = useState("");
  const [wicon, setWicon] = useState(cloud_icon);

  const handleSearch = async () => {
    if (cityInput === "") {
      return;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${api_key}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.main && data.wind && data.weather) {
        // Ensure the expected properties exist in the data object

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/hr";
        temperature[0].innerHTML = Math.floor(data.main.temp) + "°C";
        location[0].innerHTML = data.name;

        if (data.weather[0].icon === "01d" || data.weather[0].icon === "01n") {
          setWicon(clear_icon);
        } else if (
          data.weather[0].icon === "02d" ||
          data.weather[0].icon === "02n"
        ) {
          setWicon(cloud_icon);
        } else if (
          data.weather[0].icon === "03d" ||
          data.weather[0].icon === "03n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "04d" ||
          data.weather[0].icon === "04n"
        ) {
          setWicon(drizzle_icon);
        } else if (
          data.weather[0].icon === "09d" ||
          data.weather[0].icon === "09n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "10d" ||
          data.weather[0].icon === "10n"
        ) {
          setWicon(rain_icon);
        } else if (
          data.weather[0].icon === "13d" ||
          data.weather[0].icon === "13n"
        ) {
          setWicon(snow_icon);
        } else {
          setWicon(clear_icon);
        }
      } else {
        console.error("Data format from API is not as expected.");
      }
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <Wrapper>
      <div className="container">
        <div className="top-bar">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            onKeyUp={handleKeyUp}
            placeholder="Search..."
          />
          <div className="search-icon" onClick={handleSearch}>
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>
        <div className="weather-temp">24</div>
        <div className="weather-location">london</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">humidity</div>
            </div>
          </div>

          <div className="element">
            <img src={wind_icon} alt="" />
            <div className="data">
              <div className="wind-rate">18km/hr</div>
              <div className="text">wind speed</div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    position: fixed;
    width: 25rem;
    height: 25rem;
    border-radius: 2rem;
    margin: 0;
    background: linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%);
  }
  .top-bar {
    display: flex;
    gap: 16px;
    justify-content: center;
    padding: 1rem;
    padding-top: 1rem;
  }
  .top-bar input {
    display: flex;
    /* width: max-content; */
    height: 3rem;
    background-color: #fff;
    border: none;
    outline: none;
    border-radius: 2rem;
    padding-left: 30px;
    padding-right: 30px;
    font-size: 20px;
    font-weight: 400;
    color: grey;
  }
  .search-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    /* height: 78px; */
    background: #ebfffc;
    border-radius: 50%;
    cursor: pointer;

    img {
      width: 1.5rem;
    }
  }
  .weather-image {
    display: flex;
    justify-content: center;
    /* margin-top: 30px; */
    img {
      margin-top: 0.5rem;
      width: 6rem;
    }
  }
  .weather-temp {
    display: flex;
    justify-content: center;
    /* color: white; */
    font-size: 3rem;
    font-weight: 400;
  }
  .weather-location {
    font-size: 2rem;
    /* color: white; */
  }
  .data-container {
    display: flex;
    justify-content: space-around;
  }
  .element {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  .text {
    font-size: 1rem;
  }
`;
export default WeatherApp;
