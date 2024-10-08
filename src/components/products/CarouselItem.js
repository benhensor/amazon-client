import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ProductRating from './ProductRating'
import CrimeLogo from '../../icons/CrimeLogo'
import BuyButton from '../buttons/BuyButton'

export default function CarouselItem({ product, BREAKPOINTS }) {
	const [isImageLoaded, setIsImageLoaded] = useState(false)

	useEffect(() => {
		const img = new Image()
		img.src = product.thumbnail
		img.onload = () => setIsImageLoaded(true)
	}, [product.thumbnail])

	return (
		<ProductCard $BREAKPOINTS={BREAKPOINTS}>
			{isImageLoaded ? (
				<ProductImage
					src={product.thumbnail}
					alt={product.title}
					loading="lazy"
					$BREAKPOINTS={BREAKPOINTS}
				/>
			) : (
				<LoadingSpinner>Loading Image...</LoadingSpinner> // Or use a placeholder image
			)}
			<ProductTitle>{product.title}</ProductTitle>
			<ProductRating rating={product.rating} review={false} />
			<ProductPrice>
				<p className="price">
					£
					<span className="price-span">
						{Math.floor(product.price)}
					</span>
					.{(product.price % 1).toFixed(2).slice(2)}
				</p>
				<p className="whole">
					{(
						product.price /
						(1 - product.discountPercentage / 100)
					).toFixed(2)}
				</p>
			</ProductPrice>
			<Discount>-{product.discountPercentage}%</Discount>
			<CrimeLogo />
			<div className="btn-container">
				<BuyButton onClick={() => {}} text="Add to Basket" />
			</div>
		</ProductCard>
	)
}

const LoadingSpinner = styled.div`
	height: 140px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--md-grey);
	background-color: var(--light-grey); // Placeholder background
`

const ProductCard = styled.div`
	flex: 1;
	font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
	width: 20rem;
	height: auto;

	div.btn-container {
		width: 75%;
	}
	@media (max-width: ${(props) => props.$BREAKPOINTS.tablet}px) {
		width: 14rem;
		height: auto;
	}
`

const ProductImage = styled.img`
	max-width: 100%;
	height: auto;
	object-fit: cover;
`

const ProductTitle = styled.p`
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: var(--dk-blue);
	font-size: clamp(var(--font-xxs), 2vw, var(--font-sm));
	padding: var(--spacing-sm) 0;
`

const ProductPrice = styled.div`
	display: flex;
	gap: var(--spacing-md);
	line-height: 1;
	.price {
		display: flex;
		align-items: flex-start;
		.price-span {
			font-size: clamp(var(--font-sm), 2vw, var(--font-md));
			font-weight: bold;
		}
	}
	.whole {
		color: var(--md-grey);
		text-decoration: line-through;
	}
`

const Discount = styled.p`
	width: fit-content;
	padding: var(--spacing-xs);
	color: var(--white);
	background-color: var(--discount-red);
	margin: var(--spacing-sm) 0;
`
