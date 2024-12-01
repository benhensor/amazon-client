import React from 'react'
import styled from 'styled-components'

const SVG = styled.svg`
	width: 55px;
	height: 35px;
	fill: none;
	path.orange {
		fill: #FF5A00;
	}
  path.red {
    fill: #EB001B;
  }
	path.yellow {
		fill: #F79E1B;
	}
`

const MastercardLogo = () => {
	return (
		<SVG
			viewBox="0 0 55 35"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
        className="orange"
				d="M34.9199 3.63843H20.036V30.3788H34.9199V3.63843Z"
			/>
			<path
        className="red"
				d="M21.0268 17.0086C21.0268 11.5758 23.5809 6.7539 27.5 3.63841C24.6157 1.3706 20.9773 0 17.0086 0C7.60709 0 0 7.60709 0 17.0086C0 26.4101 7.60709 34.0172 17.0086 34.0172C20.9773 34.0172 24.6157 32.6466 27.5 30.3788C23.5754 27.3073 21.0268 22.4415 21.0268 17.0086Z"
			/>
			<path
        className="yellow"
				d="M55 17.0086C55 26.4101 47.3929 34.0172 37.9914 34.0172C34.0227 34.0172 30.3843 32.6466 27.5 30.3788C31.4687 27.2578 33.9732 22.4415 33.9732 17.0086C33.9732 11.5758 31.4191 6.7539 27.5 3.63841C30.3788 1.3706 34.0172 0 37.9859 0C47.3929 0 55 7.65663 55 17.0086Z"
			/>
		</SVG>
	)
}

export default MastercardLogo
