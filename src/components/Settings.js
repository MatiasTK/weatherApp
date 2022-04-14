import React from "react";
import { toast } from "react-toastify";

export default function Settings(props) {
  const API_KEY = props.API_KEY;
  const setWeather = props.setWeather;
  const settings = props.settings;
  const setSettings = props.setSettings;
  const changeBackground = props.changeBackground;

  const handleCustomLocationBtn = async () => {
    const input = document.getElementById("custom-location");
    await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.cod !== 200) {
          toast.error(result.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }else{
            setWeather(result);
            changeBackground();
            toast.success("City changed successfully 😄", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
            setSettings({...settings, customCity: input.value})
        }
      });

  };

  const handleTempChange = (e) => {
    const newTemp = e.target.value;
    setSettings({...settings, temp: newTemp})
  }

  const handleDetailChange = () => {
    const newInfo = settings.info === 'Detailed' ? 'Minimal' : 'Detailed';
    setSettings({...settings, info: newInfo});
  }

  const disableCustomLocation = async () => {
    setSettings({...settings, customCity: 'Default'});
  }

  return (
    <div>
      <h3 className="font-bold text-lg">Settings</h3>
      <p className="py-4">
        <select
          className="select select-info w-full"
          defaultValue={"Temperature Unit"}
          onChange={e => handleTempChange(e)}
        >
          <option disabled>Temperature Unit</option>
          <option> Celsius </option>
          <option> Farenheit </option>
        </select>
      </p>
      <div className="py-4 w-100">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Use custom location</span>
          </label>
          <div className="input-group input-group-lg">
            <input
              type="text"
              placeholder="City name"
              className="input input-bordered w-full max-w-xs"
              id="custom-location"
            />
            <button
              className="btn btn-square"
              onClick={() => handleCustomLocationBtn()}
            >
              <p>SET</p>
            </button>
            <button className="btn btn-square btn-accent px-16" onClick={() => disableCustomLocation()}>Use geolocation</button>
          </div>
        </div>
      </div>
      <div className="py-4">
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Detailed weather</span>
            <input type="checkbox" className="toggle" onChange={() => handleDetailChange()} checked={settings.info === 'Detailed' ? true : false}/>
          </label>
        </div>
      </div>
    </div>
  );
}
