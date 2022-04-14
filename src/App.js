import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData";
import config from './config.json';

const BGCOLOR = "#282C34";
const GREY = "#ABB2BF";
/* const RED = "#E06C75";
const GREEN = "#98C379";
const BLUE = "#61AFEF";
const YELLOW = "#E5C07B";
const PURPLE = "#C678DD";
const CYAN = "#56B6C2"; */

const API_KEY = config.API_KEY;

export default function App() {
  const [userPosition, setUserPosition] = useState([]);
  const [weather, setWeather] = useState([]);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("Settings");
    const value = JSON.parse(saved);
    return (
      value || {
        temp: "Celsius", // Celsius or Farenheit
        info: "Minimal", // Minimal or detailed
        customCity: "Default",
      }
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPosition({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        () => {
          toast.info("This page needs location data to work 🙁", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          toast.clearWaitingQueue();
        }
      );

      if (
        userPosition.latitude !== undefined &&
        userPosition.longitude !== undefined &&
        settings.customCity === "Default"
      ) {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${userPosition.latitude}&lon=${userPosition.longitude}&appid=${API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            changeBackground();
          });
      } else if (
        userPosition.latitude !== undefined &&
        userPosition.longitude !== undefined
      ) {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${settings.customCity}&appid=${API_KEY}&units=metric`
        )
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            changeBackground();
          });
      }
    };

    fetchData();

    localStorage.setItem("Settings", JSON.stringify(settings));
  }, [settings, userPosition.latitude, userPosition.longitude]);

  const changeBackground = () => {
    if(weather.length === 0){
      return;
    }
    console.log(weather);
    const weatherCondition = weather.weather[0].main;
    const background = document.getElementById("background");
    const backgroundBackdrop = document.getElementById("background-backdrop");

    backgroundBackdrop.classList.add("backdrop-blur");
    backgroundBackdrop.classList.add("backdrop-brightness-35");

    background.classList.remove("bg-[url(./img/rain.jpg)]");
    background.classList.remove("bg-[url(./img/clear.jpg)]");
    background.classList.remove("bg-[url(./img/cloud.jpg)]");
    background.classList.remove("bg-[url(./img/thunderstorm.jpg)]");
    background.classList.remove("bg-[url(./img/drizzle.jpg)]");
    background.classList.remove("bg-[url(./img/snow.jpg)]");

    if (weatherCondition === "Rain") {
      background.classList.add("bg-[url(./img/rain.jpg)]");
    } else if (weatherCondition === "Clear") {
      background.classList.add("bg-[url(./img/clear.jpg)]");
    }else if(weatherCondition === 'Clouds') {
      background.classList.add("bg-[url(./img/cloud.jpg)]");
    }else if(weatherCondition === 'Thunderstorm'){
      background.classList.add("bg-[url(./img/thunderstorm.jpg)]");
    }else if(weatherCondition === 'Drizzle'){
      background.classList.add("bg-[url(./img/drizzle.jpg)]");
    }else if(weatherCondition === 'Snow'){
      background.classList.add("bg-[url(./img/snow.jpg)]");
    }
  };

  return (
    <div
      className="min-h-screen bg-no-repeat bg-cover overflow-hidden"
      style={{ backgroundColor: BGCOLOR, color: GREY }}
      id="background"
    >
      <div className="min-h-screen" id="background-backdrop">
        <div>
          <div>
            <Navbar
              setWeather={setWeather}
              API_KEY={API_KEY}
              settings={settings}
              setSettings={setSettings}
              changeBackground={changeBackground}
            />
          </div>
          <div>
            {typeof weather.main !== "undefined" ? (
              <WeatherData weather={weather} settings={settings} />
            ) : null}
          </div>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          limit={1}
        />
      </div>
    </div>
  );
}
