import React, {useState, useEffect}from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Forecast({foreCastWeather, sendForeCastData}) {
  const [active, setActive] = useState(0);
  const handleClick = (index)=>{
    sendForeCastData(foreCastWeather[index])
    setActive(index);
  }
  return (
    <>
    {foreCastWeather&&(
       <ForecastContainer>
        {foreCastWeather.map((day,index)=>{
          return (
            <ul>
           <li key={index} onClick={()=>{handleClick(index)}} className={active===index?'active':''}>
             <h2>{day.data.temperature_2m} {day.units.temperature_2m}</h2>
             <p>{day.date.format('dddd')}</p>
             <i><FontAwesomeIcon icon={day.icon}/></i>
             <p>{day.date.format('D')} {day.date.format('MMMM')}</p>
           </li>
           </ul>
          )
           
        })}
</ForecastContainer>

      )}
  
     
    </>
    
  )
};


export default Forecast

const ForecastContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  overflow-x: auto;
  justify-content: center;
  ul {
    display: flex;
    list-style: none;
    padding-left: 0;
    &::-webkit-scrollbar {
        display: none;
      }
  }
  li {
    height: 150px;
    width: 150px;
    background: linear-gradient(rgb(90, 0, 150),rgba(255, 255, 255, 0.2));
    margin: 1rem;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    transition: 0.3s ease-in-out;
    padding: 0.7rem;
    &:hover {
      cursor: pointer;
    }
    &.active {
      background-color: white;
      color: #410041;
      transform: scale(1.1);
    }
  h2 {
    font-size: 1.8em;
  }
  p {
    font-size: 1.5em;
    &:last-child {
      font-size: 1.2em;
      align-self: flex-end;
    }
  }
  i {
    font-size: 2em;
  }

  }
  @media (max-width: 900px) {
    li {
      height: 120px;
      width: 120px;
      h2 {
        font-size: 1.2em;
      }
      p {
        font-size: 1em;
        &:last-child {
          font-size: 0.8em;
        }
      }
      i {
        font-size: 1.5em;
      }
    }
  }
  @media (max-width: 700px) {
    li {
      height: 100px;
      width: 100px;
      h2 {
        font-size: 1em;
      }
      p {
        font-size: 0.8m;
        &:last-child {
          font-size: 0.5em;
        }
      }
      i {
        font-size: 1.2em;
      }
    }
  }
  @media (max-width: 530px) {
    li {
      height: 80px;
      width: 80px;
      h2 {
      font-size: 0.9em;
    }
    p {
      font-size: 0.6em;
      &:last-child {
          font-size: 0.4em;
        }
    }

    }
   
  }
  @media (max-width: 400px) {
    li {
      height: 70px;
      width: 70px;
      h2 {
      font-size: 0.7em;
    }
    p {
      font-size: 0.5em;
      &:last-child {
          font-size: 0.3em;
        }
    }

    }
   
  }
  `
