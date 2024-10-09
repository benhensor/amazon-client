import React, { useState } from 'react'
import ProductRating from './ProductRating'
import ChevronIcon from '../../icons/ChevronIcon'
import ProfileIcon from '../../icons/ProfileIcon'
import styled from 'styled-components'

export default function ProductReviews({ reviews }) {
	const [open, setOpen] = useState(false)

	const formatDate = (dateString) => {
		const date = new window.Date(dateString)
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		})
	}

	return (
		<ReviewsContainer>
			<Button onClick={() => setOpen(!open)}>
				Reviews
				<ChevronIcon direction={open ? 'up' : 'right'} />
			</Button>
			<ReviewsList open={open}>
				{reviews.map((review, i) => (
					<Review key={i}>
            <Avatar>
              <div className='avatar-container'>
                <ProfileIcon />
              </div>
                <ReviewerName>{review.reviewerName}</ReviewerName>
            </Avatar>
						<Date>Reviewed in the United Kingdom on {formatDate(review.date)}</Date>
						<Rating>
              <ProductRating rating={review.rating} review={true} />
						  <Comment>"{review.comment}"</Comment>
						</Rating>
						<ReviewerEmail>{review.reviewerEmail}</ReviewerEmail>
					</Review>
				))}
			</ReviewsList>
		</ReviewsContainer>
	)
}

const ReviewsContainer = styled.div`
	margin: var(--spacing-sm) 0;
`

const Button = styled.button`
	color: inherit;
	font-size: inherit;
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	margin-bottom: var(--spacing-md);
	svg {
		path {
			stroke: var(--dk-blue);
		}
	}

	&:hover {
		color: var(--dk-blue); // Optional hover effect
	}
`

const Avatar = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xs);
  div.avatar-container {
    color: var(--md-grey);
    width: 3rem;
    height: 3rem;
    svg {
      fill: currentColor;
    }
  }

`

const ReviewsList = styled.div`
	max-height: ${({ open }) =>
		open ? '50rem' : '0'}; // Large value to accommodate all reviews
	overflow: hidden; // Hide overflow when not open
	transition: max-height 0.3s ease; // Smooth transition effect
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
`

const Review = styled.div`
	padding: var(--spacing-sm);
	border: 1px solid var(--lt-grey);
	border-radius: var(--br-sm);
	width: 100%;
	&:last-child {
		border-bottom: none;
	}
`

const Rating = styled.div`
  padding: var(--spacing-xs) 0;
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
  display: flex;
  align-items: center;
  gap: var(--spacing-lg);
	span {
		font-weight: bold;
		margin-left: var(--spacing-xs);
		color: var(--star-rating);
	}
`

const Comment = styled.p`
	font-size: clamp(var(--font-md), 3vw, var(--font-lg));
	margin: var(--spacing-xs) 0;
`

const ReviewerName = styled.p`
	font-weight: bold;
`

const ReviewerEmail = styled.p`
	font-style: italic;
	color: var(--link-blue);
`

const Date = styled.p`
	font-size: var(--font-xs);
	color: var(--grey);
`
