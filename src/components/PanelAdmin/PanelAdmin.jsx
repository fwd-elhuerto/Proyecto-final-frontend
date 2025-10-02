import React, { useState } from 'react'
import PanelDestino from './PanelDestino/PanelDestino'
import PanelUsuarios from './PanelUsuarios/PanelUsuarios'
import PanelEmprendedor from './PanelEmprendedor/PanelEmprendedor'
import PrivHeader from '../PrivHeader/PrivHeader'


function PanelAdmin() {

     const [activeForm, setActiveForm] = useState("PanelUsuarios") 
     




  return (
    <div>
      <div>
        <div >
          {/* Botones de navegación */}
          <div>
            <button 
              className={`btn-standard ${activeForm === "PanelUsuarios" ? "active" : ""}`} 
              onClick={() => setActiveForm("PanelUsuarios")}
            >
              Usuarios
            </button>
            <button 
              className={`btn-standard ${activeForm === "PanelDestino" ? "active" : ""}`} 
              onClick={() => setActiveForm("PanelDestino")}
            >
              Destinos
            </button>
            <button 
              className={`btn-standard ${activeForm === "PanelEmprendedor" ? "active" : ""}`} 
              onClick={() => setActiveForm("PanelEmprendedor")}
            >
              Emprendedores
            </button>
          </div>

          {/* Contenedor con transición */}
          <div >
            <div className={`form-wrapper ${activeForm === "PanelUsuarios" ? "show" : ""}`}>
              <PanelUsuarios />
            </div>
            <div className={`form-wrapper ${activeForm === "PanelDestino" ? "show" : ""}`}>
              <PanelDestino />
            </div>
            <div className={`form-wrapper ${activeForm === "PanelEmprendedor" ? "show" : ""}`}>
              <PanelEmprendedor />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PanelAdmin