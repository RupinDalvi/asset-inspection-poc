export function getCurrentPosition(options = { enableHighAccuracy: true }) {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

