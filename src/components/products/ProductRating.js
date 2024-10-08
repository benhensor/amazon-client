import React from 'react'
import { starCalculator } from '../../utils/starCalculator'
import StarIcon from '../../icons/StarIcon'
import styled from 'styled-components'

export default function ProductRating({ rating, review }) {

  console.log(review)
  // Function to generate a number of votes based on the rating
  const generateVoteCount = (rating) => {
    const baseVotes = 10; // Minimum number of votes
    const multiplier = 10; // Multiplier to scale votes up for higher ratings
    const randomFactor = Math.random() * 150; // Adds some randomness to the number

    // Higher ratings should generate more votes, scaled up
    return Math.round(baseVotes + (rating * multiplier) + randomFactor);
  };

  // Get the generated number of votes
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
    margin-bottom: var(--spacing-xs);
  }
`
 