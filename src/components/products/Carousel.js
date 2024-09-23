import React, { useEffect, useState } from 'react'
import ChevronIcon from '../../icons/ChevronIcon'
import styled from 'styled-components'
import StarIcon from '../../icons/StarIcon'
import AddToCartBtn from '../buttons/AddToCartBtn'
import { starCalculator } from '../../utils/starCalculator'


export default function Carousel({ products }) {

  useEffect(() => {
    console.log(products)
  }, [products])


  return (
    <CarouselContainer>
      <CarouselWrapper>
        <Control $position='left'>
          <ChevronIcon direction='left'/>
        </Control>
        <ProductsViewport>
          <ProductsWrapper>
            <ProductPreview>
              {products.map((product) => (
                <ProductCard key={product.id}>
									<img
										src={product.thumbnail}
										alt={product.name}
									/>
									<div className="block">
										<h3>{product.title}</h3>
										<p className="description">
											{product.description}
										</p>
									</div>
									<div className="block">
										<div className="star-rating">
											<>
												{starCalculator(product.rating).map(
													(star, index) => (
														<StarIcon
															key={index}
															type={star}
														/>
													)
												)}
											</>
										</div>
										<div className="price-container">
											<p className="discount">
												-{product.discountPercentage}%
											</p>
											<p className="price">
												£
												<span className="whole">
													{Math.floor(product.price)}
												</span>
												.
												{(product.price % 1)
													.toFixed(2)
													.slice(2)}
											</p>
										</div>
										<AddToCartBtn product={product} />
									</div>
								</ProductCard>
              ))}
            </ProductPreview>
          </ProductsWrapper>
        </ProductsViewport>
        <Control $position='right'>
          <ChevronIcon direction='right'/>
        </Control>
      </CarouselWrapper>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`


`

const CarouselWrapper = styled.div`
	width: 100%;
	margin: var(--lg) 0;
`

const Control = styled.div`
  cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: ${(props) =>
		props.$position === 'left' ? 'flex-start' : 'flex-end'};
	margin: ${(props) =>
		props.$position === 'left' ? '0 var(--lg) 0 0' : '0 0 0 var(--lg)'};
	width: fit-content;
	height: 100%;
	@media only screen and (max-width: 479px) {
		margin: ${(props) =>
			props.$position === 'left' ? '0 var(--xs) 0 0' : '0 0 0 var(--xs)'};
	}
`


export const ProductsViewport = styled.div`
	overflow: hidden;
	flex: 1;
`

export const ProductsWrapper = styled.div`
	display: flex;
	transition: transform 0.5s ease;
	transform: ${(props) =>
		props.$isEmpty
			? 'translateX(0)'
			: `translateX(${props.$offset * -100}%)`};
	width: ${(props) => (props.$isEmpty ? '100%' : 'auto')};
	justify-content: ${(props) => (props.$isEmpty ? 'center' : 'initial')};
`

export const ProductPreview = styled.div`
	flex: 0 0 calc(100% / 5);
	position: relative;
	@media only screen and (max-width: 999px) {
		flex: 0 0 calc(100% / 4);
	}
	@media only screen and (max-width: 849px) {
		flex: 0 0 calc(100% / 3);
	}
	@media only screen and (max-width: 679px) {
		flex: 0 0 calc(100% / 2);
	}
`

const ProductCard = styled.div`
  width: 20rem;
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
