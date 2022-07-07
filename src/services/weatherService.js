import { DateTime } from "luxon";
const API_KEY = "a362839a41037a877a457d8cf5e0143a";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

// https://api.openweathermap.org/data/2.5/weather?q=vietnam&appid=a362839a41037a877a457d8cf5e0143a&lang=vi&units=metric

// fetch data weather từ api với params infoType
const getWeatherData = (infoType, searchParams) => {
  //tạo url mới dựa vào baseUrl cộng với infoType
  const url = new URL(BASE_URL + "/" + infoType);
  //chạy search params để tìm ra params cần tìm và chèn thêm API_KEY
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });
  // fetch url đó lên server
  return fetch(url).then((res) => res.json()); //trả về kiểu dữ liệu json()
};

//format data
const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt, //day current
    sys: { country, sunrise, sunset,},
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  return { lat, lon, temp, feels_like, temp_min, temp_max, humidity, name, dt, country, sunrise, sunset, details, icon, speed,};
};

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  return { timezone, daily, hourly };
};

/**
 * getFormattedWeatherData():
 * - Lấy data từ getWeatherData()
 * - format lại data bằng formatCurrentWeather()
 * - gán formattedCurrentWeather = giá trị formatCurrentWeather()
 * - bóc tách lat, lon từ formattedCurrentWeather vừa lấy để formattedForecastWeather
 */
const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData("weather", searchParams).then((data) => formatCurrentWeather(data));
  const { lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await getWeatherData("onecall", { lat, lon, exclude: "current,minutely,alerts", units: searchParams.units }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "ccc, dd LLL yyyy' | Local Time: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
