const getLocations = () => {
  const data = JSON.parse(localStorage.getItem('locations'));
  if (!data) return [];
  return data;
};
const saveLocation = (data) => {
  localStorage.setItem('locations', JSON.stringify(data));
};

export { getLocations, saveLocation };
