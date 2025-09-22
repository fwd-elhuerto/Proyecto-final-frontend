import React from 'react'
import Header from '../components/Header/Header'
import Article from '../components/Article/Article'
import Navbar from '../components/NavBar/Navbar'
import MenuPymes from '../components/MenuPymes/MenuPymes'
import RegisterBar from '../components/RegisterBar/RegisterBar'

function Home() {
  return (
    <div>Home

            <Header />
            <Article />
            <Navbar />
            <br />
            <br />
            <MenuPymes />
            <br />
            <br />
            <RegisterBar />

    </div>
  )
}

export default Home