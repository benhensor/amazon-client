import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StyledAddressSection } from '../../assets/styles/CheckoutStyles'

export default function AddressSection({
	user,
	address,
	error,
	onAddressSet,
	onAddressRemoved,
}) {
	const navigate = useNavigate()
	const [formOpen, setFormOpen] = useState(false)
	const [guestAddress, setGuestAddress] = useState(null)
	const [formData, setFormData] = useState({
		guest_name: '',
		address_line1: '',
		address_line2: '',
		city: '',
		postcode: '',
		county: '',
		country: '',
	})

	const handleAddressInputChange = (e) => {
		e.preventDefault()
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleFormOpen = () => {
		setFormData({
			guest_name: '',
			address_line1: '',
			address_line2: '',
			city: '',
			postcode: '',
			county: '',
			country: '',
		})
		setGuestAddress(null)
		onAddressRemoved()
		setFormOpen(true)
	}

	const handleSave = (e) => {
		e.preventDefault()
		setGuestAddress(formData)
		setFormOpen(false)
		onAddressSet()
	}

	const renderAddressForm = () => (
		<form action="" onSubmit={(e) => e.preventDefault()}>
			<div className="input-group">
				<label htmlFor="guest_name">Name</label>
				<input
					type="text"
					name="guest_name"
					id="guest_name"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="address_line1">Address Line 1</label>
				<input
					type="text"
					name="address_line1"
					id="address_line1"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="address_line2">Address Line 2</label>
				<input
					type="text"
					name="address_line2"
					id="address_line2"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="city">City</label>
				<input
					type="text"
					name="city"
					id="city"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="postcode">Postcode</label>
				<input
					type="text"
					name="postcode"
					id="postcode"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="county">County</label>
				<input
					type="text"
					name="county"
					id="county"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-group">
				<label htmlFor="country">Country</label>
				<input
					type="text"
					name="country"
					id="country"
					onChange={handleAddressInputChange}
				/>
			</div>
			<div className="input-controls">
				<button onClick={handleSave} className="primary-link">
					Save
				</button>
				<button
					onClick={() => setFormOpen(false)}
					className="primary-link"
				>
					Cancel
				</button>
			</div>
		</form>
	)

	const renderAddressContent = () => {
		if (user?.isLoggedIn) {
			if (!address) {
				return <p>No delivery address set</p>;
			}
			// Only join and display if there are actual values
			const addressValues = Object.values(address).filter(Boolean);
			return addressValues.length ? <p>{addressValues.join(', ')}</p> : <p>No delivery address set</p>;
		}
	
		if (formOpen) {
			return renderAddressForm();
		}
	
		if (guestAddress) {
			const guestAddressValues = Object.values(guestAddress).filter(Boolean);
			return <p>{guestAddressValues.join(', ')}</p>;
		}
	
		if (!formOpen && guestAddress === null) {
			return <p>{error || 'Add a delivery address'}</p>;
		}
	
		return null;
	};

	return (
		<StyledAddressSection>
			<div>
				<h3>Delivering to {user.currentUser?.full_name}</h3>

				{renderAddressContent()}
				<button className="primary-link">
					Add delivery instructions
				</button>
			</div>
			{user.isLoggedIn ? (
				<button
					className="primary-link"
					onClick={() => navigate('/account/addresses')}
				>
					Change
				</button>
			) : (
				<button className="primary-link" onClick={handleFormOpen}>
					Add
				</button>
			)}
		</StyledAddressSection>
	)
}
