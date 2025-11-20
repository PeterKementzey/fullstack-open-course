import { useEffect, useState } from 'react'
import Contacts from './Contacts'
import Form from './Form'
import Notifications from './Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notifications, setNotifications] = useState([])

  const addNotification = (message, isError) => {
    const timeoutSeconds = 5
    const notification = {
      id: Date.now(),
      message,
      isError,
    }
    setNotifications((notifications) => [
      notification,
      ...notifications.slice(0, 2)
    ])
    const removeNotification = () => setNotifications(notifications =>
      notifications.filter((n) => n.id !== notification.id)
    )
    setTimeout(removeNotification, timeoutSeconds * 1000)
  }

  const initializePersons = () => {
    personsService
      .getPersons()
      .then(setPersons)
  }
  useEffect(initializePersons, [])

  const submitFormHandler = (event) => {
    event.preventDefault()
    const existingContact = persons.find((person) => person.name === newName)
    if (existingContact !== undefined && !window.confirm(`Update number of ${newName} to ${newNumber}?`)) { return }
    ((existingContact !== undefined) ? (
      personsService
        .updatePerson({ ...existingContact, number: newNumber })
        .then((updatedPerson) =>
          persons.map((person) => (person.id === updatedPerson.id) ? updatedPerson : person)
        ).then((updatedPersons) => {
          addNotification(`Updated ${existingContact.name} to ${newNumber}`, false)
          return updatedPersons
        })
    ) : (
      personsService
        .addPerson({ name: newName, number: newNumber })
        .then((newPerson) =>
          persons.concat(newPerson)
        ).then((extendedPersons) => {
          const newPerson = extendedPersons[extendedPersons.length - 1]
          addNotification(`Added ${newPerson.name}`, false)
          return extendedPersons
        })
    ))
      .then((changedPersons) => {
        setPersons(changedPersons)
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (person) => () => {
    if (!window.confirm(`Delete contact ${person.name}?`)) { return }
    const filteredPersons = persons.filter(({ id }) => id !== person.id)
    personsService.deletePerson(person.id).then(() =>
      setPersons(filteredPersons)
    )
  }

  const formProps = {
    title: "Add",
    submit: {
      submitName: "add",
      submitFormHandler,
    },
    inputs: [
      { label: "name", type: "text", value: newName, setValue: setNewName },
      { label: "number", type: "tel", value: newNumber, setValue: setNewNumber },
    ]
  }

  const contactsToDisplay = persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))

  return <div>
    <h1>Phonebook</h1>
    <Notifications notifications={notifications} />
    <Form {...formProps} />
    <Contacts contacts={contactsToDisplay} filterValue={filter} setFilter={setFilter} deletePerson={deletePerson} />
  </div>
}

export default App
