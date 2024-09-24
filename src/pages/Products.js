import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { categoryFilters } from '../utils/categoryFilters'
import Product from '../components/products/Product'
import styled from 'styled-components'

export default function Products() {
	const { products, searchTerm, selectedCategory, status, error } =
		useSelector((state) => state.products || [])

	const [heading, setHeading] = useState('')
	const [filters, setFilters] = useState([])

	useEffect(() => {
		if (searchTerm) {
			setHeading(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1))
		}

		if (selectedCategory) {
			setHeading(
				selectedCategory.charAt(0).toUpperCase() +
					selectedCategory.slice(1)
			)
			setFilters(categoryFilters[selectedCategory] || {})
		}
	}, [searchTerm, selectedCategory])

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

			<ProductsPageHeaderContainer>
				<HeaderContent>
					<Header>
						{products.length > 0 && (
							<>
								<p>Showing results for </p>
								<h1>
									{heading}
								</h1>
							</>
						)}
					</Header>
				</HeaderContent>
			</ProductsPageHeaderContainer>

			<Content>
				{products.length > 0 && (
					<Sidebar>
						<FilterSection>
							<p>Filter by:</p>
							{Object.keys(filters).map((filter) => (
								<div key={filter}>
									<p>
										{filter.charAt(0).toUpperCase() +
											filter.slice(1)}
									</p>
									{filters[filter].map((value) => (
										<FilterOption key={value}>
											<input
												type="checkbox"
												value={value}
											/>
											{value}
										</FilterOption>
									))}
									<Separator />
								</div>
							))}
						</FilterSection>
					</Sidebar>
				)}
				<div>
					<ProductGrid>
						{products.length > 0 ? (
							products.map((product) => (
								<Product key={product.id} product={product} />
							))
						) : (
							<p>No products found</p> // Graceful fallback if no products
						)}
					</ProductGrid>
				</div>
			</Content>
		</ProductsPage>
	)
}

const ProductsPage = styled.div``

const ProductsPageHeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: var(--link-white-hover);
	border-bottom: 1px solid var(--lt-grey);
`

const HeaderContent = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: var(--spacing-sm) var(--spacing-md);
`

const Header = styled.div`
	flex: 2;
	width: fit-content;
	line-height: 2.4rem;
	word-wrap: nowrap;	
	p {
		font-size: 1.2rem;
	}
`

const Content = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr;
`

const Sidebar = styled.aside`
	padding-top: var(--spacing-md);
	border-right: 1px solid var(--lt-grey);
	height: 100vh;
	background-color: var(--white);
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
`

const FilterSection = styled.div`
	p {
		padding: 0 var(--spacing-md);
		font-weight: bold;
		margin-bottom: var(--spacing-xs);
		color: var(--dk-blue);
	}
`

const FilterOption = styled.label`
	display: flex;
	align-items: center;
	cursor: pointer;
	font-size: var(--font-sm);
	position: relative;
	padding: 0 var(--spacing-md);
	input {
		margin-right: var(--spacing-xs);
		cursor: pointer;
	}

	&:hover {
		color: var(--md-grey);
	}
`

const Separator = styled.hr`
	margin: var(--spacing-md) 0;
	border: 0.5px solid var(--lt-grey);
`

const ProductGrid = styled.div`
	width: 100%;
	padding: var(--spacing-md);
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: var(--spacing-md);
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}
`
