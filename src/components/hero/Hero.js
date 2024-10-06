import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	setSelectedCategory,
	setSearchTerm,
} from '../../redux/slices/productsSlice'
import ChevronIcon from '../../icons/ChevronIcon'
import ClothingImg from '../../assets/img/hero/clothing.webp'
import CosmeticsImg from '../../assets/img/hero/cosmetics.webp'
import ElectronicsImg from '../../assets/img/hero/electronics.webp'
import GroceriesImg from '../../assets/img/hero/groceries.webp'
import VehiclesImg from '../../assets/img/hero/vehicles.webp'
import HomeImg from '../../assets/img/hero/home.webp'
import SportsImg from '../../assets/img/hero/sports.webp'
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
	} = useSelector((state) => state.products)
	const [heroImageIndex, setHeroImageIndex] = useState(0)

	const heroCategories = [
		{
			id: 0,
			title: 'Clothing',
			category: FashionAndAccessories,
			src: ClothingImg,
			cta: 'make yourself presentable',
			previewHeading: 'Clothing',
		},
		{
			id: 1,
			title: 'Cosmetics',
			category: BeautyAndPersonalCare,
			src: CosmeticsImg,
			cta: 'fix your appearance',
			previewHeading: 'Beauty Products',
		},
		{
			id: 2,
			title: 'Consumer Electronics',
			category: ElectronicsAndTechnology,
			src: ElectronicsImg,
			cta: 'got gadgets?',
			previewHeading: 'Consumer Electronics',
		},
		{
			id: 3,
			title: 'Groceries',
			category: Groceries,
			src: GroceriesImg,
			cta: 'eat more',
			previewHeading: 'Groceries',
		},
		{
			id: 4,
			title: 'Home Decor',
			category: HomeAndLiving,
			src: HomeImg,
			cta: 'sort your home out',
			previewHeading: 'Home & Living',
		},
		{
			id: 5,
			title: 'Automotive & Vehicles',
			category: AutomotiveAndVehicles,
			src: VehiclesImg,
			cta: 'drive away in style',
			previewHeading: 'Automotive & Vehicles',
		},
		{
			id: 6,
			title: 'Sports & Outdoor',
			category: SportsAndOutdoor,
			src: SportsImg,
			cta: 'get active',
			previewHeading: 'Sports & Outdoor',
		},
	]

	// Change hero image at an interval
	useEffect(() => {
		const interval = setInterval(() => {
			setHeroImageIndex((prevIndex) =>
				prevIndex === heroCategories.length - 1 ? 0 : prevIndex + 1
			)
		}, 5000)

		return () => clearInterval(interval)
	}, [heroCategories.length])

	const handleHeroClick = () => {
		dispatch(setSelectedCategory(heroCategories[heroImageIndex].category))
		dispatch(setSearchTerm(selectedCategory))
		navigate(`/products?category=${heroCategories[heroImageIndex].title}`)
	}

	return (
		<HeroContainer>
			<HeroContent>
				<img
					src={heroCategories[heroImageIndex].src}
					alt={heroCategories[heroImageIndex].title}
				/>
				<ChevronButton
					onClick={() =>
						setHeroImageIndex((prevIndex) =>
							prevIndex === 0
								? heroCategories.length - 1
								: prevIndex - 1
						)
					}
				>
					<ChevronIcon direction="left" />
				</ChevronButton>
				<CTAButton onClick={handleHeroClick}>
					{heroCategories[heroImageIndex].cta}
				</CTAButton>
				<ChevronButton
					onClick={() =>
						setHeroImageIndex((prevIndex) =>
							prevIndex === heroCategories.length - 1
								? 0
								: prevIndex + 1
						)
					}
				>
					<ChevronIcon direction="right" />
				</ChevronButton>
			</HeroContent>
		</HeroContainer>
	)
}

const HeroContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const HeroContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: var(--dk-blue-50);
	position: relative;
	overflow: hidden;
	img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		height: auto;
		object-fit: cover;
		object-position: center bottom;
		z-index: 0;
	}
`

const ChevronButton = styled.button`
	width: 5rem;
	height: 100%;
	svg {
		width: 50%;
		stroke: var(--white);
		stroke-width: 1;
	}
	@media (max-width: 768px) {
		width: 4rem;
	}
	@media (max-width: 450px) {
		width: 3rem;
	}
`

const CTAButton = styled.button`
	text-transform: uppercase;
	font-size: var(--font-cta);
	color: var(--white);
	width: 100%;
	height: 30rem;
	overflow: hidden;
	position: relative;
	@media (max-width: 1199px) {
		height: 25rem;
	}
	@media (max-width: 768px) {
		height: 20rem;
	}
	@media (max-width: 450px) {
		height: 15rem;
	}
`

const PreviewGrid = styled.section`
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: var(--spacing-md);
	z-index: 1;
	@media (max-width: 768px) {
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	@media (max-width: 768px) {
	}
`

const PreviewItem = styled.div`
	width: 35rem;
	height: auto;
	display: flex;
	flex-direction: column;
	background-color: var(--white);
	padding: var(--spacing-lg);
	overflow: hidden;
	h2 {
		font-size: clamp(1.6rem, 2.5vw, 2rem);
		margin-bottom: var(--spacing-md);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	button {
		color: var(--link-blue);
		width: fit-content;
		margin-top: var(--spacing-md);
	}

	// Adjust padding and text sizes for smaller screens
	@media (max-width: 768px) {
		width: 100%;
		padding: var(--spacing-md);
		h2 {
			font-size: 1.5rem;
		}
	}
`

const ProductList = styled.ul`
	width: 100%;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: var(--spacing-sm);
	li {
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
		h3 {
			width: 100%;
			font-size: var(--font-sm);
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
`
