import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ChevronIcon from '../../icons/ChevronIcon'
import AddToCartBtn from '../buttons/AddToCartBtn'

const CARD_SIZES = {
	desktop: {
		width: 200,
		height: 300,
	},
	mobile: {
		width: 140,
		height: 210,
	},
}

const BREAKPOINTS = {
	mobile: 480,
	tablet: 768,
}

export default function Carousel({ title, products }) {
	const [currentPage, setCurrentPage] = useState(0)
	const [isMobile, setIsMobile] = useState(false)
	const [isTablet, setIsTablet] = useState(false)
	const [itemsPerPage, setItemsPerPage] = useState(0)

	const carouselRef = useRef(null)
	const containerRef = useRef(null)

	// Touch handling states
	const [isDragging, setIsDragging] = useState(false)
	const [startX, setStartX] = useState(0)
	const [scrollLeft, setScrollLeft] = useState(0)

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth
			setIsMobile(width <= BREAKPOINTS.mobile)
			setIsTablet(
				width > BREAKPOINTS.mobile && width <= BREAKPOINTS.tablet
			)

			if (containerRef.current) {
				const containerWidth = containerRef.current.offsetWidth
				const cardWidth =
					width <= BREAKPOINTS.tablet
						? CARD_SIZES.mobile.width
						: CARD_SIZES.desktop.width
				const calculatedItemsPerPage = Math.floor(
					(containerWidth - 32) / (cardWidth + 16)
				) // Account for container padding and gap
				setItemsPerPage(calculatedItemsPerPage)
			}
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const pageCount = Math.ceil(products.length / itemsPerPage)

	const handleProductClick = (product) => {}

	const handleCategoryClick = (category) => {}

	const handleNext = () => {
		setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
	}

	const handlePrev = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 0))
	}

	// Touch handling functions
	const handleTouchStart = (e) => {
		setIsDragging(true)
		setStartX(e.touches[0].pageX - carouselRef.current.offsetLeft)
		setScrollLeft(carouselRef.current.scrollLeft)
	}

	const handleTouchMove = (e) => {
		if (!isDragging) return
		e.preventDefault()
		const x = e.touches[0].pageX - carouselRef.current.offsetLeft
		const distance = x - startX
		carouselRef.current.scrollLeft = scrollLeft - distance
	}

	const handleTouchEnd = () => {
		setIsDragging(false)
	}

	return (
		<CarouselContainer ref={containerRef}>
			<Title onClick={() => handleCategoryClick(title)}>{title}</Title>

			<CarouselWrapper>
				{!isTablet && !isMobile && (
					<>
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
					</>
				)}

				<ProductList
					ref={carouselRef}
					onTouchStart={handleTouchStart}
					onTouchMove={handleTouchMove}
					onTouchEnd={handleTouchEnd}
					$isTouchDevice={isTablet || isMobile}
					$currentPage={currentPage}
					$itemsPerPage={itemsPerPage}
				>
					{products.map((product, i) => (
						<ProductItem key={i} $isMobile={isMobile || isTablet}>
							<ProductCard>
								<ProductImage
									src={product.thumbnail}
									alt={product.title}
									$isMobile={isMobile || isTablet}
								/>
								<ProductTitle>{product.title}</ProductTitle>
                <AddToCartBtn onClick={() => {}} />
							</ProductCard>
						</ProductItem>
					))}
				</ProductList>
			</CarouselWrapper>

			<SeeMoreButton>See more</SeeMoreButton>
		</CarouselContainer>
	)
}

const CarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg) var(--spacing-md);
	background-color: var(--white);
	margin: var(--spacing-md);

	@media only screen and (max-width: ${BREAKPOINTS.tablet}px) {
		margin: var(--spacing-sm);
	}
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
	${(props) =>
		props.$isTouchDevice &&
		`
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  `}

	${(props) =>
		!props.$isTouchDevice &&
		`
    transform: translateX(-${props.$currentPage * 100}%);
  `}
`

const ProductItem = styled.li`
	flex: 0 0
		${(props) =>
			props.$isMobile
				? CARD_SIZES.mobile.width
				: CARD_SIZES.desktop.width}px;
	padding: var(--spacing-sm);
	border: 1px solid var(--lt-grey);
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		border-color: var(--lt-grey-hover);
	}
`

const ProductCard = styled.div`
	flex: 1;
	overflow: hidden;
`

const ProductImage = styled.img`
	max-width: 100%;
	height: ${(props) =>
		props.$isMobile
			? CARD_SIZES.mobile.height - 40
			: CARD_SIZES.desktop.height - 40}px;
	object-fit: cover;
`

const ProductTitle = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: var(--dk-blue);
	font-size: var(--font-sm);
	padding: var(--spacing-sm) 0;
`

const SeeMoreButton = styled.button`
	color: var(--link-blue);
	width: fit-content;
	margin-top: var(--spacing-md);
	font-size: clamp(var(--font-sm), 2vw, var(--font-md));
`
