import React from 'react'
import { StyledOrderItem } from '../../assets/styles/CheckoutStyles'

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
