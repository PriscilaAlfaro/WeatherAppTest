import { fetchWeatherApi } from 'openmeteo';
import {formatDate} from "./helpers/formatting";
	
const meteoBaseUrl = "https://api.open-meteo.com";
const geoCodingBaseUrl = "http://geocoding-api.open-meteo.com";

export async function getCoordinates(city) {
  try {
    const response = await fetch(
      `${geoCodingBaseUrl}/v1/search?name=${city}&count=10&language=en&format=json`
    );
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const { latitude, longitude, name } = data.results[0];
        return { latitude, longitude ,name };
    } else {
      throw new Error("No results found for the given city");
    }
  } catch (error) {
    console.error("Geocoding error:", error.message);
    return null;
  }
}

export async function fetchWeatherData(latitude, longitude){
  const params = {
    latitude,
    longitude,
    daily: ["temperature_2m_max", "temperature_2m_min", "weather_code"],
    current: ["temperature_2m", "weather_code"]
  };
  
  try {
    const responses = await fetchWeatherApi(`${meteoBaseUrl}/v1/forecast`, params);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const current = response.current();
    const daily = response.daily();
    
    const dailyMaxTemps = daily.variables(0).valuesArray();
    const dailyMinTemps = daily.variables(1).valuesArray();
    
    const averageTemperature = dailyMaxTemps.map((maxTemp, i) => 
      Math.round((maxTemp + dailyMinTemps[i]) / 2)
    );
    
    const weatherData = {
      current: {
        time: formatDate(new Date((Number(current.time()) + utcOffsetSeconds) * 1000), true),
        temperature: Math.round(current.variables(0).value()),
        weatherCode: current.variables(1).value(),
      },
      daily: {
        weatherCode: skipFirst(Array.from(daily.variables(0).valuesArray())),
        temperature: skipFirst(Array.from(averageTemperature)),
        time: skipFirst(range(Number(daily.time()), Number(daily.timeEnd()), daily.interval())
                .map(t => formatDate(new Date((t + utcOffsetSeconds) * 1000)))),
      }
    };
    return weatherData;
  } catch (error) {
    console.error("Weather API error:", error.message);
    return null;
  }
};



const range = (start, stop, step) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

// Needed to remove today's data
const skipFirst = (arrayValues) =>
    arrayValues && arrayValues.slice(1)


