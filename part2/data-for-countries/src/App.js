import { useEffect, useState } from 'react';
import axios from 'axios'
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const countriesToShow = filter === ''
    ? []
    : countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleCountryChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleCountryChange} />
      </div>
      <Countries filter={filter} countriesToShow={countriesToShow} handleCountryChange={handleCountryChange} />
    </div>
  )
}

export default App;
