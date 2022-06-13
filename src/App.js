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
  const result = countries
  .filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  if (result.length > 10) {
    return (
      <p>Too many countries, specify another character.</p>
    )
  }

  if (result.length < 11 && result.length > 1) {
    return (
      result.map((country, index) =>
          <p id={index}>
            {country.name.common}
          </p>
    )
      )

  }

    else {
      // en saa rivin 52 languages-listan mappausta toimimaan millään, koska
      // se valittaa, ettei country.languages.map ole funktio
      return (
        result.map((country, index) =>
        <div>
        <h2 id={index}>
          {country.name.common}
        </h2>
        <p id={index}>
          {country.capital}
        </p>
        <p id={index}>
          {country.area}
        </p>
        <h4>Languages</h4>
        {country.languages.map((language, index) => {
                return (
                    <span key={index}>{language.name}</span>
                );
              })}
        <img src={country.flags.svg} alt={"Flag of " + country.name.common} width="150"/>


        </div>
      ))
    }
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

  return (
    <div className="App">
      <FilterBar filter={filter} handleFilterChange={handleFilterChange} />
      <FilterList filter={filter} countries={countries}/>
    </div>
  );
}

export default App;
//       <FilterList filter={filter} countries={countries}/>