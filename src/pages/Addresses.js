import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useWindowWidth } from '../utils/useWindowWidth'
import { useSelector, useDispatch } from 'react-redux'
import {
	fetchAddresses,
	setDefaultAddress,
	deleteAddress,
} from '../redux/slices/addressSlice'
import PlusIcon from '../icons/PlusIcon'
import ChevronIcon from '../icons/ChevronIcon'
import Logo from '../icons/Logo'
import styled from 'styled-components'

export default function Addresses() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { addresses } = useSelector((state) => state.addresses)
	const [sortedAddresses, setSortedAddresses] = useState([])
	const [defaultAddressChanged, setDefaultAddressChanged] = useState(false)

	let timeoutId

	const smallScreens = useWindowWidth() < 619

	useEffect(() => {
		dispatch(fetchAddresses())
	}, [dispatch])
	
	useEffect(() => {
		if (addresses.length > 0) {
			const defaultAddress = addresses.find(
				(address) => address.is_default
			)
			const nonDefaultAddresses = addresses.filter(
				(address) => !address.is_default
			)
			const sortedNonDefaultAddresses = nonDefaultAddresses.sort(
				(a, b) => new Date(b.created_at) - new Date(a.created_at)
			)
			setSortedAddresses(
				[defaultAddress, ...sortedNonDefaultAddresses].filter(Boolean)
			)
		}
	}, [addresses])
	useEffect(() => {
		console.log('Addresses:', sortedAddresses)	
	}, [sortedAddresses])

	const handleEdit = (addressId) => {
		navigate('/account/addresses/edit-address', { state: { addressId } })
	}

	const handleDelete = (addressId) => {
		dispatch(deleteAddress(addressId))
	}

	const changeDefaultAddress = (addressId) => {
		dispatch(setDefaultAddress(addressId))
		setDefaultAddressChanged(true)
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			setDefaultAddressChanged(false)
			timeoutId = null
		}, 3000)
	}

	const MobileAddNewAddressBlock = ({ text }) => {
		return (
			<MobileBlock $smallScreens={smallScreens}>
				<MobileLink to="/account/addresses/new-address">
					<div className="text">
						<p>{text}</p>
					</div>
					<div className="mobile-icon">
						<ChevronIcon direction='right'/>
					</div>
				</MobileLink>
			</MobileBlock>
		)
	}

	const AddressBlock = ({ address }) => {
		if (!address) return null

		return (
			<Block>
				<BlockContainer $smallScreens={smallScreens}>
					<div
						className={`container ${address.address_id ? 'border-solid' : 'border-dash'}`}
					>
						{address.address_id ? (
							<>
								{address.is_default && (
									<div className="default">
										Default:{' '}
										<div className="default-logo">
											<Logo />
										</div>
									</div>
								)}
								<div className="address">
									<p className="name">{address.full_name}</p>
									<p>{address.address_line1}</p>
									<p>{address.address_line2}</p>
									<p>{address.city}</p>
									<p>{address.postcode}</p>
									<p>{address.county}</p>
									<p>{address.country}</p>
									<p>Phone number: {address.phone_number}</p>
									<p>{address.delivery_instructions}</p>
									{!address.delivery_instructions && (
										<button className="primary-link">
											Add delivery instructions
										</button>
									)}
								</div>
								<div className="address-controls">
									<div>
										<button
											className="primary-link"
											onClick={() =>
												handleEdit(address.address_id)
											}
										>
											Edit
										</button>
										{!smallScreens && '|'}
										<button
											className="primary-link"
											onClick={() =>
												handleDelete(address.address_id)
											}
										>
											Remove
										</button>
										{!address.is_default && (
											<>
												{!smallScreens && '|'}
												<button
													className="primary-link"
													onClick={() =>
														changeDefaultAddress(
															address.address_id
														)
													}
												>
													Set as default
												</button>
											</>
										)}
									</div>
								</div>
							</>
						) : (
							<div className="add-address-container desktop">
								<div className="add-address">
									<div className="icon">
										<PlusIcon />
									</div>
									<div className="text">
										<p>Add new address</p>
									</div>
								</div>
							</div>
						)}
					</div>
				</BlockContainer>
			</Block>
		)
	}

	return (
		<PageContainer>
			<Page>
				<div className="breadcrumb">
					<Link to="/account" className="primary-link">
						Your Account
					</Link>
					<span>▸</span>
					<p>Your Addresses</p>
				</div>
				{defaultAddressChanged && (
					<div className="new-default-address">
						<div className="bar"></div>
						<div className="check">✔</div>
						<h2>Default address changed</h2>
					</div>
				)}
				<PageHeader>
					<h1>Your Addresses</h1>
				</PageHeader>
				<LayoutGrid>
					{smallScreens ? (
						<>
							<MobileAddNewAddressBlock text='Add a new address' />
							<MobileAddNewAddressBlock text='Add a new pickup location' />
						</>
					) : (
						<Link to="/account/addresses/new-address">
						<AddressBlock address={{}} />
					</Link>
					)}
					{sortedAddresses.map((address) => (
						<AddressBlock key={address.address_id} address={address} />
					))}
				</LayoutGrid>
			</Page>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

const Page = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin: var(--spacing-md) 0;
		font-size: var(--font-xs);
		p {
			color: var(--order-breadcrumb);
		}
		span {
			margin-bottom: 2px;
		}
	}
	.new-default-address {
		border: 2px solid var(--def-address-green);
		border-radius: var(--br-lg);
		overflow: hidden;
		width: 100%;
		height: 7rem;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		.bar {
			margin-right: var(--spacing-lg);
			background-color: var(--def-address-green);
			width: 1.5rem;
			height: 100%;
		}
		.check {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: var(--spacing-xs);
			border-radius: var(--br-50);
			background-color: var(--def-address-green);
			color: var(--white);
			font-size: var(--font-xs);
			width: 2rem;
			height: 2rem;
		}
		h2 {
			font-size: var(--font-md);
			color: var(--black);
		}
	}
	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: 0 var(--spacing-sm);
	}
`

const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
`

const LayoutGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 3 even columns */
	gap: var(--spacing-lg);
	@media only screen and (max-width: 1199px) {
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 899px) {
		grid-template-columns: repeat(2, 1fr); /* 2 column for tablet */
		gap: var(--spacing-sm);
	}
	@media only screen and (max-width: 619px) {
		grid-template-columns: repeat(1, 1fr); /* 1 column for mobile */
	}
`

const Block = styled.div`
	position: relative;
	width: 100%;
	height: auto;
	padding-top: 100%; /* This maintains the square aspect ratio */
	transition: var(--tr-fast);

	/* Content container to ensure proper positioning of content inside the square */
	& > * {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (max-width: 619px) {
    padding-top: 0; /* Remove the aspect ratio constraint */
    position: static; /* Reset position */
    height: auto;
    
    & > * {
      position: static; /* Reset absolute positioning of children */
    }
  }
`

const BlockContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.container {
		border-radius: var(--br-lg);
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.border-dash {
		cursor: pointer;
		border: 1px dashed var(--md-grey);
		&:hover {
			border: 1px solid var(--md-grey);
		}
	}
	.border-solid {
		border: 1px solid var(--md-grey);
	}
	.add-address-container {
		margin: auto auto;
	}
	.add-address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--paleblue);
		font-size: var(--font-xl);
		svg {
			width: 3rem;
			height: 3rem;
			fill: var(--paleblue);
		}
	}
	.default {
		border-bottom: 1px solid var(--border-grey);
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: var(--font-xs);
		font-weight: bold;
    display: flex;
    align-items: center;
	}
  .default-logo {
    margin-left: var(--spacing-sm);
    margin-bottom: 2px;
    svg {
      width: 5rem;
    }
  }
	.address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: var(--font-sm);
		padding: var(--spacing-lg) 0 0 var(--spacing-lg);
	}
	.name {
		font-size: var(--font-md);
		font-weight: bold;
	}
	.address-controls {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: var(--spacing-sm) var(--spacing-lg);
		div {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
		}
	}
	@media only screen and (max-width: 619px) {
		padding: 0;
		&:hover {
			background-color: transparent;
		}

		.add-address-container.desktop {
			display: none;
		}

		.add-address-container.mobile {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var(--paleblue);
			border-top: 1px solid var(--border-grey);
			border-bottom: 1px solid var(--border-grey);
		}

		.add-address-container {
			margin: var(--spacing-sm) 0;
		}
		.add-address {
			flex-direction: row-reverse;
			justify-content: space-between;
			color: var(--paleblue);
			font-size: var(--font-sm);
			padding: var(--spacing-sm);
			svg {
				width: .8rem;
				height: auto;
				fill: var(--paleblue);
			}
		}

		.default {
			padding: var(--spacing-sm);
		}

		.address {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			font-size: var(--font-sm);
			padding: var(--spacing-md) var(--spacing-sm);
		}

		.address-controls {
			padding: 0 var(--spacing-sm) var(--spacing-md) var(--spacing-sm);
			gap: var(--spacing-sm);
		}

		.address-controls button {
			font-size: var(--font-xs);
			color: var(--md-blue);
			border: 1px solid var(--md-blue);
			border-radius: var(--br-25);
			padding: var(--spacing-sm) var(--spacing-md);
			&:hover {
				text-decoration: none;
				background-color: var(--md-blue);
				color: var(--white);
			}
		}
	}
`

const MobileBlock = styled.div`
	color: var(--paleblue);
	border-top: 1px solid var(--md-grey);
	border-bottom: 1px solid var(--md-grey);
	padding: var(--spacing-sm) 0;
	.mobile-icon {
		width: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 100%;
			height: auto;
			fill: var(--paleblue);
		}
	}
`

const MobileLink = styled(Link)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`