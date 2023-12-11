import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherWeb.css";
function WeatherWeb() {
  const [weathercount, setWeathercount] = useState({
    main: [{}],
    weather: [{}],
  });

  const [first, setfirst] = useState("");
  const [err, seterr] = useState(false);
  const handlechange = (event) => {
    setfirst(event.target.value);
  };
  useEffect(() => {
    console.log(first);
  });
  const search = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${first}`
      )
      .then((response) => {
        console.log(response.data);
        setWeathercount(response.data);
      })
      .catch((err) => {
        console.log("err");
        seterr("error");
      });
  };
  return (
    <div>
      <div className="body">
        <div className="display">
          <div>
            <form action="" method="get">
              <input
                type="text"
                className="input"
                name="Place"
                onChange={handlechange}
              />
              <button id="search">
                <img
                  src="search.png"
                  alt=""
                  className="search"
                  onClick={search}
                />
              </button>
            </form>
          </div>
          <h1>{weathercount.name}</h1>

          <h2>{weathercount.main.temp} &deg;C</h2>

          <h3>
            {weathercount.main.humidity}{" "}
            <img src="humidity.png" alt="" style={{ height: "14px" }} />{" "}
          </h3>
          <h4 style={{ color: "#ff3d3d" }}>{err != false}</h4>
          <h3>{weathercount.weather[0].main}</h3>
          {/* <h4>{weathercount.weather[0].description}</h4> */}
        </div>
      </div>
    </div>
  );
}

export default WeatherWeb;
