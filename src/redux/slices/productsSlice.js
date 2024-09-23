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
	categories: [],
	categoryList: [],
	currentProduct: null,
	searchTerm: '',
	selectedCategory: 'All',
	shouldClearSearch: false,
	FashionAndAccessories: [],
	BeautyAndPersonalCare: [],
	ElectronicsAndTechnology: [],
	Groceries: [],
	HomeAndLiving: [],
	AutomotiveAndVehicles: [],
	SportsAndOutdoor: [],
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
		setCategories(state, action) {
			state.categories = action.payload
		},
		setCategoryList(state, action) {
			state.categoryList = action.payload
		},
		setCurrentProduct(state, action) {
			state.currentProduct = action.payload
		},
		setSearchTerm(state, action) {
			state.searchTerm = action.payload
		},
		setSelectedCategory(state, action) {
			state.selectedCategory = action.payload
		},
		clearSearchTerm(state) {
			state.searchTerm = ''
			state.shouldClearSearch = false
		},
		setFashionAndAccessories(state, action) {
			state.FashionAndAccessories = action.payload
		},
		setBeautyAndPersonalCare(state, action) {
			state.BeautyAndPersonalCare = action.payload
		},
		setElectronicsAndTechnology(state, action) {
			state.ElectronicsAndTechnology = action.payload
		},
		setGroceries(state, action) {
			state.Groceries = action.payload
		},
		setHomeAndLiving(state, action) {
			state.HomeAndLiving = action.payload
		},
		setAutomotiveAndVehicles(state, action) {
			state.AutomotiveAndVehicles = action.payload
		},
		setSportsAndOutdoor(state, action) {
			state.SportsAndOutdoor = action.payload
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
	setCategories,
	setCategoryList,
	setCurrentProduct,
	setSearchTerm,
	setSelectedCategory,
	clearSearchTerm,
	setFashionAndAccessories,
	setBeautyAndPersonalCare,
	setElectronicsAndTechnology,
	setGroceries,
	setHomeAndLiving,
	setAutomotiveAndVehicles,
	setSportsAndOutdoor,
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

export const selectCategory = (category) => async (dispatch) => {
	dispatch(setSelectedCategory(category))
	dispatch(fetchProductsByCategory(category))
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
		dispatch(setSearchTerm(query))
		dispatch(setSelectedCategory(category))
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

const fetchProductsForCategories = (categories) => async () => {
	try {
		const promises = categories.map((category) =>
			getProductsByCategory(category)
		)
		const results = await Promise.all(promises)

		const allProducts = results.flatMap((result) => result.products)
		return allProducts
	} catch (error) {
		throw new Error(error)
	}
}

export const fetchFashionAndAccessories = () => async (dispatch) => {
  dispatch(setStatus('loading'))
	try {
		const products = await fetchProductsForCategories([
			'mens-shirts',
			'mens-shoes',
			'mens-watches',
			'womens-dresses',
			'womens-bags',
			'womens-jewellery',
			'womens-shoes',
			'womens-watches',
			'tops',
		])
		dispatch(setFashionAndAccessories(products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchBeautyAndPersonalCare = () => async (dispatch) => {
  dispatch(setStatus('loading'))
	try {
		const products = await fetchProductsForCategories([
			'beauty',
			'fragrances',
			'skin-care',
		])
		dispatch(setBeautyAndPersonalCare(products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchElectronicsAndTechnology = () => async (dispatch) => {
	dispatch(setStatus('loading'))
	try {
		const products = await fetchProductsForCategories([
			'laptops',
			'mobile-accessories',
			'smartphones',
			'tablets',
		])
		dispatch(setElectronicsAndTechnology(products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchGroceries = () => async (dispatch) => {
  dispatch(setStatus('loading'))
	try {
		const groceries = await getProductsByCategory('groceries')
		// console.log('fetchGroceries', groceries.products);
		dispatch(setGroceries(groceries.products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchHomeAndLiving = () => async (dispatch) => {
  dispatch(setStatus('loading'))
	try {
		const products = await fetchProductsForCategories([
			'furniture',
			'home-decoration',
			'kitchen-accessories',
		])
		dispatch(setHomeAndLiving(products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchAutomotiveAndVehicles = () => async (dispatch) => {
  dispatch(setStatus('loading'))
	try {
		const products = await fetchProductsForCategories(['motorcycle', 'vehicle'])
		dispatch(setAutomotiveAndVehicles(products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export const fetchSportsAndOutdoor = () => async (dispatch) => {
  dispatch(setStatus('loading'))
	try {
		const products = await fetchProductsForCategories([
			'sports-accessories',
			'sunglasses',
		])
		dispatch(setSportsAndOutdoor(products))
		dispatch(setStatus('succeeded'))
	} catch (error) {
		console.error('Error fetching products: ', error) // Helps trace the exact error during development
		dispatch(setError(error.toString()))
		dispatch(setStatus('failed'))
	}
}

export default productsSlice.reducer
