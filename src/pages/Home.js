import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAllProducts,
	fetchCategoryList,
	setFashionAndAccessories,
	setBeautyAndPersonalCare,
	setElectronicsAndTechnology,
	setGroceries,
	setHomeAndLiving,
	setAutomotiveAndVehicles,
	setSportsAndOutdoor,
} from '../redux/slices/productsSlice'
import {
	fashionAndAccessoriesCategory,
	beautyAndPersonalCareCategory,
	electronicsAndTechnologyCategory,
	groceriesCategory,
	homeAndLivingCategory,
	automotiveAndVehiclesCategory,
	sportsAndOutdoorCategory,
} from '../utils/superCategories'
import Hero from '../components/hero/Hero'
import Carousel from '../components/products/Carousel'
import styled from 'styled-components'

export default function Home() {
	const dispatch = useDispatch()
	const { products, categoryList, status, error } = useSelector(
		(state) => state.products
	)

	useEffect(() => {
		dispatch(fetchAllProducts())
		dispatch(fetchCategoryList())
	}, [dispatch])

	useEffect(() => {
		if (products.length > 0) {
			dispatch(
				setFashionAndAccessories(
					products.filter((product) =>
						fashionAndAccessoriesCategory.includes(product.category)
					)
				)
			)
			dispatch(
				setBeautyAndPersonalCare(
					products.filter((product) =>
						beautyAndPersonalCareCategory.includes(product.category)
					)
				)
			)
			dispatch(
				setElectronicsAndTechnology(
					products.filter((product) =>
						electronicsAndTechnologyCategory.includes(
							product.category
						)
					)
				)
			)
			dispatch(
				setGroceries(
					products.filter((product) =>
						groceriesCategory.includes(product.category)
					)
				)
			)
			dispatch(
				setHomeAndLiving(
					products.filter((product) =>
						homeAndLivingCategory.includes(product.category)
					)
				)
			)
			dispatch(
				setAutomotiveAndVehicles(
					products.filter((product) =>
						automotiveAndVehiclesCategory.includes(product.category)
					)
				)
			)
			dispatch(
				setSportsAndOutdoor(
					products.filter((product) =>
						sportsAndOutdoorCategory.includes(product.category)
					)
				)
			)
		}
	}, [products, dispatch])

	const handleProductClick = (product) => {}

	const handleCategoryClick = (category) => {}

	// const ProductPreview = () => (
	// 	<PreviewGrid>
	// 		{randomisedHeroes.slice(0, 3).map((hero) => (
	// 			<PreviewItem key={hero.id}>
	// 				<h2>{hero.previewHeading}</h2>
	// 				<ProductList>
	// 					{previewProducts[hero.id]?.map((product, index) => (
	// 						<li key={index}>
	// 							<img
	// 								src={product.thumbnail}
	// 								alt={product.title}
	// 							/>
	// 							<h3>{product.title}</h3>
	// 						</li>
	// 					))}
	// 				</ProductList>
	// 				<button>See more</button>
	// 			</PreviewItem>
	// 		))}
	// 	</PreviewGrid>
	// )

	// Department component to handle each category section
	const DepartmentCarousel = ({ title, products }) => (
		<DepartmentCarouselContainer>
			<button
				className="title"
				onClick={() => handleCategoryClick(title)}
			>
				{title}
			</button>
			<ul className="carousel">
				{products.map((product, i) => (
					<li
						key={i}
						className="item"
						onClick={() => handleProductClick(product)}
					>
						<div className="product-card">
							<img src={product.thumbnail} alt={product.title} />
							<p>{product.title}</p>
						</div>
					</li>
				))}
			</ul>
			<button 
				className="cta"
				onClick={()=>{}}
			>
				See more
			</button>
		</DepartmentCarouselContainer>
	)

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

	// console.log('Status:', status)
	// console.log('Products:', products)
	// console.log('CategoryList:', categoryList)

	if (categoryList.length === 0) {
		return (
			<section>
				<h1>Home</h1>
				<div>No categories available.</div>
			</section>
		)
	}

	return (
		<HomePageContainer>
			<Hero />
			<Carousel
				title="Fashion & Accessories"
				products={products.filter((product) =>
					fashionAndAccessoriesCategory.includes(product.category)
				)}
			/>
			<Carousel
				title="Beauty & Personal Care"
				products={products.filter((product) =>
					beautyAndPersonalCareCategory.includes(product.category)
				)}
			/>
			<Carousel
				title="Consumer Electronics"
				products={products.filter((product) =>
					electronicsAndTechnologyCategory.includes(product.category)
				)}
			/>
			<Carousel
				title="Groceries"
				products={products.filter((product) =>
					groceriesCategory.includes(product.category)
				)}
			/>
			<Carousel
				title="Home & Living"
				products={products.filter((product) =>
					homeAndLivingCategory.includes(product.category)
				)}
			/>
			<Carousel
				title="Automotive & Vehicles"
				products={products.filter((product) =>
					automotiveAndVehiclesCategory.includes(product.category)
				)}
			/>
			<Carousel
				title="Sports & Outdoors"
				products={products.filter((product) =>
					sportsAndOutdoorCategory.includes(product.category)
				)}
			/>
		</HomePageContainer>
	)
}

const HomePageContainer = styled.div`
	height: 100%;
	background-color: var(--background-grey);
`

const DepartmentCarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg) var(--spacing-md);
	background-color: var(--white);
	margin: var(--spacing-md);
	.title {
		color: var(--dk-blue);
		width: fit-content;
		font-size: clamp(var(--font-md), 2vw, var(--font-xl));
		font-weight: bold;
	}
	.carousel {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		overflow-x: auto;
	}
	.chevron {
		width: 3rem;
		height: 100%;
		display: flex;
		align-items: center;
		svg {
			width: 2rem;
			path {
				stroke: var(--md-grey);
			}
		}
	}
	.item {
		padding: var(--spacing-sm);
		border: 1px solid var(--lt-grey);
		cursor: pointer;
		transition: var(--tr-fast);
		&:hover {
			border-color: var(--lt-grey-hover);
		}
	}
	.product-card {
		width: 15rem;
		img {
			max-width: 100%;
		}
		p {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: var(--dk-blue);
			font-size: var(--font-sm);
			padding: var(--spacing-sm) 0;
		}
	}
	.cta {
		color: var(--link-blue);
		width: fit-content;
		margin-top: var(--spacing-md);
		font-size: clamp(var(--font-md), 2vw, var(--font-lg));
	}
	@media only screen and (max-width: 768px) {
		margin: var(--spacing-sm);
	}
`
