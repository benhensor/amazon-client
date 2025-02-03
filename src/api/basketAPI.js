import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const basketAPI = {
	fetchBasket: async () => {
		const response = await axios.get(`${API_URL}/api/basket`, {
			withCredentials: true,
		})
		// console.log('fetchBasket', response)
		return response.data
	},
	updateBasket: async (basketData) => {
		const response = await axios.put(
			`${API_URL}/api/basket`,
			basketData,
			{ withCredentials: true,
				headers: {
					'Content-Type': 'application/json',
				},
			 }
		)
		// console.log('updateBasket', response.data)
		return response.data
	},

}