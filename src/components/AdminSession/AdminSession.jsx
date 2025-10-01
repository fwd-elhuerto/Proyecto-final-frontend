// src/components/AdminSession/AdminSession.jsx
import React, { useState } from 'react'
import FormRegisterUser from '../FormRegisterUser/FormRegisterUser'
import FormRegisterPyme from '../FormRegisterpyme/FormRegisterPyme'
import Login from '../Login/Login'
import Header from '../Header/Header'
import '../AdminSession/AdminSession.css'

function AdminSession() {
  const [activeForm, setActiveForm] = useState("login") 
  // valores: "login", "registerUser", "registerPyme"

  return (
    <div>
      <Header />
      <div className="text-white">
        <div className="mb-3 p-3 border rounded fondo">
          {/* Botones de navegación */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            <button 
              className={`btn-standard ${activeForm === "login" ? "active" : ""}`} 
              onClick={() => setActiveForm("login")}
            >
              Login
            </button>
            <button 
              className={`btn-standard ${activeForm === "registerUser" ? "active" : ""}`} 
              onClick={() => setActiveForm("registerUser")}
            >
              Registrar Usuario
            </button>
            <button 
              className={`btn-standard ${activeForm === "registerPyme" ? "active" : ""}`} 
              onClick={() => setActiveForm("registerPyme")}
            >
              Registrar Pyme
            </button>
          </div>

          {/* Contenedor con transición */}
          <div className="form-container col-md-4 justify-content-center">
            <div className={`form-wrapper ${activeForm === "login" ? "show" : ""}`}>
              <Login />
            </div>
            <div className={`form-wrapper ${activeForm === "registerUser" ? "show" : ""}`}>
              <FormRegisterUser />
            </div>
            <div className={`form-wrapper ${activeForm === "registerPyme" ? "show" : ""}`}>
              <FormRegisterPyme />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminSession
