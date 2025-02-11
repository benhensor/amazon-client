import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { selectBasketItemCount } from '../../redux/slices/basketSlice'
import { useWindowWidth } from '../../utils/useWindowWidth'
import { useSelector } from 'react-redux'
import Logo from '../../icons/AmazonLogo'
import MenuIcon from '../../icons/MenuIcon'
import CategoryMenu from '../modals/CategoryMenu'
import NavMenu from '../modals/NavMenu'
import LocationIcon from '../../icons/LocationIcon'
import SearchBar from './SearchBar'
import UnionJackIcon from '../../icons/UnionJackIcon'
import ArrowheadIcon from '../../icons/ArrowheadIcon'
import BasketIcon from '../../icons/BasketIcon'
import {
	Container,
	Content,
	ContentTabletView,
	Nav,
	NavList,
	ScrollableNavList,
	NavItem,
	HeaderItem,
	LogoContainer,
	BasketContainer,
	MenuControl,
} from '../../assets/styles/HeaderStyles'

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
	const addresses = useSelector((state) => state.addresses?.addresses)
	const defaultAddress = addresses.find((addr) => addr.is_default) || null
	const basketCount = useSelector(selectBasketItemCount)
	const [categoryMenuOpen, setCategoryMenuOpen] = useState(false)
	const [navMenuOpen, setNavMenuOpen] = useState(false)

	const userFirstName = currentUser?.full_name.split(' ')[0]

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
				<p className={`total ${basketCount >= 10 ? 'over-ten' : ''}`}>
					{basketCount || 0}
				</p>
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
						aria-label="Go to account"
						type="button"
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
							<p>Hello {userFirstName}!</p>
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
					<button
						className="go-to-account"
						onClick={() => handleHeaderItemClick('/account/orders')}
					>
						<p>Returns</p>
						<span>& Orders</span>
					</button>
				</HeaderItem>
				<BasketSection />
			</Content>
			<Nav>
				<NavList>
					<NavItem onClick={() => setCategoryMenuOpen(true)}>
						<MenuIcon />
						<p>All</p>
					</NavItem>
					<ScrollableNavList>
						{NAV_ITEMS.map((item) => (
							<NavItem key={item}>{item}</NavItem>
						))}
					</ScrollableNavList>
				</NavList>
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
						{currentUser ? (
							<button
								className="go-to-account"
								onClick={() =>
									handleHeaderItemClick('/account')
								}
							>
								<p>Hello {userFirstName}</p>
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
						<button
							className="go-to-account"
							onClick={() =>
								handleHeaderItemClick('/account/orders')
							}
						>
							<p>Returns</p>
							<span>& Orders</span>
						</button>
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
