import React from 'react'
import styled from 'styled-components'
import { starCalculator } from '../../utils/starCalculator'
import AddToCartBtn from '../buttons/AddToCartBtn'
import StarIcon from '../../icons/StarIcon'

export default function CarouselItem({ product }) {
	return (
		<ProductCard>
			<img src={product.thumbnail} alt={product.name} />
			<div className="block">
				<h3>{product.title}</h3>
				<p className="description">{product.description}</p>
			</div>
			<div className="block">
				<div className="star-rating">
					<>
						{starCalculator(product.rating).map((star, index) => (
							<StarIcon key={index} type={star} />
						))}
					</>
				</div>
				<div className="price-container">
					<p className="discount">-{product.discountPercentage}%</p>
					<p className="price">
						£
						<span className="whole">
							{Math.floor(product.price)}
						</span>
						.{(product.price % 1).toFixed(2).slice(2)}
					</p>
				</div>
				<AddToCartBtn product={product} />
			</div>
		</ProductCard>
	)
}



const ProductCard = styled.div`
	border: 1px solid var(--lt-grey);
	padding: var(--spacing-md);
	display: flex;
	flex-direction: column;
	cursor: pointer;
	transition: var(--tr-fast);
	img {
		max-width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		object-fit: cover;
	}
	h3 {
		font-size: var(--font-md);
		margin: var(--spacing-xs) 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.description {
		display: -webkit-box; /* For Safari */
		-webkit-box-orient: vertical; /* For Safari */
		-webkit-line-clamp: 5; /* Limit to 3 lines */
		overflow: hidden; /* Hide overflow */
		text-overflow: ellipsis; /* Add ellipsis for overflowed text */
		font-size: var(--font-sm);
		color: var(--link-blue);
		line-height: 1.5; /* Adjust line height as needed */
		height: calc(1.5em * 5);
		max-height: calc(1.5em * 5);
	}
	.block {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		margin-bottom: var(--spacing-sm);
	}
	.star-rating {
		display: flex;
		gap: var(--spacing-xs);
	}
	.discount {
		color: var(--discount-red);
		font-size: var(--font-sm);
	}
	.price-container {
		display: flex;
		align-items: center;
		gap: var(--spacing-lg);
		margin-bottom: var(--spacing-sm);
	}
	.price {
		font-size: var(--font-xs);
		display: flex;
		align-items: flex-start;
		line-height: 1rem;
		.whole {
			font-size: var(--font-xl);
			font-weight: bold;
			line-height: 1.3rem;
		}

		.decimal {
			font-size: 0.8rem; /* Smaller size for decimal */
		}
	}
	&:hover {
		border-color: var(--lt-grey-hover);
	}
`