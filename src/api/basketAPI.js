import axios from 'axios'
import { isAuthenticated } from '../utils/auth'

const API_URL = process.env.REACT_APP_API_URL

const basketAxios = axios.create({
	baseURL: `${API_URL}/api/basket`,
	headers: {
		'Content-Type': 'application/json',
	},
})

basketAxios.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error)
)

export const basketAPI = {
	fetchBasket: async () => {
		if (!isAuthenticated()) {
			return { data: { data: []}}
		}
		const response = await basketAxios.get('/')
		return response.data
	},
	updateBasket: async (basketData) => {
		const response = await basketAxios.put('/update', basketData)
		return response.data
	},

}