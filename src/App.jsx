import { useState } from 'react'
import styled from 'styled-components'
import Page from './pages/Page'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {
  return (
    <MainContainer>
    <BrowserRouter basename='/weather/'>
    <Navbar/>
    <Page/>
    </BrowserRouter>

    
   
  </MainContainer>)
}

  

export default App

const MainContainer = styled.div`
    width: 100%;
`