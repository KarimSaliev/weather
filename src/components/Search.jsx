import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { capitalizeInput } from '../util'
function Search({sendDataByCity}) {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState('');
  const [options, setOptions] = useState(null);
  const apiKey = '84429d8bd53868d74b82e32554f8ba8f'
  const handleChange = (e) =>{
    setValue(e.target.value);
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    const capCity = capitalizeInput(value);
    fetchDataByCity(capCity);
  }
  const fetchDataByCity = async(name)=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=10&appid=${apiKey}`)
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      const lat = data[0].lat;
      const lon = data[0].lon;
      const options = data.filter(city=>city.name===name);
      setOptions(options);
      if (options.length<=1) {
        sendDataByCity([lat,lon]);
        setActive(false);
      }  
    }
    catch(e) {
      throw new Error(e);
    }
  }
  const handleChosenOption =(index)=>{
    sendDataByCity([options[index].lat, options[index].lon])
    setActive(false);
    setOptions(null);
  }
  return (
    <form onSubmit={(e)=>{handleSubmit(e)}}>
      <SearchContainer className={active? 'active': ''}>
           <OptionsContainer className={options&&options.length>1?'active':''}>
            {options&&(
              <ul>
             {options.map((city,index)=>{
              return(
                <li key={index} onClick={()=>handleChosenOption(index)}>
                <p>{city.name}, {city.country} {city.state ? `, ${city.state}` : ''}</p>
              </li>
              )
              
             })}
           </ul>
            )}
           
         </OptionsContainer>
     
      <ButtonContainer>
        {active && (
           <i><FontAwesomeIcon icon={faSearch}  onClick={()=>{setActive(!active), setOptions(null)}}/></i>
        )}
        {!active && (
          <i><FontAwesomeIcon icon={faSearch} bounce onClick={()=>{setActive(!active),setOptions(null)}}/></i>
        )}
      
      </ButtonContainer>
      <input type="text" placeholder='Enter a city' value={value} onChange={(e)=>handleChange(e)}/>
    </SearchContainer>
    
    </form>
    
  )
}

export default Search

const SearchContainer = styled.div`
    display: flex;
    width: 400px;
    height: 100px;
    background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    position: absolute;
    right: 0;
    z-index: 2;
    border-radius: 0 0 0 20px;
    transform: translateY(-144%);
    transition: 0.5s ease-in-out;
    align-items: center;
    justify-content: center;
    input {
      width: 80%;
      padding: 1rem;
      border-radius: 20px;
      border: none;
      outline: none;
      font-size: 1.1em;
      background-color: white;
      color: purple;
      &::placeholder {
        color: purple;
      }
      &:focus {
        &::placeholder {
        color: white;
      }
      }
    }
    &.active {
      transform: translateY(-44%);
      @media(max-width: 430px) {
        transform: translateY(-56%);
      }
    }
    @media (max-width: 430px) {
      width: 220px;
      height: 80px;
      transform: translateY(-156%);
      input {
        padding: 0.7rem;
        border-radius: 10px;
      }
    }

`
const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 45px;
    background-color: rgba(97,82,151,255);
    position: absolute;
    bottom:-45%;
    right: 0;
    border-radius: 0 0 20px 20px;
    z-index: 1;
    i {
      color: white;
      font-size: 1.1em;
      &:hover {
        cursor: pointer;
      }
    }
    @media (max-width: 430px) {
      bottom: -55%;
    }
`
const OptionsContainer = styled.div`
    width: 80%;
    height: 200px;
    background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
    position: absolute;
    z-index: -1;
    top: 100%;
    border-radius: 0 0 30px 30px;
    transition: 0.5s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0.5rem;
    opacity: 0;
    ul {
      list-style: none;
      padding-left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      flex-direction: column;
      overflow-y: auto;
      li {
        color: white;
        width: 90%;
        border-bottom: 1px solid grey;
        margin: 0.2rem;
        padding: 0.2rem;
        transition: transform 0.3s ease-in-out;
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
          color: #410041;
        }
      }
    }
    &.active {
      opacity: 1;
    }
    @media (max-width: 430px) {
      ul {
        justify-content: flex-start;
        li {
          p {
            font-size: 0.9em;
          }
        }
      }
    }
    
`