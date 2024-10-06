import React from 'react'
import { useSelector } from 'react-redux'
import { superCategories } from '../utils/superCategories'
import { formatCategory } from '../utils/formatCategory'
import ChevronIcon from '../icons/ChevronIcon'
import styled from 'styled-components'

export default function Product() {
  const { currentProduct } = useSelector((state) => state.products)
  const currentSuperCategoryTitle = superCategories.find(
    (superCategory) => superCategory.subCategories.includes(currentProduct.category)
  )
  console.log(currentSuperCategoryTitle.title)
  return (
    <ProductContainer>

      <ProductHeader>
        <p>{currentSuperCategoryTitle.title} <ChevronIcon direction='right' /> {formatCategory(currentProduct.category)} <ChevronIcon direction='right' /> {currentProduct.title}</p>
      </ProductHeader>

      <ProductImages>
        <Thumbnails>
          {currentProduct.images.map((image) => (
            <img key={image} src={image} alt={currentProduct.name} />
          ))}
        </Thumbnails>
        <ProductImage src={currentProduct.images[0]} alt={currentProduct.name} />
      </ProductImages>
      
    </ProductContainer>
  )
}

const ProductContainer = styled.div``

const ProductHeader = styled.div`
  padding: var(--spacing-sm) 0;
  p {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-size: clamp(var(--font-xxs), 2vw, var(--font-sm)); 
    svg {
      path {
        stroke: var(--black);
      }
    }
  }
`

const ProductImages = styled.div`
  display: flex;
  
  @media only screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

const Thumbnails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-right: var(--spacing-md);

  img {
    width: 6rem;
    height: auto;
    border-radius: var(--br-lg);
    cursor: pointer;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: row;
    margin-bottom: var(--spacing-md);
    img {
      margin-right: 0;
      margin-bottom: var(--spacing-xs); 
    }
  }
`

const ProductImage = styled.img``

const ProductInfo = styled.div``