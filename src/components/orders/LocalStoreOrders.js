import React from 'react'
import styled from 'styled-components'

export default function LocalStoreOrders() {
  return (
    <StyledLocalStoreOrders>
      <h3>No orders found</h3>
    </StyledLocalStoreOrders>
  )
}


const StyledLocalStoreOrders = styled.div`
  max-width: 92rem;
  margin: 0 auto;
  h3 {
    font-size: 2rem;
  }
`