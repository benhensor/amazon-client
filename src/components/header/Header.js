import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
	fetchSearchResults,
	fetchProductsByCategory,
	setSelectedCategory,
	setSearchTerm,
	clearSearchTerm,
} from '../../redux/slices/productsSlice'
import { useNavigate } from 'react-router-dom'
import { useWindowWidth } from '../../utils/useWindowWidth'
import Logo from '../../icons/Logo'
import MenuIcon from '../../icons/MenuIcon'
import CategoryMenu from '../modals/CategoryMenu'
import NavMenu from '../modals/NavMenu'
import LocationIcon from '../../icons/LocationIcon'
import SearchBar from './SearchBar'
import UnionJackIcon from '../../icons/UnionJackIcon'
import ArrowheadIcon from '../../icons/ArrowheadIcon'
import BasketIcon from '../../icons/BasketIcon'
import styled from 'styled-components'

export default function Header() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const windowWidth = useWindowWidth()
	// const { status, error } = useSelector((state) => state.products)

	const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
	const [navMenuOpen, setNavMenuOpen] = useState(false)

	const openCategoryMenu = () => {
		setCategoryMenuOpen(true)
	}

	const closeCategoryMenu = () => {
		setCategoryMenuOpen(false)
	}

	const openNavMenu = () => {
		setNavMenuOpen(true)
	}

	const closeNavMenu = () => {
		setNavMenuOpen(false)
	}

	const handleSearch = (searchTerm) => {
		if (searchTerm.trim()) {
			dispatch(setSearchTerm(searchTerm))
			dispatch(fetchSearchResults(searchTerm))
			navigate(`/products?search=${searchTerm}`)
		}
	}

	const handleSearchByCategory = (category) => {
		const formattedCategory = category.toLowerCase().replace(/\s+/g, '-') // Replace spaces with hyphens

		const encodedCategory = encodeURIComponent(formattedCategory)
		dispatch(setSearchTerm(''))
		dispatch(setSelectedCategory(formattedCategory))
		dispatch(clearSearchTerm())
		dispatch(fetchProductsByCategory(encodedCategory))
		setCategoryMenuOpen(false)
		navigate(`/products?category=${encodedCategory}`)
	}

	return (
		<Container>
			{windowWidth >= 1200 && (
				<>
					<Content>
						<HeaderItem>
							<Link to="/">
								<LogoContainer>
									<Logo />
									<p>.co.uk</p>
								</LogoContainer>
							</Link>
						</HeaderItem>
						<HeaderItem>
							<div className="location">
								<LocationIcon />
								<div className="delivery">
									<p>Delivering to...</p>
									<span>Update location</span>
								</div>
							</div>
						</HeaderItem>
						<SearchBar onSearch={handleSearch} />
						<HeaderItem>
							<UnionJackIcon />
						</HeaderItem>
						<HeaderItem>
							<p>Hello, Sign in</p>
							<span>
								Account & Lists
								<ArrowheadIcon fill="var(--lt-grey)" />
							</span>
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
					<Nav>
						<NavItems>
							<NavItem onClick={openCategoryMenu}>
								<MenuIcon />
								<p>All</p>
							</NavItem>
							<ScrollableNavItems>
								<NavItem>New Stuff</NavItem>
								<NavItem>Best Selling Stuff</NavItem>
								<NavItem>Your Stuff</NavItem>
								<NavItem>More Stuff</NavItem>
								<NavItem>Gift Stuff</NavItem>
								<NavItem>Mystery Stuff</NavItem>
								<NavItem>Things</NavItem>
								<NavItem>Stuff & Things</NavItem>
								<NavItem>Extra Things</NavItem>
								<NavItem>Stranger Things</NavItem>
								<NavItem>The Thing</NavItem>
								<NavItem>Must-have Things</NavItem>
								<NavItem>Tat</NavItem>
							</ScrollableNavItems>
						</NavItems>
						<CategoryMenu
							closeMenu={closeCategoryMenu}
							menuOpen={categoryMenuOpen}
							onSearch={handleSearchByCategory}
						/>
					</Nav>
				</>
			)}
			{windowWidth <= 1199 && windowWidth >= 769 && (
				<>
					<Content>
						<HeaderItem>
							<Link to="/">
								<LogoContainer>
									<Logo />
									<p>.co.uk</p>
								</LogoContainer>
							</Link>
						</HeaderItem>
						<ContentTabletView>
							<HeaderItem>
								<div className="location">
									<LocationIcon />
									<div className="delivery">
										<p>Delivering to...</p>
										<span>Update location</span>
									</div>
								</div>
							</HeaderItem>
							<HeaderItem>
								<UnionJackIcon />
							</HeaderItem>
							<HeaderItem>
								<p>Hello, Sign in</p>
								<span>
									Account & Lists
									<ArrowheadIcon fill="var(--lt-grey)" />
								</span>
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
						</ContentTabletView>
					</Content>
					<Nav>
						<MenuControl onClick={openCategoryMenu}>
							<MenuIcon />
							<p>All</p>
						</MenuControl>
						<CategoryMenu
							closeMenu={closeCategoryMenu}
							menuOpen={categoryMenuOpen}
							onSearch={handleSearchByCategory}
						/>
						<SearchBar onSearch={handleSearch} />
					</Nav>
				</>
			)}
			{windowWidth <= 768 && (
				<>
					<Content>
						<HeaderItem>
							<Link to="/">
								<LogoContainer>
									<Logo />
									<p>.co.uk</p>
								</LogoContainer>
							</Link>
						</HeaderItem>
						<ContentTabletView>
							<HeaderItem>
								<BasketContainer>
									<BasketIcon />
								</BasketContainer>
							</HeaderItem>
							<MenuControl onClick={openNavMenu}>
								<MenuIcon />
							</MenuControl>
						</ContentTabletView>
						<NavMenu
							closeMenu={closeNavMenu}
							menuOpen={navMenuOpen}
						/>
					</Content>
					<Nav>
						<MenuControl onClick={openCategoryMenu}>
							<MenuIcon />
							<p>All</p>
						</MenuControl>
						<CategoryMenu
							closeMenu={closeCategoryMenu}
							menuOpen={categoryMenuOpen}
							onSearch={handleSearchByCategory}
						/>
						<SearchBar onSearch={handleSearch} />
					</Nav>
				</>
			)}
		</Container>
	)
}

const Container = styled.header`
	width: 100%;
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
	@media only screen and (max-width: 1199px) {
		justify-content: space-between;
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) var(--spacing-sm);
	}
`

const ContentTabletView = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
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
	.location {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
	}
	.delivery {
		display: flex;
		flex-direction: column;
	}
	> p {
		font-size: var(--font-xs);
	}
	span {
		font-size: var(--font-sm);
		font-weight: bold;
		display: flex;
		align-items: center;
	}
	/* Create the ::after element */
	&::after {
		content: '';
		position: absolute;
		top: 0;
		left: -0.8rem;
		right: -0.8rem;
		bottom: 0;
		border: 1px solid transparent;
		transition: var(--tr-fast); /* Same transition effect */
		pointer-events: none; /* Ensure the hover only triggers on the main element, not the pseudo-element */
	}

	/* Apply the border effect on hover */
	&:hover::after {
		border-color: var(--white);
	}
`

const LogoContainer = styled.div`
	display: flex;
	width: 15rem;
	height: auto;
	color: var(--white);
	p {
		position: relative;
		top: 0.5rem;
	}
`

const BasketContainer = styled.div`
	display: flex;
	align-items: flex-end;
	path {
		fill: var(--white);
	}
`

const Nav = styled.nav`
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
		padding: var(--spacing-xs);
	}
	@media only screen and (max-width: 768px) {
		gap: 0;
		padding: var(--spacing-xs) var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-xs) var(--spacing-sm);
	}
`

const MenuControl = styled.div`
	width: fit-content;
	height: 100%;
	display: flex;
	align-items: center;
	gap: var(--spacing-xs);
	border: 1px solid transparent;
	padding: var(--spacing-sm) 0 var(--spacing-sm) var(--spacing-sm);
	margin-right: var(--spacing-sm);
	cursor: pointer;
	transition: var(--tr-fast);
	p {
		font-size: var(--font-md);
		font-weight: bold;
	}
	&:hover {
		border-color: var(--white);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) 0;
	}
`

const ScrollableNavItems = styled.div`
	overflow-x: auto;
	white-space: nowrap;
	display: flex;
`

const NavItems = styled.ul`
	display: flex;
	align-items: center;
	overflow-x: auto;
	white-space: nowrap;
`

const NavItem = styled.li`
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
