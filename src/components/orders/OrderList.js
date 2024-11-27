import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addItemToBasket } from '../../redux/slices/basketSlice'
import { deleteOrderById } from '../../redux/slices/orderSlice'
import { StyledOrderList, OrderItem } from './styles'
import { formatDate } from '../../utils/formatDate'

export default function OrderList({ orders, currentUser }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const buyItAgain = (product) => {
    dispatch(addItemToBasket({ product, quantity: 1 }))
  }

  const handleViewItem = (itemId) => {
    navigate(`/product/${itemId}`)
  }

  const sortedOrders = orders
    .slice()
    .sort((a, b) => new Date(b.order_placed) - new Date(a.order_placed))

  return (
    <StyledOrderList>
      {sortedOrders.map((order) => (
        <OrderItem key={order.order_id} order={order} currentUser={currentUser} 
          onBuyAgain={buyItAgain} onViewItem={handleViewItem}
          onDelete={() => dispatch(deleteOrderById(order.order_id))} />
      ))}
    </StyledOrderList>
  )
}