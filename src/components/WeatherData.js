import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WeatherData(props) {
  const weather = props.weather;
  const settings = props.settings;

  const renderWeatherIcon = () => {
    switch (weather.weather[0].main) {
      case "Clouds":
        return <FontAwesomeIcon icon="fa-solid fa-cloud" size="2x" />;
      case "Clear":
        return <FontAwesomeIcon icon="fa-solid fa-sun" size="2x" />;
      case "Rain":
        return <FontAwesomeIcon icon="fa-solid fa-cloud-rain" size="2x" />;
      case "Thunderstorm":
        return <FontAwesomeIcon icon="fa-solid fa-cloud-bolt" size="2x" />;
      case "Drizzle":
        return <FontAwesomeIcon icon="fa-solid fa-cloud-drizzle" size="2x" />;
      case "Snow":
        return <FontAwesomeIcon icon="fa-solid fa-cloud-snow" size="2x" />;
      default:
        break;
    }
  };

  /* (x °C × 9/5) + 32 = F */
  const celsiusToFarenheit = (celsius) => (celsius * (9 / 5) + 32).toFixed(2);

  const unixToDate = (unix) => {
    const date = new Date(unix * 1000);

    return date.toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div className="h-full">
      <div className="flex flex-col items-center pt-16 min-h-[38rem] justify-center">
        <div>
          <div className="flex gap-2 mb-5">
            <FontAwesomeIcon icon="fa-solid fa-location-dot" size="2x" />
            <div className="text-lg">
              <div
                className="tooltip tooltip-info"
                data-tip={
                  String(weather.coord.lat) + "," + String(weather.coord.lon)
                }
              >
                {weather.name}, {weather.sys.country}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center mb-5">
            <FontAwesomeIcon icon="fa-solid fa-temperature-half" size="2x" />
            <div className="flex flex-col">
              <p className="text-lg">
                {settings.temp === "Celsius"
                  ? parseInt(weather.main.temp) + "°C"
                  : parseInt(celsiusToFarenheit(weather.main.temp)) + "°F"}
              </p>
              <p className="text-sm text-slate-500 capitalize">
                {settings.info === "Detailed"
                  ? settings.temp === "Celsius"
                    ? "Feels like " + parseInt(weather.main.feels_like) + "°C"
                    : "Feels like " +
                      parseInt(celsiusToFarenheit(weather.main.feels_like)) +
                      "°F"
                  : null}
              </p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            {renderWeatherIcon()}
            <div className="flex flex-col">
              <p className="text-lg">{weather.weather[0].main}</p>
              <p className="text-sm text-slate-500 capitalize">
                {settings.info === "Detailed"
                  ? weather.weather[0].description
                  : null}
              </p>
            </div>
          </div>
        </div>
        <div
          className={
            settings.info === "Minimal"
              ? "hidden"
              : "flex flex-col items-center mt-16 pb-5 w-full"
          }
        >
          <h1 className="text-center text-2xl mb-5">Weather Details</h1>
          <table className="table w-6/12">
            <tbody>
              <tr>
                <td>Max Temperature</td>
                <td>
                  {settings.temp === "Celsius"
                    ? parseInt(weather.main.temp_max) + "°C"
                    : parseInt(celsiusToFarenheit(weather.main.temp_max)) +
                      "°F"}
                </td>
              </tr>
              <tr>
                <td>Min Temperature</td>
                <td>
                  {settings.temp === "Celsius"
                    ? parseInt(weather.main.temp_min) + "°C"
                    : parseInt(celsiusToFarenheit(weather.main.temp_min)) +
                      "°F"}
                </td>
              </tr>
              <tr>
                <td>Pressure</td>
                <td>{weather.main.pressure + " hPa"}</td>
              </tr>
              <tr>
                <td>Humidity</td>
                <td>{weather.main.humidity + "%"}</td>
              </tr>
              <tr>
                <td>Wind Speed</td>
                <td>{weather.wind.speed + " m/s"}</td>
              </tr>
              <tr>
                <td>Wind Direction</td>
                <td>{weather.wind.deg + " deg"}</td>
              </tr>
              <tr>
                <td>Sunrise</td>
                <td>{unixToDate(weather.sys.sunrise)}</td>
              </tr>
              <tr>
                <td>Sunset</td>
                <td>{unixToDate(weather.sys.sunset)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
