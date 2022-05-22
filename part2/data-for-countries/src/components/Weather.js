import { useEffect, useState } from 'react';
import axios from 'axios'

const Weather = ({ capital }) => {
	const [temp, setTemp] = useState('')
	const [wind, setWind] = useState('')
	const [icon, setIcon] = useState('')
	const api_key = process.env.REACT_APP_API_KEY

	useEffect(() => {
		axios
		  .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`)
		  .then(response => {
			setTemp(response.data.main.temp)
			setWind(response.data.wind.speed)
			setIcon(response.data.weather[0].icon)
		  })
	  }, [])

	  return (
		<div>
		  <h3>Weather in {capital}</h3>
		  <div>temperature {temp} Celcius</div>
		  <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
		  <div>wind {wind} m/s</div>
		</div>
	  )
	}
export default Weather