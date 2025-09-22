import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import ServicesDestinos from '../../services/ServicesDestinos';
import Carousel from 'react-bootstrap/Carousel';
import '../NavBar/NavBar.css'


function Navbar() {
  const [Destinos, setDestinos] = useState([])

  useEffect(() => {
    const traerDestinos = async () => {
        const datos = await ServicesDestinos.getDestinos()
        setDestinos(datos)
     
    }
    traerDestinos()
  }, [])

  return (
    <div className="container mt-4">
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
              <h3>{destino.nombre}</h3>
              <p>{destino.descripcion}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  )
}

export default Navbar
