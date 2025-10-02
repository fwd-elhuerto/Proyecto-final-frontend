import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ServicesEmprendedor from '../../../services/ServicesEmprendedor';

function PanelEmprendedor() {
  
    const [Emprendedores, setEmprendedores] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [emprendedorEditando, setEmprendedorEditando] = useState(null); 
    const [imagenFileEdit, setImagenFileEdit] = useState(null); // Archivo para la edición
    const [nombre, setNombre] = useState('');
    const [historia, setHistoria] = useState('');
    const [imagenFileCrear, setImagenFileCrear] = useState(null); // Archivo para la creación

    //get
    const traerEmprendedores = async () => {
        try {
            const datosE = await ServicesEmprendedor.getEmprendedores();
            setEmprendedores(datosE);
        } catch (error) {
            console.error("Error al cargar emprendedores:", error);
            Swal.fire("Error", "No se pudieron cargar los emprendedores.", "error");
        }
    };

    useEffect(() => {
        traerEmprendedores();
    }, []);

    // subir imgs clouddinary
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

    // post
    const nuevoEmprende = async () => {
        // Validación
        if (!nombre.trim() || !historia.trim()) {
            Swal.fire("Error", "El nombre y la historia son obligatorios.", "error");
            return;
        }
        if (!imagenFileCrear) {
            Swal.fire("Error", "Debe seleccionar una imagen.", "error");
            return;
        }

        try {
            const imagenUrl = await subirImagen(imagenFileCrear);
            const emprendedorParaGuardar = {
                nombre,
                historia,
                imagen: imagenUrl,
            };
            const emprendedorCreado = await ServicesEmprendedor.postEmprendedores(emprendedorParaGuardar);

            Swal.fire("¡Éxito!", "Emprendedor creado correctamente. 🎉", "success");
            
            //actualizar estado y limpiar form
            setEmprendedores([...Emprendedores, emprendedorCreado]);
            setNombre(''); 
            setHistoria('');
            setImagenFileCrear(null);
            document.getElementById('fileInputCrear').value = ''; 

        } catch (error) {
            console.error("Error al crear el emprendedor:", error);
            Swal.fire("Error", "Ocurrió un problema al crear el emprendedor.", "error");
        }
    };

    // put
    const editarEmprendedor = (emprendedor) => {
        setEmprendedorEditando({ ...emprendedor });
        setImagenFileEdit(null); 
        setShowEditModal(true);
    };

    const editarEm = async () => {
        // Validación
        if (!emprendedorEditando?.nombre?.trim() || !emprendedorEditando?.historia?.trim()) {
            Swal.fire("Error", "El nombre y la historia son obligatorios.", "error");
            return;
        }

        try {
            let imagenUrl = emprendedorEditando.imagen;

            // subir nueva imagen si se seleccionó
            if (imagenFileEdit) {
                imagenUrl = await subirImagen(imagenFileEdit);
            }
            
            // crear objeto actualizado
            const emprendedorActualizado = {
                ...emprendedorEditando,
                imagen: imagenUrl,
            };

            await ServicesEmprendedor.putEmprendedores(emprendedorActualizado, emprendedorEditando.id);

            Swal.fire("¡Éxito!", "Emprendedor actualizado correctamente.", "success");
            setShowEditModal(false);
            
            //actualizar estado local
            setEmprendedores(prevEmprendedores => 
                prevEmprendedores.map(e => (e.id === emprendedorActualizado.id ? emprendedorActualizado : e))
            );

        } catch (error) {
            console.error("Error al actualizar el emprendedor:", error);
            Swal.fire("Error", "Ocurrió un problema al guardar los cambios.", "error");
        }
    };

    //delete
    const eliminarEmprendedor = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await ServicesEmprendedor.deleteEmprendedores(id);
                setEmprendedores(Emprendedores.filter(e => e.id !== id));
                Swal.fire("¡Eliminado!", "El emprendedor ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar el emprendedor:", error);
                Swal.fire("Error", "Ocurrió un problema al eliminar.", "error");
            }
        }
    };
    

    return (
        <div className="container mt-5">
            <h1>Panel de Emprendedores</h1>

            {/*agregar*/}
            <div className="card shadow mb-5 p-4">
                <h2>Agregar Nuevo Emprendedor</h2>
                <hr />
                
                <div className="mb-3">
                    <label htmlFor="nombreCrear" className="label-standard">Nombre del Emprendedor</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombreCrear"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="historiaCrear" className="label-standard">Historia</label>
                    <textarea 
                        className="form-control"
                        id="historiaCrear"
                        value={historia} 
                        onChange={(e) => setHistoria(e.target.value)}
                    ></textarea>
                </div>

                <div className="mb-3">
                    <label htmlFor="fileInputCrear" className="label-standard">Imagen</label>
                    <input 
                        type="file" 
                        accept="image/*" 
                        id="fileInputCrear"
                        onChange={(e) => setImagenFileCrear(e.target.files[0])} 
                        className="form-control" 
                    />
                </div>

                <button onClick={nuevoEmprende} className="btn btn-success mt-3">
                    Registrar Emprendedor
                </button>
            </div>

            {/* renderizar */}
            <h2>Emprendedores Registrados</h2>
            <hr />
            <div className="row">
                {Emprendedores.length > 0 ? (
                    Emprendedores.map((emprendedor) => (
                        <div key={emprendedor.id} className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img 
                                            src={emprendedor.imagen} 
                                            className="img-fluid rounded-start" 
                                            alt={emprendedor.nombre} 
                                            style={{ height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="col-md-8 p-3">
                                        <h3 className="card-title">{emprendedor.nombre}</h3>
                                        <p className="card-text text-muted text-truncate">{emprendedor.historia}</p>
                                        <p className="card-text">
                                            <small>ID: {emprendedor.id}</small>
                                        </p>
                                        
                                        <Button variant="info" className="me-2" onClick={() => editarEmprendedor(emprendedor)}>Editar</Button>
                                        <Button variant="danger" onClick={() => eliminarEmprendedor(emprendedor.id)}>Eliminar</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay emprendedores registrados. Utiliza el formulario de arriba para agregar uno.</p>
                )}
            </div>

            {/* modal edicion*/}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Emprendedor: {emprendedorEditando?.nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {emprendedorEditando && (
                        <>
                            <p className="text-muted">ID: {emprendedorEditando.id}</p>
                            
                            <label className="label-standard">Nombre</label>
                            <input 
                                type="text" 
                                name="nombre" 
                                value={emprendedorEditando.nombre || ""} 
                                onChange={(e) => setEmprendedorEditando({...emprendedorEditando, nombre: e.target.value})} 
                                className="form-control mb-2" 
                            />
                            <label className="label-standard">Historia</label>
                            <textarea 
                                name="historia" 
                                value={emprendedorEditando.historia || ""} 
                                onChange={(e) => setEmprendedorEditando({...emprendedorEditando, historia: e.target.value})} 
                                className="form-control mb-2" 
                            />
                            <label className="label-standard">Imagen (Cambiar)</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={(e) => setImagenFileEdit(e.target.files[0])} 
                                className="form-control mb-2" 
                            />
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={editarEm}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PanelEmprendedor;