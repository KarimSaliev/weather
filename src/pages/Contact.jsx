import React, {useState, useRef, useEffect}from 'react'
import styled from 'styled-components'
import Typed from 'typed.js'
function Contact() {
    const headerRef = useRef(null);
    const [name, setName]=useState('');
    const [active, setActive]=useState(false);
    const handleChange =(e)=>{
        setName(e.target.value);
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        window.alert(`Thank you, ${name}, our team will get back to you shortly`)
    }
    useEffect(()=>{
        setActive(true);
        const headerTyped = new Typed(headerRef.current, {
          strings: ['Here you can contact our team'],
          typeSpeed: 10,
          cursorChar: '',
        });
        return () => {
          headerTyped.destroy();
        };
        
      },[])
  return (
    <ContactContainer>
        <ContactWindow className={active?'active':''}>
            <h2 ref={headerRef}></h2>
            <form onSubmit={(e)=>handleSubmit(e)}>
            <input type="text" placeholder='Your full name' value={name} onChange={(e)=>handleChange(e)} required='true'/>
            <input type="email" placeholder='Your email' required='true'/>
            <textarea placeholder='Your message'></textarea>
            <button>Submit</button>
            </form> 
        </ContactWindow>
    </ContactContainer>
  )
}

export default Contact
const ContactContainer = styled.div`
    width: 100%;
    height: 1000px;
    display: flex;
    justify-content: center;
    padding: 8rem 0 2rem 0;
    `
    const ContactWindow = styled.div`
    background: linear-gradient(rgba(68,55,119,255),rgba(97,82,151,255));
    height: 100%;
    width: 60%;
    border-radius: 30px;
    padding: 2rem;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    transition: 0.3s ease-in-out;
    opacity: 0;
    &.active {
        opacity: 1;
    }
    h2 {
        color: white;
        font-weight: 100;
        text-align: center;
    }
    form {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        input {
            font-size: 1em;
            color: white;
            background-color: rgba(0,0,0,0.2);
            border-radius: 20px;
            border: none;
            outline: none;
            &:focus {
                    &::placeholder {
                    color: white;
                }
                }
            &:first-child {
                padding: 1rem;
            }
            &:nth-child(2) {
                padding: 1rem;
            }
        }
        textarea {
                &:focus {
                    &::placeholder {
                    color: white;
                }
                }
                background-color: rgba(0,0,0,0.2);
                color: white;
                font-size: 1em;
                border-radius: 20px;
                border: none;
                outline: none;
                height: 300px;
                padding: 1rem;
            }
        button {
            align-self: center;
            height: 40px;
            width: 100px;
            border-radius: 20px;
            border: none;
            outline: none;
            background-color: rgba(0,0,0,0.2);
            color: grey;
            font-size: 1em;
            transition: transform 0.3s ease-in-out;
            &:hover {
                cursor: pointer;
                transform: scale(1.1);
                color: white;

            }
        }
    }
    @media (max-width: 700px) {
        width: 70%;
        h2 {
            font-size: 1.2em;
        }
        height: 700px;
    }
    @media(max-width: 500px) {
        width: 80%;
    }
    @media (max-width: 400px) {
        width: 90%;
        h2 {
            font-size: 1.1em;
        }
        height: 600px;
    }
    @media (max-width: 330px) {
        h2 {
            font-size: 0.9em;
        }
    }

`
