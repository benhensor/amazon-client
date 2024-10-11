import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowWidth } from '../utils/useWindowWidth'
import {
	selectBasketItems,
	selectBasketTotal,
	updateQuantity,
	removeItem,
} from '../redux/slices/basketSlice'
import { formatQuery } from '../utils/formatCategory'
import BuyButton from '../components/buttons/BuyButton'
import QuantityBtn from '../components/buttons/QuantityBtn'
import CrimeLogo from '../icons/CrimeLogo'
import styled from 'styled-components'

export default function Basket() {
	const dispatch = useDispatch()
	const windowWidth = useWindowWidth()
	const basketItems = useSelector(selectBasketItems)
	const basketTotal = useSelector(selectBasketTotal)
	const BasketItem = ({ item }) => {
		const handleQuantityChange = (e) => {
			const newQuantity = parseInt(e.target.value, 10)
			dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
		}

		const handleDelete = () => {
			dispatch(removeItem(item.id))
		}
		return (
			<BasketItemContainer>
				<div className="content">
					<div className="select">
						<input type="checkbox" />
					</div>
					<div className="image">
						<img src={item.thumbnail} alt={item.name} />
					</div>
					<div className="details">
						<h3>{item.title}</h3>
						<p>
							{item.brand
								? `by ${item.brand}`
								: `from ${formatQuery(item.category)}`}
						</p>
						<p
							className={
								item.availabilityStatus === 'In Stock'
									? 'in'
									: 'out'
							}
						>
							{item.availabilityStatus}
						</p>
						<div className="crime">
							<CrimeLogo />
						</div>
						<p>
							Gift options available. <span>Learn more</span>
						</p>
						<div className="item-controls">
							<select
								name="quantity"
								id="quantity"
								value={item.quantity}
								onChange={handleQuantityChange}
							>
								{[...Array(10)].map((_, i) => (
									<option key={i + 1} value={i + 1}>
										Qty: {i + 1}
									</option>
								))}
							</select>
							|<span onClick={handleDelete}>Delete</span>|
							<span>Save for later</span>|
							<span>See more like this</span>|<span>Share</span>
						</div>
					</div>
				</div>

				<div className="price-column">
					<div className="price">
						£{(item.price * item.quantity).toFixed(2)}
					</div>
					<div className="discount">-{item.discountPercentage}%</div>
					<div className="link">
						<span>Save more with Subscribe & Save</span>
					</div>
				</div>
			</BasketItemContainer>
		)
	}


	return (
		<ShoppingBasket>
			<ShoppingBasketContainer>
				<ShoppingBasketItems>
					<div className="basket-header">
						{basketItems.length > 0 ?
              <h1>Shopping Basket</h1> :
              <h1>Your Scamazon Basket is empty</h1>
            }
						<div className="basket-subheader">
							<p>No items selected. (Select all items)</p>
							<p>Price</p>
						</div>
					</div>
					<div className="basket-items">
						{basketItems.map((item, i) => (
							<BasketItem key={i} item={item} />
						))}
					</div>
					<div className="subtotal">
						<p>
							Subtotal ({basketItems.length} items):{' '}
							<span>£{basketTotal.toFixed(2)}</span>
						</p>
					</div>
				</ShoppingBasketItems>

				<Subtotal>
					<p>
						Subtotal
						{windowWidth >= 768 && (
							<span> ({basketItems.length} items)</span>
						)}
						:<span> £{basketTotal.toFixed(2)}</span>
					</p>
					{windowWidth >= 768 && (
						<div className="order-gift">
							<input type="checkbox" />
							<p>This order contains a gift</p>
						</div>
					)}
					<div className="checkout-btn">
						<BuyButton text={windowWidth >= 768 ? `Proceed to Checkout` : `Proceed to Checkout (${basketItems.length} items)`} />
					</div>
				</Subtotal>

			</ShoppingBasketContainer>
		</ShoppingBasket>
	)
}

const ShoppingBasket = styled.div`
	padding: var(--spacing-md) var(--spacing-xxl);
	span {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	@media only screen and (max-width: 768px) {
		padding: 0;
	}
`

const ShoppingBasketContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: var(--spacing-md);

	@media only screen and (max-width: 1199px) {
		flex-direction: column-reverse;
	}
	@media only screen and (max-width: 768px) {
		gap: 0;
	}
`

const ShoppingBasketItems = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: var(--spacing-md);
	background-color: var(--white);
	div.basket-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 1rem 0;
		border-bottom: 1px solid var(--lt-grey);
	}
	div.basket-subheader {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div.subtotal {
		margin: var(--spacing-md) 0;
		text-align: right;
		p {
			font-size: var(--font-lg);
			span {
				font-weight: bold;
			}
		}
	}

	@media only screen and (max-width: 768px) {
		div.basket-header {
			padding: 0 0 var(--spacing-md) 0;
		}
	}
`

const BasketItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey);
	div.content {
		display: flex;
		gap: var(--spacing-md);
	}
	div.select {
		align-self: center;
	}
	div.image {
		width: 18rem;
		height: 18rem;
		border-radius: var(--br-lg);
		border: 1px solid var(--lt-grey);
		overflow: hidden;
	}
	div.details {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
		h3 {
			font-size: var(--font-md);
		}
		p {
			font-size: var(--font-xs);
		}

		p.in {
			color: var(--stock-green);
		}
		p.out {
			color: var(--price-red);
		}
	}
	div.crime {
		display: flex;
		svg {
			width: 5rem;
		}
	}
	div.item-controls {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		color: var(--lt-grey);
		select {
			background-color: var(--qty-select-grey);
			border: 1px solid var(--lt-grey);
			border-radius: var(--br-sm);
			padding: var(--spacing-ms);
		}
		span {
			font-size: var(--font-xs);
			color: var(--link-blue);
			cursor: pointer;
		}
	}
	div.price-column {
		vertical-align: top;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		gap: var(--spacing-sm);
		width: 10rem;
	}
	div.price {
		font-size: var(--font-lg);
		font-weight: bold;
		text-align: right;
	}
	div.discount {
		padding: var(--spacing-xs);
		font-size: var(--font-xs);
		background-color: var(--discount-red);
		color: var(--white);
		line-height: 1;
	}
	div.link {
		color: var(--link-blue);
		font-size: var(--font-sm);
		text-align: right;
	}

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		
    position: relative;
    div.select {
    position: absolute;
    top: var(--spacing-lg);
    left: var(--spacing-md);
		align-self: center;
	}
		div.content {
			gap: var(--spacing-md);
		}
		div.image {
			width: 12rem;
			height: 12rem;
		}
		div.details {
			gap: var(--spacing-xs);
		}
		div.item-controls {
			flex-wrap: wrap;
			gap: var(--spacing-xs);
		}
		div.price-column {
			width: 100%;
			flex-direction: column-reverse;
			justify-content: space-between;
		}
	}
`

const Subtotal = styled.div`
	width: 35rem;
	height: fit-content;
	padding: var(--spacing-md);
	background-color: var(--white);
	p {
		font-size: var(--font-md);
		span {
			font-weight: bold;
		}
	}
	div.order-gift {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		p {
			font-size: var(--font-xs);
		}
	}
	div.checkout-btn {
		margin-top: var(--spacing-md);
	}

	@media only screen and (max-width: 1199px) {
		width: 100%;
	}
	@media only screen and (max-width: 768px) {
		border-bottom: 1px solid var(--lt-grey);
	}
`
