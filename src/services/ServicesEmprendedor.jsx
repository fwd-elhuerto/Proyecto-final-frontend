async function getEmprendedores () {
    try {
        const response = await fetch("http://localhost:3001/emprendedores", {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
        return await response.json()
    } catch (error) {
        console.error("Error al obtener los Emprendedores", error)
        throw error
    }
}

async function postEmprendedores (emprendedor) {
    try {
        const response = await fetch("http://localhost:3001/emprendedores", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emprendedor)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al guardar el emprendedor", error)
        throw error
    }
}

async function deleteEmprendedores (id) {
    try {
        await fetch("http://localhost:3001/emprendedores/" + id, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
    } catch (error) {
        console.error("Error al eliminar el emprendedor", error)
        throw error
    }
}

async function putEmprendedores (emprendedor, id) {
    try {
        const response = await fetch("http://localhost:3001/emprendedores/" + id, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emprendedor)
        })
        return await response.json()
    } catch (error) {
        console.error("Error al actualizar el emprendedor", error)
        throw error
    }
}

export default { getEmprendedores, postEmprendedores, deleteEmprendedores, putEmprendedores }