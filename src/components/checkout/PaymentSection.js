import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentMethod from '../payments/PaymentMethod'
import { StyledPaymentSection } from '../../assets/styles/CheckoutStyles'

export default function PaymentSection({ user, card, error, onPaymentSet }) {
	const navigate = useNavigate()
	const [formOpen, setFormOpen] = useState(false)
	const [formData, setFormData] = useState({
		payment_method_id: '0',
		bank: '',
		type: '',
		account: '',
		number: '',
		start_date: '',
		end_date: '',
		cvv: '',
		status: 'default',
	})
	const [guestCard, setGuestCard] = useState(null)

	const paymentOptions = {
		bank: [
			'Lloyds Bank',
			'Barclays',
			'HSBC',
			'Natwest',
			'Santander',
			'Halifax',
			'RBS',
			'TSB',
			'Nationwide',
			'Metro Bank',
		],
		type: ['Visa', 'Mastercard', 'American Express'],
		account: ['Credit', 'Debit'],
	}

	const generateCardNumber = (type) => {
		const prefix =
			type === 'American Express'
				? '3'
				: type === 'Mastercard'
				? '5'
				: '4'
		let number = prefix
		for (
			let i = number.length;
			i < (type === 'American Express' ? 15 : 16);
			i++
		) {
			number += Math.floor(Math.random() * 10)
		}
		return number
	}

	const generateDates = () => {
		const now = new Date()
		const startMonth = String(now.getMonth() + 1).padStart(2, '0')
		const startYear = String(now.getFullYear()).slice(-2)
		const endDate = new Date(now.setFullYear(now.getFullYear() + 5))
		const endMonth = String(endDate.getMonth() + 1).padStart(2, '0')
		const endYear = String(endDate.getFullYear()).slice(-2)

		return {
			start_date: `${startMonth}/${startYear}`,
			end_date: `${endMonth}/${endYear}`,
		}
	}

	const handleFormOpen = () => {
		setFormData({
			payment_method_id: '',
			bank: '',
			card_type: '',
			cardholder_name: '',
			card_account: '',
			card_number: '',
			start_date: '',
			end_date: '',
			cvv: '',
			status: 'default',
		})
		setGuestCard(null)
		setFormOpen(true)
	}

	const handleCardInputChange = (e) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSave = (e) => {
		e.preventDefault()
		if (!formData.bank || !formData.type || !formData.account) {
			return
		}

		const { start_date, end_date } = generateDates()
		const newCard = {
			...formData,
			number: generateCardNumber(formData.type),
			start_date,
			end_date,
			csv: String(Math.floor(Math.random() * 900) + 100),
			status: 'valid',
		}
		setGuestCard(newCard)
		setFormOpen(false)
		onPaymentSet()
	}

	const renderPaymentForm = () => (
		<form action="">
			<div className="input-group">
				<label htmlFor="bank">Bank:</label>
				<select name="bank" id="bank" onChange={handleCardInputChange}>
					<option value="">Select a bank</option>
					{paymentOptions.bank.map((bank, i) => (
						<option key={i} value={bank}>
							{bank}
						</option>
					))}
				</select>
			</div>
			<div className="input-group">
				<label htmlFor="type">Card type:</label>
				<select name="type" id="type" onChange={handleCardInputChange}>
					<option value="">Select a card type</option>
					{paymentOptions.type.map((type, i) => (
						<option key={i} value={type}>
							{type}
						</option>
					))}
				</select>
			</div>
			<div className="input-group">
				<label htmlFor="account">Account:</label>
				<select
					name="account"
					id="account"
					onChange={handleCardInputChange}
				>
					<option value="">Select an account type</option>
					{paymentOptions.account.map((account, i) => (
						<option key={i} value={account}>
							{account}
						</option>
					))}
				</select>
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

	const renderPaymentContent = () => {
		if (formOpen) {
			return renderPaymentForm()
		}

		if (user.isLoggedIn && card) {
			return (
				<div className="payment-method">
					<PaymentMethod card={card} />
				</div>
			)
		}

		if (!user.isLoggedIn && guestCard) {
			return (
				<div className="payment-method">
					<PaymentMethod card={guestCard} />
				</div>
			)
		}

		return <p>{error || 'Add a payment method'}</p>
	}

	const renderActionButton = () => {
		if (user.isLoggedIn) {
			return (
				<button
					onClick={() => navigate('/account/payments')}
					className="primary-link"
				>
					{card ? 'Change' : 'Add'}
				</button>
			)
		}

		return (
			<button onClick={handleFormOpen} className="primary-link">
				{guestCard ? 'Change' : 'Add'}
			</button>
		)
	}

	return (
		<StyledPaymentSection>
			<div>
				<h3>Payment method</h3>
				{renderPaymentContent()}
				<button className="primary-link">
					Use a gift card, voucher or promo code
				</button>
			</div>
			{renderActionButton()}
		</StyledPaymentSection>
	)
}
