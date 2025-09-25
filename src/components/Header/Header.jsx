import React from 'react'
import '../Header/Header.css'
import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const navegar = useNavigate();
  const location =useLocation();


const irASeccion = (id) => {
if (location.pathname === "/Home") {
   // funcion para navegar a una sección

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); // scrollIntoView para deslizar hasta la seccion de la página
  }  else {
      // Si estamos en otra ruta, navegamos a Home
      navegar("/Home")
    }
 }
 

  return (
    <div>

      <div className='headS'>
        <h1>Isleño</h1>
        
        
        <button className='btn-standard' onClick={() => irASeccion("emprendedor")}>Conoce emprededores</button>
        <button className='btn-standard'  onClick={() => irASeccion("comentarios")}>Experiencias de usuarios</button>
        <button className='btn-standard'  onClick={() => irASeccion("destinos")}>Destinos</button>
        <button className='btn-standard'  onClick={() => irASeccion("empresas")}>Pymes</button>
        <input type="text" placeholder='Buscar destinos o tours'/>
      </div>
        
    </div>
  )
}

export default Header