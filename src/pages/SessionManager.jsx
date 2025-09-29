import React from 'react'
import FormRegisterUser from '../components/FormRegisterUser/FormRegisterUser'
import Header from '../components/Header/Header'
import FormRegisterPyme from '../components/FormRegisterpyme/FormRegisterPyme'
import Login from '../components/Login/Login'

function SessionManager() {
  return (
    <div>

        <Header/>
        <br />
        <br />
        <FormRegisterUser/>
        <br />
        <br />
        <FormRegisterPyme />
        <br />
        <br />
        <Login/>
    </div>
  )
}

export default SessionManager