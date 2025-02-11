import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchSearchResults,
	fetchProductsByCategory,
	setSelectedCategory,
} from '../redux/slices/productsSlice'
import { categoryFilters } from '../utils/categoryFilters'
import formatQuery from '../utils/formatQuery'
import Sidebar from '../components/filters/Sidebar'
import MobileFilterMenu from '../components/filters/MobileFilterMenu'
import ProductsGrid from '../components/products/ProductsGrid'
import FilterIcon from '../icons/FilterIcon'
import {
	ProductsPage,
	ProductsHeader,
	HeaderContent,
	Header,
	ContentWrapper,
	MobileFilterToggle,
	MainContent,
} from '../assets/styles/ProductsStyles'

export default function Products() {
	const dispatch = useDispatch()
	const { slug, category, searchTerm } = useParams()
	const { products, selectedCategory, status, error } = useSelector(
		(state) => state.products || []
	)
	const [heading, setHeading] = useState('')
	const [filters, setFilters] = useState([])
	const [selectedFilters, setSelectedFilters] = useState({})
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [originalProducts, setOriginalProducts] = useState([])
	const [sortType, setSortType] = useState(null)
	const [sortDirection, setSortDirection] = useState(null)

	useEffect(() => {
		const loadData = async () => {
			// If there's a slug, we're showing products by category
			if (slug) {
				dispatch(fetchProductsByCategory(slug))
				dispatch(setSelectedCategory(slug))
				setHeading(formatQuery(slug))
			}
			// If there's a searchTerm (e.g., from `/search/searchTerm` route)
			else if (searchTerm) {
				dispatch(fetchSearchResults(searchTerm))
				dispatch(setSelectedCategory(searchTerm))
				setHeading(formatQuery(searchTerm))
			}
			// If there's a category and searchTerm (e.g., from `/category/categoryName/search/searchTerm`)
			else if (category && searchTerm) {
				dispatch(fetchProductsByCategory(category))
				dispatch(fetchSearchResults(searchTerm))
				dispatch(setSelectedCategory(category))
				setHeading(`${formatQuery(category)}: ${searchTerm}`)
			}
		}

		loadData()
	}, [dispatch, slug, category, searchTerm])

	useEffect(() => {
		// console.log('Selected category:', selectedCategory, products)
		if (selectedCategory) {
			const newFilters = categoryFilters(selectedCategory, products)
			setFilters(newFilters)

			const initialSelectedFilters = Object.keys(newFilters).reduce(
				(acc, filterType) => {
					acc[filterType] = []
					return acc
				},
				{}
			)
			setSelectedFilters(initialSelectedFilters)
		}

		setFilteredProducts(products)
		setOriginalProducts(products)
	}, [selectedCategory, products, slug, searchTerm])

	const handleSort = (type) => {
		if (sortType === type) {
			// Toggle through: asc -> desc -> reset
			if (sortDirection === 'asc') {
				setSortDirection('desc')
			} else if (sortDirection === 'desc') {
				// Reset sorting
				setSortType(null)
				setSortDirection(null)
				setFilteredProducts([...originalProducts]) // Reset to original order
				return
			}
		} else {
			// New sort type
			setSortType(type)
			setSortDirection('asc')
		}

		const sortedProducts = [...filteredProducts].sort((a, b) => {
			const direction = sortDirection === 'asc' ? 1 : -1
			if (type === 'price') {
				return (a.price - b.price) * direction
			} else if (type === 'rating') {
				return (a.rating - b.rating) * direction
			} else if (type === 'discount') {
				return (a.discountPercentage - b.discountPercentage) * direction
			}
			return 0
		})

		setFilteredProducts(sortedProducts)
	}

	// Modified handleFilterChange to maintain sorting after filtering
	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prev) => {
			const updated = {
				...prev,
				[filterType]: prev[filterType].includes(value)
					? prev[filterType].filter((item) => item !== value)
					: [...prev[filterType], value],
			}

			// Apply filters (case-insensitive comparison)
			let newFilteredProducts = products.filter((product) => {
				return Object.entries(updated).every(([type, values]) => {
					if (values.length === 0) return true

					if (type === 'tags') {
						return values.some(
							(value) =>
								(product.tags || [])
									.map((tag) => tag.toLowerCase()) // Make product tags lowercase
									.includes(value.toLowerCase()) // Make filter value lowercase
						)
					}
					if (type === 'brand') {
						return values.includes(product.brand)
					}
					return true
				})
			})

			// Reapply current sorting if active
			if (sortType) {
				newFilteredProducts = [...newFilteredProducts].sort((a, b) => {
					const direction = sortDirection === 'asc' ? 1 : -1
					if (sortType === 'price') {
						return (a.price - b.price) * direction
					} else if (sortType === 'rating') {
						return (a.rating - b.rating) * direction
					} else if (sortType === 'discount') {
						return (
							(a.discountPercentage - b.discountPercentage) *
							direction
						)
					}
					return 0
				})
			}

			setFilteredProducts(newFilteredProducts)
			return updated
		})
	}

	if (status === 'loading')
		return (
			<section>
				<div>Loading...</div>
			</section>
		)
	if (error)
		return (
			<section>
				<div>Error: {error}</div>
			</section>
		)

	return (
		<ProductsPage>
			<ProductsHeader>
				<HeaderContent>
					{products.length > 0 && (
						<>
							<Header>
								<p>Showing results for</p>
								<h1>{heading}</h1>
							</Header>
							<MobileFilterToggle
								onClick={() => setFiltersOpen(!filtersOpen)}
							>
								Filters <FilterIcon />
							</MobileFilterToggle>
						</>
					)}
				</HeaderContent>
			</ProductsHeader>

			<ContentWrapper>
				{products.length > 0 && (
					<>
						{/* Desktop Sidebar */}
						<Sidebar
							filters={filters}
							selectedFilters={selectedFilters}
							handleFilterChange={handleFilterChange}
							handleSort={handleSort}
							sortType={sortType}
							sortDirection={sortDirection}
						/>

						{/* Mobile Filter Menu */}
						<MobileFilterMenu
							filters={filters}
							selectedFilters={selectedFilters}
							handleFilterChange={handleFilterChange}
							filtersOpen={filtersOpen}
							setFiltersOpen={setFiltersOpen}
							handleSort={handleSort}
							sortType={sortType}
							sortDirection={sortDirection}
						/>
					</>
				)}

				<MainContent>
					<ProductsGrid products={filteredProducts} />
				</MainContent>
			</ContentWrapper>
		</ProductsPage>
	)
}
