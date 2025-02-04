import React from 'react'
import { Link } from 'react-router-dom'
import {
	StyledReturnPolicy,
} from '../../assets/styles/CheckoutStyles'

export default function ReturnPolicy() {
	return (
		<StyledReturnPolicy>
			<p>
				Need help? Check our{' '}
				<span className="primary-link">help pages</span> or{' '}
				<span className="primary-link">contact us</span>
			</p>
			<p>
				When you click the "Buy now" button, we'll send you an e-mail
				message acknowledging receipt of your order. Your contract to
				purchase an item will not be complete until we send you an
				e-mail to indicate that the item has been dispatched.
			</p>
			<p>
				Within 30 days of delivery, you may return new, unopened
				physical merchandise in its original condition. Exceptions and
				restrictions apply. See Scamazon's{' '}
				<span className="primary-link">Return Policy</span>.
			</p>
			<Link to="/basket" className="primary-link back-btn">
				Back to basket
			</Link>
		</StyledReturnPolicy>
	)
}