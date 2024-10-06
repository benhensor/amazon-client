import React from 'react'
import styled from 'styled-components'

export default function AddToCartBtn({ onClick }) {
	return (
		<Container>
			<Button type="button" onClick={onClick}>
				Add to basket
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
	width: fit-content;
	background-color: var(--yellow);
	color: var(--black);
	border: none;
	padding: var(--spacing-sm) var(--spacing-md);
	border-radius: var(--br-25);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		background-color: var(--yellow-hover);
	}
`
