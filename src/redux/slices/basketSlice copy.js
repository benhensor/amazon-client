import {
	createSlice,
	createAction,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit'
import uuidV4 from 'uuid-v4'
import { getProductById } from '../../api/productsAPI'
import { basketAPI } from '../../api/basketAPI'
import { logoutUser } from './userSlice'

const loadBasketFromSession = () => {
	try {
		const savedBasket = sessionStorage.getItem('guestBasket')
		const parsedBasket = savedBasket ? JSON.parse(savedBasket) : { items: [] }

		// Ensure items is an array to prevent runtime errors
		const items = Array.isArray(parsedBasket.items) ? parsedBasket.items : []
		return {
			...parsedBasket,
			items,
			count: items.reduce(
				(total, item) => total + (item.quantity || 0),
				0
			),
		}
	} catch (error) {
		console.error('Error loading basket from session:', error)
		return { items: [], count: 0 }
	}
}


const saveBasketToSession = (state) => {
	console.log('Saving basket to session:', state)
	try {
		
		sessionStorage.setItem(
			'guestBasket',
			JSON.stringify(state)
		)
	} catch (error) {
		console.error('Error saving basket to session:', error)
	}
}


const initialState = {
	items: [],
	count: 0,
	total: 0,
	loading: false,
	error: null,
	...loadBasketFromSession(),
}

const toggleGuestItemSelected = createAction('basket/toggleGuestItemSelected')

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		addItem: (state, action) => {
			const { basketItem } = action.payload
			const existingItemIndex = state.items.findIndex(
				(item) => item.id === basketItem.product_id
			)
		
			if (existingItemIndex !== -1) {
				state.items[existingItemIndex] = {
					...state.items[existingItemIndex],
					quantity: state.items[existingItemIndex].quantity + basketItem.quantity,
				}
			} else {
				state.items.push(basketItem)
			}
		
			state.count = calculateCount(state.items)
			state.total = calculateTotal(state.items)
		
			saveBasketToSession(state)
		},
		
		removeItem: (state, action) => {
			state.items = state.items.filter(
				(item) => item.id !== action.payload
			)

			state.count = calculateCount(state.items)
			state.total = calculateTotal(state.items)

			// Persist the updated basket to sessionStorage
			saveBasketToSession(state)
		},
		clearBasket: (state) => {
			state.items = []
			state.count = 0
			state.total = 0
			sessionStorage.removeItem('guestBasket')
		},
	},
	extraReducers: (builder) => {
		// Fetch user basket on login
		builder.addCase('user/loginUser/fulfilled', (state, action) => {
			state.items = []
			state.count = 0
			state.total = 0
		})

		// Fetch basket
		builder
			.addCase(fetchUserBasket.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUserBasket.fulfilled, (state, action) => {
				state.loading = false
				const { items = [] } = action.payload
				state.items = items
				state.count = calculateCount(items)
				state.total = calculateTotal(items)
				state.error = null
			})
			.addCase(fetchUserBasket.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Toggle item selected
		builder
			.addCase(toggleItemSelected.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(toggleItemSelected.fulfilled, (state, action) => {
				state.loading = false
				const { basket_item_id, is_selected } = action.payload
				const itemIndex = state.items.findIndex(
					(item) => item.basket_item_id === basket_item_id
				)
				if (itemIndex !== -1) {
					state.items[itemIndex].is_selected = is_selected
				}
			})
			.addCase(toggleItemSelected.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Guest item selection
		builder.addCase(toggleGuestItemSelected, (state, action) => {
			const { basket_item_id } = action.payload
			const itemIndex = state.items.findIndex(
				(item) => item.basket_item_id === basket_item_id
			)
			if (itemIndex !== -1) {
				state.items[itemIndex].is_selected =
					!state.items[itemIndex].is_selected
			}
		})

		// Select all items
		builder
			.addCase(selectAllItems.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(selectAllItems.fulfilled, (state) => {
				state.items.forEach((item) => (item.is_selected = true))
			})
			.addCase(selectAllItems.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Deselect all items
		builder
			.addCase(deselectAllItems.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(deselectAllItems.fulfilled, (state) => {
				state.items.forEach((item) => (item.is_selected = false))
			})
			.addCase(deselectAllItems.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Update quantity
		builder
			.addCase(updateItemQuantity.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(updateItemQuantity.fulfilled, (state, action) => {
				state.loading = false

				if (action.payload.BasketItems) {
					// For logged-in users, update based on the full response
					const normalizedItems = action.payload.BasketItems.map(
						(item) => ({
							basket_item_id: item.basket_item_id,
							product_id: item.product_id,
							quantity: item.quantity,
							is_selected: item.is_selected ?? true,
						})
					)

					state.items = normalizedItems
				} else if (action.payload.basket_item_id) {
					// Handle guest basket update
					const { basket_item_id, quantity } = action.payload
					const itemIndex = state.items.findIndex(
						(item) => item.basket_item_id === basket_item_id
					)

					if (itemIndex !== -1) {
						state.items[itemIndex].quantity = quantity
					}
				}

				// Update totals
				state.count = calculateCount(state.items)
				state.total = calculateTotal(state.items)

				// Save to session for guest users
				if (!action.payload.BasketItems) {
					saveBasketToSession(state)
				}

				state.error = null
			})
			.addCase(updateItemQuantity.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Remove item
		builder
			.addCase(removeItemFromBasket.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(removeItemFromBasket.fulfilled, (state, action) => {
				state.loading = false
				if (action.payload.message) {
					state.items = state.items.filter(
						(item) => item.basket_item_id !== action.meta.arg
					)
					state.count = state.items.length
					state.total = calculateTotal(state.items)
				} else if (action.payload.items) {
					state.items = action.payload.items
					state.count = action.payload.items.length
					state.total = calculateTotal(state.items)
				}
				state.error = null
			})
			.addCase(removeItemFromBasket.rejected, (state, action) => {
				state.loading = false
				state.error = action.payload
			})

		// Clear basket
		builder
			.addCase(clearBasket.fulfilled, (state) => {
				state.items = []
				state.total = 0
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.items = []
				state.count = 0
				state.total = 0
				state.loading = false
				state.error = null
			})
	},
})

// Helper function to calculate count
const calculateCount = (items = []) => {
	return items.reduce((total, item) => total + item.quantity, 0)
}

// Helper function to calculate total
const calculateTotal = (items = []) => {
	const result = items
		.reduce((sum, item) => sum + item.price * item.quantity, 0)
		.toFixed(2)
	return Number(result)
}

// Selectors
export const selectBasket = (state) => state.basket

export const selectBasketItems = createSelector(
	[selectBasket],
	(basket) => basket?.items
)

export const selectBasketItemCount = createSelector(
	[selectBasketItems],
	(items) => {
		const count = items.reduce((total, item) => total + item.quantity, 0)
		return count
	}
)

export const selectBasketItemsSelected = createSelector(
	[selectBasketItems],
	(items) => items.filter((item) => item.is_selected)
)

export const selectBasketTotal = createSelector([selectBasketItems], (items) =>
	calculateTotal(items)
)

// Actions
export const {
	addItem,
	removeItem,
	clearBasket: clearGuestBasket,
} = basketSlice.actions

// Thunks
export const fetchUserBasket = createAsyncThunk(
	'basket/fetchUserBasket',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { user } = getState()
			let basketItems

			if (user.isLoggedIn) {
				const response = await basketAPI.fetchBasket()
				basketItems = response.BasketItems
				
			} else {
				const guestBasketData = loadBasketFromSession()
				basketItems = guestBasketData.items
			}

			return basketItems
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to fetch basket'
			)
		}
	}
)

export const syncGuestBasket = createAsyncThunk(
	'basket/syncGuestBasket',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { basket } = getState()
			const basketItems =
				basket?.items?.map((item) => ({
					productId: item.id,
					quantity: item.quantity,
				})) || []

			if (basketItems.length === 0) {
				return rejectWithValue('No items to sync')
			}

			const response = await basketAPI.syncGuestBasket(basketItems)
			return response
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

export const addItemToBasket = createAsyncThunk(
	'basket/addItemToBasket',
	async (
		{ product, quantity = 1 },
		{ getState, dispatch, rejectWithValue }
	) => {
		try {
			const { user } = getState()
			const userBasket = await basketAPI.fetchBasket()
			const basketItem = {
				basket_item_id: uuidV4(),
				basket_id: userBasket.basket_id ? userBasket.basket_id : 0,
				product_data: product,
				quantity: quantity,
				is_selected: true,
			}
			console.log({
				"Adding item to basket as a user: ": user,
				"Product: ": product,
				"User Basket: ": userBasket,
				"Basket Item: ": basketItem
			})
			
			if (user.isLoggedIn) {
				const response = await basketAPI.addItem(basketItem)
				console.log('Add item response:', response)
				return response
			} 

			dispatch(addItem(basketItem))
			return { message: 'Item added to basket' }
			
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Failed to add item')
		}
	}
)

export const updateItemQuantity = createAsyncThunk(
	'basket/updateItemQuantity',
	async ({ basket_item_id, quantity }, { getState, rejectWithValue }) => {
		try {
			const { user } = getState()

			// For logged-in users
			if (user.isLoggedIn) {
				const response = await basketAPI.updateQuantity(
					basket_item_id,
					quantity
				)
				console.log('Update quantity response:', response)
				return response
			}

			// For guest users
			const guestBasket = loadBasketFromSession()
			console.log('Guest basket:', guestBasket)
			return { basket_item_id, quantity }
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to update quantity'
			)
		}
	}
)

export const toggleItemSelected = createAsyncThunk(
	'basket/toggleItemSelected',
	async (id, { getState, dispatch, rejectWithValue }) => {
		try {
			const { user, basket } = getState()
			const currentItem = basket.items.find(
				(item) => item.basket_item_id === id
			)
			const newIsSelected = !currentItem.is_selected

			if (user.isLoggedIn) {
				await basketAPI.toggleItemSelection(id, newIsSelected)
				return { basket_item_id: id, is_selected: newIsSelected }
			} else {
				dispatch(toggleGuestItemSelected(id))
				return { basket_item_id: id, is_selected: newIsSelected }
			}
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to update selection'
			)
		}
	}
)

export const selectAllItems = createAsyncThunk(
	'basket/selectAllItems',
	async (_, { getState, dispatch }) => {
		try {
			const { user } = getState()
			if (user.isLoggedIn) {
				const response = await basketAPI.selectAll()
				return response
			} else {
				dispatch(toggleGuestItemSelected('all'))
				return { message: 'All items selected' }
			}
		} catch (error) {
			return error.response?.data || 'Failed to select all items'
		}
	}
)

export const deselectAllItems = createAsyncThunk(
	'basket/deselectAllItems',
	async (_, { getState, dispatch }) => {
		try {
			const { user } = getState()
			if (user.isLoggedIn) {
				const response = await basketAPI.deselectAll()
				return response
			} else {
				dispatch(toggleGuestItemSelected('none'))
				return { message: 'All items deselected' }
			}
		} catch (error) {
			return error.response?.data || 'Failed to deselect all items'
		}
	}
)

// REMOVING ITEMS FROM BASKET

export const removeItemFromBasket = createAsyncThunk(
	'basket/removeItemFromBasket',
	async (basket_item_id, { getState, dispatch, rejectWithValue }) => {
		try {
			const { user } = getState()
			if (user.isLoggedIn) {
				const response = await basketAPI.removeItem(basket_item_id)
				const normalizedData = await basketAPI.normalizeBasketData(
					response
				)

				if (normalizedData.message) {
					const updatedBasket = await dispatch(
						fetchUserBasket()
					).unwrap()
					return updatedBasket
				}

				return normalizedData
			} else {
				dispatch(removeItem(basket_item_id))
				return { message: 'Item removed from basket' }
			}
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to remove item'
			)
		}
	}
)

export const clearBasket = createAsyncThunk(
	'basket/clearBasket',
	async (_, { getState, dispatch, rejectWithValue }) => {
		try {
			const { user } = getState()
			if (user.isLoggedIn) {
				await basketAPI.clearBasket()
			}
			dispatch(clearGuestBasket())
			return true
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to clear basket'
			)
		}
	}
)

export default basketSlice.reducer
