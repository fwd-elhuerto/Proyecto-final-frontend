import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
import ServicesEmprendedor from '../../services/ServicesEmprendedor';
import '../MenuEmprendedor/MenuEmprendedor.css'
import { motion, useInView } from 'framer-motion'

function MenuEmprendedor() {

    const [Emprendedor, setEmprendedor] = useState([])
    
    
      useEffect(() => {
        const traerEmprendedor = async () => {
            const datosE = await ServicesEmprendedor.getEmprendedores()
            setEmprendedor(datosE)
        }
        traerEmprendedor()
      }, [])


       const animacionRef = useRef(null)
       const isInView = useInView(animacionRef, { once: true, margin: "-100px" }) 
       // margin es para que se active un poco antes de estar en encima

  return (
     <div className="container mt-4">
      <motion.div
              ref={animacionRef}
              className="animacion"
              initial={{ opacity: 0, x: -100 }}  // empieza oculto y desplazado a la izquierda
              animate={isInView ? { opacity: 1, x: 0 } : {}} // cuando entra en vista, aparece
              transition={{ duration: 0.8, ease: "easeOut" }}>
            <h1>Nuestros valientes</h1>
      </motion.div>

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