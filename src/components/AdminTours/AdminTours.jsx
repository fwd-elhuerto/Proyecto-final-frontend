import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ServicesDestinos from '../../services/ServicesDestinos'; 
import ServicesTours from '../../services/ServicesTours';

function AdminTours() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [duracion, setDuracion] = useState('');
    const [precio, setPrecio] = useState('');
    const [poliza, setPoliza] = useState('');
    const [incluye, setIncluye] = useState('');
    const [puntoPartida, setPuntoPartida] = useState('');
    const [destinoId, setDestinoId] = useState('');
    const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
    const [destinos, setDestinos] = useState([])
    const [Tours, setTours] = useState([]);


     useEffect(() => {
         const traerTours = async () => {
           const datosT = await ServicesTours.getTours();
           const toursPyme = datosT.filter(
             (t => t.pymeId === usuarioLogueado.id)
           );
           setTours(toursPyme);
         };
         traerTours();
       }, [usuarioLogueado.id]);

    // Carga de destinos para el select
    useEffect(() => {
        const traerDestinos = async () => {
                const datos = await ServicesDestinos.getDestinos()
                setDestinos(datos)
             
            }
            traerDestinos()
          }, [])
          
          
    const RegistroTour = async () => {
        // Validación básica
        if (!nombre.trim() || !descripcion.trim() || !duracion.trim() || !precio || !poliza.trim() || !incluye.trim() || !puntoPartida.trim() || !destinoId) {
            Swal.fire("Error", "Por favor, complete todos los campos obligatorios.", "error");
            return;
        }
        
        // Convertir la lista de "incluye" de string a array de strings
        const itemsIncluidos = incluye.split(',').map(item => item.trim());


        const nuevoTour = {
            pymeId: usuarioLogueado.id, 
            destinoId: (destinoId),
            nombre,
            descripcion,
            duracion,
            precio: Number(precio), // asegurar de que el precio sea un número
            poliza,
            incluye: itemsIncluidos, 
            punto_partida: puntoPartida,
            calificacion: ""
            };

            const tourRegistrado = await ServicesTours.postTour(nuevoTour);
            Swal.fire('¡Éxito!', 'El tour ha sido registrado correctamente.', 'success');
            
            //resetear el formulario
            setNombre(''); setDescripcion(''); setDuracion(''); setPrecio(''); 
            setPoliza(''); setIncluye(''); setPuntoPartida(''); setDestinoId('');
    };

  return (
    <div className='container'>
        <h3>Bienvenido a tu panel de administación, empieza agregando un tour o administra los que ya tienes</h3>
        <br />
        <br />


                    <div className="mb-3">
                        <label htmlFor="nombre" className="label-standard">Nombre del Tour</label>
                        <input 
                            type="text" 
                            className="form-control"  // form control hace el input mas grande y con espaciado
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="destinoId" className="label-standard">Destino</label>
                        <select 
                            className="form-select" 
                            value={destinoId} 
                            onChange={(e) => setDestinoId(e.target.value)}>
                            <option value="">Seleccione un destino</option>
                            {/* Mapeo de destinos */}
                            {destinos.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="descripcion" className="label-standard">Descripción</label>
                        <textarea 
                            className="form-control"
                            value={descripcion} 
                            onChange={(e) => setDescripcion(e.target.value)}>
                        </textarea>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="duracion" className="label-standard">Duración (ej: 8 horas)</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={duracion} 
                            onChange={(e) => setDuracion(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="precio" className="label-standard">Precio (₡)</label>
                        <input 
                            type="number" 
                            className="form-control"
                            onChange={(e) => setPrecio(e.target.value)}/>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="poliza" className="label-standard">Póliza</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={poliza} 
                            onChange={(e) => setPoliza(e.target.value)}/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="incluye" className="label-standard">Incluye</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={incluye} 
                            onChange={(e) => setIncluye(e.target.value)} 
                            placeholder="Separe cada ítem con una coma (ej: Almuerzo, Guía, Agua)"/>
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="puntoPartida" className="label-standard">Punto de Partida</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={puntoPartida} 
                            onChange={(e) => setPuntoPartida(e.target.value)}/>
                    </div>

                    <button onClick={RegistroTour} className="btn btn-primary">
                        Registrar Tour
                    </button>    


    </div>
  )
}

export default AdminTours