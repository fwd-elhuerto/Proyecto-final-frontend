import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import ServicesDestinos from '../../services/ServicesDestinos';
import Carousel from 'react-bootstrap/Carousel';
import '../NavBar/NavBar.css'


function Navbar() {
  const [Destinos, setDestinos] = useState([])
  const navegar = useNavigate()

  useEffect(() => {
    const traerDestinos = async () => {
        const datos = await ServicesDestinos.getDestinos()
        setDestinos(datos)
     
    }
    traerDestinos()
  }, [])

  
  const irADestino = (id) => {  // función para ir a la página de destino
    navegar(`/destination/${id}`)
  }

  return (
    <div className=" mt-4">
        <h1>Islas y destinos</h1>
      <Carousel>
        {Destinos.map(destino => (
          <Carousel.Item key={destino.id}>
            <img
              className="d-block w-100 img-fluid"
              src={destino.imagen}
              alt={destino.nombre}
            />
            <Carousel.Caption>
              <div className='contraste'>
              <h3>{destino.nombre}</h3>
              <p>{destino.descripcion}</p>
              <button className="btn-standard" onClick={() => irADestino(destino.id)}>
                Ver tours Disponibles
              </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Navbar
