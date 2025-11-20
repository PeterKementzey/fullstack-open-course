import { useEffect, useState } from 'react'
import Contacts from './Contacts'
import Form from './Form'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const getInitialPersons = () => {
    personsService
      .getPersons()
      .then(setPersons)
  }
  useEffect(getInitialPersons, [])

  const submitFormHandler = (event) => {
    event.preventDefault()
    if (persons.find(({ name }) => name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber }
      personsService
        .addPerson(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const formProps = {
    title: "Add",
    submit: {
      submitName: "add",
      submitFormHandler: submitFormHandler,
    },
    inputs: [
      { label: "name", type: "text", value: newName, setValue: setNewName },
      { label: "number", type: "tel", value: newNumber, setValue: setNewNumber },
    ]
  }

  const contactsToDisplay = persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))

  return <div>
    <h1>Phonebook</h1>
    <Form {...formProps} />
    <Contacts contacts={contactsToDisplay} filterValue={filter} setFilter={setFilter} />
  </div>

}

export default App
