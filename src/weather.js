import { apiKey } from './env';

const weatherImage = {
  clear: ['0-Clear.png', 'yosemite-0.jpg'],
  clouds: ['1-Clouds.png', 'yosemite-1.jpg'],
  drizzle: ['2-Drizzle.png', 'yosemite-2.jpg'],
  rain: ['3-Rain.png', 'yosemite-2.jpg'],
  thunderstorm: ['4-Thunderstorm.png', 'yosemite-2.jpg'],
  snow: ['5-Snow.png', 'yosemite-3.jpg'],
  mist: ['6-Mist.png', 'yosemite-4.jpg'],
  fog: ['7-Fog.png', 'yosemite-4.jpg'],
  haze: ['8-Haze.png', 'yosemite-4.jpg'],
};

const getWeather = async (location) => {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw new Error(`City ${location} not found`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getTimeByOffset = (offset) => {
  const date = new Date(new Date().getTime() + offset * 1000);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const string = `${month + 1} ${day} ${year} ${hours}:${minutes}:${seconds}`;
  return string;
};

const convertData = (data) => {
  const title = `${data.name}, ${data.sys.country}`;
  const des = `${data.main.temp}°C ${data.weather[0].description}`;
  const images = weatherImage[data.weather[0].main.toLowerCase()]
    ? weatherImage[data.weather[0].main.toLowerCase()]
    : weatherImage[0];
  const date = new Date(getTimeByOffset(data.timezone));
  const timeOffset = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const time = `Local Time: ${timeOffset}`;
  return { title, des, time, icon: images[0], bg: images[1] };
};
export { getWeather, getTimeByOffset, convertData };
