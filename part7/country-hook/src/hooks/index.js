import { useState, useEffect } from 'react'
import countryService from '../services/countries'

export const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange
	}
}

export const useCountry = (name) => {
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (name) {
			countryService.getOne(name)
				.then(response => setCountry(response[0]))
				.catch(error => setCountry(null))
		}
	}, [name])

	return country
}