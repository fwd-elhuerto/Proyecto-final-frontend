async function getSolicitudes () {
    try {
        const response = await fetch("http://localhost:3001/solicitudUsuario", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    } catch (error) {
        console.error("Error al obtener las solicitudes", error)
        throw error
    }
}

async function postSolicitud (solicitud) {
    try {
        const response = await fetch("http://localhost:3001/solicitudUsuario", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitud)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al guardar la solicitud", error)
        throw error
    }
}

async function deleteSolicitud (id) {
    try {
        await fetch("http://localhost:3001/solicitudUsuario/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error al eliminar la solicitud", error)
        throw error
    }
}

async function putSolicitud (solicitud, id) {
    try {
        const response = await fetch("http://localhost:3001/solicitudUsuario/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(solicitud)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al actualizar la solicitud", error)
        throw error
    }
}

export default { getSolicitudes, postSolicitud, deleteSolicitud, putSolicitud }
