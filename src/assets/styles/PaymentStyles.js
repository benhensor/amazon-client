import styled from 'styled-components'


export const PaymentsPage = styled.div`
	background-color: var(--cat-menu-hover);
	overflow-x: hidden;
`

export const PaymentsContainer = styled.div`
	margin: 0 auto var(--spacing-lg) auto;

	@media only screen and (max-width: 959px) {
		padding: 0 var(--spacing-md);
	}

	@media only screen and (max-width: 879px) {
		padding: 0 var(--spacing-sm);
	}
`

export const PaymentsTopSection = styled.div`
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

export const Content = styled.div`
	display: flex;
	gap: var(--spacing-lg);

	@media only screen and (max-width: 959px) {
		flex-direction: column-reverse;
		gap: var(--spacing-md);
	}
`

export const PaymentMethods = styled.div`
	flex: 1;
	.cards-container {
		border-top: 1px solid var(--lt-grey);
		border-bottom: 1px solid var(--dk-blue);
		background-color: var(--inactive-payment-method);
		margin-top: var(--spacing-md);
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		height: 50rem;
		overflow-y: scroll;
		/* Enable scrollbar specifically for this element */
		scrollbar-width: thin; /* For Firefox */
		scrollbar-color: var(--scrollbar-thumb) var(--white);

		/* Specific Webkit scrollbar styles */
		::-webkit-scrollbar {
			display: block; /* Ensure it is visible */
			width: 8px; /* Set width of the scrollbar */
		}

		::-webkit-scrollbar-track {
			padding-left: var(--spacing-xs);
			background: var(--white); /* Background color for scrollbar track */
		}

		::-webkit-scrollbar-thumb {
			background: var(--scrollbar-thumb); /* Color for scrollbar thumb */
			border-radius: 4px;
		}

		::-webkit-scrollbar-thumb:hover {
			background: var(
				--scrollbar-thumb-hover
			); /* Hover effect on thumb */
		}

		hr {
			width: 95%;
			margin: 0 auto;

			&:first-of-type,
			&:last-of-type {
				display: none;
			}
		}
	}
	.block {
		padding: var(--spacing-md) var(--spacing-sm);
		display: flex;
		gap: var(--spacing-sm);
		width: 100%;
		height: 8.5rem;

		.gift-card {
			width: 8.5rem;
			height: 5.4rem;
			img {
				border-radius: var(--br-sm);
				width: 100%;
				height: 100%;
			}
		}

		.gift-card-text {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			font-size: var(--font-sm);
			p {
				&:first-of-type {
					font-weight: 700;
				}
			}
		}

		.img-placeholder {
			width: 8.5rem;
			height: 5.4rem;
			border: 2px dashed var(--lt-text);
			border-radius: var(--br-sm);
			margin-left: 5px;
			display: flex;
			justify-content: center;
			align-items: center;
			svg {
				border: 2px solid var(--lt-text);
				border-radius: var(--br-50);
				padding: var(--spacing-xs);
				width: 3rem;
				height: 3rem;
				path {
					fill: var(--lt-text);
				}
			}
		}
		p {
			margin: auto 0;
			font-size: var(--font-sm);
			text-align: center;
		}
	}
`

export const DefaultPaymentMethod = styled.div`
	flex: 2;
	height: fit-content;
	background-color: var(--white);
	padding: var(--spacing-md);
	display: flex;
	gap: var(--spacing-md);
	.default-method-container {
		width: 20rem;
		height: 12.5rem;
	}
`

export const CardContainer = styled.div`
	display: flex;
	flex-direction: column;
  width: 100%;
	border-radius: var(--br-sm);
	gap: var(--spacing-sm);
	background-color: var(--white);
	padding: var(--spacing-md) var(--spacing-sm);
	border-left: ${($props) =>
		$props.$isActive
			? '5px solid var(--active-payment-method)'
			: '5px solid transparent'};
	box-shadow: ${($props) =>
		$props.$isActive ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'};
	z-index: ${($props) => ($props.$isActive ? '1' : '0')};
	transition: background-color 0.3s, box-shadow 0.3s;

	&:hover {
		.card-details .card-account,
		.card-detail {
			cursor: pointer;
			color: var(--active-payment-method);
			text-decoration: underline;
		}
	}

	.card-section-container {
		display: flex;
		gap: var(--spacing-sm);
	}

	.thumbnail-container {
		min-width: 8.5rem;
		height: 5.4rem;
	}

	.card-details {
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		line-height: 1.2;
		.card-account {
			font-size: var(--font-sm);
			font-weight: 700;
		}

		.card-detail {
			font-size: var(--font-xs);
		}
	}
	.expired {
		font-size: var(--font-xs);
		color: var(--input-error);
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: var(--spacing-xs);
	}

	.expired button {
		margin-left: auto;
	}
`

export const Thumbnail = styled.div`
	border-radius: var(--br-sm);
	width: 100%;
	height: 100%;
	padding: var(--spacing-xs);
	position: relative;

	.sash-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.default-sash {
    position: relative;
    top: var(--spacing-sm);
    left: calc(100% - 7rem); /* Adjusted to account for wider top */
    width: 7rem;
    background-color: var(--default-green);
    color: var(--dk-blue);
    padding: var(--spacing-xs) var(--spacing-sm) var(--spacing-xs) 0;
    font-size: var(--font-xs);
    font-weight: 700;
    text-align: right;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 1rem 100%);

		&.thumbnail {
			top: 0;
			left: calc(100% - 5.6rem);
			scale: 0.6;
		}
}

	.thumbnail-logo {
		position: absolute;
		top: ${($props) =>
			$props.$isMethodInListDisplay
				? 'var(--spacing-xs)'
				: 'var(--spacing-sm)'};
		left: ${($props) =>
			$props.$isMethodInListDisplay ? 'var(--spacing-xs)' : '1.2rem'};
		display: flex;
		align-items: flex-start;
		svg {
			width: ${($props) =>
				$props.$isMethodInListDisplay ? '2rem' : '8.5rem'};
			height: 100%;
		}
	}

	.thumbnail-img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 100%;
			height: auto;
		}
	}

	.thumbnail-default {
		position: absolute;
		bottom: ${($props) =>
			$props.$isMethodInListDisplay
				? 'var(--spacing-xs)'
				: 'var(--spacing-md)'};
		left: ${($props) =>
			$props.$isMethodInListDisplay ? 'var(--spacing-xs)' : '1.2rem'};
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		p {
			font-weight: 700;
			color: var(--white);
			font-size: ${($props) =>
				$props.$isMethodInListDisplay ? '.4rem' : '1.2rem'};
		}
	}

	.thumbnail-details {
		position: absolute;
		bottom: ${($props) =>
			$props.$isMethodInListDisplay
				? 'var(--spacing-xs)'
				: 'var(--spacing-sm)'};
		right: ${($props) =>
			$props.$isMethodInListDisplay ? 'var(--spacing-xs)' : '1.2rem'};
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		svg {
			width: ${($props) =>
				$props.$isMethodInListDisplay ? '1.2rem' : '5rem'};
			height: auto;
		}
		p {
			color: var(--white);
			font-size: ${($props) =>
				$props.$isMethodInListDisplay ? '.4rem' : '.8rem'};
		}
	}
`