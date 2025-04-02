import React from "react";
import { Container, Panel } from "rsuite";
import { getWeatherImage } from "../helpers/wmoCodes";

const CurrentWeather = ({weather, isMobile}) => {  
  const {weatherCode, temperature, city, time } = weather;
  const image = getWeatherImage(weatherCode);

  return (
    <Panel style={{ textAlign: "left", marginBottom: "40px"}}>
       <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row", 
          alignItems: "center",
          justifyContent: "flex-start" }} >
        <img src={`/assets/${image}`} 
        alt="Weather Icon" 
        style={{width: "140px", 
        height: "140px"}}/>
        <Container style={{
          marginLeft: isMobile ? "20px": "40px",  
          marginBottom: isMobile ? "0" : "15px",}}>
          <h1 style={{fontSize: "44px", margin: "0"}}>{Math.round(temperature)} °C</h1>
          <h2 style={{fontSize: "28px", margin: "0"}}>{city}</h2>
          <p style={{fontSize: "16px", margin: "0px"}}>{time}</p>
        </Container>
    </div>
    </Panel>
  ) 
};

export default CurrentWeather;
