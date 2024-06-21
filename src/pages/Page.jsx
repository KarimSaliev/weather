import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './Home'
import AboutUs from './AboutUs'
import Team from './Team'
import Contact from './Contact'
function Page() {
  return (
    <Routes>
        <Route index element={<Home/>}/>
        <Route path = '/aboutus' element={<AboutUs/>}/>
        <Route path = '/team' element={<Team/>}/>
        <Route path = '/contact' element={<Contact/>}/>
    </Routes>
  )
}

export default Page
