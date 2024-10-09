import React from 'react'
import ChevronIcon from '../../icons/ChevronIcon'
import styled from 'styled-components'

export default function SortingBtn({ text, onClick, direction, isActive }) {
	return (
		<Button onClick={onClick} $isActive={isActive}>
			{text}
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
	border: ${(props) =>
		props.$isActive ? '1px solid var(--paleblue)' : '1px solid var(--lt-grey)'};
	background-color: ${(props) =>
		props.$isActive ? 'var(--yellow)' : 'var(--lt-grey)'};
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	border-radius: var(--br-md);
	cursor: pointer;
	transition: var(--tr-fast);

	p {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
	}
	svg {
		float: right;
		path {
			stroke: var(--black);
		}
	}

	&:hover {
		background-color: ${(props) =>
			props.$isActive ? 'var(--yellow-hover)' : 'var(--lt-grey-hover)'};
	}
`
