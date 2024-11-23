import React from 'react'
import TrashIcon from '../../icons/TrashIcon'
import styled from 'styled-components'

export default function BasketQuantityBtn({ itemId, quantity, add, subtract, deleteItem }) {
	console.log('q btn:',  itemId, quantity)
	const handleSubtract = () => {
		if (quantity > 1) {
			subtract(itemId); // Call the subtract function with the itemId
		} else if (quantity === 1) {
			deleteItem(itemId); // If quantity is 1, delete the item
		}
	}

	const handleAdd = () => {
		add(itemId); // Call the add function with the itemId
	}

	return (
		<ButtonContainer>
			<Section className="sub">
				<Button onClick={handleSubtract}>
					<div className="btn-inner">{quantity === 1 ? <TrashIcon /> : '-'}</div>
				</Button>
			</Section>
			<Section className="quantity">{quantity}</Section>
			<Section className="add">
				<Button onClick={handleAdd}>
					<div className="btn-inner">+</div>
				</Button>
			</Section>
		</ButtonContainer>
	)
}

const ButtonContainer = styled.div`
	width: 15rem;
	height: 3.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border: 1px solid var(--border-grey);
	border-radius: var(--br-md);
	overflow: hidden;
	div.sub {
		border-radius: var(--br-md) 0 0 var(--br-md);
		background-color: var(--lt-grey);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	div.quantity {
		width: 4rem;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 var(--spacing-lg);
		border: 1px solid var(--border-grey);
	}
	div.add {
		border-radius: 0 var(--br-md) var(--br-md) 0;
		background-color: var(--lt-grey);
		display: flex;
		justify-content: center;
		align-items: center;
	}
`

const Section = styled.div`
	flex: 1;
	color: var(--black);
	height: 100%;
	button svg {
		height: 1.5rem;
	}
	svg path {
		stroke: var(--black);
	}

	`

const Button = styled.button`
	border: none !important;
	border-radius: 0 !important;
	height: 100%;
	padding: var(--spacing-sm) var(--spacing-md);
	font-size: clamp(var(--font-xs), 2vw, var(--font-lg));
	line-height: 1;
	transition: var(--tr-fast);
	text-decoration: none;
	div.btn-inner {
		font-size: var(--font-lg);
	}

	&:hover {
		background-color: var(--lt-grey-hover);
		text-decoration: none;
	}
`
