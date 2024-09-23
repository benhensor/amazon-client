import React from 'react'
import styled from 'styled-components'

export default function ChevronIcon({ direction }) {
	const rotation = direction === 'left' ? 'rotate(0deg)' : 'rotate(180deg)'
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
  width: .6rem;
  height: auto;
	fill: none;
	transform: ${({ $rotation }) => $rotation};
  path {
    stroke: inherit;
    stroke-width: 2;
  }
`