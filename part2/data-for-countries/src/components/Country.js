import Weather from "./Weather"
const Country = ({ country }) => {
	return (
	  <>
		<h1>{country.name.common}</h1>
		<div>capital {country.capital}</div>
		<div>area {country.area}</div>
		<h3>languages:</h3>
		<ul>
		  {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
		</ul>
		<div>
		  <img src={Object.values(country.flags)[0]} width='150' alt='flag' />
		</div>
		<div>
		  <Weather capital={country.capital} />
		</div>
	  </>
	)
  }
  export default Country