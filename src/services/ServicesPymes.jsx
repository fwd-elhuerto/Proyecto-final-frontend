async function getPymes () {
    try {
        const response = await fetch("http://localhost:3001/pymes", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    } catch (error) {
        console.error("Error al obtener las pymes", error)
        throw error
    }
}

async function postPymes (pyme) {
    try {
        const response = await fetch("http://localhost:3001/pymes", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pyme)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al guardar la pyme", error)
        throw error
    }
}

async function deletePymes (id) {
    try {
        await fetch("http://localhost:3001/pymes/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error al eliminar la pyme", error)
        throw error
    }
}

async function putPymes (pyme, id) {
    try {
        const response = await fetch("http://localhost:3001/pymes/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pyme)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al actualizar la pyme", error)
        throw error
    }
}

export default { getPymes, postPymes, deletePymes, putPymes }
