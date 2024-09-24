import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	setSelectedCategory,
	setSearchTerm,
} from '../../redux/slices/productsSlice'
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
	const [randomisedHeroes, setRandomisedHeroes] = useState([])
	const [previewProducts, setPreviewProducts] = useState({})

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

	// Utility to shuffle an array
	const shuffleArray = (array) => {
		return [...array].sort(() => 0.5 - Math.random())
	}

	// Select random 4 products from a category
	const getRandomProducts = (categoryProducts) => {
		if (!categoryProducts || categoryProducts.length === 0) {
			return [] // Return empty array if category is undefined or empty
		}
		return shuffleArray(categoryProducts).slice(0, 4)
	}

	// Shuffle heroes on mount
	useEffect(() => {
		// Wait until all the supercategory states are populated
		if (
			FashionAndAccessories.length > 0 &&
			BeautyAndPersonalCare.length > 0 &&
			ElectronicsAndTechnology.length > 0 &&
			Groceries.length > 0 &&
			HomeAndLiving.length > 0 &&
			AutomotiveAndVehicles.length > 0 &&
			SportsAndOutdoor.length > 0
		) {
			const shuffledHeroes = shuffleArray(heroCategories)
			setRandomisedHeroes(shuffledHeroes)
		}
	}, [
		FashionAndAccessories,
		BeautyAndPersonalCare,
		ElectronicsAndTechnology,
		Groceries,
		HomeAndLiving,
		AutomotiveAndVehicles,
		SportsAndOutdoor,
	])

	// Generate preview products once heroes are shuffled
	useEffect(() => {
		if (randomisedHeroes.length > 0) {
			const productsMap = {}
			randomisedHeroes.forEach((hero) => {
				productsMap[hero.id] = getRandomProducts(hero.category)
			})
			setPreviewProducts(productsMap)
		}
	}, [randomisedHeroes])

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
		navigate('/products')
	}

	return (
		<HeroContainer>
      <HeroContent $bgImage={heroCategories[heroImageIndex].src} />
        <CTAButton onClick={handleHeroClick}>
          {heroCategories[heroImageIndex].cta}
        </CTAButton>
        <PreviewGrid>
          {randomisedHeroes.slice(0, 3).map((hero) => (
            <PreviewItem key={hero.id}>
              <h2>{hero.previewHeading}</h2>
              <ProductList>
                {previewProducts[hero.id]?.map((product, index) => (
                  <li key={index}>
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                    />
                    <h3>{product.title}</h3>
                  </li>
                ))}
              </ProductList>
              <button>See more</button>
            </PreviewItem>
          ))}
        </PreviewGrid>
    </HeroContainer>
	)
}

const HeroContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	position: relative;
	height: 90rem;
`

const HeroContent = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - var(--spacing-lg));
  height: 100%;
	background: url(${(props) => props.$bgImage}) no-repeat center center;
	background-size: cover;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0));
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0));
  background-color: var(--dk-blue);
  z-index: -1;
`

const CTAButton = styled.button`
	text-transform: uppercase;
	font-size: var(--font-cta);
	color: var(--white);
  width: 100%;
  height: 30rem;
`

const PreviewGrid = styled.section`
	display: flex;
  justify-content: space-around;
  align-items: center;
	gap: var(--spacing-md);
	width: 100%;
	padding: var(--spacing-md);
	@media (max-width: 768px) {
		flex-direction: column;
    gap: var(--spacing-sm);
	}

	@media (max-width: 768px) {
		grid-template-columns: 1fr; // Single column for smaller screens
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
