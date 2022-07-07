import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function Input({ setQuery, units, setUnits }) {
  const [city, setCity] = useState("");
  const handleUnitsChange = (e) => {
    const selectedUnit = e.target.name;
    if (units !== "") {
      setUnits(selectedUnit);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({ lat, lon });
      });
    }
  };

  console.log("units",units)
  return (
    <div className="flex flex-row justify-center my-6">
      <form onSubmit={handleSubmit} className="flex flex-row w-3/4 items-center justify-center space-x-3">
        <input
          value={city}
          type="text"
          onChange={(e) => setCity(e.target.value)}
          className="text-sm sm:text-xl font-light rounded p-2 w-full shadow-xl focus:outline-none capitalize"
          placeholder="search..."
        />

        <UilSearch size={35} className="text-white cursor-pointer transition ease-in-out hover:scale-125" />

        <UilLocationPoint size={35} className="text-white cursor-pointer transition ease-in-out hover:scale-125" onClick={handleLocationClick} />
      </form>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button name="metric" className="text-sm sm:text-lg text-white font-light transition ease-in-out hover:scale-125" onClick={handleUnitsChange}>
          ºC
        </button>
        <p className="text-lg text-white mx-1">|</p>
        <button name="imperial" className="text-sm sm:text-lg text-white font-light transition ease-in-out hover:scale-125" onClick={handleUnitsChange}>
          {" "}
          ºF
        </button>
      </div>
    </div>
  );
}

export default Input;
