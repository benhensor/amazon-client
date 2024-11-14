import {
	createSlice,
	createAction,
	createAsyncThunk,
	createSelector,
} from '@reduxjs/toolkit'
import { basketAPI } from '../../api/basketAPI'
import { logoutUser } from './userSlice'

const loadBasketFromSession = () => {
	try {
			const savedBasket = sessionStorage.getItem('guestBasket')
			const parsedBasket = savedBasket ? JSON.parse(savedBasket) : { items: [] }
			return {
					...parsedBasket,
					count: parsedBasket.items.reduce((total, item) => total + (item.quantity || 0), 0)
			}
	} catch (error) {
			console.error('Error loading basket from session:', error)
			return { items: [], count: 0 }
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

const toggleGuestItemSelected = createAction('basket/toggleGuestItemSelected');

const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
			addItem: (state, action) => {
					const { product, quantity = 1 } = action.payload
					const existingItemIndex = state.items.findIndex(
							(item) => item.id === product.id
					)

					if (existingItemIndex !== -1) {
							state.items[existingItemIndex].quantity += quantity
					} else {
							state.items.push({
									...product,
									quantity,
									basketItemId: `guest-${Date.now()}`,
							})
					}
					// Update count based on total quantities
					state.count = state.items.reduce((total, item) => total + item.quantity, 0)
					sessionStorage.setItem(
							'guestBasket',
							JSON.stringify({
									items: state.items,
									count: state.items.length,
									total: calculateTotal(state.items),
							})
					)
			},
			removeItem: (state, action) => {
					state.items = state.items.filter(
							(item) => item.id !== action.payload
					)
					// Update count based on total quantities
					state.count = state.items.reduce((total, item) => total + item.quantity, 0)
					sessionStorage.setItem(
							'guestBasket',
							JSON.stringify({
									items: state.items,
									count: state.items.length,
									total: calculateTotal(state.items),
							})
					)
			},
			updateQuantity: (state, action) => {
					const { productId, quantity } = action.payload
					const item = state.items.find((item) => item.id === productId)
					if (item) {
							item.quantity = quantity
							state.count = state.items.reduce((total, item) => total + item.quantity, 0)
							sessionStorage.setItem(
									'guestBasket',
									JSON.stringify({
											items: state.items,
											count: state.items.length,
											total: calculateTotal(state.items),
									})
							)
					}
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
							if (action.payload.items?.length > 0) {
									state.items = action.payload.items
									state.count = action.payload.items.length
									state.total = calculateTotal(state.items)
							}
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
							const { basketItemId, is_selected } = action.payload
							const itemIndex = state.items.findIndex(
									(item) => item.basketItemId === basketItemId
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
			builder
					.addCase(toggleGuestItemSelected, (state, action) => {
							const { basketItemId } = action.payload
							const itemIndex = state.items.findIndex(
									(item) => item.basketItemId === basketItemId
							)
							if (itemIndex !== -1) {
									state.items[itemIndex].is_selected =
											!state.items[itemIndex].is_selected
							}
					})
					.addCase(selectAllItems.fulfilled, (state) => {
							state.items.forEach((item) => (item.is_selected = true))
					})
					.addCase(deselectAllItems.fulfilled, (state) => {
							state.items.forEach((item) => (item.is_selected = false))
					})

			// Update quantity
			builder
					.addCase(updateItemQuantity.pending, (state) => {
							state.loading = true
							state.error = null
					})
					.addCase(updateItemQuantity.fulfilled, (state, action) => {
							const { items } = action.payload
							if (items?.length > 0) {
									const updatedItems = [...state.items]
									items.forEach((newItem) => {
											const existingIndex = updatedItems.findIndex(
													(item) => item.id === newItem.id
											)
											if (existingIndex !== -1) {
													updatedItems[existingIndex] = newItem
											} else {
													updatedItems.push(newItem)
											}
									})
									state.items = updatedItems
									state.count = updatedItems.length
									state.total = calculateTotal(state.items)
							}
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
											(item) => item.basketItemId !== action.meta.arg
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

// Helper function to calculate total
const calculateTotal = (items = []) => {
	return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

// Selectors
export const selectBasket = (state) => state.basket

export const selectBasketItems = createSelector(
	[selectBasket],
	(basket) => basket?.items ?? []
)

export const selectBasketItemCount = createSelector(
	[selectBasketItems],
	(items) => {
			const count = items.reduce(
					(total, item) => total + (item.quantity || 0),
					0
			)
			return count
	}
)

export const selectBasketItemsSelected = createSelector(
	[selectBasketItems],
	(items) => items.filter((item) => item.is_selected)
)

export const selectBasketTotal = createSelector(
	[selectBasketItems],
	(items) => calculateTotal(items)
)

// Actions
export const {
	addItem,
	removeItem,
	updateQuantity,
	clearBasket: clearGuestBasket,
} = basketSlice.actions

// Thunks
export const fetchUserBasket = createAsyncThunk(
	'basket/fetchUserBasket',
	async (_, { getState, rejectWithValue }) => {
			try {
					const { user } = getState()

					if (user.isLoggedIn) {
							const response = await basketAPI.fetchBasket()
							const normalizedData = await basketAPI.normalizeBasketData(response)
							return {
									...normalizedData,
									count: normalizedData.items.reduce(
											(total, item) => total + (item.quantity || 0),
											0
									)
							}
					}

					const guestBasket = loadBasketFromSession()
					return guestBasket.items.length > 0
							? await basketAPI.normalizeBasketData(guestBasket)
							: { items: [], count: 0 }
			} catch (error) {
					return rejectWithValue(error.response?.data || 'Failed to fetch basket')
			}
	}
)

export const syncGuestBasket = createAsyncThunk(
	'basket/syncGuestBasket',
	async (_, { getState, rejectWithValue }) => {
			try {
					const { basket } = getState()
					const basketItems = basket?.items?.map((item) => ({
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
	async ({ productId, quantity = 1 }, { getState, dispatch, rejectWithValue }) => {
			try {
					const { user } = getState()
					if (user.isLoggedIn) {
							const response = await basketAPI.addItem(productId, quantity)
							return basketAPI.normalizeBasketData(response)
					} else {
							dispatch(addItem({ productId, quantity }))
							return productId
					}
			} catch (error) {
					return rejectWithValue(error.response?.data || 'Failed to add item')
			}
	}
)

export const updateItemQuantity = createAsyncThunk(
	'basket/updateItemQuantity',
	async ({ basketItemId, quantity }, { getState, dispatch, rejectWithValue }) => {
			try {
					const { user } = getState()
					if (user.isLoggedIn) {
							const response = await basketAPI.updateQuantity(basketItemId, quantity)
							return basketAPI.normalizeBasketData(response)
					} else {
							dispatch(updateQuantity({ quantity }))
							return { basketItemId, quantity }
					}
			} catch (error) {
					return rejectWithValue(error.response?.data || 'Failed to remove item')
			}
	}
)

export const toggleItemSelected = createAsyncThunk(
	'basket/toggleItemSelected',
	async (id, { getState, dispatch, rejectWithValue }) => {
			try {
					const { user, basket } = getState()
					const currentItem = basket.items.find(
							(item) => item.basketItemId === id
					)
					const newIsSelected = !currentItem.is_selected

					if (user.isLoggedIn) {
							await basketAPI.toggleItemSelection(id, newIsSelected)
							return { basketItemId: id, is_selected: newIsSelected }
					} else {
							dispatch(toggleGuestItemSelected(id))
							return { basketItemId: id, is_selected: newIsSelected }
					}
			} catch (error) {
					return rejectWithValue(error.response?.data || 'Failed to update selection')
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

export const removeItemFromBasket = createAsyncThunk(
	'basket/removeItemFromBasket',
	async (basketItemId, { getState, dispatch, rejectWithValue }) => {
			try {
					const { user } = getState()
					if (user.isLoggedIn) {
							const response = await basketAPI.removeItem(basketItemId)
							const normalizedData = await basketAPI.normalizeBasketData(response)

							if (normalizedData.message) {
									const updatedBasket = await dispatch(fetchUserBasket()).unwrap()
									return updatedBasket
							}

							return normalizedData
					} else {
							dispatch(removeItem(basketItemId))
							return { message: 'Item removed from basket' }
					}
			} catch (error) {
					return rejectWithValue(error.response?.data || 'Failed to remove item')
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
					} else {
							dispatch(clearGuestBasket())
					}
					return true
			} catch (error) {
					return rejectWithValue(error.response.data)
			}
	}
)

export default basketSlice.reducer