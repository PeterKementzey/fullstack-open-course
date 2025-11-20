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
      .catch((error) => {
        if (error.message) {
          addNotification(`Could not get contacts with error: ${error.message}`, true)
        } else {
          addNotification(`Could not get contacts due to server error`, true)
        }
      })
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
        }).catch((error) => {
          if (error.response && error.response.status === 404) {
            addNotification(`Failed to update because the contact ${newName} could not be found on the server`, true)
          } else if (error.message) {
            addNotification(`Could not update person due to error: ${error.message}`, true)
          } else {
            addNotification("Could not update person due to error from server", true)
          }
          throw error
        })
    ) : (
      personsService
        .addPerson({ name: newName, number: newNumber })
        .then((newPerson) =>
          persons.concat(newPerson)
        ).then((extendedPersons) => {
          addNotification(`Added ${newName}`, false)
          return extendedPersons
        }).catch((error) => {
          if (error.message) {
            addNotification(`Could not add person due to error: ${error.message}`, true)
          } else {
            addNotification("Could not add person due to error from server", true)
          }
          throw error
        })
    ))
      .then((changedPersons) => {
        setPersons(changedPersons)
        setNewName('')
        setNewNumber('')
      })
      .catch((error) => { })
  }

  const deletePerson = (person) => () => {
    if (!window.confirm(`Delete contact ${person.name}?`)) { return }
    const filteredPersons = persons.filter(({ id }) => id !== person.id)
    personsService
      .deletePerson(person.id)
      .then(() => setPersons(filteredPersons))
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          addNotification(`Failed to delete because the contact ${person.name} could not be found on the server`, true)
        } else if (error.message) {
          addNotification(`Could not delete person due to error: ${error.message}`, true)
        } else {
          addNotification("Could not delete person due to error from server", true)
        }
      })
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
