import React from 'react'
import '../Header/Header.css'

function Header() {
  return (
    <div>

      <div className='headS'>
      <h1>Isleño</h1>
      <button className='btn-standard'>Destinos</button>
      <button className='btn-standard'>Conoce emprededores</button>
      <button className='btn-standard'>Experiencias de usuarios</button>
      <input type="text" placeholder='Buscar destinos o tours'/>
      </div>
        
    </div>
  )
}

export default Header