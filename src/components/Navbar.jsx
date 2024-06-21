import React, {useState} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
function Navbar() {
    const [activeNav, setActiveNav] = useState(false)
  return (
    <NavbarContainer>
        <SNavLink to='/'>
        <img src="https://github.com/KarimSaliev/weather/blob/main/src/assets/logo.png?raw=true" alt=""onClick={()=>{setActiveNav(!activeNav)}}/>
        </SNavLink>
       
   
        <DropMenu className={activeNav? 'active': ''}> 
        
        <SNavLink to ='/'>
        <p onClick={()=>{setActiveNav(!activeNav)}}>
            Home
        </p>
        </SNavLink>
       
        <SNavLink to='/aboutus'>
        <p onClick={()=>{setActiveNav(!activeNav)}}>
            About us
        </p>
        </SNavLink>
       <SNavLink to='/team'>
       <p onClick={()=>{setActiveNav(!activeNav)}}>
            Team
        </p>
        </SNavLink>
       <SNavLink to='/contact'>
       <p onClick={()=>{setActiveNav(!activeNav)}}>
            Contact
        </p>
        </SNavLink>
      
       
       
        </DropMenu>
        <MenuIcon>
            {activeNav &&(
                 <FontAwesomeIcon icon={faSun} spin onClick = {()=>setActiveNav(!activeNav)}/>
            )}
            {!activeNav &&(
                 <FontAwesomeIcon icon={faSun}onClick = {()=>setActiveNav(!activeNav)}/>
            )}
        </MenuIcon>
       
  
       
        
        
    
    </NavbarContainer>
  )
}

export default Navbar
const NavbarContainer = styled.div`
    display: flex;
    color: white;
    height: 100px;
    width: 100%;
    position: fixed;
    z-index: 1000;
    img {
     position: absolute;
     width: 100px;
     object-fit: cover;
     left: 20px;
     &:hover {
        cursor: pointer;

     }

     z-index: 1000;
    }
    p {
        &:hover {
            text-decoration: underline;
            cursor: pointer;

        }
    }
    @media (max-width:1200px) {
        p {
            opacity: 0;
        }
    }
   


`
const DropMenu = styled.div`
    display: flex;
    height: 400px;
    width: 100%;
    background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    align-items: flex-end;
    padding-bottom: 1rem;
    justify-content: space-evenly;
    transform: translateY(-79%);
    transition: 0.5s ease-in-out;
    @media (max-width:1200px) {
        p {
            opacity: 0;
        }
    }
    &.active {
        transform: translateY(0);
        p {
            opacity: 1;
            font-size: 1.5em;
        }
        flex-direction: column;
        align-items: center;


    }
    `


const MenuIcon = styled.div`
    z-index: 1000%;
    font-size: 2.5em;
    position: absolute;
    right: 20px;
    bottom: 20px;
    opacity: 0;
    @media(max-width: 1200px) {
        opacity: 1;
    }`
const SNavLink = styled(NavLink)`
    text-decoration: none;
    color: white;
    `
