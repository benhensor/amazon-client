import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAllProducts,
	fetchDepartmentData,
} from '../redux/slices/productsSlice'
import { superCategories } from '../utils/superCategories'
import formatQuery from '../utils/formatQuery'
import PageHeader from '../components/pageheader/PageHeader'
import ProductsGrid from '../components/products/ProductsGrid'
import Sidebar from '../components/filters/Sidebar'
import MobileFilterMenu from '../components/filters/MobileFilterMenu'
import styled from 'styled-components'

export default function Department() {
	const dispatch = useDispatch()
	const { slug } = useParams()
	const { products, selectedDepartment, status, error } = useSelector(
		(state) => state.products
	)
	// const [department, setDepartment] = useState(null)
	const [departmentProducts, setDepartmentProducts] = useState([])
	const [filters, setFilters] = useState({})
	const [selectedFilters, setSelectedFilters] = useState({})
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [filterValueMap, setFilterValueMap] = useState({})

	const [originalProducts, setOriginalProducts] = useState([])
	const [sortType, setSortType] = useState(null)
	const [sortDirection, setSortDirection] = useState(null)

	useEffect(() => {
		if (slug) {
			const setCurrentDepartment = async () => {
				const currentDepartment = superCategories.find(
					(superCategory) => superCategory.slug === slug
				)
				dispatch(fetchDepartmentData(currentDepartment))
				dispatch(fetchAllProducts())
			}
			setCurrentDepartment()
		}
	}, [slug, dispatch])

	useEffect(() => {
		if (
			selectedDepartment &&
			selectedDepartment.subCategories &&
			products.length > 0
		) {
			// Filter products to only those in the current department's subcategories
			const productsInDepartment = products.filter((product) =>
				selectedDepartment.subCategories.includes(product.category)
			)
			setDepartmentProducts(productsInDepartment)

			// Create mapping between formatted and original filter values
			const valueMap = {}
			const formattedSubCategories = selectedDepartment.subCategories.map(
				(category) => {
					const formatted = formatQuery(category)
					valueMap[formatted] = category
					return formatted
				}
			)

			setFilterValueMap(valueMap)

			// Set up sub-category filters with formatted values
			const subCategoryFilters = {
				Category: formattedSubCategories,
			}
			setFilters(subCategoryFilters)

			// Initialize selected filters
			setSelectedFilters({
				Category: [],
			})

			setFilteredProducts(productsInDepartment)
		}
	}, [selectedDepartment, products])

	useEffect(() => {
		if (departmentProducts.length > 0) {
			setOriginalProducts(departmentProducts) // Store the original unsorted products
			setFilteredProducts(departmentProducts) // Initialize filteredProducts
		}
	}, [departmentProducts])

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

	const handleFilterChange = (filterType, formattedValue) => {
		setSelectedFilters((prev) => {
			const updated = {
				...prev,
				[filterType]: prev[filterType].includes(formattedValue)
					? prev[filterType].filter((item) => item !== formattedValue)
					: [...prev[filterType], formattedValue],
			}

			// Use original values for actual filtering
			const selectedOriginalValues = updated[filterType].map(
				(formatted) => filterValueMap[formatted]
			)

			// Filter department products based on selected Category
			const newFilteredProducts =
				selectedOriginalValues.length === 0
					? departmentProducts
					: departmentProducts.filter((product) =>
							selectedOriginalValues.includes(product.category)
					  )

			setFilteredProducts(newFilteredProducts)
			return updated
		})
	}

	if (status === 'loading') {
		return (
			<section>
				<div>Loading...</div>
			</section>
		)
	}

	if (error) {
		return (
			<section>
				<div>Error: {error}</div>
			</section>
		)
	}

	return (
		<DepartmentContainer>
			<PageHeader
				products={departmentProducts}
				heading={selectedDepartment.title}
				filtersOpen={filtersOpen}
				setFiltersOpen={setFiltersOpen}
			/>

			<Content>
				{departmentProducts.length > 0 && (
					<>
						<Sidebar
							filters={filters}
							selectedFilters={selectedFilters}
							handleFilterChange={handleFilterChange}
							handleSort={handleSort}
							sortType={sortType}
							sortDirection={sortDirection}
						/>

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
					<ResultCount>
						Showing {filteredProducts.length} of{' '}
						{departmentProducts.length} products in{' '}
						{selectedDepartment.title}
					</ResultCount>
					<ProductsGrid products={filteredProducts} />
				</MainContent>
			</Content>
		</DepartmentContainer>
	)
}

// Styled components remain the same
const DepartmentContainer = styled.div`
	display: flex;
	flex-direction: column;
`

const Content = styled.div`
	display: flex;
	background-color: var(--white);

	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`

const MainContent = styled.main`
	flex: 1;
	padding: var(--spacing-sm);
	background-color: var(--white);

	@media only screen and (max-width: 768px) {
		padding: var(--spacing-sm);
	}
`

const ResultCount = styled.p`
	margin-bottom: var(--spacing-sm);
	font-size: var(--font-sm);
	color: var(--md-grey);
	padding-left: var(--spacing-sm);
`
