import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { accountOptions, accountLinks } from '../utils/accountOptions'
import styled from 'styled-components'

export default function Account() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const linkTo = (option) => {
		switch (option) {
			case 'Your Orders':
				return '/account/orders'
			case 'Login & Security':
				return '/account/under-construction'
			case 'Crime':
				return '/account/under-construction'
			case 'Your Addresses':
				return '/account/addresses'
			case 'Your Schizzness Account':
				return '/account/under-construction'
			case 'Your Payments':
				return '/account/payments'
			case 'Gift Cards & Top Up':
				return '/account/under-construction'
			case 'Your Messages':
				return '/account/under-construction'
			case 'Your Services':
				return '/account/under-construction'
			case 'Contact Us':
				return '/account/under-construction'
			case 'Our App':
				return '/account/under-construction'
			default:
		}
	}

	const handleSignout = () => {
		dispatch(logoutUser())
		navigate('/auth')
	}

	const AccountOption = ({ option }) => {
		return (
			<Option>
				{option.title === 'Sign out' ? (
					<button onClick={handleSignout}>
						<OptionContainer>
							<OptionImage>
								<img src={option.image} alt={option.title} />
							</OptionImage>
							<OptionDetails>
								<h3>{option.title}</h3>
								<p>{option.text}</p>
							</OptionDetails>
						</OptionContainer>
					</button>
				) : (
					<Link to={linkTo(option.title)}>
						<OptionContainer>
							<OptionImage>
								<img src={option.image} alt={option.title} />
							</OptionImage>
							<OptionDetails>
								<h3>{option.title}</h3>
								<p>{option.text}</p>
							</OptionDetails>
						</OptionContainer>
					</Link>
				)}
			</Option>
		)
	}

	const AccountList = ({ list }) => {
		return (
			<List>
				<h3>{list.title}</h3>
				<ul>
					{list.links.map((link, i) => (
						<li key={i}>
							<span>{link}</span>
						</li>
					))}
				</ul>
			</List>
		)
	}

	return (
		<AccountPage>
			<PageContainer>
				<PageHeader>
					<h1>Your Account</h1>
				</PageHeader>
				<LayoutGrid>
					{accountOptions.map((option) => (
						<AccountOption key={option.id} option={option} />
					))}
				</LayoutGrid>
				<Divider>
					<hr />
				</Divider>
				<LayoutGrid>
					{accountLinks.map((list, i) => (
						<AccountList key={i} list={list} />
					))}
				</LayoutGrid>
			</PageContainer>
		</AccountPage>
	)
}

const AccountPage = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

const PageContainer = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: 0;
	}
`

const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}
`

const LayoutGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
	gap: var(--spacing-lg);
	@media only screen and (max-width: 1199px) {
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		gap: 0;
	}
`

const Option = styled.div`
	border: 1px solid var(--border-grey);
	border-radius: var(--br-lg);
	transition: var(--tr-fast);
	cursor: pointer;
	&:hover {
		background-color: var(--lt-grey);
	}
	button {
		width: 100%;
		text-align: left;
	}
	@media only screen and (max-width: 450px) {
		border-radius: 0;
		border: none;
		border-bottom: 1px solid var(--border-grey);
		height: 9rem;
		display: flex;
		align-items: center;
		&:hover {
			background-color: transparent;
		}
	}
`

const OptionContainer = styled.div`
	display: flex;
	align-items: flex-start;
	padding: var(--spacing-md);
	width: 100%;
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		align-items: center;
		&:hover {
			background-color: transparent;
		}
	}
`

const OptionImage = styled.div`
	margin-right: var(--spacing-sm);
	border-radius: var(--br-50);
	overflow: hidden;
	max-width: 7rem;
	max-height: 7rem;
	img {
		background-color: var(--account-imgBG);
		width: 100%;
		object-fit: contain;
	}
	@media only screen and (max-width: 450px) {
		max-width: 5rem;
		max-height: 5rem;
	}
`

const OptionDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	h3 {
		font-size: clamp(var(--font-md), 3vw, var(--font-lg));
	}
	p {
		color: var(--grey);
	}
	@media only screen and (max-width: 450px) {
		h3 {
			font-size: clamp(var(--font-sm), 3vw, var(--font-md));
		}
		p {
			font-size: var(--font-xs);
		}
	}
`

const Divider = styled.div`
	margin: var(--spacing-xl) 0;
	hr {
		border: none;
		border-top: 1px solid var(--border-grey);
	}
	@media only screen and (max-width: 768px) {
		margin: var(--spacing-lg) 0;
	}
	@media only screen and (max-width: 450px) {
		margin: var(--spacing-md) 0;
	}
`

const List = styled.div`
	padding: var(--spacing-md);
	border: 1px solid var(--border-grey);
	border-radius: var(--br-lg);
	h3 {
		margin-bottom: var(--spacing-sm);
	}
	ul {
		li {
			display: flex;
			justify-content: space-between;
			font-size: var(--font-sm);
			span {
				color: var(--link-blue);
				cursor: pointer;
				transition: var(--tr-fast);
				&:hover {
					color: var(--account-link-hover);
					text-decoration: underline;
				}
			}
		}
	}
`
