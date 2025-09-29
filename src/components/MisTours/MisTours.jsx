import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ServicesTours from "../../services/ServicesTours";
import { Modal, Button, Form } from "react-bootstrap";

function MisTours() {
  const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
  const [Tours, setTours] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tourEditando, setTourEditando] = useState(null);

  // traer tours del pyme logueado
  useEffect(() => {
    const traerTours = async () => {
      const datosT = await ServicesTours.getTours();
      const toursPyme = datosT.filter(
        (t => t.pymeId === usuarioLogueado.id)
      );
      setTours(toursPyme);
    };
    traerTours();
  }, [usuarioLogueado.pymeId]);

  // abrir modal con datos del tour
  const editarTour = (tour) => {
    setTourEditando({ ...tour });
    setShowModal(true);
  };

  // guardar cambios
  const guardarCambios = async () => {
    if (
      !tourEditando.nombre.trim() ||
      !tourEditando.descripcion.trim() ||
      !tourEditando.duracion.trim() ||
      !tourEditando.precio ||
      !tourEditando.poliza.trim() ||
      !tourEditando.incluye.trim() ||
      !tourEditando.punto_partida.trim()
    ) {
      Swal.fire("Error", "Todos los campos son obligatorios.", "error");
      return;
    }

    // convertir incluye en array
    const itemsIncluidos = tourEditando.incluye
      .split(",")
      .map((i) => i.trim());

    const actualizado = {
      ...tourEditando,
      incluye: itemsIncluidos,
    };

    await ServicesTours.putTour(actualizado, actualizado.id);

    setTours(Tours.map((t) => (t.id === actualizado.id ? actualizado : t)));
    setShowModal(false);
    Swal.fire("¡Éxito!", "Tour actualizado correctamente.", "success");
  };

  // eliminar tour
  const eliminarTour = async (id) => {
    const result = await Swal.fire({
      title: "¿Seguro?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      await ServicesTours.deleteTour(id);
      setTours(Tours.filter((t) => t.id !== id));
      Swal.fire("Eliminado", "El tour fue eliminado con éxito", "success");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Mis Tours</h2>
      {Tours.length > 0 ? (
        Tours.map((tour) => (
          <div key={tour.id} className="row tour_card_horizontal mb-4">
            {/* Columna izquierda */}
            <div className="col-md-5 d-flex flex-column justify-content-center p-3">
                <h3 className="tour_titulo">{tour.nombre}</h3>
                <p className="tour_desc">{tour.descripcion}</p>
                <p className="tour_desc"><strong>A cargo de:</strong> {usuarioLogueado.Nombre}</p>
                <Button variant="info" onClick={() => editarTour(tour)}>Editar</Button>
                <Button variant="danger" onClick={() => eliminarTour(tour.id)}>Eliminar</Button>
            </div>

            {/* Columna derecha */}
            <div className="col-md-7 p-3 d-flex align-items-center">
                <ul className="tour_list list-unstyled mb-0 w-100">
                    <li><strong>Duración:</strong> {tour.duracion}</li>
                    <li><strong>Precio:</strong> ₡{tour.precio}</li>
                    <li><strong>Póliza:</strong> {tour.poliza}</li>
                    <li><strong>Incluye:</strong> {tour.incluye}</li>
                    <li><strong>Punto de partida:</strong> {tour.punto_partida}</li>
                    <li><strong>Calificación:</strong> {tour.calificacion}</li>
                </ul>
          </div>
          </div>
        ))
      ) : (
        <p>No tienes tours registrados.</p>
      )}

      {/* Modal de edición */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Tour</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {tourEditando && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  value={tourEditando.nombre}
                  onChange={(e) =>
                    setTourEditando({ ...tourEditando, nombre: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  value={tourEditando.descripcion}
                  onChange={(e) =>
                    setTourEditando({
                      ...tourEditando,
                      descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Duración</Form.Label>
                <Form.Control
                  type="text"
                  value={tourEditando.duracion}
                  onChange={(e) =>
                    setTourEditando({
                      ...tourEditando,
                      duracion: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={tourEditando.precio}
                  onChange={(e) =>
                    setTourEditando({
                      ...tourEditando,
                      precio: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Póliza</Form.Label>
                <Form.Control
                  type="text"
                  value={tourEditando.poliza}
                  onChange={(e) =>
                    setTourEditando({
                      ...tourEditando,
                      poliza: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Incluye</Form.Label>
                <Form.Control
                  type="text"
                  value={
                    Array.isArray(tourEditando.incluye)
                      ? tourEditando.incluye.join(", ")
                      : tourEditando.incluye
                  }
                  onChange={(e) =>
                    setTourEditando({
                      ...tourEditando,
                      incluye: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Punto de partida</Form.Label>
                <Form.Control
                  type="text"
                  value={tourEditando.punto_partida}
                  onChange={(e) =>
                    setTourEditando({
                      ...tourEditando,
                      punto_partida: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}> Cancelar</Button>
          <Button className="btn-standard" onClick={guardarCambios}> Guardar cambios</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MisTours;
