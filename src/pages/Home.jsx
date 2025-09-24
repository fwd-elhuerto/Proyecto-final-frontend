import React from 'react'
import Header from '../components/Header/Header'
import Article from '../components/Article/Article'
import Navbar from '../components/NavBar/Navbar'
import MenuPymes from '../components/MenuPymes/MenuPymes'
import RegisterBar from '../components/RegisterBar/RegisterBar'
import MenuEmprendedor from '../components/MenuEmprendedor/MenuEmprendedor'
import BuzonComentario from '../components/BuzonComentario/BuzonComentario'

function Home() {
  return (
    <div>

            <Header />
            <br />
            <Article />
            <section id='destinos'> {/* usar secciones para poder nagenar en la página */}
            <Navbar />
            </section>
            <br />
            <br />
            <section id='empresas'>
            <MenuPymes />
            </section>
            <br />
            <br />
            <RegisterBar />
            <br />
            <br />
            <section id='emprendedor'>
            <MenuEmprendedor />
            </section>
            <br />
            <br />
            <section id='comentarios'>
            <BuzonComentario />
            </section>


    </div>
  )
}

export default Home