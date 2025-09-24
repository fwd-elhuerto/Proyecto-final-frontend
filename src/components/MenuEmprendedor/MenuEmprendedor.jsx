import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2';
import ServicesEmprendedor from '../../services/ServicesEmprendedor';
import '../MenuEmprendedor/MenuEmprendedor.css'

function MenuEmprendedor() {

    const [Emprendedor, setEmprendedor] = useState([])
    
    
      useEffect(() => {
        const traerEmprendedor = async () => {
            const datosE = await ServicesEmprendedor.getEmprendedores()
            setEmprendedor(datosE)
        }
        traerEmprendedor()
      }, [])




  return (
     <div className="container mt-4">
      {Emprendedor.map((empre) => (
        <div key={empre.id} className="row empre_card_horizontal mb-4">
          <div className="col-md-4">
            <img src={empre.imagen} alt={empre.nombre} className="empre_img_horizontal" />
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center">
            <h3 className="empre_titulo">{empre.nombre}</h3>
            <p className="empre_desc">{empre.historia}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MenuEmprendedor