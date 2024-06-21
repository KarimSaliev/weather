import React, {useState, useEffect}from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLungs } from '@fortawesome/free-solid-svg-icons';
import { setParamsForAirQuality } from '../util';
import { GiEuropeanFlag, GiUsaFlag } from "react-icons/gi";
function AirPollution({geoData}) {
  const [airQData, setAirQData] = useState(null);
  useEffect(()=>{
    if (geoData) {
      fetchAirPollutionData(geoData[0],geoData[1]);
    }
  }, [geoData]);
  const fetchAirPollutionData = async(lat, lon)=>{
    const queryString = setParamsForAirQuality(lat,lon)
    try {
      const response = await fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?${queryString}`)
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      setAirQData(data);
      
    }
    catch(e) {
      throw new Error(e);
    }
  }
  return (
    <AirPollutionContainer>
      <Header>
      <h2>Air Quality Stats <i><FontAwesomeIcon icon={faLungs}/></i></h2>
      </Header>
      {airQData&&(
         <AirPollutionContent>
         <AQI>
          <h4><GiEuropeanFlag />AQI: {airQData.current.european_aqi}</h4><h4><GiUsaFlag />AQI: {airQData.current.us_aqi}</h4>
         </AQI>
         <span>Aerosol Optical Depth: {airQData.current.aerosol_optical_depth}</span>
          <span>Alder Pollen: {airQData.current.alder_pollen}</span>
          <span>Ammonia (NH₃): {airQData.current.ammonia}</span>
          <span>Birch Pollen: {airQData.current.birch_pollen}</span>
          <span>Carbon Monoxide (CO): {airQData.current.carbon_monoxide}</span>
          <span>Dust: {airQData.current.dust}</span>
          <span>Grass Pollen: {airQData.current.grass_pollen}</span>
          <span>Interval: {airQData.current.interval}</span>
          <span>Mugwort Pollen: {airQData.current.mugwort_pollen}</span>
          <span>Nitrogen Dioxide (NO₂): {airQData.current.nitrogen_dioxide}</span>
          <span>Olive Pollen: {airQData.current.olive_pollen}</span>
          <span>Ozone (O₃): {airQData.current.ozone}</span>
          <span>PM2.5: {airQData.current.pm2_5}</span>
          <span>PM10: {airQData.current.pm10}</span>
          <span>Ragweed Pollen: {airQData.current.ragweed_pollen}</span>
          <span>Sulphur Dioxide (SO₂): {airQData.current.sulphur_dioxide}</span>
          <span>UV Index Clear Sky: {airQData.current.uv_index_clear_sky}</span>

         </AirPollutionContent>
      )}
    </AirPollutionContainer>
  )
}

export default AirPollution

const AirPollutionContainer = styled.div`
    position: relative;
    width: 30%;
    height: 100%;
    border-radius: 30px;
    background-image: url('https://images.unsplash.com/photo-1529958986175-1cacd1317691?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlyfGVufDB8fDB8fHww');
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: auto;
    @media(max-width: 700px) {
      width: 100%;
      border: 1px solid grey;
    }
   
    `
const Header = styled.div`
  background-color: rgba(68,55,119,255);
  border-bottom-right-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  width: 80%;
  height: 50px;
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  h2 {
    color: white;
    font-size: 1.2em;
    margin: 0.5rem 0 0.5rem 1rem;

  }
  @media (max-width:1100px) {
    h2 {
      font-size: 0.8em;
    }
  }
  @media (max-width: 900px) {
    height: 40px;
  }
  @media (max-width: 800px) {
    width: 100%;
    border-radius: 0;

  }
  
 
  

`
const AirPollutionContent = styled.div`
  background-color: rgba(231, 32, 234, 0.42);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 30px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  padding: 1rem;
  height: 100%;
  padding-top: 3.5rem;
  span {
    font-size: 0.9em;
    text-shadow: 1px 1px 10px black;
  }
  @media (max-width: 900px) {
    span {
      font-size: 0.7em;
    }
  }
  @media (max-width: 800px) {
    span {
      font-size: 0.6em;
    }
  }
  @media (max-width:730px) {
    span {
      font-size: 1.3vw;
    }
  }
  @media (max-width: 700px) {
    align-items: center;
    span {
      font-size: 2.5vw;
    }
  }
 `

const AQI = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  
  h4 {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 900px) {
    h4 {
      font-size: 0.9em;
    }
  }
  @media (max-width: 800px) {
    h4 {
      font-size: 0.7em;
    }
  }
  @media (max-width: 700px) {
    h4 {
      font-size: 5vw;
    }
  }

 `