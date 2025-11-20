import axios from "axios"

const baseUrl = 'http://localhost:3001'
const personsUrl = `${baseUrl}/persons`
const personsUrlById = (id) => `${personsUrl}/${id}`

const getPersons = () => axios
    .get(personsUrl)
    .then((response) => response.data)

const addPerson = (person) => axios
    .post(personsUrl, person)
    .then((response) => response.data)

const deletePerson = (id) => axios
    .delete(personsUrlById(id))
    .then(() => null)

const updatePerson = (person) => axios
    .put(personsUrlById(person.id), person)
    .then((response) => response.data)

export default { getPersons, addPerson, deletePerson, updatePerson }
