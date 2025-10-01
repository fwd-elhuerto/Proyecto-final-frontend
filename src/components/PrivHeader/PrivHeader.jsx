// PrivHeader.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import titulo from "../Header/tituloIsleño.png";
import ServicesUser from "../../services/ServicesUser";
import ServicesPymes from "../../services/ServicesPymes";
import "../Header/Header.css";

function PrivHeader() {
  const navegar = useNavigate();
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState(usuarioLogueado || {});
  const [users, setUsers] = useState([]);
  const [pymes, setPymes] = useState([]);
  const [imagenFile, setImagenFile] = useState(null);

  useEffect(() => {
    if (usuarioLogueado) setFormData(usuarioLogueado);
  }, [usuarioLogueado]);

  useEffect(() => {
    const pedirUser = async () => {
      const datosU = await ServicesUser.getUsuarios();
      setUsers(datosU);
    };
    pedirUser();
  }, []);

  useEffect(() => {
    const traerPymes = async () => {
      const datosP = await ServicesPymes.getPymes();
      setPymes(datosP);
    };
    traerPymes();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // subida a Cloudinary si hay imagen nueva
  const subirImagen = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "isleñoImages"); // tu preset
    const res = await fetch(`https://api.cloudinary.com/v1_1/de6vndqlu/image/upload`, {
      method: "POST",
      body: data,
    });
    const result = await res.json();
    return result.secure_url;
  };

  const handleSave = async () => {
    try {
      if (!usuarioLogueado) return;

      if (usuarioLogueado.tipoUsuario === "admin") {
        // validar admin (uso users para duplicados)
        if (!formData.Nombre?.trim() || !formData.Email?.trim() || !formData.Password?.trim()) {
          Swal.fire("Error", "Todos los campos son obligatorios.", "error");
          return;
        }
        const dup = users.find(
          (u) =>
            (u.Email === formData.Email || u.Nombre === formData.Nombre) &&
            u.id !== usuarioLogueado.id
        );
        if (dup) {
          Swal.fire("Error", "El nombre o correo ya están en uso.", "error");
          return;
        }

        await ServicesUser.putUsuarios(formData, usuarioLogueado.id);
        Swal.fire("¡Éxito!", "Perfil de admin actualizado.", "success");
        setShow(false);
        return;
      }

      // si es pyme
      if (usuarioLogueado.tipoUsuario !== "admin") {
        // validaciones pyme
        if (
          !formData.Nombre?.trim() ||
          !formData.anhos_xp?.toString().trim() ||
          !formData.descripcion?.trim() ||
          !formData.numero?.trim() ||
          !formData.Email?.trim() ||
          !formData.Password?.trim()
        ) {
          Swal.fire("Error", "Todos los campos deben ser completados.", "error");
          return;
        }

        // comprobar duplicados entre pymes y usuarios (excluyendo actual)
        const dupPyme = pymes.find(
          (p) =>
            (p.Email === formData.Email || p.Nombre === formData.Nombre) &&
            p.id !== usuarioLogueado.id
        );
        const dupUser = users.find(
          (u) => (u.Email === formData.Email || u.Nombre === formData.Nombre) && u.id !== usuarioLogueado.id
        );
        if (dupPyme || dupUser) {
          Swal.fire("Error", "El nombre o correo ya están en uso.", "error");
          return;
        }

        // si subieron imagen, subir a Cloudinary primero
        if (imagenFile) {
          const url = await subirImagen(imagenFile);
          formData.imagen = url;
        }

        // parsear calificación si necesario
        if (formData.calificacion) {
          formData.calificacion = Number(formData.calificacion);
        }

        await ServicesPymes.putPymes(formData, usuarioLogueado.id);
        Swal.fire("¡Éxito!", "Perfil de pyme actualizado.", "success");
        setShow(false);
        return;
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Ocurrió un problema al guardar.", "error");
    }
  };

  const cerrarSesion = () => {
    sessionStorage.clear();
    navegar("/SessionManager");
  };

  return (
    <header className="headS">
      <Link to="/Home">
        <img className="imgTitulo" src={titulo} alt="Isleño" />
      </Link>

      <h3>Bienvenido {usuarioLogueado?.Nombre}</h3>

      <Dropdown align="end">
        <Dropdown.Toggle as="button" className="menu-btn">
          ☰
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShow(true)}>Editar perfil</Dropdown.Item>
          <Dropdown.Item onClick={cerrarSesion}>Cerrar sesión</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {usuarioLogueado?.tipoUsuario === "admin" ? (
            <>
              <label className="label-standard">Nombre</label>
              <input
                type="text"
                name="Nombre"
                value={formData.Nombre || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Email</label>
              <input
                type="email"
                name="Email"
                value={formData.Email || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Contraseña</label>
              <input
                type="password"
                name="Password"
                value={formData.Password || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </>
          ) : (
            <>
              <label className="label-standard">Nombre</label>
              <input
                type="text"
                name="Nombre"
                value={formData.Nombre || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Años de experiencia</label>
              <input
                type="number"
                name="anhos_xp"
                value={formData.anhos_xp || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Calificación</label>
              <input
                type="number"
                step="0.1"
                name="calificacion"
                value={formData.calificacion || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Descripción</label>
              <textarea
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Número</label>
              <input
                type="text"
                name="numero"
                value={formData.numero || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Logo / Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImagenFile(e.target.files[0])}
                className="form-control mb-2"
              />

              <label className="label-standard">Email</label>
              <input
                type="email"
                name="Email"
                value={formData.Email || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />

              <label className="label-standard">Contraseña</label>
              <input
                type="password"
                name="Password"
                value={formData.Password || ""}
                onChange={handleChange}
                className="form-control mb-2"
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default PrivHeader;
