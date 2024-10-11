import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {
	setProducts,
	setCurrentProduct,
} from '../../redux/slices/productsSlice'
import { addToBasket } from '../../redux/slices/basketSlice'
import styled from 'styled-components'
import ChevronIcon from '../../icons/ChevronIcon'
import CarouselItem from './CarouselItem'
import BuyButton from '../buttons/BuyButton'

const BREAKPOINTS = {
	mobile: 480,
	tablet: 768,
}

export default function Carousel({ superCategory, products }) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { slug, title } = superCategory
	const [currentPage, setCurrentPage] = useState(0)
	const [itemsPerPage, setItemsPerPage] = useState(0)
	const containerRef = useRef(null)

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth
				const cardWidth =
					window.innerWidth <= BREAKPOINTS.tablet ? 120 : 180
				const calculatedItemsPerPage = Math.floor(
					(containerWidth - 32) / (cardWidth + 16)
				)
				setItemsPerPage(calculatedItemsPerPage)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const pageCount = Math.ceil(products.length / itemsPerPage)

	const handleProductClick = (product) => {
		dispatch(setCurrentProduct(product))
		navigate(`/product/${product.id}`)
	}

	const handleDepartmentClick = (slug, products) => {
		dispatch(setProducts(products))
		navigate(`/department/${slug}`)
	}

	const handleNext = () => {
		setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
	}

	const handlePrev = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 0))
	}

	const handleAddToBasketClick = (product) => {
		const quantity = 1
		dispatch(addToBasket({ product: product, quantity: quantity }))
	}

	return (
		<CarouselContainer ref={containerRef}>
			<CarouselControls>
				<Title onClick={() => handleDepartmentClick(slug, products)}>
					{title}
				</Title>
				<SeeMoreButton
					onClick={() => handleDepartmentClick(slug, products)}
				>
					See more...
				</SeeMoreButton>
			</CarouselControls>

			<CarouselWrapper>
				<DesktopButtons>
					<ChevronButton
						className="left"
						onClick={handlePrev}
						disabled={currentPage === 0}
					>
						<ChevronIcon direction="left" />
					</ChevronButton>
					<ChevronButton
						className="right"
						onClick={handleNext}
						disabled={currentPage === pageCount - 1}
					>
						<ChevronIcon direction="right" />
					</ChevronButton>
				</DesktopButtons>

				<ProductList
					$currentPage={currentPage}
					$itemsPerPage={itemsPerPage}
				>
					{products.map((product, i) => (
						<ProductItem key={i}>
							<CarouselItem
								product={product}
								BREAKPOINTS={BREAKPOINTS}
								onClick={() => handleProductClick(product)}
							/>
							<div className="btn-container">
								<BuyButton
									onClick={() =>
										handleAddToBasketClick(product)
									}
									text="Add to Basket"
									type="small"
								/>
							</div>
						</ProductItem>
					))}
				</ProductList>
			</CarouselWrapper>
		</CarouselContainer>
	)
}

const CarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-md);
	background-color: var(--white);
	margin-bottom: var(--spacing-md);

	@media only screen and (max-width: ${BREAKPOINTS.tablet}px) {
		margin-bottom: var(--spacing-sm);
		padding: var(--spacing-sm);
		gap: var(--spacing-sm);
	}
`

const CarouselControls = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`

const Title = styled.button`
	color: var(--dk-blue);
	width: fit-content;
	font-size: clamp(var(--font-md), 2vw, var(--font-xl));
	font-weight: bold;
`

const CarouselWrapper = styled.div`
	position: relative;
	overflow: hidden;
`

const ChevronButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	background-color: var(--white);
	padding: var(--spacing-xl) var(--spacing-md);
	border-radius: var(--br-sm);
	cursor: pointer;
	z-index: 1;

	&.left {
		left: -1rem;
		box-shadow: 3px 0 9px -3px rgba(0, 0, 0, 0.3);
	}

	&.right {
		right: -1rem;
		box-shadow: -3px 0 9px -3px rgba(0, 0, 0, 0.3);
	}

	&:disabled {
		opacity: 0.3;
		background-color: transparent;
		cursor: not-allowed;
	}

	svg {
		width: 2rem;
		path {
			stroke: var(--md-grey);
		}
	}
`

const ProductList = styled.ul`
	display: flex;
	gap: var(--spacing-xs);
	transition: var(--tr-medium);

	@media (min-width: ${BREAKPOINTS.tablet + 1}px) {
		transform: translateX(-${(props) => props.$currentPage * 100}%);
	}

	@media (max-width: ${BREAKPOINTS.tablet}px) {
		overflow-x: auto;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar {
			display: none;
		}
	}
`

const ProductItem = styled.li`
	flex: 0 0 180px;
	margin-right: var(--spacing-md);
	cursor: pointer;
	transition: var(--tr-fast);

	div.btn-container {
		width: 75%;
	}

	@media (max-width: ${BREAKPOINTS.tablet}px) {
		flex: 0 0 120px;
	}

	@media (max-width: ${BREAKPOINTS.mobile}px) {
		margin-right: var(--spacing-sm);
	}

	&:hover {
		border-color: var(--lt-grey-hover);
	}
`

const DesktopButtons = styled.div`
	@media (max-width: ${BREAKPOINTS.tablet}px) {
		display: none;
	}
`

const SeeMoreButton = styled.button`
	color: var(--link-blue);
	width: fit-content;
	font-size: clamp(var(--font-sm), 2vw, var(--font-md));
`
