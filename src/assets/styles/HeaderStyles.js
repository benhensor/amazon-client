import styled from 'styled-components'

export const Container = styled.header`
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 1000000;
`

export const Content = styled.div`
	display: flex;
	align-items: center;
	background-color: var(--dk-blue);
	color: var(--white);
	padding: var(--spacing-sm) var(--spacing-md);
	height: 6rem;
	line-height: var(--lh-sm);
	@media only screen and (max-width: 1199px) {
		justify-content: space-between;
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) var(--spacing-sm);
	}
`

export const ContentTabletView = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
`

export const HeaderItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 100%;
	border: 1px solid transparent;
	position: relative;
	transition: var(--tr-fast);
	margin-right: var(--spacing-md);
	cursor: pointer;
	&:last-child {
		margin-right: 0;
	}
	div.location {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}
	div.delivery {
		display: flex;
		flex-direction: column;
	}
	button.go-to-account {
		color: inherit;
		font-size: inherit;
		text-align: left;
	}
	p {
		font-size: var(--font-xs);
	}
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: -0.8rem;
		right: -0.8rem;
		bottom: 0;
		border: 1px solid transparent;
		transition: var(--tr-fast);
		pointer-events: none;
	}
	&:hover::after {
		border-color: var(--white);
	}
`

export const LogoContainer = styled.div`
	display: flex;
	width: 15rem;
	height: auto;
	color: var(--white);
	p {
		position: relative;
		top: 0.5rem;
	}
`

export const BasketContainer = styled.div`
	display: flex;
	align-items: flex-end;
	position: relative;
	flex-shrink: 0;
	cursor: pointer;
	p.total {
		position: absolute;
		top: -0.2rem;
		left: 1.8rem;
		color: var(--md-orange);
		border-radius: 50%;
		font-size: var(--font-md);
		font-weight: bold;
	}
	p.total.over-ten {
		left: 1.3rem;
	}
	span {
		font-size: var(--font-sm);
		font-weight: bold;
		display: flex;
		align-items: center;
		color: var(--white);
	}
	svg path {
		fill: var(--white);
	}

	@media only screen and (max-width: 768px) {
		span {
			display: none;
		}
	}
`

export const Nav = styled.nav`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: var(--md-blue);
	color: var(--white);
	padding: 0 var(--spacing-xs);
	font-size: var(--font-sm);
	@media only screen and (max-width: 1199px) {
		display: flex;
		gap: var(--spacing-xs);
		padding: var(--spacing-xs) var(--spacing-md);
	}
	@media only screen and (max-width: 768px) {
		gap: 0;
		padding: var(--spacing-xs) var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-xs) var(--spacing-sm);
	}
`

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden; // Add this to prevent outer scroll
  width: 100%; // Ensure it takes full width
`

export const ScrollableNavList = styled.ul`
  overflow-x: auto;
  white-space: nowrap;
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1; // Take up remaining space
  min-width: 0; // Allow flex item to shrink below content size
`

export const MenuControl = styled.div`
	width: fit-content;
	height: 100%;
	display: flex;
	align-items: center;
	gap: var(--spacing-xs);
	border: 1px solid transparent;
	padding: var(--spacing-sm) 0;
	cursor: pointer;
	transition: var(--tr-fast);
	p {
		font-size: var(--font-md);
		font-weight: bold;
		margin-right: var(--spacing-sm);
	}
	&:hover {
		border-color: var(--white);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) 0;
	}
`

export const NavItem = styled.li`
	display: flex;
	align-items: center;
	gap: var(--spacing-xs);
	padding: var(--spacing-sm) var(--spacing-md);
	border: 1px solid transparent;
	cursor: pointer;
	transition: var(--tr-fast);
	&:hover {
		border-color: var(--white);
	}
`

export const SearchbarContainer = styled.form`
	flex: 1;
	display: flex;
	align-items: center;
	background-color: var(--white);
	color: var(--dk-blue);
	height: 4rem;
	border-radius: var(--br-sm);
	overflow: hidden;
	margin-right: var(--spacing-md);
	select {
		height: 100%;
		border: none;
		background-color: var(--lt-grey);
		font-size: var(--font-sm);
		padding: 0 var(--spacing-sm);
		outline: none;
		option {
			color: var(--yellow);
		}
		&:hover {
			background-color: var(--lt-grey-hover);
		}
		@media only screen and (max-width: 768px) {
			display: none;
			margin-right: 0;
		}
	}
	input {
		flex: 1;
		height: 100%;
		border: none;
		padding-left: var(--spacing-sm);
		font-size: var(--font-md);
		&:focus {
			outline: none;
		}
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: var(--lt-orange);
		width: 5rem;
		height: 100%;
		&:hover {
			background-color: var(--lt-orange-hover);
		}
	}
	@media only screen and (max-width: 768px) {
		margin-right: 0;
	}
`
