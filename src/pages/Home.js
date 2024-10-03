import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAllProducts,
	fetchCategoryList,
} from '../redux/slices/productsSlice'
import { superCategories } from '../utils/superCategories'
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

	const DepartmentCarousel = ({ superCategory }) => {
		const filteredProducts = products.filter((product) =>
			superCategory.subCategories.includes(product.category)
		)
		return (
			<Carousel title={superCategory.title} products={filteredProducts} />
		)	
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
			{superCategories.map((superCategory, i) => (
				<DepartmentCarousel key={i} superCategory={superCategory} />
			))}
		</HomePageContainer>
	)
}

const HomePageContainer = styled.div`
	height: 100%;
	background-color: var(--background-grey);
`
