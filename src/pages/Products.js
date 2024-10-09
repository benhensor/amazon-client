import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchSearchResults,
	fetchProductsByCategory,
} from '../redux/slices/productsSlice'
import { categoryFilters } from '../utils/categoryFilters'
import { formatQuery } from '../utils/formatCategory'
import Sidebar from '../components/filters/Sidebar'
import MobileFilterMenu from '../components/filters/MobileFilterMenu'
import Product from '../components/products/Product'
import FilterIcon from '../icons/FilterIcon'
import styled from 'styled-components'

export default function Products() {
	const dispatch = useDispatch()
	const { slug, searchTerm } = useParams()
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
				if (slug) {
				dispatch(fetchProductsByCategory(slug))
				setHeading(formatQuery(slug))
			} else if (searchTerm) {
				dispatch(fetchSearchResults(searchTerm))
				setHeading(formatQuery(searchTerm))
			}
		}

		loadData()
	}, [dispatch, slug, searchTerm])

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
        };

        // Apply filters (case-insensitive comparison)
        let newFilteredProducts = products.filter((product) => {
            return Object.entries(updated).every(([type, values]) => {
                if (values.length === 0) return true;

                if (type === 'tags') {
                    return values.some((value) =>
                        (product.tags || [])
                            .map((tag) => tag.toLowerCase()) // Make product tags lowercase
                            .includes(value.toLowerCase()) // Make filter value lowercase
                    );
                }
                if (type === 'brand') {
                    return values.includes(product.brand);
                }
                return true;
            });
        });

        // Reapply current sorting if active
        if (sortType) {
            newFilteredProducts = [...newFilteredProducts].sort((a, b) => {
                const direction = sortDirection === 'asc' ? 1 : -1;
                if (sortType === 'price') {
                    return (a.price - b.price) * direction;
                } else if (sortType === 'rating') {
                    return (a.rating - b.rating) * direction;
                } else if (sortType === 'discount') {
                    return (
                        (a.discountPercentage - b.discountPercentage) *
                        direction
                    );
                }
                return 0;
            });
        }

        setFilteredProducts(newFilteredProducts);
        return updated;
    });
};


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
					<ProductGrid>
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product) => (
								<Product key={product.id} product={product} />
							))
						) : (
							<p>No products found</p>
						)}
					</ProductGrid>
				</MainContent>
			</ContentWrapper>
		</ProductsPage>
	)
}

const ProductsPage = styled.div`
	background-color: var(--white);
`

const ProductsHeader = styled.div`
	position: sticky;
	top: 0;
	background-color: var(--white);
	border-bottom: 1px solid var(--lt-grey);
	z-index: 10;
`

const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: var(--spacing-sm) var(--spacing-md);

	@media only screen and (max-width: 768px) {
		padding: var(--spacing-sm);
	}
`

const Header = styled.div`
	line-height: 2.4rem;
	h1 {
		font-size: clamp(var(--font-lg), 3vw, var(--font-xxl));
		color: var(--dk-blue);
	}
	p {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-sm));
	}
`

const ContentWrapper = styled.div`
	display: flex;
	position: relative;
`

const MobileFilterToggle = styled.button`
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

const MainContent = styled.main`
	flex: 1;
	background-color: var(--white);
`

const ProductGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	gap: var(--spacing-sm);
	padding: var(--spacing-sm);
	@media only screen and (max-width: 768px) {
	}
`
