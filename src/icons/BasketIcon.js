import React from 'react'
import styled from 'styled-components'

export default function BasketIcon() {
	return (
		<Container>
			<SVG
				viewBox="0 0 499 338"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M203 338C222.33 338 238 322.33 238 303C238 283.67 222.33 268 203 268C183.67 268 168 283.67 168 303C168 322.33 183.67 338 203 338Z"
				/>
				<path
					d="M373 338C392.33 338 408 322.33 408 303C408 283.67 392.33 268 373 268C353.67 268 338 283.67 338 303C338 322.33 353.67 338 373 338Z"
				/>
				<path d="M0.5 0H119.5L79 41.5H0.5V0Z" />
				<path
					d="M209.5 194.5H374.5L409.788 247.325H178.5L209.5 194.5Z"
				/>
				<path
					d="M119.5 0L209.5 194.5L178.5 247.325L79 41.5L119.5 0Z"
				/>
				<path
					d="M374.5 194.5L439 60.4998H499L409.788 247.325L374.5 194.5Z"
				/>
			</SVG>
		</Container>
	)
}

const Container = styled.div`
	width: 4rem;
	height: auto;
`

const SVG = styled.svg`
	path {
		stroke: inherit;
    fill: inherit;
	}
`