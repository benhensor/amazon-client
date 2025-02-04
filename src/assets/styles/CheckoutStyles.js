import styled from 'styled-components'

export const StyledPage = styled.div`
	min-height: 100svh;
	display: flex;
	flex-direction: column;
`

export const StyledHeader = styled.header`
	background-color: var(--dk-blue);
	color: var(--white);
	padding: var(--spacing-xs) var(--spacing-md);

	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}

	nav {
		max-width: 120rem;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`

export const StyledLogo = styled.div`
	display: flex;
	align-items: center;
	width: 15rem;

	p {
		margin-top: var(--spacing-sm);
		color: var(--white);
	}
`

export const StyledBasket = styled.button`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	color: var(--white);
	background: none;
	border: none;
	cursor: pointer;

	span {
		font-weight: bold;
		@media (max-width: 768px) {
			display: none;
		}
	}

	path {
		fill: var(--white);
	}
`

export const StyledMain = styled.main`
	flex: 1;
	background-color: var(--checkout-grey);
	padding: var(--spacing-md) 0;

	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm) 0;
	}

	.container {
		max-width: 120rem;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr 30rem;
		gap: var(--spacing-md);

		@media only screen and (max-width: 1024px) {
			grid-template-columns: 1fr;
			grid-template-areas:
				'summary'
				'content';

			aside {
				grid-area: summary;
			}

			.content {
				grid-area: content;
			}
		}
	}

	.content {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);

		section {
			background: white;
			padding: var(--spacing-md);
			margin: 0;
		}

		@media only screen and (max-width: 450px) {
			gap: var(--spacing-sm);
			section {
				padding: var(--spacing-sm);
			}
		}
	}

	h3 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}

	p {
		font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	}

	.delivery {
		margin: var(--spacing-md) 0;
	}

	.address {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
	}

	.small {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
	}

	.delivery-date {
		padding: var(--spacing-sm) 0;
	}

	.items {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	.order-controls {
		display: flex;
		gap: var(--spacing-md);
	}

	.btn-container {
		margin: auto 0;
		width: 20rem;
	}

	.order-subtotal {
		display: flex;
		justify-content: space-between;
	}

	.order-total {
		background: white;
		padding: var(--spacing-md) 0;
	}

	aside {
		height: fit-content;
		background: white;
		padding: var(--spacing-md);
	}

	@media only screen and (max-width: 768px) {
		.order-controls {
			flex-direction: column;
		}

		.btn-container {
			width: 100%;
		}
	}
`

export const StyledPaymentSection = styled.section`
	background: white;
	padding: var(--spacing-md);
	margin: 0;

	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	.payment-method {
		margin: var(--spacing-md) 0;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin: var(--spacing-sm) 0;
	}
	form .input-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
	form label {
		font-size: var(--font-xs);
		color: var(--lt-text);
	}

	form select {
		padding: var(--spacing-xs);
		border: 1px solid var(--lt-grey);
		border-radius: var(--br-sm);
	}

	.input-controls {
		display: flex;
		justify-content: space-between;
		margin: var(--spacing-sm) 0;
	}

	.payment-method {
		width: 100%;
	}
`

export const StyledAddressSection = styled.section`
	background: white;
	padding: var(--spacing-md);
	margin: 0;

	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	form {
		min-width: 100%;

		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		margin: var(--spacing-sm) 0;
	}
	form .input-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
	form label {
		font-size: var(--font-xs);
		color: var(--lt-text);
	}

	form input {
		padding: var(--spacing-xs);
		border: 1px solid var(--lt-grey);
		border-radius: var(--br-sm);
	}

	.input-controls {
		display: flex;
		justify-content: space-between;
		margin: var(--spacing-sm) 0;
	}

	.payment-method {
		width: 100%;
	}
`

export const StyledReturnPolicy = styled.section`
	background: white;
	padding: var(--spacing-md);
	margin: 0;

	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);

	.back-btn {
		font-size: var(--font-sm);
	}

	@media only screen and (max-width: 450px) {
		section {
			padding: var(--spacing-sm);
		}
	}
`

export const StyledDeliveryOption = styled.label`
	display: flex;
	align-items: flex-start;
	gap: var(--spacing-sm);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;

	input {
		margin-top: var(--spacing-xs);
	}

	div {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-sm);
	}
`

export const StyledGiftCard = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-md);
	border: 1px solid var(--border-grey);
	padding: var(--spacing-md);

	.image {
		img {
			max-width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.details {
		flex: 5;
		font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	}

	.old-price {
		color: var(--lt-text);
	}

	.new-price {
		color: var(--discount-red);
	}

	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		.image {
			width: 8.6rem;
		}
	}
`

export const StyledOrderItem = styled.article`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--spacing-md);

	.details {
		background: var(--continue-grey);
		border-radius: var(--br-md);
		padding: var(--spacing-md);
	}

	.row {
		display: flex;
		gap: var(--spacing-md);
	}

	.image {
		width: 12rem; /* Set fixed width for consistency */
		flex-shrink: 0; /* Prevent image from shrinking */
		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 0; /* Enable text truncation in child elements */
	}

	h4 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}

	.description {
		display: -webkit-box;
		-webkit-line-clamp: 5; /* Show 3 lines of text */
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
		//max-height: 4.5em; /* 3 lines * 1.5 line height */
	}

	.quantity {
		margin-top: auto; /* Push quantity to bottom */
		p {
			display: flex;
			gap: var(--spacing-sm);
		}
	}

	.delivery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		border: none;
		background: none;

		&:focus {
			outline: none;
		}
	}

	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}

	@media only screen and (max-width: 450px) {
		.details {
			padding: var(--spacing-sm);
		}
		.image {
			width: 100px; /* Smaller image on mobile */
			img {
				width: 100%;
				height: auto;
			}
		}
	}
`

export const StyledOrderSummary = styled.div`
	background: white;

	.subtotals {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}

	.row {
		display: flex;
		justify-content: space-between;
	}

	.total {
		font-weight: bold;
		margin-top: var(--spacing-sm);
	}

	hr {
		margin: var(--spacing-md) 0;
		border: none;
		border-top: 1px solid var(--lt-grey);
	}

	button {
		width: 100%;
		margin-bottom: var(--spacing-md);
	}
`

export const StyledPrivacyNotice = styled.div`
	.small {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
	}
`
