import { InputWithLabel } from "./Form"

const PersonEntry = ({ person, deletePerson }) => <li>
    {person.name} {person.number} <button onClick={deletePerson(person)}>delete</button>
</li>

const Contacts = ({ contacts, filterValue, setFilter, deletePerson }) => <>
    <h2>Contacts</h2>
    <InputWithLabel label="filter" type="text" value={filterValue} setValue={setFilter} />
    <ul>{contacts.map(p =>
        <PersonEntry key={p.id} person={p} deletePerson={deletePerson} />
    )}</ul>
</>

export default Contacts
