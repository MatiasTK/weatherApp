import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Settings from "./Settings";

export default function Navbar(props) {
  return (
    <div>
      <h1 className="text-3xl text-center pt-5">
        Weather App
        <label htmlFor="my-modal">
          <FontAwesomeIcon
            icon="fa-solid fa-gear"
            className="absolute right-10 hover:text-slate-500 text-2xl"
          />
        </label>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <Settings setWeather={props.setWeather} API_KEY={props.API_KEY} settings={props.settings} setSettings={props.setSettings}/>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                Go back
              </label>
            </div>
          </div>
        </div>
      </h1>
    </div>
  );
}
