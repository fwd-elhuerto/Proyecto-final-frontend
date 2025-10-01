import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import '../Article/Article.css'
import banner from '../Article/hero.png'

function Article() {

  const animacionRef = useRef(null)
  const isInView = useInView(animacionRef, { once: true, margin: "-100px" }) 
  // margin es para que se active un poco antes de estar en encima


  return (
    <div >

       <div className="image-container text-white">
          <div className="texto-sobre-imagen">
            <h1>Descubre la belleza de las islas porteñas con guías locales</h1>
            <p>Encuentra destinos, tours, conoce emprendedores y más</p>
          </div>
        </div>
        
         {/* Div animado */}
      <motion.div
        ref={animacionRef}
        className="animacion"
        initial={{ opacity: 0, x: -100 }}  // empieza oculto y desplazado a la izquierda
        animate={isInView ? { opacity: 1, x: 0 } : {}} // cuando entra en vista, aparece
        transition={{ duration: 0.8, ease: "easeOut" }} // suavidad
      >
        <br /><br />
        <h1>Explora y disfruta</h1>
        <h3>
          Nuestra plataforma conecta viajeros con pymes locales de tours, 
          ofreciendo gran variedad de experiencias únicas en los destinos más llamativos de la región
        </h3>
      </motion.div>

    </div>
  )
}

export default Article