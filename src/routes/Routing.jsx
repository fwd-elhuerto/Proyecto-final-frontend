import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Destination from '../pages/Destination'



const Routing =() => {
  return (
    <Router>
      <Routes>
       
         <Route path='/Home' element={<Home/>} />
         <Route path="/destination/:id" element={<Destination />}/>
        
      </Routes>
    </Router>


  )
}

export default Routing