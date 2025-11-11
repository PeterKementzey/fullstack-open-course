import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 42 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState()

  const formSubmitHandler = (event) => {
    event.preventDefault()
    if (persons.find(({ name }) => name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={formSubmitHandler}>
        <div>name: <input type="text" value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
        <div>number: <input type="tel" value={newNumber} onChange={(event) => setNewNumber(event.target.value)} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <ul>{persons.map(p => <li key={p.name}>{p.name} {p.number}</li>)}</ul>
    </div>
  )
}

export default App
