const weatherCodes = {
  0: 'sunny.png',
  1: 'sunny.png',
  2: 'partiallyCloud.png',
  3: 'partiallyCloud.png',
  61: 'rainWithStorm.png',
  63: 'rainWithStorm.png',
  65: 'rainWithStorm.png',
  66: 'rainWithStorm.png',
  67: 'rainWithStorm.png',
  80: 'cloudy.png',
  81: 'rainWithStorm.png',
  82: 'rainWithStorm.png',
  85: 'snow-showers-slight.png',
  86: 'snow-showers-heavy.png',
  95: 'rainWithStorm.png',
  100: 'cloud.png'
};

export const getWeatherImage = (code) => {
  const roundedCode = Math.round(code);
  if (weatherCodes[roundedCode]) {
    return weatherCodes[roundedCode]; 
  } else {
    return 'partiallyCloud.png';
  }
};