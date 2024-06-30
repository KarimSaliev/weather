import React, {useRef, useEffect, useState} from 'react'
import styled from 'styled-components'
import Typed from 'typed.js'
import { useNavigate } from 'react-router-dom';
function AboutUs() {
  const [active, setActive] = useState(false);
  const header = useRef(null);
  const description  = useRef(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const headerTyped = new Typed(header.current, {
      strings: ['About us'],
      typeSpeed: 50,
      cursorChar: '',
      onComplete: () => {
        if (description.current) {
          const descriptionTyped = new Typed(description.current, {
            strings: ['Get to know our team of developers'],
            typeSpeed: -100,
            cursorChar: '',
            onComplete: ()=>{
              setActive(!active);
            }
          });
          return () => {
            descriptionTyped.destroy();
          };
        }
      }
    });
  
    return () => {
      headerTyped.destroy();
    };
  },[])
  return (

    <AboutContainer>
      <h2 ref={header}></h2>
      <h3 ref={description}></h3>
      <h4 className={active? 'active': ''} style={{transition: '1s ease-in-out'}}> Team of 6 developers inviting you to test our recent weather application that runs both on mobile and web platforms. Each of us contributed a considerable part in creating this project starting from management, design, and ending with building this application. You can familiarize yourself more with out team by clicking this <span onClick={()=>navigate('/team')}>link</span>.</h4>
      <h4 className={active? 'active': ''}style={{transition: '2s ease-in-out'}}> We all contributed greatly to this project and hope you can enjoy your experience.</h4>
      <h4 className={active? 'active': ''}style={{transition: '3s ease-in-out'}}> You can also contact our team by either clicking this<span onClick={()=>navigate('/contact')}> link</span> or navigating to Contact page.</h4>
    </AboutContainer>
  )
}

export default AboutUs

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  padding: 0 2rem 0 2rem;
  * {
    z-index: 1;
  }
  span {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  h2 {
    font-size: 4em;
    color: white;
    margin: 5rem 0 3rem 0;
  }
  h3 {
    color: white;
    font-weight: 100;
    font-size: 1.8em;
  }
  h4 {
    opacity: 0;
    &.active {
      opacity: 1;
    }
    color: white;
    font-weight: 100;
    font-size: 1.5em;
    width: 50%;
    text-align: center;
    margin: 1rem;
    @media (max-width: 800px) {
      width: 80%;
    }
    @media (max-width: 440px) {
      font-size: 1.3em;
    }
    
  }
  @media (max-width: 530px) {
    h4 {
      width: 90%;
    }
    h2 {
      font-size: 3em;
    }
    h3 {
      font-size: 1.5em;
      text-align: center;
    }
  }
  @media(max-width: 400px) {
    
    h2 {
      font-size: 2.6em;
    }
    h4 {
      font-size: 1.2em;
    }
  }


`
