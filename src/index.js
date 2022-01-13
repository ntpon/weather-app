import { getWeather, convertData } from './weather';
import { saveLocation, getLocations } from './storage';
const weatherSearch = document.getElementById('weather-search');
const weatherForm = document.getElementById('weather-form');

const weatherInit = document.getElementById('weather-init');
const weatherShow = document.getElementById('weather-show');
const weatherShowCity = document.getElementById('weather-show-city');
const weatherShowStatus = document.getElementById('weather-show-status');
const weatherShowTime = document.getElementById('weather-show-time');
const weatherShowIcon = document.getElementById('weather-show-icon');
const weatherShowBG = document.getElementById('weather-show-bg');
const weatherError = document.getElementById('weather-error');
const weatherLocations = document.getElementById('weather-locations');
const weatherLocationLists = document
  .getElementById('weather-locations')
  .getElementsByTagName('li');

const createLastSearch = (location) => {
  const li = document.createElement('li');
  li.append(location);
  return li;
};

const setLocation = (location) => {
  locations.push(location);
  saveLocation(locations);
  const li = createLastSearch(location);
  weatherLocations.append(li);
};
const locations = getLocations();
locations.forEach((location) => {
  const li = createLastSearch(location);
  weatherLocations.append(li);
});

const setView = async (location) => {
  try {
    const result = await getWeather(location);
    weatherError.style.display = 'none';
    weatherShow.style.display = 'block';
    const { title, des, time, icon, bg } = convertData(result);
    weatherShowCity.textContent = title;
    weatherShowStatus.textContent = des;
    weatherShowTime.textContent = time;
    weatherShowIcon.src = `images/${icon}`;
    weatherShowBG.style.backgroundImage = `url(images/${bg})`;
    if (!locations.includes(location)) setLocation(location);
  } catch (error) {
    weatherShow.style.display = 'none';
    weatherError.style.display = 'block';
    weatherError.getElementsByTagName('h3')[0].textContent = error.message;
  }
  weatherSearch.value = '';
  weatherInit.style.display = 'none';
};

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const location = weatherSearch.value;
  if (!location) return;
  setView(location);
});
for (let li of weatherLocationLists) {
  li.addEventListener('click', (event) => {
    setView(event.target.textContent);
    // setLocation(event.target.va);
  });
}
