import React from 'react'
import styled from 'styled-components'

export default function MenuIcon() {
	return (
		<SVG
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M3 12H21"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 6H21"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M3 18H21"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</SVG>
	)
}

const SVG = styled.svg`
  path {
    stroke: var(--white);
    stroke-width: .2rem;
		stroke-linecap: round;
		stroke-linejoin: round;
  }
`