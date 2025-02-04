import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { superCategories } from '../../utils/superCategories'
import formatQuery from '../../utils/formatQuery'
import ProfileIcon from '../../icons/ProfileIcon'
import ChevronIcon from '../../icons/ChevronIcon'
import CloseIcon from '../../icons/CloseIcon'
import { 
	ModalBackground,
	CategoryModalContainer,
	ModalHeader,
	Heading,
	DepartmentWrapper
} from '../../assets/styles/ModalStyles';


export default function CategoryMenu({ menuOpen, closeMenu, onSearch }) {
	const currentUser = useSelector((state) => state.user.currentUser) 
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn)

	const userFirstName = currentUser?.full_name.split(' ')[0]

	useEffect(() => {
		// Prevent scroll when menu is open
		document.body.style.overflow = menuOpen ? 'hidden' : 'auto'
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [menuOpen])

	// Department component to handle each category section
	const Department = ({ category }) => (
		<DepartmentWrapper>
			<h3>{category.title}</h3>
			<ul>
				{category.subCategories.map((subCategory, i) => (
					<li key={i} onClick={() => onSearch(subCategory)}>
						<div>
							<p>{formatQuery(subCategory)}</p>
							<ChevronIcon direction="right" />
						</div>
					</li>
				))}
			</ul>
		</DepartmentWrapper>
	)

	return (
		<>
			<ModalBackground $menuOpen={menuOpen} onClick={closeMenu} />
			<CategoryModalContainer $menuOpen={menuOpen}>
				<ModalHeader>
					<div className="profile">
						<ProfileIcon />
						<p>Hello{currentUser && isLoggedIn ? ` ${userFirstName}!` : '...'}</p>
					</div>
					<button onClick={closeMenu}>
						<CloseIcon color={'var(--white)'}/>
					</button>
				</ModalHeader>
				<Heading>
					<h2>Shop by Department</h2>
				</Heading>
				{superCategories.map((category, index) => (
					<Department key={index} category={category} />
				))}
			</CategoryModalContainer>
		</>
	)
}
