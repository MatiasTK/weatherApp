import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import WeatherData from "./components/WeatherData";

const BGCOLOR = "#282C34";
const RED = "#E06C75";
const GREEN = "#98C379";
const BLUE = "#61AFEF";
const YELLOW = "#E5C07B";
const PURPLE = "#C678DD";
const CYAN = "#56B6C2";
const GREY = "#ABB2BF";

const API_KEY = "1ed3d9fd5f851d8c58c86a1f9ce417af";

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
          });
      }
    };

    fetchData();

    localStorage.setItem("Settings", JSON.stringify(settings));
  }, [settings, userPosition.latitude, userPosition.longitude]);

  return (
    <div
      className="h-full min-h-screen"
      style={{ backgroundColor: BGCOLOR, color: GREY }}
    >
      <Navbar
        setWeather={setWeather}
        API_KEY={API_KEY}
        settings={settings}
        setSettings={setSettings}
      />
      <div>
        {typeof weather.main !== "undefined" ? (
          <WeatherData weather={weather} settings={settings} />
        ) : (
          <div></div>
        )}
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
  );
}
