import React from 'react'
import FormRegisterUser from '../components/FormRegisterUser/FormRegisterUser'
import Header from '../components/Header/Header'
import FormRegisterPyme from '../components/FormRegisterpyme/FormRegisterPyme'

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
    </div>
  )
}

export default SessionManager