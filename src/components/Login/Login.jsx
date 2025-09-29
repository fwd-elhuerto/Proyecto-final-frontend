import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ServicesUser from '../../services/ServicesUser'
import ServicesPymes from '../../services/ServicesPymes'
import Swal from 'sweetalert2'
import '../Login/Login.css'

function Login() {
  const [Email, setEmail] = useState("") 
  const [Password, setPassword] = useState("")
  const [Users, setUsers] = useState([])
  const navegar = useNavigate()
  const [pymeTraidos, setpymeTraidos] = useState([])
  

  useEffect(() => {
    const pedirUser = async () => {
      const datosU = await ServicesUser.getUsuarios()
      setUsers(datosU) 
    }
    pedirUser()
  }, [])

  useEffect(() => {
   const traerPyme = async () => {
         const datosP = await ServicesPymes.getPymes()
         setpymeTraidos(datosP) //setear pymes
       }
       traerPyme()
  }, [])


  const logIn = () => {
    // Buscar usuario válido
    const usuarioValido = Users.find(
      (user) => user.Email === Email && user.Password === Password
    )

    const pymeValido = pymeTraidos.find(
      (pyme) => pyme.Email === Email && pyme.Password === Password
    )

  console.log(usuarioValido);
  

    if (usuarioValido || pymeValido) {
      // Guardar en sessionStorage
      sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido || pymeValido))

      // Redirigir según tipo de usuario
      if (pymeValido) {
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
    <div className='bloque'>
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
          onChange={(e)=> setPassword(e.target.value)} />
        <br /><br />

        <button onClick={logIn} className='btn-standard'>Ingresar</button>
      </div>
    </div>
  )
}

export default Login
