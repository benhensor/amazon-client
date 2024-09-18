import React from 'react'
import styled from 'styled-components'

export default function BasketIcon() {
	return (
		<Container>
      <SVG
        width="49"
        height="34"
        viewBox="0 0 49 34"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_327_19)">
          <path
            d="M0 3H9L19 22.5H38L45.5 7.5"
            stroke="white"
            stroke-width="5"
          />
          <circle cx="19.5" cy="30.5" r="3.5"  />
          <circle cx="35.5" cy="30.5" r="3.5"  />
          <path
            d="M43.5 6.5L48.9975 6.50327L47.5001 9.00015L43.5 6.5Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_327_19">
            <rect width="49" height="34" fill="white" />
          </clipPath>
        </defs>
      </SVG>
    </Container>
	)
}

const Container = styled.div`
  width: 5rem;
  height: 3.5rem;
`

const SVG = styled.svg`
  path {
    stroke: var(--white);
  }
  circle {
    fill: var(--white);
  }
`