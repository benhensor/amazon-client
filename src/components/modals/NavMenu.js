import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/slices/userSlice'
import styled from 'styled-components'
import ProfileIcon from '../../icons/ProfileIcon'
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon'

export default function NavMenu({ menuOpen, closeMenu }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentUser = useSelector((state) => state.user.currentUser)
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn)	

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

	const handleMenuItemClick = (destination) => {
		navigate(destination)
		closeMenu()
	}

	const handleLogoutClick = () => {
		dispatch(logoutUser())
		navigate('/auth')
		closeMenu()
	}

	const menuItemProps = {
		account: {
			text: 'Account',
			destination: '/account',
			label: 'Account',
		},
		lists: {
			text: 'Lists',
			destination: '/account/under-construction',
			label: 'Lists',
		},
		currency: {
			text: 'Currency',
			destination: '/account/under-construction',
			label: 'Currency',
		},
		addresses: {
			text: 'Update location',
			destination: '/account/addresses',
			label: 'Update location',
		},
		orders: {
			text: 'Orders & Returns',
			destination: '/account/orders',
			label: 'Orders & Returns',
		},
	}

	const menuItems = Object.keys(menuItemProps).map((key) => {
		const item = menuItemProps[key]
		return (
			<MenuItem key={key}>
				<ChevronIcon direction="left" />
				<button className='menu-btn' onClick={() => handleMenuItemClick(item.destination)}>
					{item.text}
				</button>
			</MenuItem>
		)
	})

	return (
		<>
			<ModalBackground $menuOpen={menuOpen} onClick={closeMenu} />
			<ModalContainer $menuOpen={menuOpen}>
				<ModalHeader>
					<div className="profile">
						<ProfileIcon />
						<p>Hello{currentUser && isLoggedIn ? ` ${currentUser.first_name}!` : '...'}</p>
					</div>
					<button onClick={closeMenu}>
						<CloseIcon />
					</button>
				</ModalHeader>

				{menuItems}

				<MenuItem>
					<button className='signout-btn' onClick={handleLogoutClick}>Sign Out</button>
				</MenuItem>
			</ModalContainer>
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

const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 30rem;
	background-color: var(--white);
	color: var(--black);
	z-index: 999;
	overflow-y: auto;
	transform: ${({ $menuOpen }) =>
		$menuOpen ? 'translateX(0)' : 'translateX(100%)'};
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	transition: var(--tr-medium);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--md-blue);
	position: relative;
	div.profile {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		height: 3rem;
		svg {
			fill: var(--white);
		}
	}
	
	p {
		display: flex;
		align-items: center;
		min-width: fit-content;
		color: var(--white);
		font-size: var(--font-lg);
		font-weight: bold;
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
		font-size: var(--font-sm);
	}
	.signout-btn {
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
