import { InputWithLabel } from "./Form"

const Contacts = ({ contacts, filterValue, setFilter }) => <>
    <h2>Contacts</h2>
    <InputWithLabel label="filter" type="text" value={filterValue} setValue={setFilter} />
    <ul>{contacts.map(p =>
        <li key={p.name}>{p.name} {p.number}</li>
    )}</ul>
</>

export default Contacts
