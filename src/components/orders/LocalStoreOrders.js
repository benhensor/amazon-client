import React from 'react'
import {
  Orders,
  OrderItem,
  OrderBody,
} from '../../assets/styles/OrderStyles'

export default function LocalStoreOrders() {
 
  return (
    <Orders>
      <OrderItem>
          <OrderBody>
            <div className="order-body-items">
              <div className="order-status">
                <h3>No orders found</h3>
              </div>
            </div>
          </OrderBody>
        </OrderItem>
    </Orders>
  )
}
