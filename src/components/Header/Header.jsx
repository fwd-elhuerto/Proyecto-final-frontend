import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import titulo from "../Header/tituloIsleño.png";
import ServicesDestinos from "../../services/ServicesDestinos";
import ServicesUser from "../../services/ServicesUser";
import "../Header/Header.css";

function Header() {
  const navegar = useNavigate();
  const location = useLocation();
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

  const [destinos, setDestinos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  const [formData, setFormData] = useState(() => {
    if (usuarioLogueado?.tipoUsuario === "cliente") {
      return usuarioLogueado;
    }
    return {};
  });

  useEffect(() => {
    const pedirUser = async () => {
      const datosU = await ServicesUser.getUsuarios();
      setUsers(datosU);
    };
    pedirUser();
  }, []);

  useEffect(() => {
    const traerDestinos = async () => {
      const datos = await ServicesDestinos.getDestinos();
      setDestinos(datos);
    };
    traerDestinos();
  }, []);

  const handleShow = () => {
    if (usuarioLogueado?.tipoUsuario === "cliente") {
      setFormData(usuarioLogueado);
    }
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.Nombre?.trim() || !formData.Email?.trim() || !formData.Password?.trim()) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }
    if (formData.Password.length < 8) {
      Swal.fire("Error", "La contraseña debe tener al menos 8 caracteres.", "error");
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

    try {
      await ServicesUser.putUsuarios(formData, usuarioLogueado.id);
      Swal.fire("¡Éxito!", "Perfil actualizado correctamente. Inicia sesión para ver los cambios.", "success");
      setShow(false);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Ocurrió un problema al guardar.", "error");
    }
  };

  const handleBusqueda = (e) => {
    const valor = e.target.value;
    setBusqueda(valor);

    if (valor.trim() === "") {
      setResultados([]);
      return;
    }

    const filtrados = destinos.filter((d) =>
      d.nombre.toLowerCase().includes(valor.toLowerCase())
    );
    setResultados(filtrados);
  };

  const irADestino = (id) => {
    setBusqueda("");
    setResultados([]);
    navegar(`/destination/${id}`);
  };

  const irASeccion = (id) => {
    if (location.pathname === "/Home") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navegar("/Home");
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
      {location.pathname === "/Home" && (
        <nav className="nav-links">
          <button className="btn-head" onClick={() => irASeccion("emprendedor")}>
            Conoce emprendedores
          </button>
          <button className="btn-head" onClick={() => irASeccion("comentarios")}>
            Experiencias de usuarios
          </button>
          <button className="btn-head" onClick={() => irASeccion("destinos")}>
            Destinos
          </button>
          <button className="btn-head" onClick={() => irASeccion("empresas")}>
            Pymes
          </button>
        </nav>
      )}

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar destinos"
          value={busqueda}
          onChange={handleBusqueda}
        />
        {resultados.length > 0 && (
          <ul className="resultados-busqueda">
            {resultados.map((dest) => (
              <li key={dest.id} onClick={() => irADestino(dest.id)}>
                {dest.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      <Dropdown align="end">
        <Dropdown.Toggle as="button" className="menu-btn" id="dropdown-basic">☰</Dropdown.Toggle>
        <Dropdown.Menu>
          {!usuarioLogueado && (
            <>
              <Dropdown.Item href="/SessionManager">Iniciar sesión</Dropdown.Item>
              <Dropdown.Item href="/SessionManager">Registrarse como usuario</Dropdown.Item>
              <Dropdown.Item href="/SessionManager">Registrarse como empresa</Dropdown.Item>
            </>
          )}
          {usuarioLogueado?.tipoUsuario === "cliente" && (
            <>
              <Dropdown.Item onClick={handleShow}>Editar perfil</Dropdown.Item>
              <Dropdown.Item onClick={cerrarSesion}>Cerrar sesión</Dropdown.Item>
            </>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="label-standard">Nombre</label>
          <input
            type="text"
            name="Nombre"
            value={formData.Nombre || ""}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Nombre"
          />
          <label className="label-standard">Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email || ""}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Email"
          />
          <label className="label-standard">Contraseña</label>
          <input
            type="password"
            name="Password"
            value={formData.Password || ""}
            onChange={handleChange}
            className="form-control mb-2"
            placeholder="Contraseña"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Cancelar</Button>
          <Button variant="primary" onClick={handleSave}>Guardar</Button>
        </Modal.Footer>
      </Modal>
    </header>
  );
}

export default Header;
