import React from 'react'
import styled from 'styled-components'

export default function SignInBtn({ onClick, text, type }) {
	const login = type === 'login'
	const handleClick = () => {
		onClick()
	}

	return (
		<Container>
			<Button type="button" onClick={handleClick} $login={login} $type={type}>
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
	background-color: ${({ $type }) =>
		$type === 'login' ? 'var(--yellow)' : 'var(--white)'};
	color: var(--black);
	border: ${({ $login }) => ($login ? 'none' : '1px solid var(--border-grey)' )};
	padding: var(--spacing-sm) var(--spacing-md);
	border-radius: var(--br-md);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		background-color: ${({ $type }) =>
			$type === 'login' ? 'var(--yellow-hover)' : 'var(--continue-grey)'};
	}
`
