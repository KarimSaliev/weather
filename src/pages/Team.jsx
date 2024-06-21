import React, {useEffect, useRef, useState} from 'react'
import styled from 'styled-components'
import Typed from 'typed.js'
import TeamMember from '../components/TeamMember';
function Team() {
    const useOnScreen = (ref)=>{
        const [intersecting, setIntersecting] = useState(false);
        const observer = useRef(null);
    
        useEffect(() => {
            observer.current = new IntersectionObserver(([entry]) => {
                setIntersecting(entry.isIntersecting);
            }, {
                threshold: 1.0
            });
    
            if (ref.current) {
                observer.current.observe(ref.current);
            }
    
            return () => {
                if (observer.current && ref.current) {
                    observer.current.unobserve(ref.current);
                }
            };
        }, [ref]);
    
        return intersecting;
    }

    const row1= useRef(null);
    const isInViewPort1 = useOnScreen(row1);
    const row2= useRef(null);
    const isInViewPort2 = useOnScreen(row2);
    const row3= useRef(null);
    const isInViewPort3 = useOnScreen(row3);
    const header = useRef(null);
    useEffect(()=>{
        const headerTyped = new Typed(header.current, {
          strings: ['Get to know our team'],
          typeSpeed: 10,
          cursorChar: '',
        });
      
        return () => {
          headerTyped.destroy();
        };
      },[])
  return (
    <TeamContainer>
        <h2 ref={header}></h2>
        <Row ref={row1}>
            
            <TeamMember pos = {'left'} inViewPort={isInViewPort1} img ={'/src/assets/karim.png'} person='Karim Saliev'/>
            
            <TeamMember pos = {'right'} inViewPort={isInViewPort1} img={'/src/assets/nazar.png'} person='Nazar Zhanabergenov'/>
            
        </Row>
        <Row ref={row2}>
            
            <TeamMember pos = {'left'} inViewPort={isInViewPort2} img={'src/assets/ravshan.png'} person='Ravshanbek Musaev'/>
            
            <TeamMember pos = {'right'} inViewPort={isInViewPort2} img={'src/assets/kateryna.png'} person='Kateryna Sadovska'/>
            
        </Row>
        <Row ref={row3}>
            
            <TeamMember pos = {'left'} inViewPort={isInViewPort3} img={'src/assets/ebube.png'} person='ebube'/>
            
            <TeamMember pos = {'right'} inViewPort={isInViewPort3} img={'/src/assets/khushnud.png'} person='khushnud'/>
            
        </Row>
      
    
    </TeamContainer>
  )
}

export default Team
const TeamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: auto;
    padding: 5rem 2rem 5rem 2rem;
    h2 {
        color: white;
        margin: 3rem 0 3rem 0;
        @media (max-width: 330px) {
            font-size: 1em;
        }
    }`
const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 300px;
    padding: 1rem;
    @media (max-width: 1000px) {
        flex-direction: column;
        height: 500px;
        padding: 0;
    }

`
