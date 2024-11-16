// basketAPI.js
import axios from 'axios'
import { getProductById } from '../api/productsAPI'

const API_URL = process.env.REACT_APP_API_URL

export const basketAPI = {
	// Fetch user's basket
	fetchBasket: async () => {
		const response = await axios.get(`${API_URL}/api/basket`, {
			withCredentials: true,
		})
		return response.data
	},

	// Add item to basket
	addItem: async (productId, quantity) => {
		const response = await axios.post(
			`${API_URL}/api/basket/add`,
			{ productId, quantity },
			{ withCredentials: true }
		)
		console.log('addItem', response.data)
		return response.data
	},

	// Update item quantity
	updateQuantity: async (basketItemId, quantity) => {
		const response = await axios.put(
			`${API_URL}/api/basket/update/${basketItemId}`,
			{ quantity },
			{ withCredentials: true }
		)
		return response.data
	},

	// Toggle item selection
	toggleItemSelection: async (id, isSelected) => {
		const response = await axios.put(
			`${API_URL}/api/basket/select/${id}`,
			{ is_selected: isSelected },
			{ withCredentials: true }
		)
		return response.data
	},

	// Select all items
	selectAll: async () => {
		const response = await axios.put(
			`${API_URL}/api/basket/select-all`,
			{},
			{ withCredentials: true }
		)
		return response.data
	},

	// Deselect all items
	deselectAll: async () => {
		const response = await axios.put(
			`${API_URL}/api/basket/deselect-all`,
			{},
			{ withCredentials: true }
		)
		return response.data
	},

	// Remove item from basket
	removeItem: async (basketItemId) => {
		const response = await axios.delete(
			`${API_URL}/api/basket/remove/${basketItemId}`,
			{ withCredentials: true }
		)
		return response.data
	},

	// Clear basket
	clearBasket: async () => {
		const response = await axios.delete(`${API_URL}/api/basket/clear`, {
			withCredentials: true,
		})
		return response.data
	},

	// Sync guest basket
	syncGuestBasket: async (items) => {
		const response = await axios.post(
			`${API_URL}/api/basket/sync`,
			{ items },
			{ withCredentials: true }
		)
		return response.data
	},

	// Helper function to normalize basket data
	normalizeBasketData: async (apiResponse) => {
		if (!apiResponse) return { items: [], total: 0 }
		console.log('normalizeBasketData', apiResponse)
		if (apiResponse.BasketItems) {
				const productPromises = apiResponse.BasketItems.map(async (item) => {
						try {
								const product = await getProductById(item.product_id)
								return {
										basketItemId: parseInt(item.basket_item_id, 10),
										...product,
										quantity: item.quantity,
										is_selected: item.is_selected,
								}
						} catch (error) {
								console.error(`Error fetching product ${item.product_id}:`, error)
								return null
						}
				})

				const items = (await Promise.all(productPromises)).filter(
						(item) => item !== null
				)
				return { items }
		}

		if (apiResponse.basket_item_id && apiResponse.product_id) {
				try {
						const product = await getProductById(apiResponse.product_id)
						return {
								items: [
										{
												basketItemId: parseInt(apiResponse.basket_item_id, 10),
												...product,
												quantity: apiResponse.quantity,
										},
								],
						}
				} catch (error) {
						console.error(`Error fetching product ${apiResponse.product_id}:`, error)
						return { items: [] }
				}
		}

		if (apiResponse.message) {
				return { message: apiResponse.message }
		}

		console.warn('Unexpected API response format:', apiResponse)
		return { items: [] }
}
}
