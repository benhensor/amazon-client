import React from 'react'
import styled from 'styled-components'

export default function AddToCartBtn({ onClick }) {

  return (
    <Button type='button' onClick={onClick}>Add to basket</Button>
  )
}

const Button = styled.button`
  width: 100%;
  background-color: var(--yellow);
  color: var(--black);
  border: none;
  padding-block: var(--spacing-ms);
  padding-inline: 1rem;
  border-radius: var(--br-25);
  cursor: pointer;
  transition: var(--tr-fast);

  &:hover {
    background-color: var(--yellow-hover);
  }
`