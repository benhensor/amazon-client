import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchPaymentMethods,
	addPaymentMethod,
	deletePaymentMethod,
} from '../redux/slices/paymentMethodsSlice'
import PaymentMethod from '../components/payments/PaymentMethod'
import PaymentMethodThumbnail from '../components/payments/PaymentMethodThumbnail'
import AddPaymentMethod from '../components/modals/AddPaymentMethod'
import PlusIcon from '../icons/PlusIcon'
import GiftCard from '../assets/img/payments/wallet-gift-card.png'
import ExclamationIcon from '../icons/ExclaimationIcon'
import { Loader } from '../assets/styles/GlobalStyles'
import {
	PaymentsPage,
	PaymentsContainer,
	PaymentsTopSection,
	BreadcrumbNav,
	PageHeader,
	Content,
	PaymentMethods,
	DefaultPaymentMethod,
} from '../assets/styles/PaymentStyles'

export default function Payments() {
	const dispatch = useDispatch()
	const loading = useSelector((state) => state.paymentMethods?.loading)
	const [addPaymentMethodModalOpen, setAddPaymentMethodModalOpen] =
		useState(false)
	const paymentMethods = useSelector(
		(state) => state.paymentMethods?.paymentMethods
	)
	const defaultPaymentMethod = useSelector(
		(state) => state.paymentMethods?.defaultPaymentMethod
	)
	const defaultPaymentMethodId = useSelector(
		(state) => state.paymentMethods?.defaultPaymentMethod?.payment_method_id
	)

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
				if (a.payment_method_id === defaultPaymentMethodId) {
					return -1
				}
				if (b.payment_method_id === defaultPaymentMethodId) {
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
											key={card?.payment_method_id}
										>
											<PaymentMethod
												card={card}
												defaultPaymentMethodId={
													defaultPaymentMethodId
												}
											/>
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
									defaultPaymentMethodId={
										defaultPaymentMethodId
									}
								/>
							</div>
							<div className="card-details">
								{defaultPaymentMethod?.bank && (
									<p className="card-account">
										{defaultPaymentMethod?.bank}{' '}
										{defaultPaymentMethod?.card_type
											.split(' ')
											.map(
												(word) =>
													word
														.charAt(0)
														.toUpperCase() +
													word.slice(1).toLowerCase()
											)
											.join(' ')}{' '}
										{defaultPaymentMethod?.card_account}{' '}
										Account
									</p>
								)}
								{defaultPaymentMethod?.number && (
									<p className="card-detail">
										Debit card ending in ••••{' '}
										{defaultPaymentMethod?.card_number.slice(
											-4
										)}
									</p>
								)}
								{defaultPaymentMethod?.status === 'expired' &&
									defaultPaymentMethod?.end_date && (
										<div className="expired">
											<div>
												<ExclamationIcon /> Expired on{' '}
												{defaultPaymentMethod?.end_date}
											</div>
											<button
												className="primary-link"
												onClick={() => {
													dispatch(
														deletePaymentMethod(
															defaultPaymentMethod?.payment_method_id
														)
													)
												}}
											>
												Remove
											</button>
										</div>
									)}
							</div>
						</DefaultPaymentMethod>
					</Content>
				</PaymentsTopSection>
				<AddPaymentMethod
					isOpen={addPaymentMethodModalOpen}
					setIsOpen={setAddPaymentMethodModalOpen}
					onSubmit={(formData) => {
						dispatch(addPaymentMethod(formData))
						setAddPaymentMethodModalOpen(false)
					}}
				/>
			</PaymentsContainer>
		</PaymentsPage>
	)
}
