import React from 'react'
import '../Header/Header.css'
import { useNavigate, useLocation } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import titulo from'../Header/tituloIsleño.png'

function Header() {
  const navegar = useNavigate();
  const location =useLocation();
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));


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
        <img className='imgTitulo'  src={titulo} alt="Isleño" />
        
        
        <button className='btn-head' onClick={() => irASeccion("emprendedor")}>Conoce emprededores</button>
        <button className='btn-head'  onClick={() => irASeccion("comentarios")}>Experiencias de usuarios</button>
        <button className='btn-head'  onClick={() => irASeccion("destinos")}>Destinos</button>
        <button className='btn-head'  onClick={() => irASeccion("empresas")}>Pymes</button>
        
        
        
        
        <input type="text" placeholder='Buscar destinos o tours'/>
        <DropdownButton title="Menú" variant="secondary">
        <Dropdown.Item href="/SessionManager">Iniciar sesión</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Registarse como usuario</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Registrarse como empresa</Dropdown.Item>
        </DropdownButton>

      </div>
        
    </div>
  )
}

export default Header