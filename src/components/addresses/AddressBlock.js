import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setDefaultAddress, updateAddress, deleteAddress } from '../redux/slices/addressSlice'
import PlusIcon from '../icons/PlusIcon'
import Logo from '../icons/Logo'
import styled from 'styled-components'

export default function AddressBlock({ address }) {
  const dispatch = useDispatch()
  const [defaultAddressChanged, setDefaultAddressChanged] = useState(false)

  let timeoutId

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
	return (
		<Block>
			<BlockContainer>
				<div
					className={`container ${
						address.address_id ? 'border-solid' : 'border-dash'
					}`}
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
							</div>
							<div className="address-controls">
								{!address.delivery_instructions && (
									<button className="primary-link">
										Add delivery instructions
									</button>
								)}
								<div>
									<button
										className="primary-link"
										onClick={() =>
											handleEdit(address.address_id)
										}
									>
										Edit
									</button>
									|
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
											|
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
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		&:hover {
			background-color: transparent;
		}
	}
`