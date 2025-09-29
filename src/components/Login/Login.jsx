import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ServicesUser from '../../services/ServicesUser'
import Swal from 'sweetalert2'

function Login() {
  const [Email, setEmail] = useState("") 
  const [Password, setPassword] = useState("")
  const [Users, setUsers] = useState([])
  const navegar = useNavigate()
  

  useEffect(() => {
    const pedirUser = async () => {
      const datosU = await ServicesUser.getUsuarios()
      setUsers(datosU) 
    }
    pedirUser()
  }, [])

  const logIn = () => {
    // Buscar usuario válido
    const usuarioValido = Users.find(
      (user) => user.Email === Email && user.Password === Password
    )

    if (usuarioValido) {
      // Guardar en sessionStorage
      sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido))

      // Redirigir según tipo de usuario
      if (usuarioValido.tipoUsuario === "pyme") {
        navegar("/mainPyme")
      } else if (usuarioValido.tipoUsuario === "cliente") {
        navegar("/Home")
      } else if (usuarioValido.tipoUsuario === "admin") {
        navegar("/MainAdmin")
      }

    } else {
      Swal.fire("Error", "Correo o contraseña incorrectos.", "error")
    }
  }

  return (
    <div className='login'>
      <div className='formLStyle'>
        <h2>Ingreso</h2>

        <label htmlFor="Email">Correo electrónico</label>
        <br />
        <input 
          type="email" 
          placeholder='Ejemplo@gmail.com' 
          value={Email} 
          onChange={(e)=> setEmail(e.target.value)} 
        />
        <br />

        <label htmlFor="Password">Contraseña</label>
        <br />
        <input 
          type="password" 
          placeholder='********' 
          value={Password} 
          onChange={(e)=> setPassword(e.target.value)} 
        />
        <br />

        <button onClick={logIn} className='btn-standard'>Ingresar</button>
      </div>
    </div>
  )
}

export default Login
