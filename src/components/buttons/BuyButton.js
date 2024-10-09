import React from 'react'
import { addToBasket } from '../../redux/slices/basketSlice'
import styled from 'styled-components'

export default function BuyButton({ onClick, text, type }) {
	const handleClick = () => {
		if (text === 'Add to Basket') {
			onClick(addToBasket())
		}
		if (text === 'Buy it Now') {
			onClick()
		}
	}

	return (
		<Container>
			<Button type="button" onClick={handleClick} $text={text} $type={type}>
				{text}
			</Button>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

const Button = styled.button`
	width: 100%;
	background-color: ${({ $text }) =>
		$text === 'Add to Basket' ? 'var(--yellow)' : 'var(--bin-orange)'};
	color: var(--black);
	border: none;
	padding: var(--spacing-sm) var(--spacing-md);
	border-radius: var(--br-25);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		background-color: ${({ $text }) =>
			$text === 'Add to Basket' ? 'var(--yellow-hover)' : 'var(--bin-orange-hover)'};
	}

	@media only screen and (max-width: 768px) {
		padding: ${({ $type }) =>
			$type === 'small' ? 'var(--spacing-xs) var(--spacing-sm)' : 'var(--spacing-sm) var(--spacing-md)'};
	}
`
