import "./App.css";
import TopButton from "./components/TopButton.jsx";
import Input from "./components/Input";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
// import getWeatherData from "./services/weatherService";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "vietnam" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((weatherData) => {
        setWeather(weatherData);
      });
    };
    fetchWeather();
  }, [query, units]);
  console.log(weather);

  const formatBackground = () => {
    if (!weather) return "from-sky-400 to-blue-500";

    const thresholdMetric = units === "metric" ? 25 : 60;
    const thresholdImperial = units === "imperial" ? 77 : 140;

    if (units === "imperial" && weather.temp <= thresholdImperial) {
      return "from-sky-400 to-blue-500";
    } else if (units === "metric" && weather.temp <= thresholdMetric) {
      return "from-sky-400 to-blue-500";
    } else {
      return "from-yellow-600 to-red-600";
    }
  };

  return (
    <div
      className={`sm:mx-auto max-w-screen-sm lg:max-w-screen-lg mt-4 py-4 px-2 sm:px-5 bg-gradient-to-r from-sky-400 to-blue-500
      h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButton setQuery={setQuery} />
      <Input setQuery={setQuery} units={units} setUnits={setUnits} />
      {weather && ( //nếu như weather được set, không phải giá trị null thì sẽ load ra phần bên dưới
        <div>
          {" "}
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />
          <Forecast title="Hourly Forecast" items={weather.hourly} />
          <Forecast title="Daily Forecast" items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
