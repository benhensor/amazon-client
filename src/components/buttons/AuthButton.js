import React from 'react'
import styled from 'styled-components'

export default function AuthButton({ onClick, text, type }) {
	const login = text === 'Continue' ? true : false
	const handleClick = () => {
		onClick()
	}

	return (
		<Container>
			<Button type={type} onClick={handleClick} $text={text} $login={login} $type={type}>
				{text}
			</Button>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
`

const Button = styled.button`
	width: 100%;
	background-color: ${({ $text }) =>
		$text === 'Continue' ? 'var(--yellow)' : 'var(--white)'};
	color: var(--black);
	border: ${({ $login }) => ($login ? 'none' : '1px solid var(--border-grey)' )};
	padding: var(--spacing-sm) var(--spacing-md);
	border-radius: var(--br-md);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		background-color: ${({ $text }) =>
			$text === 'Continue' ? 'var(--yellow-hover)' : 'var(--continue-grey)'};
	}
`
