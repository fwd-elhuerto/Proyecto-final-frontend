import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Destination from '../pages/Destination'
import SessionManager from '../pages/SessionManager'
import MainPyme from '../pages/MainPyme'
import MainAdmin from '../pages/MainAdmin'



const Routing =() => {
  return (
    <Router>
      <Routes>
       
         <Route path='/Home' element={<Home/>} />
         <Route path="/destination/:id" element={<Destination />}/>
         <Route path='/SessionManager' element={<SessionManager/>} />
         <Route path='/MainPyme' element={<MainPyme/>} />
         <Route path='/MainAdmin' element={<MainAdmin/>} />

        
      </Routes>
    </Router>


  )
}

export default Routing