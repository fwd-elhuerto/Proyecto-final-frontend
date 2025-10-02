import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ServicesUser from '../../../services/ServicesUser';


function PanelUsuarios() {

    const [Users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userEditando, setUserEditando] = useState(null); 

   
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [tipoUsuario, setTipoUsuario] = useState('cliente'); // Valor por defecto

    // get
    const traerUsuarios = async () => {
        try {
            const datosU = await ServicesUser.getUsuarios();
            setUsers(datosU);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
            Swal.fire("Error", "No se pudieron cargar los usuarios.", "error");
        }
    };

    useEffect(() => {
        traerUsuarios();
    }, []);

    // post
    const handleCrearUsuario = async () => {
        // Validación básica
        if (!nombre.trim() || !email.trim() || !password.trim()) {
            Swal.fire("Error", "Todos los campos (Nombre, Email, Contraseña) son obligatorios.", "error");
            return;
        }

        // Validación de duplicados
        const emailDuplicado = Users.some(u => u.Email.toLowerCase() === email.toLowerCase());
        const nombreDuplicado = Users.some(u => u.Nombre.toLowerCase() === nombre.toLowerCase());

        if (emailDuplicado || nombreDuplicado) {
            Swal.fire("Error", "El Nombre o Email ya están en uso.", "error");
            return;
        }

        try {
            const usuarioParaGuardar = {
                Nombre: nombre,
                Email: email,
                Password: password,
                tipoUsuario: tipoUsuario
            };

            
            const usuarioCreado = await ServicesUser.postUsuarios(usuarioParaGuardar);

            Swal.fire("¡Éxito!", "Usuario creado correctamente.", "success");
            
            // Actualizar el estado local y limpiar formulario
            setUsers([...Users, usuarioCreado]);
            setNombre(''); 
            setEmail('');
            setPassword('');
            setTipoUsuario('cliente'); // Resetear a valor por defecto

        } catch (error) {
            console.error("Error al crear el usuario:", error);
            Swal.fire("Error", "Ocurrió un problema al crear el usuario.", "error");
        }
    };

    //patch
    const editarUsuario = (user) => {
        // Clonar el objeto y establecerlo en el estado del modal
        setUserEditando({ ...user });
        setShowEditModal(true);
    };

    const editar = async () => {
        if (!userEditando?.Nombre?.trim() || !userEditando?.Email?.trim() || !userEditando?.Password?.trim()) {
            Swal.fire("Error", "El nombre, email y contraseña son obligatorios.", "error");
            return;
        }
        
        // Validación de duplicados (excluyendo el usuario actual)
        const dup = Users.find(
            (u) =>
                (u.Email.toLowerCase() === userEditando.Email.toLowerCase() || 
                 u.Nombre.toLowerCase() === userEditando.Nombre.toLowerCase()) &&
                u.id !== userEditando.id
        );
        if (dup) {
            Swal.fire("Error", "El Nombre o Email ya están en uso.", "error");
            return;
        }

        try {
            // objeto completo actualizado
            await ServicesUser.putUsuarios(userEditando, userEditando.id);

            Swal.fire("¡Éxito!", "Usuario actualizado correctamente.", "success");
            setShowEditModal(false);
            
            
            setUsers(prevUsers => 
                prevUsers.map(u => (u.id === userEditando.id ? userEditando : u))
            );

        } catch (error) {
            console.error("Error al actualizar el usuario:", error);
            Swal.fire("Error", "Ocurrió un problema al guardar los cambios.", "error");
        }
    };

    //delete
    const eliminarUsuario = async (id) => {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "¡No podrás revertir esto! Se eliminarán todos los datos asociados al usuario.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
        });

        if (result.isConfirmed) {
            try {
                await ServicesUser.deleteUsuarios(id);
                setUsers(Users.filter(u => u.id !== id));
                Swal.fire("¡Eliminado!", "El usuario ha sido eliminado.", "success");
            } catch (error) {
                console.error("Error al eliminar el usuario:", error);
                Swal.fire("Error", "Ocurrió un problema al eliminar.", "error");
            }
        }
    };
    

    return (
        <div className="container mt-5">
            <h1>Panel de Administración de Usuarios</h1>

            {/* form*/}
            <div className="card shadow mb-5 p-4">
                <h2>Agregar Nuevo Usuario</h2>
                <hr />
                
                <div className="mb-3">
                    <label htmlFor="nombreCrear" className="label-standard">Nombre</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="nombreCrear"
                        value={nombre} 
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="emailCrear" className="label-standard">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="emailCrear"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="passwordCrear" className="label-standard">Contraseña</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="passwordCrear"
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipoUsuarioCrear" className="label-standard">Tipo de Usuario</label>
                    <select
                        className="form-select"
                        id="tipoUsuarioCrear"
                        value={tipoUsuario}
                        onChange={(e) => setTipoUsuario(e.target.value)}
                    >
                        <option value="cliente">Cliente</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                <button onClick={handleCrearUsuario} className="btn btn-success mt-3">
                    Registrar Usuario
                </button>
            </div>

            {/* administración*/}
            <h2>Usuarios Registrados</h2>
            <hr />
            <div className="row">
                {Users.length > 0 ? (
                    Users.map((user) => (
                        <div key={user.id} className="col-md-6 mb-4">
                            <div className="card h-100 shadow-sm">
                                <div className="p-3">
                                    <h3 className="card-title">{user.Nombre}</h3>
                                    <ul className="list-unstyled">
                                        <li><strong>Email:</strong> {user.Email}</li>
                                        <li><strong>Tipo:</strong> {user.tipoUsuario}</li>
                                        <li><strong>Contraseña (oculta):</strong> *********</li>
                                        <li><strong>ID:</strong> {user.id}</li>
                                    </ul>
                                    
                                    <Button variant="info" className="me-2" onClick={() => editarUsuario(user)}>Editar</Button>
                                    <Button variant="danger" onClick={() => eliminarUsuario(user.id)}>Eliminar</Button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay usuarios registrados.</p>
                )}
            </div>

            {/* modal edicion */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Usuario: {userEditando?.Nombre}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {userEditando && (
                        <>
                            <p className="text-muted">ID: {userEditando.id}</p> {/* ID NO EDITABLE */}
                            
                            <label className="label-standard">Nombre</label>
                            <input 
                                type="text" 
                                name="Nombre" 
                                value={userEditando.Nombre || ""} 
                                onChange={(e) => setUserEditando({...userEditando, Nombre: e.target.value})} 
                                className="form-control mb-2" 
                            />
                            
                            <label className="label-standard">Email</label>
                            <input 
                                type="email" 
                                name="Email" 
                                value={userEditando.Email || ""} 
                                onChange={(e) => setUserEditando({...userEditando, Email: e.target.value})} 
                                className="form-control mb-2" 
                            />
                            
                            <label className="label-standard">Contraseña</label>
                            <input 
                                type="password" 
                                name="Password" 
                                value={userEditando.Password || ""} 
                                onChange={(e) => setUserEditando({...userEditando, Password: e.target.value})} 
                                className="form-control mb-2" 
                            />

                            <label className="label-standard">Tipo de Usuario</label>
                            <select
                                className="form-select mb-2"
                                name="tipoUsuario"
                                value={userEditando.tipoUsuario || "cliente"}
                                onChange={(e) => setUserEditando({...userEditando, tipoUsuario: e.target.value})}
                            >
                                <option value="cliente">Cliente</option>
                                <option value="admin">Administrador</option>
                            </select>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={editar}>Guardar Cambios</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PanelUsuarios;