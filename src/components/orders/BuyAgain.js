import React, { useState, useEffect } from 'react'
import { categoryFilters } from '../../utils/categoryFilters'
import Sidebar from '../filters/Sidebar'
import MobileFilterMenu from '../filters/MobileFilterMenu'
import BuyAgainGrid from '../products/BuyAgainGrid'
import FilterIcon from '../../icons/FilterIcon'
import styled from 'styled-components'

export default function BuyAgain({ products }) {
	const [filters, setFilters] = useState([])
	const [selectedFilters, setSelectedFilters] = useState({})
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filtersOpen, setFiltersOpen] = useState(false)
	const [originalProducts, setOriginalProducts] = useState([])
	const [sortType, setSortType] = useState(null)
	const [sortDirection, setSortDirection] = useState(null)

	const selectedCategory = 'buy-again'

	useEffect(() => {
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
	}, [selectedCategory, products])

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

			let newFilteredProducts = products.filter((product) => {
				return Object.entries(updated).every(([type, values]) => {
					if (values.length === 0) return true

					if (type === 'tags') {
						return values.some((value) =>
							(product.tags || [])
								.map((tag) => tag.toLowerCase())
								.includes(value.toLowerCase())
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

	return (
		<ContentWrapper>
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
      <div>
        <MobileFilterToggle
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          Filters <FilterIcon />
        </MobileFilterToggle>
              <BuyAgainGrid products={filteredProducts} />
      </div>
		</ContentWrapper>
	)
}

const ContentWrapper = styled.div`
	display: flex;
	position: relative;
`


const MobileFilterToggle = styled.button`
	margin: var(--spacing-md) 0 0 0;
	display: none;
	align-items: center;
	gap: var(--spacing-xs);
	padding: var(--spacing-xs) var(--spacing-sm);
	background: none;
	border: 1px solid var(--lt-grey);
	border-radius: 4px;
	cursor: pointer;

	@media only screen and (max-width: 768px) {
		display: flex;
	}
`