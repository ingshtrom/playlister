export function fetchWeather(location, date) {
  if (typeof location !== 'string') {
    return Promise.reject(new Error('Invalid location'));
  }

  return fetch(`/api/weather?l=${location}&d=${date}`)
    .then(res => {
      if (res.status !== 200) {
        return Promise.reject(new Error('Unknown error, please try again'));
      }

      return res.json();
    });
}
