async function getDestinos () {
    try {
        const response = await fetch("http://localhost:3001/destinos", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    } catch (error) {
        console.error("Error al obtener los destinos", error)
        throw error
    }
}

async function postDestino (destino) {
    try {
        const response = await fetch("http://localhost:3001/destinos", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(destino)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al guardar el destino", error)
        throw error
    }
}

async function deleteDestino (id) {
    try {
        await fetch("http://localhost:3001/destinos/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error al eliminar el destino", error)
        throw error
    }
}

async function putDestino (destino, id) {
    try {
        const response = await fetch("http://localhost:3001/destinos/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(destino)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al actualizar el destino", error)
        throw error
    }
}

export default { getDestinos, postDestino, deleteDestino, putDestino }
