import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocation({ weather: { dt, timezone, name, country } }) {
  return (
    <div>
      <div className="flex items-center justify-center my-4">
        <p className="text-white text-sm sm:text-xl font-extralight">{formatToLocalTime(dt,timezone)}</p>
      </div>

      <div className="flex items-center justify-center my-2 ">
        <p className="text-white text-xl sm:text-3xl font-medium">{`${name},${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocation;
