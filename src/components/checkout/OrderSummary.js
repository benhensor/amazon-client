import React from 'react'
import PrivacyNotice from './PrivacyNotice'
import styled from 'styled-components'

export default function OrderSummary ({
  itemsTotal,
  shippingMethod,
  shippingOptions,
  showPrivacyNotice,
  handleOrderClick,
}) {
  const shippingCost = shippingOptions[shippingMethod]?.price || 0
  const orderTotal = itemsTotal + shippingCost
  return (
    <StyledOrderSummary>
      <button
        className="primary-btn pill-btn"
        onClick={handleOrderClick}
      >
        Buy now
      </button>
      {showPrivacyNotice && <PrivacyNotice />}
      <hr />
      <div className="subtotals">
        <div className="order-summary">
          <div className="order-subtotal">
            <p className="small">Items:</p>
            <p className="small">£{itemsTotal.toFixed(2)}</p>
          </div>
          <div className="order-subtotal">
            <p className="small">Postage & Packing:</p>
            <p className="small">£{shippingCost.toFixed(2)}</p>
          </div>
          <div className="order-subtotal total">
            <h3>Order Total:</h3>
            <h3>£{orderTotal.toFixed(2)}</h3>
          </div>
          <p className="small">
            Order totals include VAT.{' '}
            <span className="primary-link">See details</span>
          </p>
        </div>
      </div>
    </StyledOrderSummary>
  )
}

const StyledOrderSummary = styled.div`
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
