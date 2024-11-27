import React from 'react'
import styled from 'styled-components'

export default function OrderHeader() {
  return (
    <StyledOrderHeader>
      <h1>Your Orders</h1>
      <form>
        <input id="order-search" name="order-search" type="text" />
        <button>Search Orders</button>
      </form>
    </StyledOrderHeader>
  )
}

const StyledOrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: var(--spacing-md) 0;

  form {
    display: flex;
    align-items: center;

    input {
      padding: var(--spacing-sm);
      border: 1px solid var(--border-grey);
      border-radius: var(--br-sm);
    }

    button {
      padding: var(--spacing-sm);
      margin-left: var(--spacing-sm);
      background-color: var(--order-search-btn-bg);
      color: var(--white);
      border: none;
      border-radius: var(--br-25);

      &:hover {
        background-color: var(--order-search-btn-bg-hover);
      }
    }
  }
`