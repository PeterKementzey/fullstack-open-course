import { useState } from 'react'
import Form from './Form'
import Contacts from './Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 42 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
