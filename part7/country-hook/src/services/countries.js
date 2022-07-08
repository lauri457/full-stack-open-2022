import axios from 'axios'

const baseUrl = 'https://restcountries.com/v3.1/name/'

const getOne = async (name) => {
	const response = await axios.get(`${baseUrl}/${name}/?fullText=true`)
	return response.data
}

export default { getOne }