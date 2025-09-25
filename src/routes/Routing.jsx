import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Destination from '../pages/Destination'
import SessionManager from '../pages/SessionManager'



const Routing =() => {
  return (
    <Router>
      <Routes>
       
         <Route path='/Home' element={<Home/>} />
         <Route path="/destination/:id" element={<Destination />}/>
         <Route path='/SessionManager' element={<SessionManager/>} />

        
      </Routes>
    </Router>


  )
}

export default Routing