import React from 'react'
import '../Article/Article.css'
import banner from '../Article/hero.png'


function Article() {



  return (
    <div >

        <div className='heroBanner text-wa'>
            <h1>Descubre la belleza de las islas porteñas con guias locales</h1>
            <p>Encuentra destinos, tours, conoce emprendedores y mas</p>
            <img className='banner' src={banner} alt="" />
           
        </div>

        <div>
            <h1>Explora y disfuta</h1>
            <h3>Nuestra plataforma conecta viajeros con pymes locales de tours, ofreciendo gran variedad de experiencias unicas en los destinos mas llamativos de la región</h3>
        </div>

    </div>
  )
}

export default Article