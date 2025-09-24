import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import ServicesPymes from '../../services/ServicesPymes';
import ServicesTours from '../../services/ServicesTours';
import { Modal, Button } from 'react-bootstrap';
import '../MenuPymes/MenuPymes.css'

function MenuPymes() {
  const [Pymes, setPymes] = useState([])
  const [Tours, setTours] = useState([])
  const [pymeSeleccionada, setPymeSeleccionada] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // traer pymes
  useEffect(() => {
    const traerPymes = async () => {
      const datosP = await ServicesPymes.getPymes()
      setPymes(datosP)
    }
    traerPymes()
  }, [])

  // traer tours
  useEffect(() => {
    const traerTours = async () => {
      const datosT = await ServicesTours.getTours()
      setTours(datosT)
    }
    traerTours()
  }, [])

  // abrir modal con pyme seleccionada
  const verTours = (pyme) => {
    setPymeSeleccionada(pyme)
    setShowModal(true)
  }

  // ir a WhatsApp
  const irAlChat = (tour) => {
    if (!pymeSeleccionada) return

    const numero = pymeSeleccionada.numero
      .replace(/\s/g, '')
      .replace(/-/g, '')

    if (numero) {
      const mensaje = `Hola, me gustaría contratar el "${tour.nombre}".`
      const whatsappUrl = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`
      window.open(whatsappUrl, '_blank')
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Número de WhatsApp no encontrado para este pyme.',
      })
    }
  }

  return (
    <div className="container mt-4">
      <div className="row">
        {Pymes.map((pyme) => (
          <div key={pyme.id} className="col-md-4 col-sm-6 mb-4">
            <div className="pyme_card">
              <img src={pyme.imagen} alt={pyme.nombre} className="pyme_img" />
              <h3 className="pyme_titulo">{pyme.nombre}</h3>
              <p className="pyme_desc">{pyme.descripcion}</p>
              <button 
                className='btn-standard' 
                onClick={() => verTours(pyme)}
              >
                Tours Ofrecidos
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal bootstrap */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Tours de {pymeSeleccionada?.nombre}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {pymeSeleccionada ? (
            Tours.filter(t => Number(t.pymeId) === Number(pymeSeleccionada.id)).length > 0 ? (
              Tours.filter(t => Number(t.pymeId) === Number(pymeSeleccionada.id)).map((tour) => (
                <div key={tour.id} className="mb-3 p-3 border rounded">
                  <h5>{tour.nombre}</h5>
                  <p>{tour.descripcion}</p>
                  <p><strong>Duración:</strong> {tour.duracion}</p>
                  <p><strong>Precio:</strong> ₡{tour.precio}</p>
                  <p><strong>Poliza:</strong> {tour.poliza}</p>
                  <p><strong>Incluye:</strong> {tour.incluye}</p>
                  <p><strong>Punto de partida:</strong> {tour.punto_partida}</p>
                  <p><strong>Calificación:</strong> {tour.calificacion}</p>
                  <Button 
                    onClick={() => irAlChat(tour)} 
                    style={{ backgroundColor: "rgb(229, 86, 24)", border: "none" }}
                  >
                    Contactar
                  </Button>
                </div>
              ))
            ) : (
              <p>No hay tours disponibles para este pyme.</p>
            )
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MenuPymes
