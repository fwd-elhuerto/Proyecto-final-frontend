import React from 'react'
import FormRegisterUser from '../FormRegisterUser/FormRegisterUser'
import Header from '../Header/Header'
import FormRegisterPyme from '../FormRegisterpyme/FormRegisterPyme'
import Login from '../Login/Login'
import '../AdminSession/AdminSession.css'

function AdminSession() {



  return (
    <div>
        <Header/>
      <div className='text-white'>
        
        <div className='mb-3 p-3 border rounded fondo'>
          <div className='row'>
            <br />
            <br />

              <div className='col-md-4'>
                <FormRegisterUser/>
              </div>
              <br />
              <br />
              <div className='col-md-4'>
                <FormRegisterPyme />
              </div>
              <br />
              <br />
              <div className='col-md-4'>
                <Login/>
              </div>


          </div> 
        </div> 
      </div>


    </div>
  )
}

export default AdminSession