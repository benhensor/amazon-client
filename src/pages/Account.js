import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { accountOptions, accountLinks } from '../utils/accountOptions'
import {
	AccountPage,
	PageContainer,
	PageHeader,
	LayoutGrid,
	Option,
	OptionContainer,
	OptionImage,
	OptionDetails,
	List,
	Divider,
} from '../assets/styles/AccountStyles'

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

	const handleSignout = async () => {
		await dispatch(logoutUser()).unwrap()
		navigate('/')
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
