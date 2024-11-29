import React from 'react'
import styled from 'styled-components'

export default function CancelledOrders({ cancelledOrders }) {
  return (
    <StyledCancelledOrders>
      <h3>No orders found</h3>
    </StyledCancelledOrders>
  )
}


const StyledCancelledOrders = styled.div`
  max-width: 92rem;
  margin: 0 auto;
  h3 {
    font-size: 2rem;
  }
`