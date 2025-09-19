async function getTours () {
    try {
        const response = await fetch("http://localhost:3001/tours", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    } catch (error) {
        console.error("Error al obtener los tours", error)
        throw error
    }
}

async function postTour (tour) {
    try {
        const response = await fetch("http://localhost:3001/tours", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tour)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al guardar el tour", error)
        throw error
    }
}

async function deleteTour (id) {
    try {
        await fetch("http://localhost:3001/tours/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error al eliminar el tour", error)
        throw error
    }
}

async function putTour (tour, id) {
    try {
        const response = await fetch("http://localhost:3001/tours/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tour)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al actualizar el tour", error)
        throw error
    }
}

export default { getTours, postTour, deleteTour, putTour }
