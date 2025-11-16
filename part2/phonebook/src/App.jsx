import axios from 'axios'
import { useEffect, useState } from 'react'
import Contacts from './Contacts'
import Form from './Form'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const getInitialPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        const persons = response.data
        setPersons(persons)
      })
  }
  useEffect(getInitialPersons, [])

  const submitFormHandler = (event) => {
    event.preventDefault()
    if (persons.find(({ name }) => name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName('')
    setNewNumber('')
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
