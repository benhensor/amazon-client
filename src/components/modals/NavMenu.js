import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../redux/slices/userSlice'
import ProfileIcon from '../../icons/ProfileIcon'
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon'
import { 
	ModalBackground,
	NavModalContainer,
	ModalHeader,
	MenuItem
} from '../../assets/styles/ModalStyles';

export default function NavMenu({ menuOpen, closeMenu }) {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const currentUser = useSelector((state) => state.user.currentUser)
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn)	

	const userFirstName = currentUser?.full_name.split(' ')[0]

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
			<NavModalContainer $menuOpen={menuOpen}>
				<ModalHeader>
					<div className="profile">
						<ProfileIcon />
						<p>Hello{currentUser && isLoggedIn ? ` ${userFirstName}!` : '...'}</p>
					</div>
					<button onClick={closeMenu}>
						<CloseIcon color={'var(--white)'} />
					</button>
				</ModalHeader>

				{menuItems}

				<MenuItem>
					<button className='signout-btn' onClick={handleLogoutClick}>Sign Out</button>
				</MenuItem>
			</NavModalContainer>
		</>
	)
}
