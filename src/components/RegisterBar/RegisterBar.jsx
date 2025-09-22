import React from 'react'
import { useNavigate } from "react-router-dom";

function RegisterBar() {
    const navegar = useNavigate()

    const RegistrarPyme = () => {
        navegar("/RegisterPyme")
    }


  return (
    <div>

    <div className='registroEmpresa d-flex bg-secondary'>
        <h1>¿Tienes una empresa de tours?</h1>
        <button onClick={RegistrarPyme} className='boton'>Registrarse como empresa</button>
    </div>

    </div>
  )
}

export default RegisterBar