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
          <Divider style={{border: "0.2px solid #FFFFFF"}}/>
          <List.Item key={dayData.time} 
            style={{
              margin: "20px",
              height: "54px", 
              display: "flex",
            }}>
              <img src={`/assets/${image}`} alt="Weather" width={64} />
              <Container style={{
                display: "flex", 
                justifyContent:"space-between", 
                alignItems: "center", 
                width:"100%", 
                padding: "0 4px 0 4px"}}>
              <p style={{fontSize: "16px"}}>{dayData.time} </p>
              <strong style={{fontSize: "20px"}}>{`${dayData.temperature} °C`}</strong>
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
    <Divider vertical style={{border: "0.2px solid #FFFFFF", marginBottom: "10px"}}/>
    <FlexboxGrid justify="center" style={{ display: "flex", flexWrap: "wrap", }}>

    {forecastData.map((dayData) => {
      const image = getWeatherImage(dayData.weatherCode);
      return (
        <FlexboxGrid.Item
        key={dayData.time} 
          colspan={4}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "10px",
          }}
        >
          <img src={`/assets/${image}`} alt="Weather" width={64} />
          <p style={{ fontSize: "16px", margin: "10px 0" }}>{dayData.time}</p>
          <strong style={{ fontSize: "20px" }}>{`${dayData.temperature} °C`}</strong>
        </FlexboxGrid.Item>
      );
    })}
  </FlexboxGrid>
  </>
  )
}

export default Forecast;