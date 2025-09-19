async function getComentarios () {
    try {
        const response = await fetch("http://localhost:3001/comentarios", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    } catch (error) {
        console.error("Error al obtener los comentarios", error)
        throw error
    }
}

async function postComentarios (comentario) {
    try {
        const response = await fetch("http://localhost:3001/comentarios", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comentario)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al guardar el comentario", error)
        throw error
    }
}

async function deleteComentarios (id) {
    try {
        await fetch("http://localhost:3001/comentarios/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error al eliminar el comentario", error)
        throw error
    }
}

async function putComentarios (comentario, id) {
    try {
        const response = await fetch("http://localhost:3001/comentarios/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(comentario)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al actualizar el comentario", error)
        throw error
    }
}

export default { getComentarios, postComentarios, deleteComentarios, putComentarios }
