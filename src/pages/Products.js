import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { starCalculator } from '../utils/starCalculator'
import { categoryFilters } from '../utils/categoryFilters'
import styled from 'styled-components'
import ArrowheadIcon from '../icons/ArrowheadIcon'
import StarIcon from '../icons/StarIcon'
import AddToCartBtn from '../components/buttons/AddToCartBtn'

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
					{/* <SubCategories>
						<div>
							Subcategory
							<ArrowheadIcon
								fill="var(--md-grey)"
								direction="down"
							/>
						</div>
						<div>
							Subcategory
							<ArrowheadIcon
								fill="var(--md-grey)"
								direction="down"
							/>
						</div>
						<div>
							Subcategory
							<ArrowheadIcon
								fill="var(--md-grey)"
								direction="down"
							/>
						</div>
						<div>
							Subcategory
							<ArrowheadIcon
								fill="var(--md-grey)"
								direction="down"
							/>
						</div>
						<div>
							Subcategory
							<ArrowheadIcon
								fill="var(--md-grey)"
								direction="down"
							/>
						</div>
					</SubCategories> */}
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
								<ProductCard key={product.id}>
									<img
										src={product.thumbnail}
										alt={product.name}
									/>
									<div className="block">
										<h3>{product.title}</h3>
										<p className="description">
											{product.description}
										</p>
									</div>
									<div className="block">
										<div className="star-rating">
											<>
												{starCalculator(product.rating).map(
													(star, index) => (
														<StarIcon
															key={index}
															type={star}
														/>
													)
												)}
											</>
										</div>
										<div className="price-container">
											<p className="discount">
												-{product.discountPercentage}%
											</p>
											<p className="price">
												£
												<span className="whole">
													{Math.floor(product.price)}
												</span>
												.
												{(product.price % 1)
													.toFixed(2)
													.slice(2)}
											</p>
										</div>
										<AddToCartBtn product={product} />
									</div>
								</ProductCard>
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

const SubCategories = styled.div`
	flex: 5;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	height: 100%;
	cursor: pointer;
	> div {
		display: flex;
		align-items: center;
		height: 100%;
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

const ProductCard = styled.div`
	border: 1px solid var(--lt-grey);
	padding: var(--spacing-md);
	display: flex;
	flex-direction: column;
	cursor: pointer;
	transition: var(--tr-fast);
	img {
		max-width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		object-fit: cover;
	}
	h3 {
		font-size: var(--font-md);
		margin: var(--spacing-xs) 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.description {
		display: -webkit-box; /* For Safari */
		-webkit-box-orient: vertical; /* For Safari */
		-webkit-line-clamp: 5; /* Limit to 3 lines */
		overflow: hidden; /* Hide overflow */
		text-overflow: ellipsis; /* Add ellipsis for overflowed text */
		font-size: var(--font-sm);
		color: var(--link-blue);
		line-height: 1.5; /* Adjust line height as needed */
		height: calc(1.5em * 5);
		max-height: calc(1.5em * 5);
	}
	.block {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-sm);
	}
	.star-rating {
		display: flex;
		gap: var(--spacing-xs);
	}
	.discount {
		color: var(--discount-red);
		font-size: var(--font-sm);
	}
	.price-container {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-sm);
	}
	.price {
		font-size: var(--font-xs);
		display: flex;
		align-items: flex-start;
		line-height: 1rem;
		.whole {
			font-size: var(--font-xl);
			font-weight: bold;
			line-height: 1.3rem;
		}

		.decimal {
			font-size: 0.8rem; /* Smaller size for decimal */
		}
	}
	&:hover {
		border-color: var(--lt-grey-hover);
	}
`
