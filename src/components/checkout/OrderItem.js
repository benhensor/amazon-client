import React from 'react'
import styled from 'styled-components'

export default function OrderItem({ item, quantity, handleQuantityChange }) {
  return (
    <StyledOrderItem>
      <div className="details">
        <div className="row">
          <div className="image">
            <img
              src={item.product_data.thumbnail}
              alt={item.product_data.title}
            />
          </div>
          <div className="info">
            <h4>{item.title}</h4>
            <p className="description">
              {item.product_data.description}
            </p>
            <p className="small">
              <strong>£{item.product_data.price}</strong>
            </p>
            <p className="small">
              {item.product_data.shippingInformation}
            </p>
            <p className="small">
              Sold by {item.product_data.brand}
            </p>
            <div className="quantity">
              <p>
                <strong>Quantity:</strong> {quantity}{' '}
                <select
                  name="quantity"
                  id={item.basket_item_id}
                  onChange={(e) =>
                    handleQuantityChange(e, item)
                  }
                  value=""
                  className="primary-link"
                >
                  <option value="">Change</option>
                  {[...Array(5)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p className="small">
                Gift options not available
              </p>
            </div>
          </div>
        </div>
      </div>
    </StyledOrderItem>
  )
}

const StyledOrderItem = styled.article`
	display: grid;
	grid-template-columns: 1fr;
	gap: var(--spacing-md);

	.details {
		background: var(--continue-grey);
		border-radius: var(--br-md);
		padding: var(--spacing-md);
	}

	.row {
		display: flex;
		gap: var(--spacing-md);
	}

	.image {
		width: 12rem; /* Set fixed width for consistency */
		flex-shrink: 0; /* Prevent image from shrinking */
		img {
			width: 100%;
			height: auto;
			object-fit: cover;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		min-width: 0; /* Enable text truncation in child elements */
	}

	h4 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}

	.description {
		display: -webkit-box;
		-webkit-line-clamp: 5; /* Show 3 lines of text */
		-webkit-box-orient: vertical;
		overflow: hidden;
		line-height: 1.5;
		//max-height: 4.5em; /* 3 lines * 1.5 line height */
	}

	.quantity {
		margin-top: auto; /* Push quantity to bottom */
		p {
			display: flex;
			gap: var(--spacing-sm);
		}
	}

	.delivery {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
	}

	select {
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		border: none;
		background: none;

		&:focus {
			outline: none;
		}
	}

	@media only screen and (max-width: 768px) {
		grid-template-columns: 1fr;
	}

	@media only screen and (max-width: 450px) {
		.details {
			padding: var(--spacing-sm);
		}
		.image {
			width: 100px; /* Smaller image on mobile */
			img {
				width: 100%;
				height: auto;
			}
		}
	}
`