import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { useSelector } from 'react-redux'
import { selectBasketItemCount } from '../../redux/slices/basketSlice'
import styled from 'styled-components'
import Logo from '../../icons/Logo'
import MenuIcon from '../../icons/MenuIcon'
import CategoryMenu from '../modals/CategoryMenu'
import NavMenu from '../modals/NavMenu'
import LocationIcon from '../../icons/LocationIcon'
import SearchBar from './SearchBar'
import UnionJackIcon from '../../icons/UnionJackIcon'
import ArrowheadIcon from '../../icons/ArrowheadIcon'
import BasketIcon from '../../icons/BasketIcon'

// Constants
const BREAKPOINTS = {
	MOBILE: 768,
	TABLET: 1199,
	DESKTOP: 1200,
}

const NAV_ITEMS = [
	'New Stuff',
	'Best Selling Stuff',
	'Your Stuff',
	'More Stuff',
	'Gift Stuff',
	'Mystery Stuff',
	'Things',
	'Stuff & Things',
	'Extra Things',
	'Stranger Things',
	'The Thing',
	'Must-have Things',
	'Tat',
]

export default function Header() {
	const navigate = useNavigate()
	const windowWidth = useWindowWidth()
	const currentUser = useSelector((state) => state.user.currentUser)
	const defaultAddress = useSelector((state) =>
		state.addresses.addresses.find((address) => address.is_default)
	)
	const basketCount = useSelector(selectBasketItemCount)

	const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
	const [navMenuOpen, setNavMenuOpen] = useState(false)

	useEffect(() => {
		console.log('header', basketCount)
	}, [basketCount])

	const handleSearch = (searchTerm, category) => {
		if (searchTerm.trim()) {
			const searchUrl =
				category && category !== 'all'
					? `/category/${encodeURIComponent(
							category
					  )}/search/${encodeURIComponent(searchTerm.trim())}`
					: `/search/${encodeURIComponent(searchTerm.trim())}`

			navigate(searchUrl)
		}
	}

	const handleSearchByCategory = (category) => {
		const formattedCategory = category.toLowerCase().replace(/\s+/g, '-')
		setCategoryMenuOpen(false)
		navigate(`/category/${encodeURIComponent(formattedCategory)}`)
	}

	const handleBasketClick = () => {
		navigate('/basket')
	}

	const handleHeaderItemClick = (destination) => {
		navigate(destination)
	}

	// Reusable components
	const LogoSection = () => (
		<HeaderItem>
			<Link to="/">
				<LogoContainer>
					<Logo letterColor="var(--white)" />
					<p>.co.uk</p>
				</LogoContainer>
			</Link>
		</HeaderItem>
	)

	const LocationSection = () => (
		<HeaderItem>
			{currentUser ? (
				<button
					className="go-to-account"
					onClick={() => handleHeaderItemClick('/account/addresses')}
				>
					<div className="location">
						<LocationIcon />
						<div className="delivery">
							<p>Delivering to...</p>
							<span>
								{defaultAddress?.postcode || 'Add address'}
							</span>
						</div>
					</div>
				</button>
			) : (
				<button
					className="go-to-account"
					onClick={() => handleHeaderItemClick('/auth')}
				>
					<div className="location">
						<LocationIcon />
						<div className="delivery">
							<p>Delivering to...</p>
							<span>Change location</span>
						</div>
					</div>
				</button>
			)}
		</HeaderItem>
	)

	const BasketSection = () => (
		<HeaderItem>
			<BasketContainer onClick={() => handleBasketClick()}>
				<BasketIcon />
				{basketCount > 0 && (
					<p
						className={`total ${
							basketCount >= 10 ? 'over-ten' : ''
						}`}
					>
						{basketCount}
					</p>
				)}
				<span>Basket</span>
			</BasketContainer>
		</HeaderItem>
	)

	const DesktopLayout = ({
		handleSearch,
		setCategoryMenuOpen,
		categoryMenuOpen,
		handleSearchByCategory,
	}) => (
		<>
			<Content>
				<LogoSection />
				<LocationSection />
				<SearchBar onSearch={handleSearch} />
				<HeaderItem>
					<button
						className="got-to-account"
						onClick={() => handleHeaderItemClick('/account')}
					>
						<UnionJackIcon />
					</button>
				</HeaderItem>
				<HeaderItem>
					{currentUser ? (
						<button
							className="go-to-account"
							onClick={() => handleHeaderItemClick('/account')}
						>
							<p>Hello {currentUser?.first_name}</p>
							<span>
								Account & Lists
								<ArrowheadIcon
									fill="var(--lt-grey)"
									direction="down"
								/>
							</span>
						</button>
					) : (
						<button
							className="go-to-account"
							onClick={() => handleHeaderItemClick('/auth')}
						>
							<p>Hello, Sign in</p>
							<span>
								Account & Lists
								<ArrowheadIcon
									fill="var(--lt-grey)"
									direction="down"
								/>
							</span>
						</button>
					)}
				</HeaderItem>
				<HeaderItem>
					<button className="got-to-account">
						<p>Returns</p>
						<span>& Orders</span>
					</button>
				</HeaderItem>
				<BasketSection />
			</Content>
			<Nav>
				<NavItems>
					<NavItem onClick={() => setCategoryMenuOpen(true)}>
						<MenuIcon />
						<p>All</p>
					</NavItem>
					<ScrollableNavItems>
						{NAV_ITEMS.map((item) => (
							<NavItem key={item}>{item}</NavItem>
						))}
					</ScrollableNavItems>
				</NavItems>
				<CategoryMenu
					closeMenu={() => setCategoryMenuOpen(false)}
					menuOpen={categoryMenuOpen}
					onSearch={handleSearchByCategory}
				/>
			</Nav>
		</>
	)

	const TabletLayout = ({
		setCategoryMenuOpen,
		categoryMenuOpen,
		handleSearchByCategory,
		handleSearch,
	}) => (
		<>
			<Content>
				<LogoSection />
				<ContentTabletView>
					<LocationSection />
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
					<BasketSection />
				</ContentTabletView>
			</Content>
			<Nav>
				<MenuControl onClick={() => setCategoryMenuOpen(true)}>
					<MenuIcon />
					<p>All</p>
				</MenuControl>
				<CategoryMenu
					closeMenu={() => setCategoryMenuOpen(false)}
					menuOpen={categoryMenuOpen}
					onSearch={handleSearchByCategory}
				/>
				<SearchBar onSearch={handleSearch} />
			</Nav>
		</>
	)

	const MobileLayout = ({
		setNavMenuOpen,
		navMenuOpen,
		setCategoryMenuOpen,
		categoryMenuOpen,
		handleSearchByCategory,
		handleSearch,
	}) => (
		<>
			<Content>
				<LogoSection />
				<ContentTabletView>
					<BasketSection />
					<MenuControl onClick={() => setNavMenuOpen(true)}>
						<MenuIcon />
					</MenuControl>
				</ContentTabletView>
				<NavMenu
					closeMenu={() => setNavMenuOpen(false)}
					menuOpen={navMenuOpen}
				/>
			</Content>
			<Nav>
				<MenuControl onClick={() => setCategoryMenuOpen(true)}>
					<MenuIcon />
					<p>All</p>
				</MenuControl>
				<CategoryMenu
					closeMenu={() => setCategoryMenuOpen(false)}
					menuOpen={categoryMenuOpen}
					onSearch={handleSearchByCategory}
				/>
				<SearchBar onSearch={handleSearch} />
			</Nav>
		</>
	)

	return (
		<Container id="header">
			{windowWidth >= BREAKPOINTS.DESKTOP && (
				<DesktopLayout
					handleSearch={handleSearch}
					setCategoryMenuOpen={setCategoryMenuOpen}
					categoryMenuOpen={categoryMenuOpen}
					handleSearchByCategory={handleSearchByCategory}
				/>
			)}
			{windowWidth <= BREAKPOINTS.TABLET &&
				windowWidth >= BREAKPOINTS.MOBILE && (
					<TabletLayout
						setCategoryMenuOpen={setCategoryMenuOpen}
						categoryMenuOpen={categoryMenuOpen}
						handleSearchByCategory={handleSearchByCategory}
						handleSearch={handleSearch}
					/>
				)}
			{windowWidth <= BREAKPOINTS.MOBILE && (
				<MobileLayout
					setNavMenuOpen={setNavMenuOpen}
					navMenuOpen={navMenuOpen}
					setCategoryMenuOpen={setCategoryMenuOpen}
					categoryMenuOpen={categoryMenuOpen}
					handleSearchByCategory={handleSearchByCategory}
					handleSearch={handleSearch}
				/>
			)}
		</Container>
	)
}

// Styled components remain unchanged
const Container = styled.header`
	width: 100%;
	display: flex;
	flex-direction: column;
	z-index: 1000000;
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
	path {
		fill: var(--white);
	}

	@media only screen and (max-width: 768px) {
		span {
			display: none;
		}
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

const MenuControl = styled.div`
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
