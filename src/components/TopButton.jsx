import React from "react";

function TopButton({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: "Vietnam",
    },
    {
      id: 2,
      title: "French",
    },
    {
      id: 3,
      title: "America",
    },
    {
      id: 4,
      title: "Singapore",
    },
    {
      id: 5,
      title: "Tokyo",
    },
  ];
  return (
    <div
      className="flex items-center justify-around my-4
    "
    >
      {cities.map((city) => {
        return (
          <button
            key={city.id}
            className="text-xs sm:text-lg text-white font-medium"
            onClick={() => {
              setQuery({ q: city.title });
            }}
          >
            {city.title}
          </button>
        );
      })}
    </div>
  );
}

export default TopButton;
