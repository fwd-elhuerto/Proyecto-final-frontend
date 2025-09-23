import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import ServicesDestinos from '../../services/ServicesDestinos';
import { useParams } from "react-router-dom"
import Carousel from 'react-bootstrap/Carousel';

function MenuDestino() {
const { id } = useParams()
const [destino, setDestino] = useState([])
const [ToursTraidos, setToursTraidos] = useState([])

 const traerTours = async () => {
      const datosT = await ServicesTours.getTours()
      setToursTraidos(datosT) //setear tours
    }

useEffect(() => {
    const traerDestinos = async () => {
        const datos = await ServicesDestinos.getDestinos()
        setDestinos(datos)
     
    }
    traerDestinos()
  }, [])



//------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div>


        <h2>Tours Disponibles</h2>
        <div className="row">
        {ToursTraidos.map((tour) => (
          <div key={tour.id} className="col-md-4 col-sm-6 mb-4">
            <div className="tour_card">
              <h3 className="tour_titulo">{tour.nombre}</h3>
              <p className="tour_desc">{tour.descripcion}</p>
              <p>A cargo de {tour.pymeId}</p>
              <ul>
                <li>Duración: {tour.duracion}</li>
                <li>Precio c{tour.precio}</li>
                <li>Poliza: {tour.poliza}</li>
                <li>Este tour incluye {tour.inculye}</li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </div>
          </div>
        ))}
      </div>



    </div>
  )
}



export default MenuDestino