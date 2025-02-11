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
import Logo from '../icons/AmazonLogo'
import {
	PageContainer,
	AddressesPage,
	PageHeader,
	LayoutGrid,
	Block,
	BlockContainer,
	MobileBlock,
	MobileLink,
} from '../assets/styles/AddressStyles'

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
			<AddressesPage>
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
			</AddressesPage>
		</PageContainer>
	)
}