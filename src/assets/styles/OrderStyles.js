import styled from 'styled-components'

export const StyledOrders = styled.div`
	background-color: var(--white);
	overflow-x: hidden;
`

export const OrdersContainer = styled.div`
	margin: 0 auto var(--spacing-lg) auto;

	@media only screen and (max-width: 959px) {
		padding: 0 var(--spacing-md);
	}

	@media only screen and (max-width: 879px) {
		padding: 0 var(--spacing-sm);
	}
`

export const OrdersTopSection = styled.div`
	max-width: 92rem;
	margin: 0 auto;
`

export const BreadcrumbNav = styled.div`
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
`

export const PageHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: var(--spacing-md) 0;
`

export const SearchForm = styled.form`
	display: flex;
	align-items: center;
	position: relative;

	.icon-wrapper {
		position: absolute;
		top: 50%;
		left: var(--spacing-sm);
		transform: translateY(-50%);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.8rem;
		height: 1.8rem;
	}

	input {
		max-width: 50rem;
		padding: var(--spacing-sm);
		border: 1px solid var(--border-grey);
		border-radius: var(--br-sm);
		&::placeholder {
			padding-left: 2rem;
		}
	}

	button {
		padding: var(--spacing-sm);
		background-color: var(--order-search-btn-bg);
		color: var(--white);
		border: none;
		border-radius: var(--br-25);
		margin-left: var(--spacing-sm);
		font-weight: bold;
		&:hover {
			background-color: var(--order-search-btn-bg-hover);
		}
	}

	@media only screen and (max-width: 450px) {
		display: none;
	}
`

export const OrderFilters = styled.div`
	margin: 0 auto;
	nav {
		font-size: clamp(var(--font-xs), 3vw, var(--font-sm));
		font-weight: 600;
		border-bottom: 1px solid var(--lt-grey);

		ul {
			padding: 0 var(--spacing-md);
			display: flex;
			align-items: center;
			gap: var(--spacing-lg);

			li {
				padding: var(--spacing-ms);
				cursor: pointer;
			}
			.active {
				color: var(--dk-blue);
				position: relative;
			}

			.active::after {
				content: '';
				position: absolute;
				bottom: -1px;
				left: 0;
				width: 100%;
				height: 1px;
				background-color: var(--star-rating);
			}
		}
	}

	@media only screen and (max-width: 879px) {
		nav {
			overflow-x: auto;
			-webkit-overflow-scrolling: touch;
			scrollbar-width: none; /* Firefox */
		}

		nav::-webkit-scrollbar {
			display: none; /* Chrome/Safari */
		}

		nav ul {
			flex-wrap: nowrap;
			min-width: min-content;
			padding-bottom: var(--spacing-xs); /* Space for scrollbar */
		}

		nav ul li {
			flex-shrink: 0;
		}

		nav ul li .active::after {
			content: '';
			position: absolute;
			bottom: -4px;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: var(--star-rating);
		}
	}
`

export const OrderHistorySection = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	margin: var(--spacing-md) 0;
	font-size: var(--font-xs);

	select {
		padding: var(--spacing-xs);
		border: 1px solid var(--border-grey);
		background-color: var(--lt-grey);
		border-radius: var(--br-md);
		font-size: var(--font-xs);
	}
`

export const Orders = styled.section`
	max-width: 92rem;
	margin: 0 auto;
`

export const OrderOptions = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-xs);
	padding-left: var(--spacing-lg);
	min-width: 25rem;

	button {
		padding: var(--spacing-ms) var(--spacing-md);
		background-color: transparent;
		color: var(--paleblue);
		border: 1px solid var(--lt-text);
		border-radius: var(--br-25);
		transition: var(--tr-fast);

		&:hover {
			background-color: var(--secondary-hover);
		}

		&.accent {
			background-color: var(--yellow);
		}
	}

	@media only screen and (max-width: 879px) {
		padding: 0;
	}
`

export const OrderBody = styled.div`
	display: flex;
	padding: var(--spacing-md);
	border-bottom: 1px solid var(--border-grey);

	.order-body-items {
		.order-status {
			margin-bottom: var(--spacing-sm);
			p {
				font-weight: 600;
			}
		}

		.cancelled {
			color: var(--input-error);
		}

		.delivered {
			color: var(--dk-blue);
		}

		.enroute {
			color: var(--stock-green);
		}

		.order-item {
			margin-bottom: var(--spacing-md);

			.order-item-details {
				display: flex;

				.order-item-image {
					max-width: 10rem;
					height: auto;
					margin-right: var(--spacing-md);
					img {
						max-width: 100%;
						height: auto;
					}
				}

				.order-item-info {
					.description {
						font-size: var(--font-xs);
					}

					p {
						display: inline-block;
						width: 100%;
					}

					.returns-policy {
						font-size: var(--font-xs);
						margin-bottom: var(--spacing-sm);
					}
				}

				.order-buttons {
					display: flex;
					gap: var(--spacing-sm);

					button {
						width: 10rem;
						border: 1px solid var(--lt-text);
						color: var(--dk-blue);
						border-radius: var(--br-25);
						margin-right: var(--spacing-sm);
						padding: var(--spacing-ms) var(--spacing-sm);
						font-size: var(--font-xs);
						&:hover {
							background-color: var(--lt-grey);
						}
					}
				}
			}
		}
	}

	@media only screen and (max-width: 879px) {
		flex-direction: column;

		.order-body-items {
			margin-bottom: var(--spacing-md);
		}
	}
`

export const OrderItem = styled.div`
	border: 1px solid var(--border-grey);
	border-radius: var(--br-lg);
	overflow: hidden;
	margin-bottom: var(--spacing-md);

	.order-archive {
		display: flex;
		padding: var(--spacing-sm) var(--spacing-md);

		.archive-btn {
			background: none;
			border: none;
			cursor: pointer;
		}
	}
`

export const StyledOrderHeader = styled.div`
	display: flex;
	background-color: var(--order-header-grey);
	padding: var(--spacing-md);
	border-bottom: 1px solid var(--lt-grey);

	.header-item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		font-size: var(--font-xs);
		margin-right: var(--spacing-lg);

		p:first-child {
			text-transform: uppercase;
		}

		&:last-child {
			margin-left: auto;
			margin-right: 0;
			align-items: flex-end;
		}
	}

	@media only screen and (max-width: 768px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--spacing-sm);

		.header-item {
			margin: 0;

			&:nth-child(1),
			&:nth-child(2),
			&:nth-child(3),
			&:nth-child(4) {
				justify-content: flex-start;
			}

			&:last-child {
				align-items: flex-start;
			}
		}
	}
`

export const ContentWrapper = styled.div`
	display: flex;
	position: relative;
`


export const MobileFilterToggle = styled.button`
	margin: var(--spacing-md) 0 0 0;
	display: none;
	align-items: center;
	gap: var(--spacing-xs);
	padding: var(--spacing-xs) var(--spacing-sm);
	background: none;
	border: 1px solid var(--lt-grey);
	border-radius: 4px;
	cursor: pointer;

	@media only screen and (max-width: 768px) {
		display: flex;
	}
`

export const OrderConfirmationContainer = styled.div`
	margin: 0 auto;
	width: 100%;
	background-color: var(--white);

	.outer {
		background-color: var(--lt-grey);
		border-radius: var(--br-lg);
		padding: var(--spacing-lg);
		margin: var(--spacing-lg);
	}

	.order-confirmation-container {
		background-color: var(--white);
		border: 1px solid var(--md-grey);
		padding: var(--spacing-lg) var(--spacing-md);
		border-radius: var(--br-lg);
		display: flex;
	}

	.column {
		display: flex;
		flex-direction: column;
	}

	.row {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.order-details {
		flex: 3;
	}

	.amazon-music-promo {
		flex: 2;
		padding: var(--spacing-md);
		display: flex;
		gap: var(--spacing-md);
	}

	.promo-elements {
		display: flex;
	}

	.promo-image {
		flex: 1;
		width: 100%;
		height: 100%;
		img {
			max-width: 100%;
			width: 100%;
			height: auto;
			object-fit: contain;
		}
	}

	.promo-details {
		flex: 1;
		padding-left: 0 var(--spacing-md);
		text-align: center;
		display: flex;
		flex-direction: column;
		height: 100%;
		h3 {
			font-size: var(--font-md);
		}
		p {
			font-size: var(--font-sm);
		}
	}

	.terms {
		p {
			font-size: var(--font-xs);
		}
	}

	.divider {
		border-bottom: 1px solid var(--lt-grey);
		padding-bottom: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}

	.spacer {
		margin-bottom: var(--spacing-xxl);
	}

	.thanks {
		color: var(--def-address-green);
		font-weight: bold;
	}

	.gift-card-container {
		max-width: 75rem;
		margin: 0 auto var(--spacing-lg) auto;
	}

	.button-container {
		max-width: 50rem;
		text-align: center;
		margin: var(--spacing-lg) auto;
	}

	@media only screen and (max-width: 1099px) {
		.order-confirmation-container {
			flex-direction: column;
		}

		.amazon-music-promo {
			margin-top: var(--spacing-lg);
			flex-direction: column;
			padding: 0;
		}

		.button-container {
			max-width: 100rem;
			padding: 0 var(--spacing-md);
			text-align: center;
			margin: var(--spacing-lg) auto;
		}
	}

	@media only screen and (max-width: 768px) {
		.outer {
			padding: var(--spacing-sm);
			border-radius: 0;
			margin: 0;
		}

		.order-confirmation-container {
			background-color: var(--white);
			border: 1px solid var(--md-grey);
			padding: var(--spacing-sm);
			border-radius: var(--br-lg);
			display: flex;
		}

		.amazon-music-promo {
			margin-top: var(--spacing-md);
			flex-direction: column;
			padding: 0;
		}

		.button-container {
			max-width: 100rem;
			padding: 0 var(--spacing-md);
			text-align: center;
			margin: var(--spacing-lg) auto;
		}
	}

	@media only screen and (max-width: 450px) {
		.outer {
			background-color: var(--lt-grey);
			border-radius: 0;
			padding: var(--spacing-xs);
			margin: 0;
		}
		.order-confirmation-container {
			flex-direction: column;
		}

		.amazon-music-promo {
			margin-top: var(--spacing-lg);
			flex-direction: column;
			padding: 0;
		}
		.promo-elements {
			flex-direction: column;
		}
		.button-container {
			width: 100%;
			padding: 0 var(--spacing-sm);
			text-align: center;
			margin: var(--spacing-lg) auto;
		}
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
