import React from 'react'
import Product from './Product'
import styled from 'styled-components'

export default function BuyAgainGrid({ products }) {
  return (
    <ProductGrid>
      {products.length > 0 ? (
        products.map((product, i) => (
          <Product key={i} product={product} />
        ))
      ) : (
        <p>No products found</p>
      )}
    </ProductGrid>
  )
}

const ProductGrid = styled.div`
  width: 100%;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
	gap: var(--spacing-sm);
	padding: var(--spacing-sm);
	@media only screen and (max-width: 450px) {
    padding: var(--spacing-lg) 0;
	}
`