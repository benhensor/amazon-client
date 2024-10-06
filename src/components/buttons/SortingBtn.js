import React from 'react'
import ChevronIcon from '../../icons/ChevronIcon'
import styled from 'styled-components'

export default function SortingBtn({ text, onClick, direction, isActive }) {
	return (
		<Button onClick={onClick} $isActive={isActive}>
			Sort by: {text}
			<ChevronIcon direction={direction} />
		</Button>
	)
}

const Button = styled.button`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: var(--spacing-sm) var(--spacing-sm);
	color: var(--black);
	border: 1px solid var(--md-grey);
	background-color: ${props => props.$isActive ? 'var(--yellow)' : 'var(--lt-grey)'};
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	border-radius: var(--br-md);
	cursor: pointer;
	transition: var(--tr-fast);

	svg {
		float: right;
		path {
			stroke: var(--black);
		}
	}

	&:hover {
		background-color: ${props => props.$isActive ? 'var(--yellow-hover)' : 'var(--lt-grey-hover)'};
	}
`
