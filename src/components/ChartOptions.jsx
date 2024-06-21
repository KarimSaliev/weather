import React, {useState, useEffect}from 'react'
import styled from 'styled-components'
function ChartOptions({sendChartSpecifier}) {
  const [active, setActive] = useState('temp');
  const handleClick =(specifier)=>{
    sendChartSpecifier(specifier);
    setActive(specifier);
  }
  useEffect(()=>{
    if (active) {
      sendChartSpecifier(active);
    }
  },[active])
  return (
    <ChartOptionsContainer>
      <ul>
        <li onClick={()=>{handleClick("temp")}} className={active==='temp'? 'active': ''}>
          <h3>Temperature Chart</h3>
        </li>
        <li onClick={()=>{handleClick("cloud")}} className={active==='cloud'? 'active': ''}>
          <h3>Cloud Chart</h3>
        </li>
        <li onClick={()=>{handleClick("snow_depth")}} className={active==='snow_depth'? 'active': ''}>
          <h3>Snow Depth</h3>
        </li>
        <li onClick={()=>{handleClick("pressure")}} className={active==='pressure'? 'active': ''}>
          <h3>Pressure</h3>
        </li>
        <li onClick={()=>{handleClick("snowfall")}} className={active==='snowfall'? 'active': ''}>
          <h3>Snowfall</h3>
        </li>
        <li onClick={()=>{handleClick("wind_direction")}} className={active==='wind_direction'? 'active': ''}>
          <h3>Wind direction</h3>
        </li>
        <li onClick={()=>{handleClick("rain")}} className={active==='rain'? 'active': ''}>
          <h3>Rain</h3>
        </li>
        <li onClick={()=>{handleClick("wind")}} className={active==='wind'? 'active': ''}>
          <h3>Wind</h3>
        </li>
        <li onClick={()=>{handleClick("visibility")}} className={active==='visibility'? 'active': ''}>
          <h3>Visibility</h3>
        </li>
        
      </ul>
    </ChartOptionsContainer>
  )
}

export default ChartOptions

const ChartOptionsContainer = styled.div`
    height: 100%;
    width: 30%;
    background: linear-gradient(135deg, rgba(83, 66, 167, 255), rgba(138, 113, 164, 255));
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    ul {
      color: white;
      list-style: none;
      padding-left: 0;
      width: 100%;
      height: 100%;
      border-radius: 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content:flex-start;
      overflow-y: auto;
      li {
        width: 90%;
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 30px;
        background: linear-gradient(to right, rgb(90, 0, 150) 60%, rgba(255, 255, 255, 0.2) 100%);
        text-align: center;
        transition: 0.3s ease-in-out;
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: linear-gradient(to right, rgb(90, 0, 150) 5%, rgba(255, 255, 255, 0.2) 100%);
          background-color: white;
          h3 {
            color: #410041;
            transition: transform 0.3s ease-in-out;
            transform: scale(1.2);
          }
        }
      }
    }
    @media (max-width:900px) {
      li {
        h3 {
          font-size: 1.8vw;
        }
      }
    }
    @media (max-width: 750px) {
      ul {
        li {
        padding: 0.5rem;
        h3 {
          font-size: 1.6vw;
        }
      }
      justify-content: center;
      }
      
    }
    @media (max-width: 700px) {
      width: 100%;
      order: -1;
      height: 15%;
      margin-bottom: 1rem;
      border-radius: 15px;
      ul {
        overflow-x: auto;
        overflow-y: hidden;
        flex-direction: row;
        justify-content: flex-start;
        li {
          border-radius: 10px;
          height: 75%;
          display: flex;
          align-items: center;
          padding: 0.7rem;
          h3 {
            width: 100px;
          }
        }
      }
    }
    @media (max-width:500px) {
      ul {
        li {
          h3 {
            width: 70px;
          }
        }
      }
    }`
