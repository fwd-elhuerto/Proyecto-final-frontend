import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';


function PrivHeader() {

    const navegar =useNavigate()
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));


    const cerrar = async () => {
        const result = await Swal.fire({
          title: "¿Seguro?",
          text: "¿Volver a inicio de sesión?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, salir",
          cancelButtonText: "Cancelar",
        });
        if (result.isConfirmed) {
          sessionStorage.clear;
          navegar("/SessionManager");
        }
      };


  return (
    <div>
        <h1>isleño</h1>

        <h3>Bienvenido {usuarioLogueado.Nombre} </h3>

        <button className="btnCS" onClick={cerrar}>
            Cerrar sesión
        </button>


    </div>
  )
}

export default PrivHeader