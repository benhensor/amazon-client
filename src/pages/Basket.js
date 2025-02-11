import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useWindowWidth } from '../utils/useWindowWidth'
import { setCurrentProduct } from '../redux/slices/productsSlice'
import {
	selectBasketItems,
	selectBasketItemCount,
	selectBasketItemsSelected,
	selectBasketTotal,
	toggleItemSelected,
	fetchUserBasket,
	selectAllItems,
	deselectAllItems,
	updateItemQuantity,
	removeItemFromBasket,
	clearBasket,
} from '../redux/slices/basketSlice'
import formatQuery from '../utils/formatQuery'
import { checkIsAllSelected } from '../utils/checkIsAllSelected'
import BuyButton from '../components/buttons/BuyButton'
import BasketQuantityBtn from '../components/buttons/BasketQuantityBtn'
import CrimeLogo from '../icons/PrimeLogo'
import {
	ShoppingBasket,
	ShoppingBasketContainer,
	ShoppingBasketItems,
	Subtotal,
	BasketItemContainer,
	Content,
	Image,
	Details,
	ItemControls,
	Buttons,
	Pipe,
	Select,
} from '../assets/styles/BasketStyles'

export default function Basket() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const windowWidth = useWindowWidth()
	const basketItems = useSelector(selectBasketItems)
	const basketItemsSelected = useSelector(selectBasketItemsSelected)
	const basketTotal = useSelector(selectBasketTotal)
	const basketCount = useSelector(selectBasketItemCount)
	const [selectAll, setSelectAll] = useState(
		checkIsAllSelected(basketItemsSelected, basketItems)
	)

	useEffect(() => {
		dispatch(fetchUserBasket())
	}, [dispatch])

	const handleProductClick = (product) => {
		dispatch(setCurrentProduct(product))
		navigate(`/product/${product.id}`)
	}

	const handleQuantityChange = (e, item) => {
		// console.log('Changing quantity:', item)
		const newQuantity = parseInt(e.target.value, 10)
		// console.log(newQuantity)
		dispatch(
			updateItemQuantity({
				basket_item_id: item.basket_item_id,
				quantity: newQuantity,
			})
		)
	}

	const handleAddQuantity = (itemId) => {
		// console.log('Adding quantity to:', itemId)
		const item = basketItems.find((item) => item.basket_item_id === itemId)
		if (item) {
			dispatch(
				updateItemQuantity({
					basket_item_id: itemId,
					quantity: item.quantity + 1,
				})
			)
		}
	}

	const handleSubtractQuantity = (itemId) => {
		// console.log('Adding quantity to:', itemId)
		const item = basketItems.find((item) => item.basket_item_id === itemId)
		if (item && item.quantity > 1) {
			dispatch(
				updateItemQuantity({
					basket_item_id: itemId,
					quantity: item.quantity - 1,
				})
			)
		} else if (item && item.quantity === 1) {
			dispatch(clearBasket())
		}
	}

	const handleDelete = (basket_item_id) => {
		// console.log('Deleting item:', basket_item_id)
		dispatch(removeItemFromBasket(basket_item_id))

		// Check if the basket is empty after removing the item
		if (basketItems.length === 1) {
			dispatch(clearBasket())
		}
	}

	const handleClearBasket = () => {
		dispatch(clearBasket())
	}

	const handleToggleSelectAll = () => {
		setSelectAll(!selectAll)
		if (!selectAll) {
			dispatch(selectAllItems())
		} else {
			dispatch(deselectAllItems())
		}
	}

	const handleToggleItemSelected = (basket_item_id) => {
		// console.log('Toggling item:', basket_item_id)
		dispatch(toggleItemSelected(basket_item_id))
	}

	const handleCheckoutClick = () => {
		if (basketItemsSelected.length >= 1) {
			navigate('/checkout')
		} else {
			return
		}
	}

	const ItemSelect = (item) => {
		return (
			<Select>
				<input
					id={item.basket_item_id}
					type="checkbox"
					checked={item.is_selected}
					onChange={() =>
						handleToggleItemSelected(item.basket_item_id)
					}
				/>
			</Select>
		)
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
						id={item.basket_item_id}
						value={item.quantity}
						onChange={(e) => handleQuantityChange(e, item)}
					>
						{[...Array(5)].map((_, i) => (
							<option
								key={i + 1}
								value={i + 1}
								id={item.basket_item_id}
							>
								Qty: {i + 1}
							</option>
						))}
					</select>
				)}
				{windowWidth <= 768 && (
					<BasketQuantityBtn
						itemId={item.basket_item_id}
						quantity={item.quantity}
						add={handleAddQuantity}
						subtract={handleSubtractQuantity}
						deleteItem={handleDelete}
					/>
				)}
				<Buttons>
					<Pipe>|</Pipe>
					<button onClick={() => handleDelete(item.basket_item_id)}>
						Delete
					</button>
					<Pipe>|</Pipe>
					<button>Save for later</button>
					<Pipe>|</Pipe>
					<button>See more like this</button>
					<Pipe>|</Pipe>
					<button>Share</button>
				</Buttons>
			</ItemControls>
		)
	}

	const BasketItemMobile = ({ item }) => {
		return (
			<BasketItemContainer>
				<Content>
					{ItemSelect(item)}
					<Image onClick={() => handleProductClick(item)}>
						<img
							src={item.product_data.thumbnail}
							alt={item.product_data.name}
						/>
					</Image>
					<Details>
						<h3 onClick={() => handleProductClick(item)}>
							{item.product_data.title}
						</h3>
						<div className="price">
							£
							{(item.product_data.price * item.quantity).toFixed(
								2
							)}
						</div>
						<div className="crime">
							<CrimeLogo />
						</div>
						<div className="discount">
							-{item.product_data.discountPercentage}%
						</div>
						<div className="link">
							<span>Save more with Subscribe & Save</span>
						</div>
						<p
							className={
								item.product_data.availabilityStatus ===
								'In Stock'
									? 'in'
									: 'out'
							}
						>
							{item.product_data.availabilityStatus}
						</p>

						<p>
							{item.product_data.brand
								? `by ${item.product_data.brand}`
								: `from ${formatQuery(
										item.product_data.category
								  )}`}
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
						<input type="checkbox" id={item.basket_item_id} />
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
					{ItemSelect(item)}
					<Image onClick={() => handleProductClick(item)}>
						<img
							src={item.product_data.thumbnail}
							alt={item.product_data.name}
						/>
					</Image>
					<Details>
						<h3 onClick={() => handleProductClick(item)}>
							{item.product_data.title}
						</h3>
						<p>
							{item.product_data.brand
								? `by ${item.product_data.brand}`
								: `from ${formatQuery(
										item.product_data.category
								  )}`}
						</p>
						<p
							className={
								item.product_data.availabilityStatus ===
								'In Stock'
									? 'in'
									: 'out'
							}
						>
							{item.product_data.availabilityStatus}
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
						£{(item.product_data.price * item.quantity).toFixed(2)}
					</div>
					<div className="discount">
						-{item.product_data.discountPercentage}%
					</div>
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
						{basketItems.length > 0 && (
							<div className="basket-subheader">
								<div>
									{!selectAll && <p>No items selected.</p>}
									<button
										className="primary-link"
										onClick={handleToggleSelectAll}
									>
										{selectAll
											? 'Deselect all items'
											: 'Select all items'}
									</button>
								</div>
								{windowWidth > 769 && <p>Price</p>}
							</div>
						)}
					</div>
					<div className="basket-items">
						{basketItems.map((basketItem) =>
							windowWidth <= 768 ? (
								<BasketItemMobile
									key={basketItem.basket_item_id}
									item={basketItem}
									handleQuantityChange={(e) =>
										handleQuantityChange(
											e,
											basketItem.basket_item_id
										)
									}
									handleDelete={() =>
										handleDelete(basketItem.basket_item_id)
									}
								/>
							) : (
								<BasketItemDesktop
									key={basketItem.basket_item_id}
									item={basketItem}
									handleQuantityChange={(e) =>
										handleQuantityChange(
											e,
											basketItem.basket_item_id
										)
									}
									handleDelete={() =>
										handleDelete(basketItem.basket_item_id)
									}
								/>
							)
						)}
					</div>
					{basketItems.length > 0 && (
						<div className="subtotal">
							<button
								className="primary-link"
								onClick={handleClearBasket}
							>
								Remove all items
							</button>
							<p>
								Subtotal ({basketCount} items):{' '}
								<span>£{basketTotal.toFixed(2)}</span>
							</p>
						</div>
					)}
				</ShoppingBasketItems>

				<Subtotal>
					{basketItemsSelected.length > 0 ? (
						<>
							<p>
								Subtotal
								{windowWidth >= 768 && (
									<span>
										{' '}
										({basketCount + ' '}
										item
										{basketItemsSelected.length > 1
											? 's'
											: ''}
										)
									</span>
								)}
								:<span> £{basketTotal.toFixed(2)}</span>
							</p>
							{windowWidth >= 768 && (
								<div className="order-gift">
									<input type="checkbox" />
									<p>This order contains a gift</p>
								</div>
							)}
						</>
					) : (
						<p className="none-selected">No items selected</p>
					)}
					<div className="checkout-btn">
						<BuyButton
							text={
								windowWidth >= 768 &&
								basketItemsSelected.length === 0
									? `Proceed to Checkout`
									: `Proceed to Checkout (${
											basketItemsSelected.length
									  } item${
											basketItemsSelected.length > 1
												? 's'
												: ''
									  })`
							}
							onClick={handleCheckoutClick}
						/>
					</div>
				</Subtotal>
			</ShoppingBasketContainer>
		</ShoppingBasket>
	)
}
