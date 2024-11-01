import React from 'react'
import styled from 'styled-components'

export default function ArrowheadIcon({ fill, direction }) {

	let rotation = null

	switch (direction) {
		case 'up':
			rotation = 'rotate: 90deg'
			break;
		case 'down':
			rotation = 'rotate: -90deg'
			break;
		case 'left':
			rotation = 'rotate: 180deg'
			break;
		case 'right':
			rotation = 'rotate: 90deg'
			break;
		default:
			return null
	}


	return (
		<SVG
			viewBox="0 0 260 113"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			$rotation={rotation}
		>
			<path fill={fill} d="M130 113L0.0961914 0.5H259.904L130 113Z" />
		</SVG>
	)
}

const SVG = styled.svg`
  width: .8rem;
  height: auto;
  position: relative;
  top: 0.25rem;
  margin-left: var(--spacing-xs);
	transform: ${({ $rotation }) => $rotation};
`