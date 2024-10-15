import React from 'react'
import styled from 'styled-components'

export default function TrashIcon() {
	return (
		<SVG viewBox="0 0 720 720" xmlns="http://www.w3.org/2000/svg">
			<path d="M157 170L185.194 610C186.534 635.424 205.494 654 230.306 654H489.694C514.604 654 533.213 635.424 534.806 610L563 170" />
			<path d="M85 137H635" />
			<path d="M275 67L445 67" />
		</SVG>
	)
}

const SVG = styled.svg`
	width: 1.5rem; /* Adjust based on your design */
	height: 1.5rem;
	fill: none;
	path {
		fill: none;
		stroke: var(--black);
		stroke-width: 50;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
`
