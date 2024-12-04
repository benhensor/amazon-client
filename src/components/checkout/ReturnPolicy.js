import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
			<Link to="/basket" className="primary-link">
				Back to basket
			</Link>
		</StyledReturnPolicy>
	)
}

const StyledReturnPolicy = styled.section`
	background: white;
	padding: var(--spacing-md);
	margin: 0;

	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);

	@media only screen and (max-width: 450px) {
		section {
			padding: var(--spacing-sm);
		}
	}
`
