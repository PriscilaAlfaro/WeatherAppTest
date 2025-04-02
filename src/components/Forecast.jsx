import React from "react";
import { Container, Divider, FlexboxGrid, List } from "rsuite";
import { getWeatherImage } from "../helpers/wmoCodes";

const Forecast = ({ forecast, isMobile }) => {
  const forecastData = forecast.temperature.map((temperature, index) => ({
    time: forecast.time[index],
    temperature: temperature,
    weatherCode: forecast.weatherCode[index],
  }));

  return <>{isMobile ? <MobileView forecastData={forecastData} /> : <WebView forecastData={forecastData} />}</>
};

const MobileView = ({forecastData}) => {
  return (
    <List bordered divider>
    {forecastData.map((dayData) => {
      const image = getWeatherImage(dayData.weatherCode);
      return (
        <>
          <Divider style={styles.divider}/>

          <List.Item key={dayData.time} style={styles.listItem}>
              <img src={`/assets/${image}`} alt="Weather" width={64} />
              
              <Container style={styles.container}>
              <p style={styles.mobileP}>{dayData.time} </p>
              <strong style={styles.strong}>{`${dayData.temperature} °C`}</strong>
              </Container>

          </List.Item>
      </>)
    })}
  </List>
  )
}

const WebView = ({forecastData}) => {
  return (
    <>
    <Divider vertical style={{...styles.divider, ...styles.dividerMargin}}/>
    <FlexboxGrid justify="center" style={styles.flexBoxGrid}>

    {forecastData.map((dayData) => {
      const image = getWeatherImage(dayData.weatherCode);
      return (
        <FlexboxGrid.Item
        key={dayData.time} 
          colspan={4}
          style={styles.flexBoxGridItem}>

          <img src={`/assets/${image}`} alt="Weather" width={64} />
          <p style={styles.webP}>{dayData.time}</p>
          <strong style={styles.strong}>{`${dayData.temperature} °C`}</strong>
        </FlexboxGrid.Item>
      );
    })}
  </FlexboxGrid>
  </>
  )
}

export default Forecast;

const styles= {
  divider: {
    border: "0.2px solid #FFFFFF"
  },
  listItem: {
    margin: "20px",
    height: "54px", 
    display: "flex",
  },
  container: {
    display: "flex", 
    justifyContent:"space-between", 
    alignItems: "center", 
    width:"100%", 
    padding: "0 4px 0 4px"
  },
  mobileP: {
    fontSize: "16px"
  },
  strong: {
    fontSize: "20px"
  },
  dividerMargin: {
    marginBottom: "10px"
  },
  flexBoxGrid: { 
    display: "flex", 
    flexWrap: "wrap", 
  },
  flexBoxGridItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "10px",
  },
  webP: { 
    fontSize: "16px", 
    margin: "10px 0" 
  }
}