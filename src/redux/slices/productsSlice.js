// slices/productsSlice.js
import { createSlice } from '@reduxjs/toolkit'
import {
	getAllProducts,
	getProductById,
	searchProducts,
	sortProducts,
	getProductCategories,
	getProductCategoryList,
	getProductsByCategory,
} from '../../api/productsAPI'

const initialState = {
	products: [],
	orderedProducts: [],
	categories: [],
	categoryList: [],
	currentProduct: null,
	selectedCategory: null,
	selectedDepartment: {},
	status: 'idle',
	error: null,
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		setProducts(state, action) {
			state.products = action.payload
		},
		setOrderedProducts(state, action) {
			state.orderedProducts = action.payload
		},
		setCategories(state, action) {
			state.categories = action.payload
		},
		setCategoryList(state, action) {
			state.categoryList = action.payload
		},
		setCurrentProduct(state, action) {
			state.currentProduct = action.payload
		},
		setSelectedCategory(state, action) {
			state.selectedCategory = action.payload
		},
		setDepartment(state, action) {
			state.selectedDepartment = action.payload
		},
		setStatus(state, action) {
			state.status = action.payload
		},
		setError(state, action) {
			state.error = action.payload
		},
	},
})

export const {
	setProducts,
	setOrderedProducts,
	setCategories,
	setCategoryList,
	setCurrentProduct,
	setSelectedCategory,
	setDepartment,
	setStatus,
	setError,
} = productsSlice.actions

// Thunks for async actions
export const fetchAllProducts = () => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const products = await getAllProducts()
		// console.log('fetchAllProducts', products.products);
		dispatch(setProducts(products.products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchAllCategories = () => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const categories = await getProductCategories()
		// console.log('fetchAllCategories', categories);
		dispatch(setCategories(categories))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching categories: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchSingleProduct = (id) => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const product = await getProductById(id)
		// console.log('fetchSingleProduct', product);
		dispatch(setCurrentProduct(product))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching product: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchSearchResults = (query, category) => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const results = await searchProducts(query)
		let filteredProducts = results.products

		// If a specific category is selected, filter the results
		if (category && category !== 'All') {
			filteredProducts = filteredProducts.filter(
				(product) => product.category === category
			)
		}

		dispatch(setProducts(filteredProducts))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching results: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchSortedProducts = (sort) => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const sortedProducts = await sortProducts(sort)
		// console.log('fetchSortedProducts', sortedProducts);
		dispatch(setProducts(sortedProducts))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error sorting products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchCategoryList = () => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const categoryList = await getProductCategoryList()
		// console.log('fetchCategoryList', categoryList);
		dispatch(setCategoryList(categoryList))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching category list: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchProductsByCategory = (category) => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const products = await getProductsByCategory(category)
		// console.log('fetchProductsByCategory', products.products);
		dispatch(setProducts(products.products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchDepartmentData = (department) => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const products = await getAllProducts()
		dispatch(setProducts(products))
		dispatch(setDepartment(department))
		// console.log('fetchDepartmentData', products.products);
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching department data: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchOrderedProducts = (orders) => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const orderPromises = orders.map(async (order) => {
			const productPromises = order.order_items.map(async (orderItem) => {
				const product = await getProductById(orderItem.product_id)
				return {
					...product,
					order_id: order.order_id,
					quantity: orderItem.quantity,
					price: orderItem.price,
				}
			})

			const products = await Promise.all(productPromises)
			return {
				order_id: order.order_id,
				order_date: order.order_placed,
				products: products,
			}
		})

		const orderedItems = await Promise.all(orderPromises)
		dispatch(setOrderedProducts(orderedItems))
		dispatch(setStatus('succeeded'))

		return orderedItems
	} catch (error) {
		console.error('Error in fetchOrderedProducts:', error)
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
		throw error
	}
}

export default productsSlice.reducer
