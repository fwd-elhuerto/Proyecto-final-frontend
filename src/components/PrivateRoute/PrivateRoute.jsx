import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    return <Navigate to="/Home" />;
  }

  // Caso especial: si es pyme y no tiene tipoUsuario
  if (usuarioLogueado.Nombre && usuarioLogueado.Email && !usuarioLogueado.tipoUsuario) {
    if (allowedRoles.includes("pyme")) {
      return children;
    }
  }

  // Caso normal (usuarios con tipoUsuario)
  if (usuarioLogueado.tipoUsuario && allowedRoles.includes(usuarioLogueado.tipoUsuario)) {
    return children;
  }

  return <Navigate to="/Home" />;
};

export default PrivateRoute;
