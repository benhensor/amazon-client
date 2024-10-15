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
import BasketQuantityBtn from '../components/buttons/BasketQuantityBtn'
import CrimeLogo from '../icons/CrimeLogo'
import styled from 'styled-components'

export default function Basket() {
	const dispatch = useDispatch()
	const windowWidth = useWindowWidth()
	const basketItems = useSelector(selectBasketItems)
	const basketTotal = useSelector(selectBasketTotal)

	const handleQuantityChange = (e, item) => {
		const newQuantity = parseInt(e.target.value, 10)
		dispatch(updateQuantity({ id: item.id, quantity: newQuantity }))
	}

	const handleAddQuantity = (itemId) => {
		const item = basketItems.find((item) => item.id === itemId)
		if (item) {
			dispatch(
				updateQuantity({ id: itemId, quantity: item.quantity + 1 })
			)
		}
	}

	const handleSubtractQuantity = (itemId) => {
		const item = basketItems.find((item) => item.id === itemId)
		if (item && item.quantity > 1) {
			dispatch(
				updateQuantity({ id: itemId, quantity: item.quantity - 1 })
			)
		} else if (item && item.quantity === 1) {
			dispatch(removeItem(itemId))
		}
	}

	const handleDelete = (itemId) => {
		dispatch(removeItem(itemId))
	}

	const BasketItemControls = ({
		item,
		handleQuantityChange,
		handleDelete,
	}) => {
		return (
			<ItemControls>
				{windowWidth >= 768 && (
					<select
						name="quantity"
						id="quantity"
						value={item.quantity}
						onChange={(e) => handleQuantityChange(e, item)}
					>
						{[...Array(10)].map((_, i) => (
							<option key={i + 1} value={i + 1}>
								Qty: {i + 1}
							</option>
						))}
					</select>
				)}
				{windowWidth <= 768 && (
					<BasketQuantityBtn
						itemId={item.id}
						quantity={item.quantity}
						add={handleAddQuantity}
						subtract={handleSubtractQuantity}
						deleteItem={handleDelete}
					/>
				)}
				<Buttons>
					<Pipe>|</Pipe>
					<Control onClick={() => handleDelete(item.id)}>
						Delete
					</Control>
					<Pipe>|</Pipe>
					<Control>Save for later</Control>
					<Pipe>|</Pipe>
					<Control>See more like this</Control>
					<Pipe>|</Pipe>
					<Control>Share</Control>
				</Buttons>
			</ItemControls>
		)
	}

	const BasketItemMobile = ({ item }) => {
		return (
			<BasketItemContainer>
				<Content>
					<Select>
						<input type="checkbox" />
					</Select>
					<Image>
						<img src={item.thumbnail} alt={item.name} />
					</Image>
					<Details>
						<h3>{item.title}</h3>
						<div className="price">
							£{(item.price * item.quantity).toFixed(2)}
						</div>
						<div className="crime">
							<CrimeLogo />
						</div>
						<div className="discount">
							-{item.discountPercentage}%
						</div>
						<div className="link">
							<span>Save more with Subscribe & Save</span>
						</div>
						<p
							className={
								item.availabilityStatus === 'In Stock'
									? 'in'
									: 'out'
							}
						>
							{item.availabilityStatus}
						</p>

						<p>
							{item.brand
								? `by ${item.brand}`
								: `from ${formatQuery(item.category)}`}
						</p>
					</Details>
				</Content>
				<BasketItemControls
					item={item}
					handleQuantityChange={handleQuantityChange}
					handleDelete={handleDelete}
				/>
				<div className="send-as-gift">
					<div className="select">
						<input type="checkbox" />
					</div>
					<p>Send as gift. Include custom message</p>
				</div>
			</BasketItemContainer>
		)
	}

	const BasketItemDesktop = ({ item }) => {
		return (
			<BasketItemContainer>
				<Content>
					<Select>
						<input type="checkbox" />
					</Select>
					<Image>
						<img src={item.thumbnail} alt={item.name} />
					</Image>
					<Details>
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
						<BasketItemControls
							item={item}
							handleQuantityChange={handleQuantityChange}
							handleDelete={handleDelete}
						/>
					</Details>
				</Content>

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
						{basketItems.length > 0 ? (
							<h1>Shopping Basket</h1>
						) : (
							<h1>Your Scamazon Basket is empty</h1>
						)}
						<div className="basket-subheader">
							<p>No items selected. (Select all items)</p>
							<p>Price</p>
						</div>
					</div>
					<div className="basket-items">
						{basketItems.map((item, i) =>
							windowWidth <= 768 ? (
								<BasketItemMobile
									key={i}
									item={item}
									handleQuantityChange={(e) =>
										handleQuantityChange(e, item)
									}
									handleDelete={() => handleDelete(item.id)}
								/>
							) : (
								<BasketItemDesktop
									key={i}
									item={item}
									handleQuantityChange={(e) =>
										handleQuantityChange(e, item)
									}
									handleDelete={() => handleDelete(item.id)}
								/>
							)
						)}
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
						<BuyButton
							text={
								windowWidth >= 768
									? `Proceed to Checkout`
									: `Proceed to Checkout (${basketItems.length} items)`
							}
						/>
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
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-md) var(--spacing-sm);
	}
`

const BasketItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey);
	position: relative;
	div.crime {
		display: flex;
		svg {
			width: 5rem;
		}
	}
	div.price-column {
		position: absolute;
		top: var(--spacing-md);
		right: 0;
		vertical-align: top;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		gap: var(--spacing-sm);
		width: 10rem;
	}
	div.price {
		font-size: clamp(var(--font-md), 2vw, (--font-lg));
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
	div.send-as-gift {
		display: none;
	}

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		position: relative;
		gap: var(--spacing-sm);
		div.price-column {
			width: 100%;
			flex-direction: column-reverse;
			justify-content: space-between;
		}
		div.send-as-gift {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
			font-size: var(--font-xs);
			line-height: 1;
		}
	}
`

const Content = styled.div`
	display: flex;
	gap: var(--spacing-md);
	@media only screen and (max-width: 768px) {
		gap: var(--spacing-md);
		width: 100%;
	}
`

const Select = styled.div`
	align-self: center;
	input {
		width: 2rem;
		height: 2rem;
		accent-color: var(--checkbox-bg);
	}

	@media only screen and (max-width: 768px) {
		position: absolute;
		top: 2.5rem;
		left: 1rem;
		align-self: center;
	}
`

const Image = styled.div`
	width: 18rem;
	height: 18rem;
	border-radius: var(--br-lg);
	border: 1px solid var(--lt-grey);

	@media only screen and (max-width: 768px) {
		width: 15rem;
		height: 15rem;
	}
`

const Details = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	h3 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
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

	@media only screen and (max-width: 768px) {
		align-items: flex-start;
		position: relative;
		gap: var(--spacing-xs);
	}
`

const ItemControls = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	color: var(--lt-grey);
	width: 100%;
	select {
		background-color: var(--qty-select-grey);
		border: 1px solid var(--lt-grey);
		border-radius: var(--br-sm);
		padding: var(--spacing-ms);
	}
	@media only screen and (max-width: 768px) {
		justify-content: space-between;
		align-items: flex-start;
	}
`

const Buttons = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	flex-wrap: wrap;
	gap: var(--spacing-ms);
	@media only screen and (max-width: 768px) {
	}
`

const Control = styled.button`
	border: none;
	border-radius: 0;
	color: var(--link-blue);
	&:hover {
		text-decoration: none;
	}
	@media only screen and (max-width: 768px) {
		color: var(--md-blue);
		border: 1px solid var(--md-blue);
		border-radius: var(--br-25);
		padding: var(--spacing-sm);
	}
`

const Pipe = styled.span`
	margin: 0;
	@media only screen and (max-width: 768px) {
		display: none;
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
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-md) var(--spacing-sm);
	}
`
