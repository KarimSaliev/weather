import React, {useRef, useState} from 'react'
import styled from 'styled-components'
import { getTeamText } from '../util';
function TeamMember({pos, inViewPort, img, person}) {
    const text = getTeamText(person);
    const teamRef = useRef(null);
    function handleMouseOver() {
        teamRef.current.classList.add('active');
    }
    function handleMouseOut() {
        teamRef.current.classList.remove('active');
    }
  return (
    <TeamMemberContainer ref={teamRef} style={{
        transform: inViewPort ? 'translateX(0)' : (pos === 'left' ? 'translateX(-200%)' : 'translateX(200%)'),
        justifyContent: pos==='left'? 'flex-start': 'flex-end',
        padding: pos==='left'? '0 0 0 1rem': '0 1rem 0 0'
    }} 
    onMouseOver={handleMouseOver}
    onMouseOut={handleMouseOut}
    >   
        <NameBlock style ={{
            left: pos==='left'? '0': '', right: pos==='right'?'0': '',
            borderRadius: pos==='left'? '0 0 30px 0': '0 0 0 30px',
        }}>
            <span>{person}</span>
        </NameBlock>
        <img src={img} alt="" style={{right: pos==='left'? '0': '', left: pos==='right'? '0': ''}}/>
        <h4>{text}</h4>
    </TeamMemberContainer>
  )
}

export default TeamMember
const TeamMemberContainer = styled.div`
    transition: 1s ease-in-out;
    border-radius: 20px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
    width: 45%;
    height: 100%;
    display: flex;
    position: relative;
    overflow: hidden;
    align-items: center;
    h4 {
        width: 40%;
    }
    &.active {
        background-color: white;
        h4 {
            color: #410041;
        }
    }
    &:hover {
        cursor: pointer;
    }
    img {
        position: absolute;
        object-fit: cover;
        height: 100%;
        @media (max-width: 700px) {
            height: 70%;
            bottom: 0;
        }
        @media (max-width: 400px) {
            height: 50%;
        }
    }
    h4 {
        color: white;
        font-weight: 100;
        &.active {
            color: black;
        }
        @media (max-width: 500px) {
            font-size: 0.8em;
        }
        @media (max-width: 400px) {
            font-size: 0.6em;
        }

    }
    @media (max-width: 1000px) {
        width: 60%;
        margin-bottom: 1rem;
    }
    @media (max-width: 830px) {
        width: 70%;
    }
    `
const NameBlock = styled.div`
    background-color: rgba(68,55,119,255);
    color: white;
    width: 200px;
    padding: 0.5rem;
    top: 0;
    position: absolute;
    display: flex;
    justify-content: center;
    transition: 1s ease-in-out;
    span {
        font-weight: 300;
    }
    @media (max-width: 400px) {
        span {
            font-size: 0.8em;
        }
    }`