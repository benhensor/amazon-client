import React from 'react'
import Product from './Product'
import styled from 'styled-components'

export default function ProductsGrid({ products }) {
  return (
    <ProductGrid>
      {products.length > 0 ? (
        products.map((product) => (
          <Product key={product.id} product={product} />
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