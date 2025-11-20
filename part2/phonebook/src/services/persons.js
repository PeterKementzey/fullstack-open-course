import axios from "axios"

const baseUrl = 'http://localhost:3001'
const personsUrl = `${baseUrl}/persons`
const personsUrlById = (id) => `${personsUrl}/${id}`

const getPersons = () => axios
    .get(personsUrl)
    .then((response) => response.data)
    .catch((error) => {
        console.error("Could not GET persons:", error)
        return []
    })

const addPerson = (person) => axios
    .post(personsUrl, person)
    .then((response) => response.data)
    .catch((error) => {
        console.error(`Could not POST person ${person.name} with error:`, error, "not posted person:", person)
        return person
    })

const deletePerson = (id) => axios
    .delete(personsUrlById(id))
    .then(() => null)
    .catch((error) => {
        console.error(`Could not DELETE person with id ${id} with error:`, error)
    })

export default { getPersons, addPerson, deletePerson }
