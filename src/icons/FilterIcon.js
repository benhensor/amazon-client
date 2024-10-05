import React from 'react'
import styled from 'styled-components'

export default function FilterIcon() {
	return (
		<SVG
			viewBox="0 0 48 48"
		>
			<path d="M42,12a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2H6a2,2,0,0,1,2-2H40a2,2,0,0,1,2,2Z" />
			<path d="M34,24a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2H6a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2Z" />
			<path d="M26,36a2,2,0,0,1-2,2H8a2,2,0,0,1-2-2H6a2,2,0,0,1,2-2H24a2,2,0,0,1,2,2Z" />
		</SVG>
	)
}

const SVG = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  path {
    fill: inherit;
  }
`