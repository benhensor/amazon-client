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

		// Utility function to normalize IDs to numbers where possible
		const normalizeIds = (data) => {
			if (Array.isArray(data)) {
				return data.map(normalizeIds)
			} else if (typeof data === 'object' && data !== null) {
				return Object.keys(data).reduce((normalized, key) => {
					if (
						key.toLowerCase().includes('id') &&
						typeof data[key] === 'string'
					) {
						const converted = Number(data[key])
						normalized[key] = isNaN(converted)
							? data[key]
							: converted
					} else {
						normalized[key] = normalizeIds(data[key])
					}
					return normalized
				}, {})
			}
			return data
		}

		apiResponse = normalizeIds(apiResponse)
		console.log('Normalizing response:', apiResponse)

		// Handle guest basket
		if (apiResponse.is_guest) {
			console.log('Processing guest basket:', apiResponse)
			const items = apiResponse.BasketItems.map((item) => ({
				basketItemId: item.basketItemId || item.basket_item_id, // Handle both formats
				product_id: item.product_id,
				quantity: item.quantity,
				is_selected: item.is_selected ?? true, // Default to true if not specified
			}))

			const productPromises = items.map(async (item) => {
				try {
					const product = await getProductById(item.product_id)
					return {
						basketItemId: item.basketItemId,
						...product,
						quantity: item.quantity,
						is_selected: item.is_selected,
					}
				} catch (error) {
					console.error(
						`Error fetching product ${item.product_id}:`,
						error
					)
					return null
				}
			})

			const normalizedItems = (await Promise.all(productPromises)).filter(
				(item) => item !== null
			)
			return {
				items: normalizedItems,
				total: calculateTotal(normalizedItems),
				count: calculateCount(normalizedItems),
			}
		}

		// Handle logged-in user basket
		if (apiResponse.BasketItems && !apiResponse.is_guest) {
			const productPromises = apiResponse.BasketItems.map(
				async (item) => {
					try {
						const product = await getProductById(item.product_id)
						return {
							basketItemId: item.basket_item_id,
							...product,
							quantity: item.quantity,
							is_selected: item.is_selected ?? true,
						}
					} catch (error) {
						console.error(
							`Error fetching product ${item.product_id}:`,
							error
						)
						return null
					}
				}
			)

			const items = (await Promise.all(productPromises)).filter(
				(item) => item !== null
			)
			return {
				items,
				total: calculateTotal(items),
				count: calculateCount(items),
			}
		}

		// Handle single item response
		if (apiResponse.basket_item_id && apiResponse.product_id) {
			try {
				const product = await getProductById(apiResponse.product_id)
				const items = [
					{
						basketItemId: apiResponse.basket_item_id,
						...product,
						quantity: apiResponse.quantity,
						is_selected: apiResponse.is_selected ?? true,
					},
				]
				return {
					items,
					total: calculateTotal(items),
					count: calculateCount(items),
				}
			} catch (error) {
				console.error(
					`Error fetching product ${apiResponse.product_id}:`,
					error
				)
				return { items: [], total: 0, count: 0 }
			}
		}

		if (apiResponse.message) {
			return { message: apiResponse.message }
		}

		console.warn('Unexpected API response format:', apiResponse)
		return { items: [], total: 0, count: 0 }
	},
}

// Helper functions
const calculateTotal = (items = []) => {
	return items.reduce((sum, item) => {
		const price = Number(item.price) || 0
		const quantity = Number(item.quantity) || 0
		return sum + price * quantity
	}, 0)
}

const calculateCount = (items = []) => {
	return items.reduce(
		(total, item) => total + (Number(item.quantity) || 0),
		0
	)
}
