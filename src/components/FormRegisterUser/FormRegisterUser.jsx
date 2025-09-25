import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ServicesUser from '../../services/ServicesUser'
import Swal from 'sweetalert2'

function FormRegisterUser() {


const [Nombre, setNombre]=useState("")
const [Email, setEmail]=useState("") 
const [Password, setPassword]=useState("")
const datosUser = {Nombre, Email, Password}
const [Password2, setPassword2]=useState("")
const [Users, setUsers] = useState([])

    const navegar = useNavigate()

    useEffect(() => {
        const pedirUser = async () => {
          const datosU = await ServicesUser.getUsuarios()
          setUsers(datosU) 
        }
        pedirUser()
    },[])


    const usuarioExistente = Users.find(u => u.Nombre === Nombre && u.Email === Email);

    const CargarDatos = async () => {
        console.log(Nombre,Email,Password);
        if (!usuarioExistente) {
          
       
          if (!Nombre.trim() || !Email.trim() || Password.length < 8 || Password != Password2) {
              Swal.fire("Error al guardar", "Llene todos los campos solicitados, las contraseñas deben ser mayor a 8 caracteres y deben coincidir", "error");
              return;
          }
              await Swal.fire('Hecho', 'El usuario ha sido registrado correctamente', 'success');
              const registrar = await ServicesUser.postUsuarios(datosUser)
              navegar("/Login"); 
         } else{
            await Swal.fire('El usuario ya existe', 'El usuario o correo esta ocupado, por favor use otro.', 'error');
         }
          }


  return (
    <div className='register'>
        <div className='formRStyle'>
            <label htmlFor="Nombre">Nombre</label>
            <br />
            <input type="text" placeholder='Nombre' value={Nombre} onChange={(e)=> setNombre(e.target.value)} />
            <br />
            <label htmlFor="Email">Correo electrónico</label>
            <br />
            <input type="email" placeholder='Correo electrónico' value={Email} onChange={(e)=> setEmail(e.target.value)} />
            <br />
            <label htmlFor="Pasword">Contraseña</label>
            <br />
            <input type="password" placeholder='Contraseña' value={Password} onChange={(e)=> setPassword(e.target.value)} />
            <br />
            <label htmlFor="Pasword">Confirmar contraseña</label>
            <br />
            <input type="password" placeholder='Contraseña' value={Password2} onChange={(e)=> setPassword2(e.target.value)} /> <br />
             <button onClick={CargarDatos} className='btn-standard'>Registrarse</button><br />
             
            
        </div>
     
       
    </div>
  )
}

export default FormRegisterUser