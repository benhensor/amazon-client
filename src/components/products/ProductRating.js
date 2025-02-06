import React from 'react'
import { starCalculator } from '../../utils/starCalculator'
import StarIcon from '../../icons/StarIcon'
import styled from 'styled-components'

export default function ProductRating({ rating, review, count }) {

  return (
    <ProductRatingContainer>
      {starCalculator(rating).map((star, index) => (
        <StarIcon key={index} type={star} />
      ))}
      {!review && 
        <p className='count'>&#40;{count}&#41;</p>
        }
    </ProductRatingContainer>
  );
}

const ProductRatingContainer = styled.div`
	display: flex;
	gap: var(--spacing-xs);
  align-items: center;
  font-family: 'Roboto', sans-serif;
  line-height: 1;
  p.count {
    margin-left: var(--spacing-xs);
    font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
    color: var(--star-rating);
  }
  @media only screen and (max-width: 768px) {
    gap: var(--spacing-xxs);
    margin-bottom: var(--spacing-xs);
  }
`
 