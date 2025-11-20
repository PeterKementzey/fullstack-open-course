import axios from "axios"
import { useEffect, useState } from "react"

const findMatchingCountries = (countries, countryFilter) => {
  const matchingCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(countryFilter.toLowerCase()) ||
    country.name.official.toLowerCase().includes(countryFilter.toLowerCase())
  )
  const exactMatch = matchingCountries.find((country) =>
    country.name.common.toLowerCase() === countryFilter.toLowerCase() ||
    country.name.official.toLowerCase() === countryFilter.toLowerCase()
  )
  return exactMatch ? [exactMatch] : matchingCountries
}

const CountryList = ({ countries, setCountryFilter }) => <ul>{countries.map((country) =>
  <li key={country.cca2}><label>
    {country.name.common} <button onClick={() => setCountryFilter(country.name.official)}>show</button>
  </label></li>
)}</ul>

const CountryInfo = ({ country }) => <>
  <h1>{country.flag} {country.name.common} {country.flag}</h1>
  <p>Capital: {country.capital}</p>
  <p>Area: {country.area} km²</p>
  <h2>Languages</h2>
  <ul>{Object.entries(country.languages).map(([abbrev, language]) =>
    <li key={abbrev}>{language}</li>
  )}</ul>
  <img src={country.flags.png} alt={country.flags.alt} />
</>

const App = () => {
  const [countryFilter, setCountryFilter] = useState('')
  const [countries, setCountries] = useState([])

  const getCountries = () => {
    axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.error("Could not get countries", error))
  }
  useEffect(getCountries, [])

  if (!countries.length) return <p>Loading...</p>

  const matchingCountries = findMatchingCountries(countries, countryFilter)

  let searchResult = <></>

  if (countryFilter === '') {
    searchResult = <></>
  } else if (matchingCountries.length > 10) {
    searchResult = <p>Too many matches, please specify another filter.</p>
  } else if (matchingCountries.length > 1) {
    searchResult = <CountryList countries={matchingCountries} setCountryFilter={setCountryFilter} />
  } else if (matchingCountries.length == 1) {
    searchResult = <CountryInfo country={matchingCountries[0]} />
  } else {
    searchResult = <p>No matches, please specify another filter.</p>
  }

  return <>
    <label>
      find countries <input type="text" value={countryFilter} onChange={(event) => setCountryFilter(event.target.value)} />
    </label>
    {searchResult}
  </>
}

export default App
