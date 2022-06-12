import React, { useState, useEffect } from "react";
import axios from 'axios';

const FilterBar = ({ filter, handleFilterChange }) => {

  return (
    <form>
      <div>
        Filter names containing:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  )
}
 
const FilterList = ({ filter, countries }) => {
  return countries
    .filter((country) =>
      country.name.toLowerCase().includes(filter.toLowerCase())
    )
    .map((filteredCountry) =>
        <p>
          {filteredCountry.name}
        </p>
      )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState("")

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  // miten saan tän toimiin silleen että saan listalta talteen valtion nimen?
  //nyt promise ei edes mee perille jostain syystä tän login takia (jos laittaa vaan countries, niin menee perille)
  console.log(countries.name.common);
  return (
    <div className="App">

      <FilterBar filter={filter} handleFilterChange={handleFilterChange} />
    </div>
  );
}

export default App;
