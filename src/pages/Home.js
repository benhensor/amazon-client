import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchAllProducts,
	fetchCategoryList,
} from '../redux/slices/productsSlice'
import { checkLoggedIn } from '../redux/slices/userSlice'
import { hydrateBasket, loadBasket } from '../redux/slices/basketSlice'
import { fetchAddresses } from '../redux/slices/addressSlice'
import { superCategories } from '../utils/superCategories'
import Hero from '../components/hero/Hero'
import Carousel from '../components/products/Carousel'
import styled from 'styled-components'

export default function Home() {
	const dispatch = useDispatch()
	const { products, categoryList, status, error } = useSelector(
		(state) => state.products
	)
	const [isDataReady, setIsDataReady] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Dispatch both actions and wait for them to resolve
				await Promise.all([
					dispatch(fetchAllProducts()),
					dispatch(fetchCategoryList()),
				])
				dispatch(fetchAddresses())
				setIsDataReady(true)
			} catch (err) {
				console.error('Error fetching data', err)
			}
		}

		fetchData()
	}, [dispatch])

	useEffect(() => {
		// console.log('check logged in')
		dispatch(checkLoggedIn())
	}, [dispatch])

	useEffect(() => {
		// console.log('fetch user basket')
		dispatch(hydrateBasket())
		dispatch(loadBasket())
	}, [dispatch])

	const DepartmentCarousel = ({ superCategory }) => {
		const filteredProducts = products.filter((product) =>
			superCategory.subCategories.includes(product.category)
		)
		return (
			<Carousel superCategory={superCategory} products={filteredProducts} />
		)
	}

	if (status === 'loading' || !isDataReady) {
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

	if (!Array.isArray(categoryList) || categoryList.length === 0) {
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
`
