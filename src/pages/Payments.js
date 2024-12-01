import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAttributes } from '../utils/paymentMethods'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchPaymentMethods,
	setDefaultPaymentMethod,
} from '../redux/slices/paymentMethodsSlice'
import PlusIcon from '../icons/PlusIcon'
import GiftCard from '../assets/img/payments/wallet-gift-card.png'
import styled from 'styled-components'

export default function Payments() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.user.currentUser)
	const paymentMethods = useSelector(
		(state) => state.paymentMethods.paymentMethods
	)
	const defaultPaymentMethod = useSelector(
		(state) => state.paymentMethods.defaultPaymentMethod
	)

	useEffect(() => {
		dispatch(fetchPaymentMethods())
	}, [dispatch])

	const PaymentMethodThumbnail = ({ card, isMethodInListDisplay }) => {
		if (!card) return null
		const { logo, img, typeLogo, background } = getAttributes(card)
		return (
			<StyledPaymentMethodThumbnail
				style={{ background: background }}
				$isMethodInListDisplay={isMethodInListDisplay}
			>
				<div className="thumbnail-logo">{logo}</div>
				{(card.bank === 'Lloyds Bank' || card.bank === 'Halifax') && (
					<div className="thumbnail-img">{img}</div>
				)}
				{card.status === 'default' && !isMethodInListDisplay && (
					<div className="thumbnail-default">
						<p>•••• {card.number.slice(-4)}</p>
						<p>
							{user.first_name} {user.last_name}
						</p>
					</div>
				)}
				<div className="thumbnail-details">
					{typeLogo}
					<p>{card.account}</p>
				</div>
			</StyledPaymentMethodThumbnail>
		)
	}

	return (
		<PaymentsPage>
			<PaymentsContainer>
				<PaymentsTopSection>
					<BreadcrumbNav>
						<Link to="/account" className="primary-link">
							Your Account
						</Link>
						<span>▸</span>
						<p>Your Payments</p>
					</BreadcrumbNav>
					<PageHeader>
						<h1>Wallet</h1>
					</PageHeader>
					<Content>
						<PaymentMethods>
							<h2>Cards & accounts</h2>
							<div className="cards-container">
								{paymentMethods.map((card) => (
									<>
										<CardContainer
											key={card.payment_method_id}
											$isActive={
												defaultPaymentMethod.payment_method_id ===
												card.payment_method_id
											}
										>
											<div className="thumbnail-container">
												<PaymentMethodThumbnail
													card={card}
													isMethodInListDisplay={true}
												/>
											</div>
											<div className="card-details">
												<p className="card-account">
													{card.bank +
														' ' +
														card.account_type +
														' Account'}
												</p>
												<p className="card-detail">
													Debit card ending in ••••{' '}
													{card.number.slice(-4)}
												</p>
												{card.status === 'expired' && (
													<p className="expired">
														❗️ Expired on{' '}
														{card.end_date}
													</p>
												)}
											</div>
										</CardContainer>
										<hr />
									</>
								))}
							</div>
							<div className="block">
								<div className="img-placeholder">
									<PlusIcon />
								</div>
								<p className="primary-link">
									Add a payment method
								</p>
							</div>
							<hr />
							<div className="block">
								<h2>Rewards & balances</h2>
							</div>
							<hr />
							<div className="block">
								<div className="gift-card">
									<img
										src={GiftCard}
										alt="Scamazon gift card"
									/>
								</div>
								<div className="gift-card-text">
									<p>Scamazon gift card</p>
									<p>Balance £0.00</p>
								</div>
							</div>
						</PaymentMethods>
						<DefaultPaymentMethod>
							<div className="default-method-container">
								<PaymentMethodThumbnail
									card={defaultPaymentMethod}
									isMethodInListDisplay={false}
								/>
							</div>
							<div className="card-details">
								<p className="card-account">
									{defaultPaymentMethod.bank +
										' ' +
										defaultPaymentMethod.account_type +
										' Account'}
								</p>
								<p className="card-detail">
									Debit card ending in ••••{' '}
									{defaultPaymentMethod.number.slice(-4)}
								</p>
								{defaultPaymentMethod.status === 'expired' && (
									<p className="expired">
										❗️ Expired on{' '}
										{defaultPaymentMethod.end_date}
									</p>
								)}
							</div>
						</DefaultPaymentMethod>
					</Content>
				</PaymentsTopSection>
			</PaymentsContainer>
		</PaymentsPage>
	)
}

const PaymentsPage = styled.div`
	background-color: var(--cat-menu-hover);
	overflow-x: hidden;
`

const PaymentsContainer = styled.div`
	margin: 0 auto var(--spacing-lg) auto;

	@media only screen and (max-width: 959px) {
		padding: 0 var(--spacing-md);
	}

	@media only screen and (max-width: 879px) {
		padding: 0 var(--spacing-sm);
	}
`

const PaymentsTopSection = styled.div`
	max-width: 92rem;
	margin: 0 auto;
`

const BreadcrumbNav = styled.div`
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

const PageHeader = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: var(--spacing-md) 0;
`

const Content = styled.div`
	display: flex;
	gap: var(--spacing-lg);
`

const PaymentMethods = styled.div`
	flex: 1;
	.cards-container {
		border-top: 1px solid var(--lt-grey);
		border-bottom: 1px solid var(--dk-blue);
		background-color: var(--inactive-payment-method);
		margin-top: var(--spacing-md);
		display: flex;
		flex-direction: column;
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

const CardContainer = styled.div`
	display: flex;
	border-radius: var(--br-sm);
	gap: var(--spacing-sm);
	background-color: ${($props) => ($props.$isActive ? 'var(--white)' : '')};
	padding: var(--spacing-md) var(--spacing-sm);
	border-left: ${($props) =>
		$props.$isActive ? '5px solid var(--active-payment-method)' : 'none'};
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

	.thumbnail-container {
		width: 8.5rem;
		height: 5.4rem;
	}

	.card-details {
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
	}
`

const StyledPaymentMethodThumbnail = styled.div`
	border-radius: var(--br-sm);
	width: 100%;
	height: 100%;
	padding: var(--spacing-xs);
	position: relative;
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

const DefaultPaymentMethod = styled.div`
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
