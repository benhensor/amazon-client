import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
	fetchAddresses,
	setDefaultAddress,
	updateAddress,
	deleteAddress,
} from '../redux/slices/addressSlice'
import PlusIcon from '../icons/PlusIcon'
import Logo from '../icons/Logo'
import styled from 'styled-components'

export default function Addresses() {
	const dispatch = useDispatch()
	const { addresses } = useSelector((state) => state.addresses)
	const [sortedAddresses, setSortedAddresses] = useState([])
	const [defaultAddressChanged, setDefaultAddressChanged] = useState(false)

	let timeoutId

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
				(a, b) => new Date(b.createdAt) - new Date(a.createdAt)
			)
			setSortedAddresses(
				[defaultAddress, ...sortedNonDefaultAddresses].filter(Boolean)
			)
		}
	}, [addresses])

	const handleEdit = (id, updatedData) => {
		dispatch(updateAddress({ id, addressData: updatedData }))
	}

	const handleDelete = (id) => {
		dispatch(deleteAddress(id))
	}

	const changeDefaultAddress = (id) => {
		dispatch(setDefaultAddress(id))
		setDefaultAddressChanged(true)
		if (timeoutId) {
			clearTimeout(timeoutId)
		}
		timeoutId = setTimeout(() => {
			setDefaultAddressChanged(false)
			timeoutId = null
		}, 3000)
	}

	const AddressBlock = ({ address }) => {
		if (!address) return null

		return (
			<Block>
				<BlockContainer>
					<div
						className={`container ${
							address.id ? 'border-solid' : 'border-dash'
						}`}
					>
						{address.id ? (
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
									<p>{address.phone_number}</p>
									<p>{address.deliveryInstructions}</p>
								</div>
								<div className="address-controls">
									<button className="primary-link">
										Add delivery instructions
									</button>
									<div>
										<button
											className="primary-link"
											onClick={() =>
												handleEdit(address.id)
											}
										>
											Edit
										</button>
										|
										<button
											className="primary-link"
											onClick={() =>
												handleDelete(address.id)
											}
										>
											Remove
										</button>
										{!address.is_default && (
											<>
												|
												<button
													className="primary-link"
													onClick={() =>
														changeDefaultAddress(
															address.id
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
							<div className="add-address">
								<div className="icon">
									<PlusIcon />
								</div>
								<div className="text">
									<p>Add Address</p>
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
					<Link to="/account/addresses/new-address">
						<AddressBlock address={{}} />
					</Link>
					{sortedAddresses.map((address) => (
						<AddressBlock key={address.id} address={address} />
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
	grid-template-columns: repeat(3, 1fr); /* 3 even columns */
	gap: var(--spacing-lg);
	@media only screen and (max-width: 1199px) {
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(1, 1fr); /* 1 column for mobile */
		gap: var(--spacing-sm);
	}
	@media only screen and (max-width: 450px) {
		gap: 0;
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

	@media only screen and (max-width: 450px) {
		padding-top: 100%;
		border: none;
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
		padding: var(--spacing-lg);
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
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		&:hover {
			background-color: transparent;
		}
	}
`
