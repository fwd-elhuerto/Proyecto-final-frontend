import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ServicesDestinos from '../../../services/ServicesDestinos';
// Asegúrate de tener un archivo ServicesDestinos.js con get, post, put, delete.

function PanelDestino() {
    // --- ESTADOS PARA LA LISTA Y EDICIÓN ---
    const [Destinos, setDestinos] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [destinoEditando, setDestinoEditando] = useState(null); 
    const [imagenFile, setImagenFile] = useState(null); // Archivo para la edición

    // --- ESTADOS PARA LA CREACIÓN (FORMULARIO AL INICIO) ---
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    // Usaremos un input de tipo file directamente para la imagen principal del POST
    const [nuevaImagenFile, setNuevaImagenFile] = useState(null); 

    // --- Lógica de Carga de Datos (READ) ---
    useEffect(() => {
        traerDestinos();
    }, []);

    const traerDestinos = async () => {
        try {
            const datosD = await ServicesDestinos.getDestinos();
            setDestinos(datosD);
        } catch (error) {
            console.error("Error al cargar destinos:", error);
            Swal.fire("Error", "No se pudieron cargar los destinos.", "error");
        }
    };

    // --- Lógica de Cloudinary ---
    const subirImagen = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "isleñoImages"); 
        
        const res = await fetch("https://api.cloudinary.com/v1_1/de6vndqlu/image/upload", {
            method: "POST",
            body: data,
        });
        const result = await res.json();
        return result.secure_url;
    };

    // --- Lógica de CREACIÓN (POST) ---
    const handleCrearDestino = async () => {
        if (!nombre.trim() || !descripcion.trim()) {
            Swal.fire("Error", "El nombre y la descripción son obligatorios.", "error");
            return;
        }
        if (!nuevaImagenFile) {
            Swal.fire("Error", "Debe seleccionar una imagen principal.", "error");
            return;
        }

        try {
            // 1. Subir la imagen a Cloudinary
            const imagenUrl = await subirImagen(nuevaImagenFile);
            
            // 2. Crear el objeto final para guardar
            const destinoParaGuardar = {
                nombre,
                descripcion,
                imagen: imagenUrl,
                otrasImg: [] // Inicializar array de otras imágenes
            };

            // 3. Llamar al servicio de creación (POST)
            const destinoCreado = await ServicesDestinos.postDestino(destinoParaGuardar);

            Swal.fire("¡Éxito!", "Destino creado correctamente. 🎉", "success");
            
            // 4. Actualizar el estado local y limpiar formulario
            setDestinos([...Destinos, destinoCreado]);
            setNombre(''); 
            setDescripcion('');
            setNuevaImagenFile(null);
            // Esto limpia el input de archivo, pero a veces requiere una clave o un reset manual en el DOM
            document.getElementById('fileInputCrear').value = ''; 

        } catch (error) {
            console.error("Error al crear el destino:", error);
            Swal.fire("Error", "Ocurrió un problema al crear el destino.", "error");
        }
    };

    // --- Lógica de Edición (UPDATE) ---
    const editarDestino = (destino) => {
        setDestinoEditando({ ...destino });
        setImagenFile(null); // Limpiar el archivo al abrir
        setShowEditModal(true);
    };

    const handleGuardar = async () => {
        if (!destinoEditando?.nombre?.trim() || !destinoEditando?.descripcion?.trim()) {
            Swal.fire("Error", "El nombre y la descripción son obligatorios.", "error");
            return;
        }

        try {
            let imagenUrl = destinoEditando.imagen;

            // 1. Subir la nueva imagen si se seleccionó una
            if (imagenFile) {
                imagenUrl = await subirImagen(imagenFile);
            }
            
            // 2. Crear el objeto final actualizado
            const destinoActualizado = {
                ...destinoEditando,
                imagen: imagenUrl,
            };

            // 3. Llamar al servicio de actualización
            await ServicesDestinos.putDestino(destinoActualizado, destinoEditando.id);

            Swal.fire("¡Éxito!", "Destino actualizado correctamente. 🎉", "success");
            setShowEditModal(false);
            
            // 4. Actualizar el estado local
            setDestinos(prevDestinos => 
                prevDestinos.map(d => (d.id === destinoActualizado.id ? destinoActualizado : d))
            );

        } catch (error) {
            console.error("Error al actualizar el destino:", error);
            Swal.fire("Error", "Ocurrió un problema al guardar los cambios.", "error");
        }
    };

    // --- Lógica de Eliminación (DELETE) ---
    const eliminarDestino = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡Eliminará todos los tours asociados a este destino!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await ServicesDestinos.deleteDestino(id);
                setDestinos(Destinos.filter(d => d.id !== id));
                Swal.fire("¡Eliminado!", "El destino ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar el destino:", error);
                Swal.fire("Error", "Ocurrió un problema al eliminar.", "error");
            }
        }
    };
    
    // --- Renderizado ---
    return (
        <div className="container mt-5">
            <h1>Panel de Destinos</h1>

            {/* SECCIÓN DE AGREGAR NUEVO DESTINO (Formulario al inicio) */}
            <div className="card shadow mb-5 p-4">
                <h2>Agregar Nuevo Destino</h2>
                <hr />
                
                <div className="mb-3">
                    <label htmlFor="nombreCrear" className="form-label">Nombre del Destino</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombreCrear"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="descripcionCrear" className="form-label">Descripción</label>
                    <textarea 
                        className="form-control"
                        id="descripcionCrear"
                        value={descripcion} 
                        onChange={(e) => setDescripcion(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="fileInputCrear" className="form-label">Imagen Principal</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="fileInputCrear"
                        onChange={(e) => setNuevaImagenFile(e.target.files[0])} 
                        className="form-control" 
                    />
                </div>

                <button onClick={handleCrearDestino} className="btn btn-success mt-3">
                    Registrar Destino
                </button>
            </div>

            {/* SECCIÓN DE LISTADO Y ADMINISTRACIÓN DE DESTINOS */}
            <h2>Destinos Registrados</h2>
            <hr />
            <div className="row">
                {Destinos.length > 0 ? (
                    Destinos.map((destino) => (
                        <div key={destino.id} className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="row g-0">
                                    {/* Imagen */}
                                    <div className="col-md-4">
                                        <img 
                                            src={destino.imagen} 
                                            className="img-fluid rounded-start" 
                                            alt={destino.nombre} 
                                            style={{ height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    {/* Detalles y acciones */}
                                    <div className="col-md-8 p-3">
                                        <h3 className="card-title">{destino.nombre}</h3>
                                        <p className="card-text text-muted">{destino.descripcion}</p>
                                        <p className="card-text">
                                            <small>ID: {destino.id}</small>
                                        </p>
                                        
                                        <Button variant="info" className="me-2" onClick={() => editarDestino(destino)}>Editar</Button>
                                        <Button variant="danger" onClick={() => eliminarDestino(destino.id)}>Eliminar</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay destinos registrados. Utilice el formulario de arriba para agregar uno.</p>
                )}
            </div>

            {/* --- MODAL DE EDICIÓN (Se mantiene con modal para no sobrecargar la pantalla) --- */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Destino: {destinoEditando?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {destinoEditando && (
                        <>
                            <label className="label-standard">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={destinoEditando.nombre || ""} 
                                onChange={(e) => setDestinoEditando({...destinoEditando, nombre: e.target.value})} 
                                className="form-control mb-2" 
                            />
                            <label className="label-standard">Descripción</label>
                            <textarea 
                                name="descripcion" 
                                value={destinoEditando.descripcion || ""} 
                                onChange={(e) => setDestinoEditando({...destinoEditando, descripcion: e.target.value})} 
                                className="form-control mb-2" 
                            />
                            <label className="label-standard">Imagen Principal (Cambiar)</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setImagenFile(e.target.files[0])} 
                                className="form-control mb-2" 
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleGuardar}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PanelDestino;