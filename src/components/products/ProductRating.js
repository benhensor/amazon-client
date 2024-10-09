import React from 'react'
import { starCalculator } from '../../utils/starCalculator'
import StarIcon from '../../icons/StarIcon'
import styled from 'styled-components'

export default function ProductRating({ rating, review }) {

  const generateVoteCount = (rating) => {
    const baseVotes = 10; 
    const multiplier = 10;
    const randomFactor = Math.random() * 150; 

    // Higher ratings generate more votes
    return Math.round(baseVotes + (rating * multiplier) + randomFactor);
  };

  const voteCount = generateVoteCount(rating);

  return (
    <ProductRatingContainer>
      {starCalculator(rating).map((star, index) => (
        <StarIcon key={index} type={star} />
      ))}
      {!review && <p className='count'>{voteCount}</p>}
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
    font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
    color: var(--link-blue);
  }
  @media only screen and (max-width: 768px) {
    gap: var(--spacing-xxs);
    margin-bottom: var(--spacing-xs);
  }
`
 