export async function fetchLatLong(location) {
  if (typeof location !== 'string') {
    return Promise.reject(new Error('Invalid location'));
  }

  return Promise.resolve({ latitude: 40.045592, longitude: -86.008596 });

  // return fetch(`/api/v1/lat-long?location=${location}`)
  //   .then(res => {
  //     if (res.status !== 200) {
  //       return Promise.reject(new Error('Unknown error, please try again'));
  //     }

  //     return res.json();
  //   });
}
