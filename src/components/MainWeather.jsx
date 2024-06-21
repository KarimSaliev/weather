import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { WiHumidity,} from "react-icons/wi";
import { GiThink, GiWindSlap, GiRaining} from "react-icons/gi";
import { BsSpeedometer, BsFillCloudSnowFill} from "react-icons/bs";
import { FaWater, FaCompass } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { IoRainy } from "react-icons/io5";
function MainWeather({currentWeather}) {
  
  return(

  
      
       <MainWeatherContainer>
        {!currentWeather &&(
          <h4>There was a problem fetching geolocation, please enter a city instead</h4>
        
        )}
          {currentWeather&&(
        <>
        <i><FontAwesomeIcon icon={currentWeather.icon} fade/></i>
      <CityData>
        <span>{currentWeather.name}, {currentWeather.country}</span>
        <p>{currentWeather.date.format('D')} {currentWeather.date.format('MMMM')}, {currentWeather.date.year()}</p>
      </CityData>
      <h2> {currentWeather.data.temperature_2m} {currentWeather.units.temperature_2m}</h2>
      <h3>{currentWeather.description}, {currentWeather.data.is_day===1? 'Day':'Night'}</h3>
      <h3>{currentWeather.date.format('dddd')}</h3>
      <AddInfoContainer>
        <ul>
          <li>
            <WiHumidity />
            <span>Humidity</span>
            <span>{currentWeather.data.relative_humidity_2m} {currentWeather.units.relative_humidity_2m}</span>
          </li>
          <li>
            <GiThink />
            <span>Feels like</span>
            <span>{currentWeather.data.apparent_temperature} {currentWeather.units.apparent_temperature}</span>
          </li>
     
          <li>
            <BsSpeedometer />
            <span>Pressure</span>
            <span>{currentWeather.data.surface_pressure} {currentWeather.units.surface_pressure}</span>
          </li>
        
          <li>
            <FaWater />
            <span>SL Pressure</span>
            <span>{currentWeather.data.pressure_msl} {currentWeather.units.pressure_msl}</span>
          </li>
          <li>
            <FiWind />
            <span>Wind Speed</span>
            <span>{currentWeather.data.wind_speed_10m} {currentWeather.units.wind_speed_10m}</span>
          </li>
          <li>
            <FaCompass />
            <span>Wind Direction</span>
            <span>{currentWeather.data.wind_direction_10m} {currentWeather.units.wind_direction_10m}</span>
          </li>
          <li>
            <GiWindSlap />
            <span>Wind Gusts</span>
            <span>{currentWeather.data.wind_gusts_10m} {currentWeather.units.wind_gusts_10m}</span>
          </li>
          <li>
            <IoRainy />
            <span>Rain</span>
            <span> {currentWeather.data.rain} {currentWeather.units.rain}</span>
          </li>
          <li>
            <GiRaining />
            <span>Showers</span>
            <span>{currentWeather.data.showers} {currentWeather.units.showers}</span>
          </li>
          <li>
          <BsFillCloudSnowFill />
            <span>Snowfall</span>
            <span>{currentWeather.data.snowfall} {currentWeather.units.snowfall}</span>
          </li>
     
        </ul>
      </AddInfoContainer>
        </>
         )}
    </MainWeatherContainer>
     
     
  
  )
}

export default MainWeather
const MainWeatherContainer = styled.div`
  width: 50%;
  height: 100%;
  background: linear-gradient(rgb(90, 0, 150),rgba(255, 255, 255, 0.2));
  border-radius: 30px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-left: 2rem;
  color: white;
  margin-right: 1rem;
  overflow: hidden;
  i {
    position: absolute;
    right: 10%;
    font-size: 8em;
  }
  h2 {
    font-size: 3em;
  }
  h3 {
    font-size: 1.5em;
  }
  @media (max-width:1100px) {
    h2 {
      font-size: 2.5em;
    }
    h3 {
      font-size: 1em;
    }
    i {
      font-size: 6em;
    }
  }
  @media (max-width:900px) {
    h2 {
      font-size: 2em;
    }
    h3 {
      font-size: 0.8em;
    }
    i {
      font-size: 5em;
    }
    h4 {
      font-size: 0.8em;
    }
  }
  @media (max-width:700px) {
    border: 1px solid grey;
    margin-bottom: 1.2rem;
    margin-right: 0;
    width: 100%;
  }
 

`
const CityData = styled.div`
  height: 50px;
  width: 210px;
  border-radius: 0 0 30px 0;
  background-color: rgba(68,55,119,255);
  border-bottom-right-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1em;
  span {
    &:first-child {
      padding-left: 2rem;
    }
  }
  p {
    font-size: 0.8em;
    align-self: flex-start;
  }
  @media (max-width: 900px) {
    width: 70%;
    height: 40px;
  }
 
  @media (max-width: 800px) {
    width: 100%;
    border-radius: 0;
  }
  @media (max-width: 750px) {
    span {
      font-size: 0.9em;
    }
    p {
      font-size: 0.7em;
    }
  }
  justify-content: space-between;
  p {
    margin-right: 2rem;
  }
 
 `
const AddInfoContainer = styled.div`
    width: 100%;
    height: 80px;
    border-top: 1px solid white;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    overflow-x: auto;
    border-radius: 0 0 30px 30px;
    &::-webkit-scrollbar {
        display: none;
      }
    ul {
      list-style: none;
      display: flex;
      background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
      border-radius: 0 0 15px;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        
        width: 90px;
        :first-child {
          font-size: 2em;
        }
        span {
          font-size: 0.6em;
        }
      }
    }
    @media (max-width: 900px) {
      height: 70px;
    }
    @media (max-width:750px) {
      height: 60px;
      ul {
        li {
        :first-child {
          font-size: 1.5em;
        }
        span {
          font-size: 0.5em;
        }
      }
      }
      
    }
   
`


