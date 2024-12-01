import React from 'react'
import TrashIcon from '../../icons/TrashIcon'
import styled from 'styled-components'

export default function BasketQuantityBtn({
	itemId,
	quantity,
	add,
	subtract,
	deleteItem,
}) {
	console.log('q btn:', itemId, quantity)
	const handleSubtract = () => {
		if (quantity > 1) {
			subtract(itemId) // Call the subtract function with the itemId
		} else if (quantity === 1) {
			deleteItem(itemId) // If quantity is 1, delete the item
		}
	}

	const handleAdd = () => {
		add(itemId) // Call the add function with the itemId
	}

	return (
		<ButtonContainer>
			<div className="section sub">
				<button onClick={handleSubtract}>
			
						{quantity === 1 ? <TrashIcon /> : '-'}
	
				</button>
			</div>
			<div className="section">{quantity}</div>
			<div className="section add">
				<button onClick={handleAdd}>
					+
				</button>
			</div>
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
	color: var(--black);
	div.section {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		svg path {
			stroke: var(--black);
		}
	}
	div.sub, div.add {
		background-color: var(--lt-grey);
		transition: var(--tr-fast);
		&:hover {
			background-color: var(--lt-grey-hover);
			text-decoration: none;
		}
	}
	button {
		border: none !important;
		border-radius: 0 !important;
		width: 100%;
		height: 100%;
		font-size: clamp(var(--font-xs), 2vw, var(--font-lg));
		transition: var(--tr-fast);
	
	}
`