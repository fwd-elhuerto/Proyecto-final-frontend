import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import '../BuzonComentario/BuzonComentario.css'
import ServicesComentarios from '../../services/ServicesComentarios';
import ServicesTours from '../../services/ServicesTours';

function BuzonComentario() {
  const [Comentarios, setComentarios] = useState([])
  const [NuevoComentario, setNuevoComentario] = useState([])
  const [ToursTraidos, setToursTraidos] = useState([])

  useEffect(() => {
    const traerComentarios = async () => {
      const datosC = await ServicesComentarios.getComentarios()
      setComentarios(datosC)
    }

    const traerTours = async () => {
      const datosT = await ServicesTours.getTours()
      setToursTraidos(datosT) //guardamos tours
    }

    traerComentarios()
    traerTours()
  }, [])

  // función para buscar el nombre del tour por id
  const obtenerNombreTour = (id) => {
    const tour = ToursTraidos.find((t) => Number(t.id) === Number(id))
    return tour ? tour.nombre : "Tour no encontrado"
  }

  //función para guardar comentarios
  const guardarComentario = () =>{
    const fechaActual = new Date();
    
    const task ={
        usuario: usuarioEnSesion.nombre,
        contenido: NuevoComentario,
        fecha: fechaActual.toLocaleString(),
        usuario: usuarioEnSesion.Nombre
        }
        
        
       const savedTask = await Services.postTask(task)
        setNuevaT("");
        Swal.fire("¡Listo!", "Tarea agregada.", "success");
        agregarTarea(savedTask)
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {Comentarios.map((comentario) => (
          <div key={comentario.id} className="col-md-4 col-sm-6 mb-4">
            <div className="comentario_card">
              <h3 className="comentario_titulo">{comentario.usuario}</h3>
              <p className="comentario_desc">{comentario.contenido}</p>
              <p className="comentario_desc">
                <strong>Tour: </strong>{obtenerNombreTour(comentario.tour)}
              </p>
              <p className="comentario_desc">{comentario.calificacion}</p>
            </div>
          </div>
        ))}

        <input type="text" placeholder="Comentario" value={NuevoComentario} onChange={(e) => setNuevoComentario(e.target.value)} />
        <button value={guardarComentario}>Enviar</button>
      </div>
    </div>
  )
}

export default BuzonComentario
