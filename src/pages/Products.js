import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { categoryFilters } from '../utils/categoryFilters'
import Product from '../components/products/Product'
import FilterIcon from '../icons/FilterIcon'
import styled from 'styled-components'

export default function Products() {
	const { products, searchTerm, selectedCategory, status, error } =
		useSelector((state) => state.products || [])
	const [heading, setHeading] = useState('')
	const [filters, setFilters] = useState([])
	const [selectedFilters, setSelectedFilters] = useState({})
	const [filteredProducts, setFilteredProducts] = useState([])
	const [filtersOpen, setFiltersOpen] = useState(false)

	useEffect(() => {
		if (searchTerm) {
			setHeading(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1))
		}

		if (selectedCategory) {
			setHeading(
				selectedCategory.charAt(0).toUpperCase() +
					selectedCategory.slice(1)
			)
			const newFilters = categoryFilters(selectedCategory, products)
			setFilters(newFilters)

			// Initialize selected filters
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
	}, [searchTerm, selectedCategory, products])

	const handleFilterChange = (filterType, value) => {
		setSelectedFilters((prev) => {
			const updated = {
				...prev,
				[filterType]: prev[filterType].includes(value)
					? prev[filterType].filter((item) => item !== value)
					: [...prev[filterType], value],
			}

			// Apply filters
			const newFilteredProducts = products.filter((product) => {
				return Object.entries(updated).every(([type, values]) => {
					if (values.length === 0) return true

					if (type === 'tags') {
						return values.some((value) =>
							product.tags?.includes(value)
						)
					}
					if (type === 'brand') {
						return values.includes(product.brand)
					}
					// Handle simulated filters (this is just for UI, adjust as needed)
					return true
				})
			})

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
								<MobileFilterToggle onClick={() => setFiltersOpen(!filtersOpen)}>
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
							<DesktopSidebar>
								<FilterSectionContent>
									<p>Filter by:</p>
									{Object.entries(filters).map(([filterType, values]) => (
										<FilterGroup key={filterType}>
											<FilterType>
												{filterType.charAt(0).toUpperCase() + filterType.slice(1)}
											</FilterType>
											{values.map((value) => (
												<FilterOption key={value}>
													<input
														type="checkbox"
														checked={selectedFilters[filterType]?.includes(value)}
														onChange={() => handleFilterChange(filterType, value)}
													/>
													{value}
												</FilterOption>
											))}
											<Separator />
										</FilterGroup>
									))}
								</FilterSectionContent>
							</DesktopSidebar>
	
							{/* Mobile Filter Menu */}
							<MobileFilterMenu $isOpen={filtersOpen}>
								<MobileMenuHeader>
									<h2>Filters</h2>
									<CloseButton onClick={() => setFiltersOpen(false)}>×</CloseButton>
								</MobileMenuHeader>
								<FilterSectionContent>
									{Object.entries(filters).map(([filterType, values]) => (
										<FilterGroup key={filterType}>
											<FilterType>
												{filterType.charAt(0).toUpperCase() + filterType.slice(1)}
											</FilterType>
											{values.map((value) => (
												<FilterOption key={value}>
													<input
														type="checkbox"
														checked={selectedFilters[filterType]?.includes(value)}
														onChange={() => handleFilterChange(filterType, value)}
													/>
													{value}
												</FilterOption>
											))}
											<Separator />
										</FilterGroup>
									))}
								</FilterSectionContent>
							</MobileFilterMenu>
	
							{/* Overlay for mobile menu */}
							{filtersOpen && <Overlay onClick={() => setFiltersOpen(false)} />}
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
	
	const DesktopSidebar = styled.aside`
		position: sticky;
		top: 0;
		width: 25rem;
		height: calc(100vh - 60px);
		border-right: 1px solid var(--lt-grey);
		background-color: var(--white);
		overflow-y: auto;
	
		@media only screen and (max-width: 768px) {
			display: none;
		}
	`
	
	const MobileFilterMenu = styled.div`
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: var(--white);
		transform: translateY(${props => props.$isOpen ? '0' : '-100%'});
		transition: transform 0.3s ease-in-out;
		z-index: 1000;
		overflow-y: auto;
	
		@media only screen and (max-width: 768px) {
			display: block;
		}
	`
	
	const MobileMenuHeader = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--spacing-sm) var(--spacing-md);
		border-bottom: 1px solid var(--lt-grey);
	
		h2 {
			font-size: var(--font-lg);
			color: var(--dk-blue);
		}
	`
	
	const CloseButton = styled.button`
		background: none;
		border: none;
		font-size: var(--font-xl);
		color: var(--dk-blue);
		cursor: pointer;
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
	
	const Overlay = styled.div`
		display: none;
		
		@media only screen and (max-width: 768px) {
			display: block;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 999;
		}
	`
	
	const MainContent = styled.main`
		flex: 1;
		background-color: var(--white);
	`
	
	const FilterSectionContent = styled.div`
		padding: var(--spacing-md) var(--spacing-sm);
		
		> p {
			font-weight: bold;
			margin-bottom: var(--spacing-xs);
			color: var(--dk-blue);
		}
	`
	
	const FilterGroup = styled.div`
		margin-bottom: var(--spacing-md);
	`
	
	const FilterType = styled.p`
		font-weight: bold;
		margin-bottom: var(--spacing-xs);
		color: var(--dk-blue);
	`
	
	const FilterOption = styled.label`
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		cursor: pointer;
		font-size: var(--font-sm);
		margin-bottom: var(--spacing-xs);
	
		&:hover {
			color: var(--md-grey);
		}
	`
	
	const Separator = styled.hr`
		margin: var(--spacing-md) 0;
		border: 0.5px solid var(--lt-grey);
	`
	
	const ProductGrid = styled.div`
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
		gap: var(--spacing-sm);
		padding: var(--spacing-sm);
		@media only screen and (max-width: 768px) {
			
		}
	`