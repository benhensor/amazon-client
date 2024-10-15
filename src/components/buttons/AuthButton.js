import React from 'react'
import styled from 'styled-components'

export default function AuthButton({ type, onClick, text }) {
	const login = text === 'Continue' || text === 'Sign-In' ? true : false
	return (
		<Container>
			<Button type={type} onClick={onClick} $login={login}>
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
	background-color: ${({ $login }) =>
		($login ? 'var(--yellow)' : 'var(--white)')};
	color: var(--black);
	border: ${({ $login }) => ($login ? 'none' : '1px solid var(--border-grey)' )};
	padding: var(--spacing-sm) var(--spacing-md);
	border-radius: var(--br-md);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;
	transition: var(--tr-fast);

	&:hover {
		background-color: ${({ $login }) =>
			($login ? 'var(--yellow-hover)' : 'var(--continue-grey)')};
	}
`
