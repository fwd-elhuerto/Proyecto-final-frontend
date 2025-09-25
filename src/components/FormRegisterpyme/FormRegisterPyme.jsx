import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import ServicesPymes from '../../services/ServicesPymes'
import Swal from 'sweetalert2'

function FormRegisterPyme() {
const [nombre, setNombre]=useState("")
const [anhos_xp, setanhos_xp]=useState("") 
const [descripcion, setDescripcion]=useState("")
const [numero, setNumero]=useState("")
const [imagen, setImagen]=useState("")
const [Password, setPassword]=useState("")
const [Password2, setPassword2]=useState("")
const [pymes, setPymes] = useState([])
const navegar = useNavigate()


    useEffect(() => {
        const pedirPymes = async () => {
            const datosP = await ServicesPymes.getPymes();
            setPymes(datosP);
        };
        pedirPymes();
    }, []);

    const datosPymes = { nombre, anhos_xp, descripcion, numero, imagen, Password };

    const CargarPymes = async () => {
        //Verificar si el nombre o número ya existen
        const pymeExistente = pymes.find(p => p.nombre === nombre || p.numero === numero);
        if (pymeExistente) {
            Swal.fire('Error', 'El nombre o número de contacto ya están registrados.', 'error');
            return;
        }

        //Campos obligatorios
        if (!nombre.trim() || !anhos_xp.trim() || !descripcion.trim() || !numero.trim() || !imagen.trim() || !Password.trim() || !Password2.trim()) {
            Swal.fire('Error', 'Todos los campos deben ser completados.', 'error');
            return;
        }

        //Contraseñas
        if (Password.length < 8) {
            Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres.', 'error');
            return;
        }
        if (Password !== Password2) {
            Swal.fire('Error', 'Las contraseñas no coinciden.', 'error');
            return;
        }

        //Formato del número (ej: 8888-8888)
        const regexNumero = /^\d{4}-\d{4}$/;
        if (!regexNumero.test(numero)) {
            Swal.fire('Error', 'El formato del número de teléfono debe ser 8888-8888.', 'error');
            return;
        }

        //Descripción
        if (descripcion.length > 50) {
            Swal.fire('Error', 'La descripción debe tener más de 50 caracteres.', 'error');
            return;
        }
        
        //Años de experiencia (que sea un número positivo)
        if (isNaN(anhos_xp) || Number(anhos_xp) <= 0) {
            Swal.fire('Error', 'Los años de experiencia deben ser un número válido mayor a 0.', 'error');
            return;
        }

        

        await ServicesPymes.postPymes(datosPymes);
        Swal.fire('¡Registro Exitoso!', 'El pyme ha sido registrado correctamente.', 'success');
        navegar("/login");

    };

  return (
    <div>
            <label htmlFor="nombre">Nombre:</label>
            <br />
            <input type="text" placeholder='Nombre' value={nombre} onChange={(e)=> setNombre(e.target.value)} />
            <br />

            <label htmlFor="anhos_xp">Años de experiencia:</label>
            <br />
            <input type="number" placeholder='ejem: 8' value={anhos_xp} onChange={(e)=> setanhos_xp(e.target.value)} />
            <br />

            <label htmlFor="descripcion">Descripción:</label>
            <br />
            <input type="text" placeholder='¿Quienes son?' value={descripcion} onChange={(e)=> setDescripcion(e.target.value)} />
            <p className="text-muted">Una breve explicación sobre su negocio y la historia de este.</p>
            

            <label htmlFor="numero">Numero de contacto:</label>
            <br />
            <input type="number" placeholder='8888-8888' value={numero} onChange={(e)=> setNumero(e.target.value)} /> <br />
            <p className="text-muted">Su número servirá como contacto directo con los clientes.</p>
            

            <label htmlFor="imagen">Logo de su negocio:</label>
            <br />
            <input type="file" placeholder='Ejemplo.jpg' value={imagen} onChange={(e)=> setImagen(e.target.value)} />
            <p className="text-muted">En caso de no tener logo puede subir una foto de su lancha, equipo o personal de trabajo.</p>

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