import Country from "./Country"

const Countries = ({ countriesToShow, handleCountryChange }) => {
	if (countriesToShow.length === 1)
		return (
			<Country country={countriesToShow[0]} />
		)
	if (countriesToShow.length <= 10)
		return (
			countriesToShow.map(country =>
				<div key={country.cca2}>
					{country.name.common}
					<button value={country.name.common} onClick={handleCountryChange}>show</button>
				</div>)
		)
	return <div>Too many matches, specify another filter</div>
}

export default Countries