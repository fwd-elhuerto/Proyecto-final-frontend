import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ServicesPymes from '../../services/ServicesPymes'
import ServicesUser from '../../services/ServicesUser'
import Swal from 'sweetalert2'

function FormRegisterPyme() {
const [Nombre, setNombre]=useState("")
const [anhos_xp, setanhos_xp]=useState("") 
const [descripcion, setDescripcion]=useState("")
const [numero, setNumero]=useState("")
const [imagen, setImagen]=useState("")
const [Users, setUsers] = useState([])
const [Password, setPassword]=useState("")
const [Password2, setPassword2]=useState("")
const [Email, setEmail] = useState("")
const navegar = useNavigate()


    useEffect(() => {
        const pedirUser = async () => {
            const datosU = await ServicesUser.getUsuarios()
            setUsers(datosU) 
        }
        pedirUser()
    },[])

    

    const CargarPymes = async () => {
        //Verificar si el Nombre o email ya existe
        const pymeExistente = Users.find(u => u.Nombre === Nombre && u.Email === Email);
        if (pymeExistente) {
            Swal.fire('Error', 'El Nombre o email ya están registrados.', 'error');
            return;}
        //Campos obligatorios
        if (!Nombre.trim() || !anhos_xp.trim() || !descripcion.trim() || !numero.trim() || !imagen || !Password.trim() || !Password2.trim() || !Email.trim()) {
            Swal.fire('Error', 'Todos los campos deben ser completados.', 'error');
            return;}
        //Contraseñas
        if (Password.length < 8) {
            Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres.', 'error');
            return;}

        if (Password !== Password2) {
            Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
            return;}
        //Formato del número (8888-8888)
        const regexNumero = /^\d{4}-\d{4}$/;
        if (!regexNumero.test(numero)) {
        Swal.fire('Error', 'El formato del número debe ser 8888-8888.', 'error');
        return;}
        //Descripción
        if (descripcion.length < 50 || descripcion.length > 400) {
            Swal.fire('Error', 'La descripción debe tener entre 50 y 400 caracteres.', 'error');
            return;}
        //Años de experiencia (que sea un número positivo)
        if (isNaN(anhos_xp) || Number(anhos_xp) <= 0) {
            Swal.fire('Error', 'Los años de experiencia deben ser un número válido mayor a 0.', 'error');
            return;}
        
        // Subir imagen a Cloudinary
        let urlImagen = "";
        if (imagen) {
        urlImagen = await subirImagen(imagen);
        }

        const datosPymes = { Nombre, anhos_xp, descripcion, numero, imagen: urlImagen};//objeto con propiedades de la empresa
        await ServicesPymes.postPymes(datosPymes);

        const datosUser = {Nombre, Email, Password, tipoUsuario: "pyme"} // segundo objeto para guardar el usurio con tipo pyme
        await ServicesUser.postUsuarios(datosUser)
        Swal.fire('¡Registro Exitoso!', 'El pyme ha sido registrado correctamente.', 'success');
        navegar("/Home"); 
    };





        // funcion para subir imagenes a cloudinary
        const subirImagen = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "isleñoImages"); // configurado en Cloudinary

        const res = await fetch(`https://api.cloudinary.com/v1_1/de6vndqlu/image/upload`, {
            method: "POST",
            body: data,
        });

        const result = await res.json(); //respuesta en json
        return result.secure_url; //url publica
        };



//-------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
            <label htmlFor="Nombre">Nombre:</label>
            <br />
            <input type="text" placeholder='Nombre' value={Nombre} onChange={(e)=> setNombre(e.target.value)} />
            <br />

            <label htmlFor="anhos_xp">Años de experiencia:</label>
            <br />
            <input type="number" placeholder='ejem: 8' value={anhos_xp} onChange={(e)=> setanhos_xp(e.target.value)} />
            <br />

            <label htmlFor="descripcion">Descripción:</label>
            <br />
            <textarea placeholder='¿Quienes son?' value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} />
            <p className="text-muted">Una breve explicación sobre su negocio y la historia de este.</p>
            

            <label htmlFor="numero">Numero de contacto:</label>
            <br />
            <input type="tel" placeholder='8888-8888' value={numero} onChange={(e)=> setNumero(e.target.value)} /> <br />
            <p className="text-muted">Su número servirá como contacto directo con los clientes.</p>
            

            <label htmlFor="imagen">Logo de su negocio:</label>
            <br />
            <input type="file" accept="image/*"onChange={(e)=> setImagen(e.target.files[0])} />
            <p className="text-muted">En caso de no tener logo puede subir una foto de su lancha, equipo o personal de trabajo.</p>

            <label htmlFor="Email">Correo electrónico</label>
            <br />
            <input type="email" placeholder='Correo electrónico' value={Email} onChange={(e)=> setEmail(e.target.value)} /> <br />
            
            <label htmlFor="Pasword">Contraseña:</label>
            <br />
            <input type="password" placeholder='*********' value={Password} onChange={(e)=> setPassword(e.target.value)} />
            <p className="text-muted">La contraseña debe ser mayor a 8 caracteres.</p>

            <label htmlFor="Pasword">Confirmar contraseña:</label>
            <br />
            <input type="password" placeholder='*********' value={Password2} onChange={(e)=> setPassword2(e.target.value)} /> <br />

             <button onClick={CargarPymes} className='btn-standard'>Registrar pyme</button><br />

    </div>
  )
}

export default FormRegisterPyme