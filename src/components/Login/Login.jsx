import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ServicesUser from '../../services/ServicesUser'

function Login() {
    const [Email, setEmail]=useState("") 
    const [Password, setPassword]=useState("")
    const navegar = useNavigate()
    const [Users, setUsers] = useState([])
    
        useEffect(() => {
                const pedirUser = async () => {
                    const datosU = await ServicesUser.getUsuarios()
                    setUsers(datosU) 
                }
               pedirUser()
           },[])
    




    const logIn = () => {
     
      const usuarioValido = Users.find(
        (user) => user.Email === Email && user.Password === Password
      )
      if (usuarioValido) {
     sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido));
          navegar("/Home")
      } else {
        alert("")
      }
    }


  return (
      <div className='login'>

        
        <div className='formLStyle'>
          <h2>Ingreso</h2>
            <label htmlFor="Email">Correo electrónico</label>
            <br />
            <input type="email" placeholder='Ejemplo@gmail.com' value={Email} onChange={(e)=> setEmail(e.target.value)} />
            <br />
            <label htmlFor="Pasword">Contraseña</label>
            <br />
            <input type="password" placeholder='********' value={Password} onChange={(e)=> setPassword(e.target.value)} />
            <br />
             <button onClick={logIn} className='btn'>Ingresar</button>
        </div>

    </div>
  )
}

export default Login