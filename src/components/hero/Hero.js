import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	setSelectedCategory,
	setSearchTerm,
  fetchFashionAndAccessories,
  fetchBeautyAndPersonalCare,
  fetchElectronicsAndTechnology,
  fetchGroceries,
  fetchHomeAndLiving,
  fetchAutomotiveAndVehicles,
  fetchSportsAndOutdoor,
} from '../../redux/slices/productsSlice'
import ClothingImg from '../../assets/img/hero/clothing.webp'
import CosmeticsImg from '../../assets/img/hero/cosmetics.webp'
import ElectronicsImg from '../../assets/img/hero/electronics.webp'
import GroceriesImg from '../../assets/img/hero/groceries.webp'
import HomeImg from '../../assets/img/hero/home.webp'
import styled from 'styled-components'

export default function Hero() {
	const navigate = useNavigate()
  const dispatch = useDispatch()
	const {
    selectedCategory,
		FashionAndAccessories,
		BeautyAndPersonalCare,
		ElectronicsAndTechnology,
		Groceries,
		HomeAndLiving,
		AutomotiveAndVehicles,
		SportsAndOutdoor,
	} = useSelector((state) => state.products.categories)
	const [heroImageIndex, setHeroImageIndex] = useState(0)

  useEffect(() => {
    const fetchAllCategories = async () => {
      await Promise.all([
        dispatch(fetchFashionAndAccessories()),
        dispatch(fetchBeautyAndPersonalCare()),
        dispatch(fetchElectronicsAndTechnology()),
        dispatch(fetchGroceries()),
        dispatch(fetchHomeAndLiving()),
        dispatch(fetchAutomotiveAndVehicles()),
        dispatch(fetchSportsAndOutdoor()),
      ])
    }
    fetchAllCategories()
  }, [dispatch])

	const heroes = [
		{
			id: 0,
			title: 'Clothing',
			category: FashionAndAccessories,
			src: ClothingImg,
			cta: 'Shop Now',
		},
		{
			id: 1,
			title: 'Cosmetics',
			category: BeautyAndPersonalCare,
			src: CosmeticsImg,
			cta: 'Shop Now',
		},
		{
			id: 2,
			title: 'Consumer Electronics',
			category: ElectronicsAndTechnology,
			src: ElectronicsImg,
			cta: 'Shop Now',
		},
		{
			id: 3,
			title: 'Groceries',
			category: Groceries,
			src: GroceriesImg,
			cta: 'Shop Now',
		},
		{
			id: 4,
			title: 'Home Decor',
			category: HomeAndLiving,
			src: HomeImg,
			cta: 'Shop Now',
		},
		{
			id: 5,
			title: 'Automotive & Vehicles',
			category: AutomotiveAndVehicles,
			src: GroceriesImg,
			cta: 'Shop Now',
		},
		{
			id: 6,
			title: 'Sports & Outdoor',
			category: SportsAndOutdoor,
			src: HomeImg,
			cta: 'Shop Now',
		},
	]

	useEffect(() => {
		const interval = setInterval(() => {
			setHeroImageIndex((prevIndex) => {
				return prevIndex === heroes.length - 1 ? 0 : prevIndex + 1
			})
		}, 5000)

		return () => clearInterval(interval)
	}, [heroes.length])

	const handleHeroClick = () => {
    dispatch(setSelectedCategory(heroes[heroImageIndex].category))
    dispatch(setSearchTerm(selectedCategory))
		navigate('/products')
	}

	return (
		<div
      onClick={handleHeroClick}
    >
			<HeroImage src={heroes[heroImageIndex].src} alt="Hero" />
			<button>{heroes[heroImageIndex].cta}</button>
		</div>
	)
}

const HeroImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
`
