import React from 'react'
import styled from 'styled-components'

export default function ChevronIcon({ direction }) {
	const rotation = () => {
		switch (direction) {
			case 'up':
				return 'rotate(270deg)'
			case 'right':
				return 'rotate(180deg)'
			case 'down':
				return 'rotate(90deg)'
			case 'left':
				return 'rotate(0deg)'
			default:
				return 'rotate(0deg)'
		}
	}

	return (
		<SVG
			viewBox="0 0 8 12"
			xmlns="http://www.w3.org/2000/svg"
			$rotation={rotation}
		>
			<path d="M7 1L2 6L7 11" />
		</SVG>
	)
}

const SVG = styled.svg`
	width: 0.6rem;
	height: auto;
	fill: none;
	transform: ${({ $rotation }) => $rotation};
	transition: var(--tr-fast);
	path {
		stroke: inherit;
		stroke-width: 2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`
