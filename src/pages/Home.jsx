
import styled from 'styled-components'
import MainWeather from '../components/MainWeather'
import Forecast from '../components/Forecast'
import Chart from '../components/Chart'
import { useState, useEffect} from 'react'
import ChartOptions from '../components/ChartOptions'
import AirPollution from '../components/AirPollution'
import Search from '../components/Search'
import { convertToDate, setParams, getDescription, getIcon, organizeForecast} from '../util'
import EQ from '../components/EQ'
import { organizeChartData } from '../util'
function Home() {
  const apiKey = '84429d8bd53868d74b82e32554f8ba8f'
  const [geoLocation, setGeolocation]= useState(null);
  const [currentWeather, setCurrentWeather]= useState(null);
  const [foreCastWeather, setForecastWeather] = useState(null);
  const [dataHourly, setDataHourly] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [specifier, setSpecifier] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(success, error);
  },[])
  useEffect(()=>{
    if (geoLocation) {
      fetchCurrentWeather(geoLocation[0],geoLocation[1]);
    }
  }, [geoLocation])
  const success=(position)=>{
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    setGeolocation([lat, long])
  }
  const error=(e)=>{
    //window.alert('There was a problem geolocating your device');
    setLoadingScreen(false);
    throw new Error(e);
    

  }

  const getNameByReverseGeoCoding = async(lat,lon)=>{
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=10&appid=${apiKey}`)
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      console.log(data);
      return [data[0].name, data[0].country]
    }
    catch(e) {
      throw new Error(e)
    }
  }
  const fetchCurrentWeather = async(lat ,lon)=>{
    const [cityName, countryName] = await getNameByReverseGeoCoding(lat,lon);
    const queryString = setParams(lat,lon)
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${queryString}`)
      if (!response.ok) {
        throw new Error(response);
      }
      const data = await response.json();
      const description = getDescription(data.current.weather_code)
      const icon = getIcon(description, data.current.is_day)
      const date = convertToDate(data);
      setDataHourly([data.hourly, data.hourly_units]);
      setCurrentWeather({data: data.current, units: data.current_units, name: cityName,country: countryName, date: date, description:description, icon:icon});
      const foreCastDaily = organizeForecast(data.hourly, data.hourly_units, cityName, date.hours(), countryName);
      setForecastWeather(foreCastDaily);
      const chartData = organizeChartData(data.hourly, data.hourly_units, date);
      setChartData(chartData)
      setLoadingScreen(false);
      
    }
    catch(e) {
      throw new Error(e);
    }
  }
  const receiveForeCastData = (data)=>{
    setCurrentWeather(data);
    if (dataHourly) {
      const chartData = organizeChartData(dataHourly[0], data.units, data.date);
      setChartData(chartData)
    }
  }
  const receiveDataByCity = (data)=>{
    setGeolocation(data);
  }
  const receiveChartSpecifier = (data)=>{
    setSpecifier(data);
  }
  return (
    <HomeContainer className={loadingScreen? 'shut': ''}>

      <Search sendDataByCity={receiveDataByCity}/>
      <LoadingContainer className={loadingScreen?'active': ''}>
         <img src="https://github.com/KarimSaliev/weather/blob/main/src/assets/loading.png?raw=true" alt="" />
       </LoadingContainer>
      <UpperContainer className={loadingScreen? 'shut': ''}>
      
        
      
     

        {!loadingScreen&&(
              <>
                  <MainWeather currentWeather={currentWeather}/>
                
          
                  <EQ geoData={geoLocation} />
             
               
                  <AirPollution geoData={geoLocation}/>
              </> 
            )}
        
      </UpperContainer>
      <MiddleContainer className={loadingScreen? 'shut': ''}>
      <Forecast foreCastWeather={foreCastWeather} sendForeCastData={receiveForeCastData}/>
      </MiddleContainer>
      <BottomContainer className={loadingScreen?'shut':''}>
        <Chart chartData = {chartData} specifier={specifier}/>
        <ChartOptions sendChartSpecifier={receiveChartSpecifier}/>
      </BottomContainer>
    </HomeContainer>

  )
}

export default Home

const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8rem 2rem 5rem 2rem;
    transition: 1s ease-in;
    &.shut {
      height: 0;
    }
    @media (max-width:700px) {
      padding: 8rem 1rem 5rem 1rem;
    }
    `

const UpperContainer = styled.div`
  display: flex;
  width: 100%;
  height: 400px;
  justify-content: space-between;
  background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  margin-bottom: 1.5rem;
  padding: 1rem;
  &.shut {
    opacity: 0;
  }
  @media (max-width: 700px) {
    flex-direction: column;
    overflow-y: auto;
    overflow-x: hidden;
    align-items: center;
    padding-top: 0;
    padding: 2rem;
    margin-bottom: 1rem;
    & > * {
    flex: 0 0 auto; 
  }
  }
 
 `


const MiddleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 200px;
  background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  margin-bottom: 1.5rem;
  padding: 0 1rem 0 1rem;
  &.shut {
    opacity: 0;
  }
  @media (max-width: 700px) {
    height: 140px;
    margin-bottom: 1rem;
  }
  @media (max-width: 530px) {
    height: 110px;
  }
  @media (max-width: 400px) {
  height: 90px;

 }
`
const BottomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 500px;
  background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
  border-radius: 15px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 30px;
  padding: 1rem;
  justify-content: space-between;
  &.shut {
    opacity: 0;
  }
 @media (max-width:700px) {
  flex-direction: column;
 }
 @media (max-width: 500px) {
  height: 400px;
  
 }
  `


const LoadingContainer = styled.div`
    @keyframes rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
    opacity: 0;
    transition: 2s ease-out;
    z-index: -1;
    height: 100vh;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    img {
      object-fit: cover;
      width: 50%;
    }
    &.active {
      opacity: 1;
      z-index: 999;
      animation: rotate 2s linear infinite;
    }
`
  