import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
function EQ({geoData}) {
  const [earthQuakeData, setEarthQuakeData] = useState(null)
  useEffect(()=>{
    if (geoData) {
      fetchEQ(geoData[0],geoData[1])
    }
  },[geoData]);

  const fetchEQ = async(lat,lon)=>{
    try {
      const response = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&latitude=${lat}&longitude=${lon}&maxradiuskm=100`)
      const data = await response.json();
      formatData(data);
    }
    catch(e) {
      throw new Error(e)
    }
  }
  const formatData = (data)=>{
    const earthquakeDataArray = data.features.map((feature) => {
      const { mag, place, time, cdi, tsunami } = feature.properties;
      const [longitude, latitude, depth] = feature.geometry.coordinates;
      const date = new Date(time);
      return {
        location: place,
        mag: mag,
        date: date.toString().slice(0,15),
        lat: latitude,
        lon: longitude,
        depth: depth,
        cdi: cdi,
        tsunami: tsunami ? 'Yes' : 'No',
      };
    });
  
    setEarthQuakeData(earthquakeDataArray);
  }
  return (

      <EQContainer>
        <img src="https://i.gifer.com/o8G.gif" alt="" />
        <Header>
         <h2>Recent Earthquake Updates</h2>
       </Header>
       {earthQuakeData&&(
        <>
       {earthQuakeData.length==0&&(
         <h1>No data found</h1>
       )}
        {earthQuakeData.length>=1&&(
           <ul>
           {earthQuakeData.map((item,index)=>{
           return(
          
             <li key={index}>
               <h2>{item.location}</h2>
               <p>{item.date}</p>
               <span>Latitude: {item.lat}</span>
               <span>Longitude: {item.lon}</span>
               <span>Depth: {item.depth}</span>
               <span>CDI: {item.cdi}</span>
               <span>Chance of Tsunami: {item.tsunami}</span>
               <hr />
             </li>
           )
          
         })}
         </ul>
        )}
        
        </>
         
         

       
      

       )}
    </EQContainer>

  )
}

export default EQ
const EQContainer = styled.div`
    display: flex;
    position: relative;
    width: 30%;
    height: 100%;
    border-radius: 30px;
    margin-right: 1rem;
    overflow: hidden;
    z-index: 1;
    background: linear-gradient(rgb(90, 0, 150),rgba(255, 255, 255, 0.2));
    h2 {
      font-size: 1em;
      
    }
    img {
      position: absolute;
      z-index: -1;
    }
    color: white;
    align-items: center;
    justify-content: center;
    ul {
      display: flex;
      flex-direction: column;
      list-style: none;
      width:100%;
      height: 100%;
      padding: 4rem 1rem 0 1rem;
      overflow-y: auto;
      background-color: rgb(0,0,0,0.5);
      li {
        height: 400px;
        font-size: 0.9em;
        width:100%;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        border-radius: 30px;
        hr {
          width: 100%;
          margin: 0.2rem 0 0.2rem 0;
        }
      }
    }
    h1 {
      margin-left: 1rem;
      text-shadow: 1px 1px 10px black;
    }
    @media(max-width: 900px) {
      h1 {
        font-size: 1.2em;
      }
      img {
        width: 100%;
      }
      h2 {
        font-size: 0.9em;
      }
      ul {
          li {
            h2 {
              font-size: 0.9em;
            }
            p {
              font-size: 0.9em;
            }
            span {
              font-size: 0.8em;
            }
          }
        }
    }
    @media (max-width:800px) {
      ul {
        li {
          h2 {
            font-size: 0.8em;
          }
          p {
            font-size: 0.7em;
          }
          span {
            font-size: 0.6em;
          }
        }
      }
    }
    @media(max-width: 700px) {
      width: 100%;
      margin: 0 1rem 1rem 1rem;
      img {
        width: 50%;
      }
    }
   
    
    `

const Header = styled.div`
    background-color: rgba(68,55,119,255);
    border-radius: 0 0 15px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    width: 80%;
    height: 50px;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    border-bottom-right-radius: 30px;
    h2 {
      font-size: 1.2em;
      margin: 0.5rem 0 0.5rem 1rem;

    }
    @media (max-width: 1400px) {
      h2 {
        line-height: 1em;
        font-size: 1.1em;
      }
    }
    @media (max-width: 950px) {
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
