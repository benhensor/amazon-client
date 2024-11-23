import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit'
import uuidV4 from 'uuid-v4'
import { basketAPI } from '../../api/basketAPI'
import { logoutUser } from './userSlice'

// Session Storage Keys
const BASKET_STORAGE_KEY = 'shopping_basket'

// Helper Functions
const calculateCount = (items = []) => {
	return items.reduce((total, item) => total + (item.quantity || 0), 0)
}

const calculateTotal = (items = []) => {
	return Number(
		items
			.reduce(
				(sum, item) => sum + item.product_data.price * item.quantity,
				0
			)
			.toFixed(2)
	)
}

// Session Storage Functions
const loadBasketFromStorage = () => {
	try {
		const storedBasket = sessionStorage.getItem(BASKET_STORAGE_KEY)
		if (storedBasket) {
			const parsedBasket = JSON.parse(storedBasket)
			console.log('parseddBasket', parsedBasket)
			return {
				items: parsedBasket.items || [],
				count: calculateCount(parsedBasket.items),
				total: calculateTotal(parsedBasket.items),
				loading: false,
				error: null,
			}
		}
	} catch (error) {
		console.error('Error loading basket from session storage:', error)
	}
	return null
}

const loadBasketFromDatabase = async () => {
  try {
    console.log('Loading basket from database...');
    const basketData = await basketAPI.fetchBasket(); // Fetch data
    console.log('Raw basket data:', basketData);

    return {
      items: basketData.items || [],
      count: calculateCount(basketData.items),
      total: calculateTotal(basketData.items),
      loading: false,
      error: null,
    };
  } catch (error) {
    console.error('Error loading basket from database:', error.message);
    return null;
  }
};


const saveBasketToStorage = async (basket, user) => {
	try {
		// Always save to session storage
		sessionStorage.setItem(
			BASKET_STORAGE_KEY,
			JSON.stringify({
				items: basket.items,
				count: basket.count,
				total: basket.total,
			})
		)

		// Only sync with database if user is authenticated
		if (user?.isLoggedIn && user?.currentUser?.user_id) {
			// console.log('user', user)
			const basketData = {
				basket_id: parseInt(
					basket.basket_id || user.currentUser.user_id
				),
				user_id: parseInt(user.currentUser.user_id),
				items: basket.items.map((item) => ({
					basket_item_id: item.basket_item_id,
					product_data: item.product_data,
					quantity: item.quantity,
					is_selected: item.is_selected,
				})),
				count: basket.count,
				total: basket.total,
				status: 'active',
				last_modified: new Date().toISOString(),
			}
			// console.log('basketData', basketData)
			await basketAPI.updateBasket(basketData)
		}
	} catch (error) {
		console.error('Error saving basket:', error)
		// Optionally dispatch an error action here
	}
}

// Initial State
const initialState = {
	items: [],
	count: 0,
	total: 0,
	loading: false,
	error: null,
}

// Thunks
export const loadBasket = createAsyncThunk(
	'basket/loadBasket',
	async (_, { rejectWithValue }) => {
		try {
			const basketData = await loadBasketFromDatabase()
			return basketData || { items: [], count: 0, total: 0 }
		} catch (error) {
			return rejectWithValue('Failed to load basket from database')
		}
	}
)

export const addItemToBasket = createAsyncThunk(
	'basket/addItemToBasket',
	async ({ product, quantity = 1 }, { getState, rejectWithValue }) => {
		try {
			const { user, basket } = getState()
			const productId = product.id
			// console.log('user', user.currentUser)
			// Check if item already exists
			const existingItemIndex = basket.items.findIndex(
				(item) => item.product_data.id === productId
			)

			if (existingItemIndex !== -1) {
				// Update quantity of existing item
				const updatedItems = [...basket.items]
				updatedItems[existingItemIndex] = {
					...updatedItems[existingItemIndex],
					quantity:
						updatedItems[existingItemIndex].quantity + quantity,
				}
				return updatedItems
			}

			// Create new basket item if not existing
			const newBasketItem = {
				basket_item_id: uuidV4(),
				basket_id: user.isLoggedIn
					? user.currentUser.user_id
					: uuidV4(),
				product_data: product,
				quantity: quantity,
				is_selected: true,
			}

			return { items: [...basket.items, newBasketItem], user }
		} catch (error) {
			return rejectWithValue('Failed to add item to basket')
		}
	}
)

export const updateItemQuantity = createAsyncThunk(
	'basket/updateItemQuantity',
	async ({ basket_item_id, quantity }, { getState, rejectWithValue }) => {
		try {
			const { basket, user } = getState()
			const updatedItems = basket.items.map((item) =>
				item.basket_item_id === basket_item_id
					? { ...item, quantity }
					: item
			)
			return { items: updatedItems, user }
		} catch (error) {
			return rejectWithValue('Failed to update item quantity')
		}
	}
)

export const toggleItemSelected = createAsyncThunk(
	'basket/toggleItemSelected',
	async (basket_item_id, { getState, rejectWithValue }) => {
		try {
			const { basket, user } = getState()
			const updatedItems = basket.items.map((item) =>
				item.basket_item_id === basket_item_id
					? { ...item, is_selected: !item.is_selected }
					: item
			)
			return { items: updatedItems, user }
		} catch (error) {
			return rejectWithValue('Failed to toggle item selection')
		}
	}
)

export const selectAllItems = createAsyncThunk(
	'basket/selectAllItems',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { basket, user } = getState()
			const updatedItems = basket.items.map((item) => ({
				...item,
				is_selected: true,
			}))
			return { items: updatedItems, user }
		} catch (error) {
			return rejectWithValue('Failed to select all items')
		}
	}
)

export const deselectAllItems = createAsyncThunk(
	'basket/deselectAllItems',
	async (_, { getState, rejectWithValue }) => {
		try {
			const { basket, user } = getState()
			const updatedItems = basket.items.map((item) => ({
				...item,
				is_selected: false,
			}))
			return { items: updatedItems, user }
		} catch (error) {
			return rejectWithValue('Failed to deselect all items')
		}
	}
)

export const removeItemFromBasket = createAsyncThunk(
	'basket/removeItemFromBasket',
	async (basket_item_id, { getState, rejectWithValue }) => {
		try {
			const { basket, user } = getState()
			const updatedItems = basket.items.filter(
				(item) => item.basket_item_id !== basket_item_id
			)
			return { items: updatedItems, user }
		} catch (error) {
			return rejectWithValue('Failed to remove item')
		}
	}
)

// Basket Slice
const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {
		clearBasket: (state) => {
			state.items = []
			state.count = 0
			state.total = 0
			sessionStorage.removeItem(BASKET_STORAGE_KEY)
		},
		hydrateBasket: (state) => {
			const storedBasket = loadBasketFromStorage()
			if (storedBasket) {
				state.items = storedBasket.items
				state.count = storedBasket.count
				state.total = storedBasket.total
			} 
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadBasket.fulfilled, (state, action) => {
				const { items, count, total } = action.payload
				state.items = items
				state.count = count
				state.total = total
			})
			.addCase(loadBasket.rejected, (state, action) => {
				state.error = action.payload || 'Failed to load basket'
			})
			.addCase(addItemToBasket.fulfilled, (state, action) => {
				const { items, user } = action.payload
				state.items = items
				state.count = calculateCount(items)
				state.total = calculateTotal(items)
				console.log('basket', { state })
				saveBasketToStorage(
					{
						items: state.items,
						count: state.count,
						total: state.total,
					},
					user
				)
			})
			.addCase(updateItemQuantity.fulfilled, (state, action) => {
				const { items, user } = action.payload
				state.items = items
				state.count = calculateCount(items)
				state.total = calculateTotal(items)
				saveBasketToStorage(
					{
						items: state.items,
						count: state.count,
						total: state.total,
					},
					user
				)
			})
			.addCase(toggleItemSelected.fulfilled, (state, action) => {
				const { items, user } = action.payload
				state.items = items
				saveBasketToStorage(
					{
						items: state.items,
						count: state.count,
						total: state.total,
					},
					user
				)
			})
			.addCase(selectAllItems.fulfilled, (state, action) => {
				const { items, user } = action.payload
				state.items = items
				saveBasketToStorage(
					{
						items: state.items,
						count: state.count,
						total: state.total,
					},
					user
				)
			})
			.addCase(deselectAllItems.fulfilled, (state, action) => {
				const { items, user } = action.payload
				state.items = items
				saveBasketToStorage(
					{
						items: state.items,
						count: state.count,
						total: state.total,
					},
					user
				)
			})
			.addCase(removeItemFromBasket.fulfilled, (state, action) => {
				const { items, user } = action.payload
				state.items = items
				state.count = calculateCount(items)
				state.total = calculateTotal(items)
				saveBasketToStorage(
					{
						items: state.items,
						count: state.count,
						total: state.total,
					},
					user
				)
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

// Selectors
export const selectBasket = (state) => state.basket
export const selectBasketItems = createSelector(
	[selectBasket],
	(basket) => basket.items
)
export const selectBasketItemCount = createSelector(
	[selectBasket],
	(basket) => basket.count
)
export const selectBasketTotal = createSelector(
	[selectBasket],
	(basket) => basket.total
)
export const selectBasketItemsSelected = createSelector(
	[selectBasketItems],
	(items) => items.filter((item) => item.is_selected)
)

// Actions
export const { clearBasket, hydrateBasket } = basketSlice.actions
export default basketSlice.reducer
