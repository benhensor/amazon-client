import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPaymentMethods, addPaymentMethod } from '../redux/slices/paymentMethodsSlice'
import PaymentMethod from '../components/payments/PaymentMethod'
import PaymentMethodThumbnail from '../components/payments/PaymentMethodThumbnail'
import AddPaymentMethod from '../components/modals/AddPaymentMethod'
import PlusIcon from '../icons/PlusIcon'
import GiftCard from '../assets/img/payments/wallet-gift-card.png'
import ExclamationIcon from '../icons/ExclaimationIcon'
import { Loader } from '../assets/styles/GlobalStyles'
import styled from 'styled-components'

export default function Payments() {
	const dispatch = useDispatch()
	const loading = useSelector((state) => state.paymentMethods.loading)
	const [addPaymentMethodModalOpen, setAddPaymentMethodModalOpen] =
		useState(false)
	const paymentMethods = useSelector(
		(state) => state.paymentMethods.paymentMethods
	)
	const defaultPaymentMethod =
		useSelector((state) => state.paymentMethods.defaultPaymentMethod) || {}

	const getSortedPaymentMethods = () => {
		if (loading) {
			return []
		}
		const now = new Date()

		return paymentMethods
			.map((method) => {
				// Recalculate expiration status dynamically
				const [month, year] = (method.end_date || '')
					.split('/')
					.map(Number)
				const expirationDate = new Date(`20${year}`, month - 1) // Parse MM/YY
				const isExpired = expirationDate < now

				return {
					...method,
					status: isExpired ? 'expired' : method.status,
				}
			})
			.filter((method) => method && method.payment_method_id)
			.sort((a, b) => {
				if (
					a.payment_method_id ===
					defaultPaymentMethod.payment_method_id
				) {
					return -1
				}
				if (
					b.payment_method_id ===
					defaultPaymentMethod.payment_method_id
				) {
					return 1
				}

				if (a.status === 'expired' && b.status !== 'expired') return 1
				if (b.status === 'expired' && a.status !== 'expired') return -1

				return (a.bank || '').localeCompare(b.bank || '')
			})
	}

	useEffect(() => {
		dispatch(fetchPaymentMethods())
	}, [dispatch])

	useEffect(() => {
		console.log('paymentMethods', paymentMethods)
	}, [paymentMethods])

	const sortedPaymentMethods = getSortedPaymentMethods()

	if (loading && !paymentMethods && !sortedPaymentMethods) {
		return (
			<Loader>
				<div className="loader"></div>
			</Loader>
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
								{sortedPaymentMethods.length > 0 &&
									sortedPaymentMethods?.map((card) => (
										<React.Fragment
											key={card.payment_method_id}
										>
											<PaymentMethod card={card} />
											<hr />
										</React.Fragment>
									))}
							</div>
							<div
								className="block"
								onClick={() =>
									setAddPaymentMethodModalOpen(true)
								}
							>
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
								{defaultPaymentMethod.bank && (
									<p className="card-account">
										{defaultPaymentMethod.bank}{' '}
										{defaultPaymentMethod.card_type}{' '}
										{defaultPaymentMethod.card_account}{' '}
										Account
									</p>
								)}
								{defaultPaymentMethod.number && (
									<p className="card-detail">
										Debit card ending in ••••{' '}
										{defaultPaymentMethod.card_number.slice(
											-4
										)}
									</p>
								)}
								{defaultPaymentMethod.status === 'expired' &&
									defaultPaymentMethod.end_date && (
										<p className="expired">
											<ExclamationIcon /> Expired on{' '}
											{defaultPaymentMethod.end_date}
										</p>
									)}
							</div>
						</DefaultPaymentMethod>
					</Content>
				</PaymentsTopSection>
				<AddPaymentMethod
					isOpen={addPaymentMethodModalOpen}
					setIsOpen={setAddPaymentMethodModalOpen}
					onSubmit={(formData) => {
						console.log('formData', formData)
						dispatch(addPaymentMethod(formData))
						setAddPaymentMethodModalOpen(false)
					}}
				/>
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

	@media only screen and (max-width: 959px) {
		flex-direction: column-reverse;
		gap: var(--spacing-md);
	}
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
