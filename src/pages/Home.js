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
  fashionAndAccessories,
  beautyAndPersonalCare,
  electronicsAndTechnology,
  groceries,
  homeAndLiving,
  automotiveAndVehicles,
  sportsAndOutdoor,
 } from '../utils/superCategories'
import Hero from '../components/hero/Hero'
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
						fashionAndAccessories.includes(product.category)
					)
				)
			)
			dispatch(
				setBeautyAndPersonalCare(
					products.filter((product) =>
						beautyAndPersonalCare.includes(product.category)
					)
				)
			)
			dispatch(
				setElectronicsAndTechnology(
					products.filter((product) =>
						electronicsAndTechnology.includes(product.category)
					)
				)
			)
			dispatch(
				setGroceries(
					products.filter((product) =>
						groceries.includes(product.category)
					)
				)
			)
			dispatch(
				setHomeAndLiving(
					products.filter((product) =>
						homeAndLiving.includes(product.category)
					)
				)
			)
			dispatch(
				setAutomotiveAndVehicles(
					products.filter((product) =>
						automotiveAndVehicles.includes(product.category)
					)
				)
			)
			dispatch(
				setSportsAndOutdoor(
					products.filter((product) =>
						sportsAndOutdoor.includes(product.category)
					)
				)
			)
		}
	}, [products, dispatch])

	// const productsByCategory = useMemo(() => {
	// 	return categoryList.reduce((acc, category) => {
	// 		acc[category] = products.filter(
	// 			(product) => product.category === category
	// 		)
	// 		return acc
	// 	}, {})
	// }, [products, categoryList])

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
		</HomePageContainer>
	)
}

const HomePageContainer = styled.div`
	height: 100vh;
  background-color: var(--background-grey);
`
