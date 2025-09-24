import React from 'react'
import '../Header/Header.css'

function Header() {

const IrAComentarios = () => { // funcion para navegar a una sección

    document.getElementById("comentarios")?.scrollIntoView({ behavior: "smooth" }); // scrollIntoView para deslizar hasta la seccion de la página
  };

  const IrADestinos = () => {

    document.getElementById("destinos")?.scrollIntoView({ behavior: "smooth" });
  };

  const IrAEmprendedores = () => {

    document.getElementById("emprendedor")?.scrollIntoView({ behavior: "smooth" });
  };

  const IrAPymes = () => {

    document.getElementById("empresas")?.scrollIntoView({ behavior: "smooth" });
  };



  return (
    <div>

      <div className='headS'>
        <h1>Isleño</h1>
        {/* <Link to="/">Home</Link> */}
        
        <button className='btn-standard' onClick={IrAEmprendedores}>Conoce emprededores</button>
        <button className='btn-standard' onClick={IrAComentarios}>Experiencias de usuarios</button>
        <button className='btn-standard' onClick={IrADestinos}>Destinos</button>
        <button className='btn-standard' onClick={IrAPymes}>Pymes</button>
        <input type="text" placeholder='Buscar destinos o tours'/>
      </div>
        
    </div>
  )
}

export default Header