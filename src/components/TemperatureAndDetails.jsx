import React from "react";
import { UilArrowUp, UilArrowDown, UilTemperature, UilTear, UilWind, UilSun, UilSunset } from "@iconscout/react-unicons";
import { formatToLocalTime, iconUrlFromCode } from "../services/weatherService";

function TemperatureAndDetails({ weather: { details, icon, temp, temp_min, temp_max, sunrise, sunset, speed, humidity, feels_like, timezone } }) {
  return (
    <div>
      <div className="flex items-center justify-center py-4 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-row items-center justify-between text-white py-2">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-3xl">{`${temp.toFixed()}º`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light  items-center justify-end">
            <UilTemperature size={30} className="mr-1" />{" "}
            <p className="text-xs md:text-sm">
              Real feel: <span className="font-medium ml-1">{`${feels_like.toFixed()}º`}</span>
            </p>
          </div>

          <div className="flex font-light items-center justify-end">
            <UilTear size={30} className="mr-1" />
            <p className="text-xs md:text-sm">
              Humidity: <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
            </p>
          </div>

          <div className="flex font-light text-xs md:text-sm items-center justify-end">
            <UilWind size={30} className="mr-1" />
            <p className="text-xs md:text-sm">
              Wind: <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>{" "}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-1 md:space-x-2 text-white text-sm py-2">
        <UilSun />
        <p className="font-light text-xs md:text-sm ">
          Rise: <span className="text-xs font-medium ml-0 md:ml-1">{formatToLocalTime(sunrise, timezone, "hh:mm a")}</span>
        </p>
        <p className="font-light">|</p>

        <UilSunset />
        <p className="font-light text-xs md:text-sm">
          Set: <span className="text-xs font-medium ml-0 md:ml-1">{formatToLocalTime(sunset, timezone, "hh:mm a")}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowUp />
        <p className="font-light text-xs md:text-sm">
          High: <span className="text-xs font-medium ml-0 md:ml-1">{`${temp_max.toFixed()}º`}</span>
        </p>
        <p className="font-light">|</p>

        <UilArrowDown />
        <p className="font-light text-xs md:text-sm">
          Low: <span className="text-xs  font-medium ml-0 md:ml-1">{`${temp_min.toFixed()}º`}</span>
        </p>
        <p className="font-light">|</p>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
