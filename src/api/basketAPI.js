// basketAPI.js
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL

export const basketAPI = {
	// Fetch user's basket
	fetchBasket: async () => {
		const response = await axios.get(`${API_URL}/api/basket`, {
			withCredentials: true,
		})
		// console.log('fetchBasket', response)
		return response.data
	},
	updateBasket: async (basketData) => {
		const response = await axios.put(
			`${API_URL}/api/basket/updatebasket`,
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
  toggleItemSelected: async (basketItemId, isSelected) => {
		const response = await axios.patch(
			`/api/basket/items/${basketItemId}/toggle`, 
			{ is_selected: isSelected },
			{ withCredentials: true }
		)
		console.log('toggleItemSelected', response.data)
		return response.data
	},
  updateItemsSelection: async (isSelected) => {
		const response = await axios.patch(
			'/api/basket/items/selection', 
			{ is_selected: isSelected },
			{ withCredentials: true }
		)
		console.log('updateItemsSelection', response.data)
		return response.data
	},
  updateItemQuantity: async (basketItemId, quantity) => {
		const response = await axios.patch(
			`/api/basket/items/${basketItemId}/quantity`,
			{ quantity },
			{ withCredentials: true }
		)
		console.log('updateItemQuantity', response.data)
		return response.data
	},

	// Add item to basket
	addItem: async (basketItem, productId) => {
		console.log('addItem', basketItem)
		const response = await axios.post(
			`${API_URL}/api/basket/add`,
			{basketItem, productId},
			{ withCredentials: true }
		)
		console.log('addItem', response.data)
		return response.data
	},

	// Update item quantity
	updateQuantity: async (basket_item_id, quantity) => {
		const response = await axios.put(
			`${API_URL}/api/basket/update/${basket_item_id}`,
			{ quantity },
			{ withCredentials: true }
		)
		return response.data
	},

	// Toggle item selection
	toggleItemSelection: async (basket_item_id, isSelected) => {
		const response = await axios.put(
			`${API_URL}/api/basket/select/${basket_item_id}`,
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
	removeItem: async (basket_item_id) => {
		const response = await axios.delete(
			`${API_URL}/api/basket/remove/${basket_item_id}`,
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

}