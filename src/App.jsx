import { useEffect, useState } from 'react'
import { Container, Header, Content} from 'rsuite';
import {getCoordinates, fetchWeatherData} from "./api"
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState(null);
  const [city, setCity] = useState("Stockholm");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const fetchData = async(city) => {
    await getData(city)
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchData(city)
  }, [city]); 
  
  const getData = async (city) => {
      const coordinates = await getCoordinates(city);
      if (coordinates) {
        const data = await fetchWeatherData(coordinates.latitude, coordinates.longitude);
        if (data) {
          setCurrentWeather({
            city: coordinates.name,
            temperature: data.current.temperature,
            time: data.current.time,
            weatherCode: data.current.weatherCode
          });
          setDailyWeather({
            temperature: data.daily.temperature,
            time: data.daily.time,
            weatherCode: data.daily.weatherCode,
          });
        }
      }
      // show something if wasn't able to fetch the data
  };

  
  const handleSearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <Container style={{
      display: "flex", 
      flexDirection: "column",
      minWidth: "320px",
      minHeight: "100vh",
      color: "#FFFFFF",
      marginTop:"30px"
      }}>
        <Header style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"}}>
          <SearchBar onSearch={handleSearch} isMobile={isMobile}/>
        </Header>
        <Content>
        {currentWeather && (
          <>
            <CurrentWeather weather={currentWeather} isMobile={isMobile}/>
            <Forecast forecast={dailyWeather}  isMobile={isMobile}/>
          </>
        )}
        </Content>
    </Container>
  )
}

export default App;
