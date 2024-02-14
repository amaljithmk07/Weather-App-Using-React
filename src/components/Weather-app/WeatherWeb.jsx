import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./WeatherWeb.css";
import AOS from "aos";
import "aos/dist/aos.css";
import toast, { Toaster } from "react-hot-toast";
function WeatherWeb() {
  const [weathercount, setWeathercount] = useState({
    main: [{}],
    weather: [{}],
  });
  const [pic, setpic] = useState(false);
  const [letter, setletter] = useState({
    place: "",
  });
  const handlechange = (event) => {
    setletter(event.target.value);
  };
  useEffect(() => {
    console.log(letter);
    AOS.init();
  }, []);
  const search = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?&appid=92cfcf567578b9576ec31b2cdcda14a9&units=metric&q=${letter}`
      )
      .then((response) => {
        console.log(response.data);
        setWeathercount(response.data);
        setpic(true);
      })
      .catch((err) => {
        console.log("err");
        setpic(false);
        setTimeout(() => {
          toast.error("Incorrect city name !!! ");
        }, 500);
      });
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <div className="body">
        <div className="display">
          <div className="inputfield" data-aos="fade-up">
            <form action="" method="get" className="inputfield">
              <input
                type="text"
                className="input"
                name="Place"
                placeholder="Type city name"
                onChange={handlechange}
              />
              <button id="search" onClick={search}>
                <img src="search.png" alt="" className="search" />
              </button>
            </form>
          </div>
          {pic == true ? (
            <div className="result" data-aos="fade-up">
              <h1>{weathercount.name}</h1>

              <h2>{weathercount.main.temp} &deg;C</h2>
              <h3>
                {weathercount.main.humidity}{" "}
                <img src="humidity.png" alt="" style={{ height: "14px" }} />{" "}
              </h3>
              <h3>{weathercount.weather[0].main}</h3>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherWeb;
