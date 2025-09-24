import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ServicesDestinos from '../../services/ServicesDestinos';
import ServicesTours from '../../services/ServicesTours';
import ServicesPymes from '../../services/ServicesPymes';
import { useParams } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import '../MenuDestino/MenuDestino.css';

function MenuDestino() {
const { id } = useParams()
const [destino, setDestino] = useState(null)
const [ToursTraidos, setToursTraidos] = useState([])
const [pymeTraidos, setpymeTraidos] = useState([])
console.log(id);

useEffect(() => {
 const traerTours = async () => {
      const datosT = await ServicesTours.getTours()
      
      const tourFiltrado = datosT.filter((dT) =>  Number(dT.destinoId) === Number(id))
      console.log(tourFiltrado);
      
      setToursTraidos(tourFiltrado) //setear tours filtrados
    }
 traerTours()
 }, [id])

useEffect(() => {
    const traerDestinos = async () => {
        const datos = await ServicesDestinos.getDestinos()
        const encontrado = datos.find((d) => Number(d.id) === Number(id))
        setDestino(encontrado)// setear el destino que coincide
    }
    traerDestinos()
 }, [id])

  
 useEffect(() => {
 const traerPyme = async () => {
       const datosP = await ServicesPymes.getPymes()
       setpymeTraidos(datosP) //setear pymes
     }
     traerPyme()
}, [])



 // función para buscar el nombre del pyme por id
  const obtenerNombrePyme = (id) => {
    const pyme = pymeTraidos.find((p) => Number(p.id) === Number(id))
    return pyme ? pyme.nombre : "pyme no encontrado"
  }



//------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      {destino ? (
        <>
          <h1> {destino.nombre} </h1>

          <Carousel>
            {Array.isArray(destino.otrasImg) && destino.otrasImg.length > 0 ? (
              destino.otrasImg.map((img, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 img-fluid"
                    src={img}
                    alt={`${destino.nombre}-${index}`}
                  />
                </Carousel.Item>
              ))
            ) : (
              <Carousel.Item>
                <img
                  className="d-block w-100 img-fluid"
                  src={destino.otrasImg}
                  alt={destino.nombre}
                />
              </Carousel.Item>
            )}
          </Carousel>
        </>
      ) : (
        <p>Cargando destino...</p>
      )}

      <div className="container mt-4">
    <h2 className="mb-4">Tours Disponibles</h2>
    {ToursTraidos.length > 0 ? (
        ToursTraidos.map((tour) => (
        <div key={tour.id} className="row tour_card_horizontal mb-4">
            {/* Columna izquierda */}
            <div className="col-md-5 d-flex flex-column justify-content-center p-3">
                <h3 className="tour_titulo">{tour.nombre}</h3>
                <p className="tour_desc">{tour.descripcion}</p>
                <p className="tour_desc">
                    <strong>A cargo de:</strong> {obtenerNombrePyme(tour.pymeId)}
                </p>
                <button className="btn btn-standard mt-2">Contactar</button>
            </div>

            {/* Columna derecha */}
            <div className="col-md-7 p-3 d-flex align-items-center">
                <ul className="tour_list list-unstyled mb-0 w-100">
                    <li><strong>Duración:</strong> {tour.duracion}</li>
                    <li><strong>Precio:</strong> ₡{tour.precio}</li>
                    <li><strong>Póliza:</strong> {tour.poliza}</li>
                    <li><strong>Incluye:</strong> {tour.incluye}</li>
                    <li><strong>Punto de partida:</strong> {tour.punto_partida}</li>
                    <li><strong>Calificación:</strong> {tour.calificacion}</li>
                </ul>
            </div>
        </div>
        ))
    ) : (
        <p className="text-muted">No hay tours disponibles para este destino.</p>
    )}
</div>

    </div>
  )
}



export default MenuDestino