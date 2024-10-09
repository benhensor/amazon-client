import React, { useEffect } from 'react'
import styled from 'styled-components'
import ProfileIcon from '../../icons/ProfileIcon'
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon'

export default function NavMenu({ menuOpen, closeMenu }) {
	useEffect(() => {
		// Disable scroll when modal is open
		if (menuOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'auto' // Restore scroll
		}

		// Cleanup function to restore scroll on unmount
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [menuOpen])

	return (
		<>
			<ModalBackground $menuOpen={menuOpen} onClick={closeMenu} />
			<MenuContainer $menuOpen={menuOpen}>
				<MenuHeader>
					<div className="profile">
						<ProfileIcon />
					</div>
					<p>Hello...</p>
					<button onClick={closeMenu}>
						<CloseIcon />
					</button>
				</MenuHeader>

				<MenuItem>
					<ChevronIcon direction="left" />
					<p>Account</p>
				</MenuItem>

				<MenuItem>
					<ChevronIcon direction="left" />
					<p>Lists</p>
				</MenuItem>

				<MenuItem>
					<ChevronIcon direction="left" />
					<p>Currency</p>
				</MenuItem>

				<MenuItem>
					<ChevronIcon direction="left" />
					<p>Update location</p>
				</MenuItem>

				<MenuItem>
					<ChevronIcon direction="left" />
					<p>Orders & Returns</p>
				</MenuItem>

				<MenuItem>
					<button>Sign Out</button>
				</MenuItem>
			</MenuContainer>
		</>
	)
}

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	z-index: 100;
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	visibility: ${({ $menuOpen }) => ($menuOpen ? 'visible' : 'hidden')};
	transition: var(--tr-medium);
`

const MenuContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 30rem;
	background-color: var(--white);
	color: var(--black);
	z-index: 999;
	overflow-y: auto;
	display: flex;
	flex-direction: column;
	transform: ${({ $menuOpen }) =>
		$menuOpen ? 'translateX(0)' : 'translateX(100%)'};
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	transition: var(--tr-medium);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

const MenuHeader = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--md-blue);
	position: relative;
	margin-bottom: var(--spacing-md);
	> div {
		display: flex;
		align-items: center;
	}
	div.profile {
		width: 3rem;
		height: 3rem;
		svg {
			fill: var(--white);
		}
	}
	p {
		color: var(--white);
		font-size: var(--font-lg);
		font-weight: bold;
		margin-left: var(--spacing-sm);
	}
	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: transparent;
		position: absolute;
		right: var(--spacing-lg);
	}
`

const MenuItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: var(--spacing-sm);
	width: 100%;
	border-bottom: 1px solid var(--lt-grey);
	position: relative; /* Needed for ::after positioning */
	transition: var(--tr-fast);
	padding: var(--spacing-md) var(--spacing-lg);
	color: var(--black);
	&:last-of-type {
		border-bottom: none;
	}
	> p {
		font-size: var(--font-sm);
	}
	button {
		float: right;
		background-color: transparent;
		border: none;
		&:hover {
			color: var(--highlight-red);
		}
	}
	svg {
		position: absolute;
		left: var(--spacing-lg);
		path {
			stroke: var(--md-grey);
		}
	}
	&:hover {
		background-color: var(--lt-grey);
		svg {
			path {
				stroke: var(--black);
			}
		}
	}
`
