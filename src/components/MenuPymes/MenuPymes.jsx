import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import ServicesPymes from '../../services/ServicesPymes';
import '../MenuPymes/MenuPymes.css'

function MenuPymes() {

const [Pymes, setPymes] = useState([])

  useEffect(() => {
    const traerPymes = async () => {
        const datosP = await ServicesPymes.getPymes()
        setPymes(datosP)
     
    }
    traerPymes()
  }, [])




//-----------------------------------------------------------------------------------------------------------------------------------------------
  return (
    <div className="container mt-4">
      <div className="row">
        {Pymes.map((pyme) => (
          <div key={pyme.id} className="col-md-4 col-sm-6 mb-4">
            <div className="pyme_card">
              <img src={pyme.imagen} alt={pyme.nombre} className="pyme_img" />
              <h3 className="pyme_titulo">{pyme.nombre}</h3>
              <p className="pyme_desc">{pyme.descripcion}</p>
              <button className='btn'>Tours Ofrecidos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MenuPymes