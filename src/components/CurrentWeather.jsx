import React from "react";
import { Container, Panel } from "rsuite";
import { getWeatherImage } from "../helpers/wmoCodes";

const CurrentWeather = ({weather, isMobile}) => {  
  const {weatherCode, temperature, city, time } = weather;
  const image = getWeatherImage(weatherCode);

  return (
    <Panel style={styles.panel}>
       <div style={styles.div(isMobile)} >
        <img src={`/assets/${image}`} 
        alt="Weather Icon" 
        style={styles.image}/>
        <Container style={styles.container(isMobile)}>
          <h1 style={{ ...styles.zeroMargin, ...styles.h1 }}>{Math.round(temperature)} °C</h1>
          <h2 style={{ ...styles.zeroMargin, ...styles.h1}}>{city}</h2>
          <p style={{ ...styles.zeroMargin, ...styles.p}}>{time}</p>
        </Container>
    </div>
    </Panel>
  ) 
};

export default CurrentWeather;

const styles = {
  panel: { 
    textAlign: "left", 
    marginBottom: "40px"
  },
  div: (isMobile) => ({
    display: "flex",
    flexDirection: isMobile ? "column" : "row", 
    alignItems: "center",
    justifyContent: "flex-start" 
  }),
  image: {
    width: "140px", 
    height: "140px"
  },
  container: (isMobile) => ({
    marginLeft: isMobile ? "20px" : "40px",
    marginBottom: isMobile ? "0" : "15px",
  }),
  h1: {
    fontSize: "44px", 
    margin: "0"
  },
  h2: {
    fontSize: "28px", 
    margin: "0"
  },
  p: {
    fontSize: "16px", 
  },
  zeroMargin: {
      margin: "0px"
  }
  }