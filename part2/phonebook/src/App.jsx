import { useState } from 'react'

const InputWithLabel = ({ id, type, value, setValue }) => <div>
  <label htmlFor={id}>{id}: </label>
  <input id={id} type={type} value={value} onChange={(event) => setValue(event.target.value)} />
</div>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 42 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const formSubmitHandler = (event) => {
    event.preventDefault()
    if (persons.find(({ name }) => name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName('')
    setNewNumber('')
  }

  const personsToDisplay = persons.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Add</h2>
      <form onSubmit={formSubmitHandler}>
        <InputWithLabel id="name" type="text" value={newName} setValue={setNewName} />
        <InputWithLabel id="number" type="tel" value={newNumber} setValue={setNewNumber} />
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <InputWithLabel id="filter" type="text" value={filter} setValue={setFilter} />
      <ul>{personsToDisplay.map(p => <li key={p.name}>{p.name} {p.number}</li>)}</ul>
    </div>
  )
}

export default App
