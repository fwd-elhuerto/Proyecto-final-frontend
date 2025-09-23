import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import '../BuzonComentario/BuzonComentario.css'
import ServicesComentarios from '../../services/ServicesComentarios';
import ServicesTours from '../../services/ServicesTours';
import { useNavigate } from "react-router-dom";
import ReactStars from "react-stars";

function BuzonComentario() {
  const [Comentarios, setComentarios] = useState([])
  const [NuevoComentario, setNuevoComentario] = useState("")
  const [ToursTraidos, setToursTraidos] = useState([])
  const [tourElegido, settourElegido] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const usuarioEnSesion = JSON.parse(sessionStorage.getItem("usuarioLogueado"))
  const navegar = useNavigate()

  useEffect(() => {
    const traerComentarios = async () => {
      const datosC = await ServicesComentarios.getComentarios()
      setComentarios(datosC)
    }

    const traerTours = async () => {
      const datosT = await ServicesTours.getTours()
      setToursTraidos(datosT) //setear tours
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
  const guardarComentario = async () =>{
    const fechaActual = new Date();
    if (!usuarioEnSesion) {
        const result = await Swal.fire({
        title: "Inicie sesion",
        text: "Necesita iniciar sesion para agregar comentarios",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ir a Iniciar Sesión",
        cancelButtonText: "Cancelar"
        });
        if (result.isConfirmed) {
            navegar("/Login")
        } return
    }else if (!NuevoComentario.trim()) {  // Validar comentario vacío
    Swal.fire("Error", "Ingrese un comentario válido", "error");
    return;
  }

    if (!tourElegido) { // Validar selección de tour
        Swal.fire("Error", "Seleccione un tour", "error");
        return;
    }

    if (calificacion === 0) {
      Swal.fire("Error", "Debe seleccionar una calificación", "error");
      return;
    }
        const opinion = {
        usuario: usuarioEnSesion.nombre,
        contenido: NuevoComentario,
        fecha: fechaActual.toLocaleString(),
        tour: Number(tourElegido),
        calificacion: calificacion
    };

    try {
        const savedOpinion = await ServicesComentarios.postComentarios(opinion);

        
        setComentarios([...Comentarios, savedOpinion]); // actualizar la lista sin recargar
        setNuevoComentario("");
        settourElegido("");

        Swal.fire("¡Listo!", "Comentario agregado.", "success");
    } catch (error) {
        console.error(error);
    }
    };

  
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="container mt-4">
        <h1>Experiencias de viajeros</h1>
      <div className="row">
        {Comentarios.map((comentario) => (
          <div key={comentario.id} className="col-md-4 col-sm-6 mb-4">
            <div className="comentario_card">
              <h3 className="comentario_titulo">{comentario.usuario}</h3>
              <p className="comentario_desc">{comentario.contenido}</p>
              <p className="comentario_desc">
                <strong>Tour: </strong>{obtenerNombreTour(comentario.tour)}
              </p>
              <p className="comentario_desc">Calificación 🌟{comentario.calificacion}</p>
            </div>
          </div>
        ))}

        <div className="row justify-content-center">
    <div className="col-md-8">
      <div className="buzon_form">
        <h3>Deja tu comentario</h3>
        <input
          type="text"
          placeholder="Escribe tu comentario..."
          value={NuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
        />
        <select
          value={tourElegido}
          onChange={(e) => settourElegido(e.target.value)}
        >
          <option value="">Selecciona un tour</option>
          {ToursTraidos.map((tour) => (
            <option key={tour.id} value={tour.id}>
              {tour.nombre}
            </option>
          ))}
        </select>
        <ReactStars
          count={5}
          value={calificacion}
          onChange={(newRating) => setCalificacion(newRating)}
          size={30}
          activeColor="#ffd700"
        />
        <button onClick={guardarComentario}>Enviar</button>
      </div>
    </div>
  </div>


      </div>
    </div>
  )
}

export default BuzonComentario
