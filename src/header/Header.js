import React from 'react'
import styled from 'styled-components'
import Logo from '../icons/Logo'
import SearchBar from './SearchBar'
import BasketIcon from '../icons/BasketIcon'

export default function Header() {
	return (
		<Container>
			<Content>
				<HeaderItem>
          <LogoContainer>
            <Logo />
            <p>.co.uk</p>
          </LogoContainer>
        </HeaderItem>
				<HeaderItem>
					<p>Delivering to...</p>
					<span>Update location</span>
				</HeaderItem>
				<SearchBar />
				<HeaderItem>Currency</HeaderItem>
				<HeaderItem>
					<p>Hello, Sign in</p>
					<span>Account & Lists</span>
				</HeaderItem>
				<HeaderItem>
					<p>Returns</p>
					<span>& Orders</span>
				</HeaderItem>
				<HeaderItem>
          <BasketContainer>
            <BasketIcon />
            <span>Basket</span>
          </BasketContainer>
        </HeaderItem>
			</Content>
			<Nav>Categories</Nav>
		</Container>
	)
}

const Container = styled.header`
	display: flex;
	flex-direction: column;
`

const Content = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--dk-blue);
	color: var(--white);
	padding: var(--spacing-sm) var(--spacing-md);
	height: 6rem;
	line-height: var(--lh-sm);
`

const HeaderItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	border: 1px solid transparent;
	position: relative; /* Needed for ::after positioning */
	transition: var(--tr-fast);
  margin-right: var(--spacing-md);
	&:last-child {
		margin-right: 0;
	}
	> p {
		font-size: var(--font-xs);
	}
	span {
		font-size: var(--font-sm);
		font-weight: bold;
	}
	/* Create the ::after element */
	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: -.8rem;
		right: -.8rem;
		bottom: 0;
		border: 1px solid transparent;
		transition: var(--tr-fast); /* Same transition effect */
		pointer-events: none; /* Ensure the hover only triggers on the main element, not the pseudo-element */
	}

	/* Apply the border effect on hover */
	&:hover::after {
		border-color: var(--white);
	}
`;

const LogoContainer = styled.div`
	display: flex;
	width: 15rem;
	height: auto;
	color: var(--white);
	p {
		position: relative;
		top: -0.3rem;
	}
`

const BasketContainer = styled.div`
  display: flex;
  align-items: flex-end;
`

const Nav = styled.nav`
	background-color: var(--md-blue);
	color: var(--white);
	padding: var(--spacing-sm) var(--spacing-md);
`
