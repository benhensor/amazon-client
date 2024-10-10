import React from 'react'
import BuyButton from '../components/buttons/BuyButton'
import styled from 'styled-components'

export default function Basket() {
  const BasketItem = ({ item }) => {
    return (
      <div></div>
    )
  }
	return (
		<ShoppingBasket>
			<ShoppingBasketContainer>
				<ShoppingBasketItems>
          <div className="basket-header">
            <h1>Shopping Basket</h1> {/* if empty:  */}
            <div className='basket-subheader'>
              <p>No items selected. (Select all items)</p>
              <p>Price</p>
            </div>
          </div>
          <div className='basket-items'>
            <div className='subtotal'>
              <p>Subtotal (0 items):</p>
            </div>
            <BasketItem />
          </div>
        </ShoppingBasketItems>
				<Subtotal>
					<p>Subtotal (items): (£price)</p>
          <div className='order-gift'>
            <input type="checkbox" />
            <p>This order contains a gift</p>
          </div>
					<div className='checkout-btn'>
						<BuyButton text="Proceed to Checkout" />
					</div>
				</Subtotal>
			</ShoppingBasketContainer>
		</ShoppingBasket>
	)
}

const ShoppingBasket = styled.div`
	padding: var(--spacing-md) var(--spacing-xxl);
  height: 100vh;
`

const ShoppingBasketContainer = styled.div`
	display: flex;
  justify-content: space-between;
  gap: var(--spacing-md);

  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
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
`

const Subtotal = styled.div`
  width: 35rem;
  height: fit-content;
  padding: var(--spacing-md);
  background-color: var(--white);
  div.order-gift {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
  }
  div.checkout-btn {
    margin-top: var(--spacing-sm);
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`
