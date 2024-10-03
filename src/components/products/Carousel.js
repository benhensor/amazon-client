import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCurrentProduct, setSelectedCategory } from '../../redux/slices/productsSlice'
import styled from 'styled-components'
import ChevronIcon from '../../icons/ChevronIcon'
import CrimeLogo from '../../icons/CrimeLogo'
import AddToCartBtn from '../buttons/AddToCartBtn'

const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
}

export default function Carousel({ title, products }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const cardWidth = window.innerWidth <= BREAKPOINTS.tablet ? 140 : 200
        const calculatedItemsPerPage = Math.floor((containerWidth - 32) / (cardWidth + 16))
        setItemsPerPage(calculatedItemsPerPage)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const pageCount = Math.ceil(products.length / itemsPerPage)

  const handleProductClick = (product) => {
    dispatch(setCurrentProduct(product))
    navigate(`/product?${product.id}`)
  }

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category))
    navigate(`/department?${category}`)
  }

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pageCount - 1))
  }

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0))
  }

  return (
    <CarouselContainer ref={containerRef}>
      <CarouselControls>
        <Title onClick={() => handleCategoryClick(title)}>{title}</Title>
        <SeeMoreButton onClick={() => handleCategoryClick(title)}>
          See more...
        </SeeMoreButton>
      </CarouselControls>

      <CarouselWrapper>
        <DesktopButtons>
          <ChevronButton
            className="left"
            onClick={handlePrev}
            disabled={currentPage === 0}
          >
            <ChevronIcon direction="left" />
          </ChevronButton>
          <ChevronButton
            className="right"
            onClick={handleNext}
            disabled={currentPage === pageCount - 1}
          >
            <ChevronIcon direction="right" />
          </ChevronButton>
        </DesktopButtons>

        <ProductList $currentPage={currentPage} $itemsPerPage={itemsPerPage}>
          {products.map((product, i) => (
            <ProductItem key={i} onClick={() => handleProductClick(product)}>
              <ProductCard>
                <ProductImage src={product.thumbnail} alt={product.title} />
                <ProductTitle>{product.title}</ProductTitle>
                <ProductPrice>
                  <p className="price">
                    £
                    <span className="price-span">
                      {Math.floor(product.price)}
                    </span>
                    .{(product.price % 1).toFixed(2).slice(2)}
                  </p>
                  <p className="whole">
                    {(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                  </p>
                </ProductPrice>
                <Discount>-{product.discountPercentage}%</Discount>
                <CrimeLogo width='7rem'/>
                <AddToCartBtn onClick={() => {}} />
              </ProductCard>
            </ProductItem>
          ))}
        </ProductList>
      </CarouselWrapper>
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg) var(--spacing-md);
	background-color: var(--white);
	margin: var(--spacing-md);

	@media only screen and (max-width: ${BREAKPOINTS.tablet}px) {
		margin: var(--spacing-sm);
	}
`

const CarouselControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.button`
	color: var(--dk-blue);
	width: fit-content;
	font-size: clamp(var(--font-md), 2vw, var(--font-xl));
	font-weight: bold;
`

const CarouselWrapper = styled.div`
	position: relative;
	overflow: hidden;
`

const ChevronButton = styled.button`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	display: flex;
	align-items: center;
	background-color: var(--white);
	padding: var(--spacing-xl) var(--spacing-md);
	border-radius: var(--br-sm);
	cursor: pointer;
	z-index: 1;

	&.left {
		left: -1rem;
		box-shadow: 3px 0 9px -3px rgba(0, 0, 0, 0.3);
	}

	&.right {
		right: -1rem;
		box-shadow: -3px 0 9px -3px rgba(0, 0, 0, 0.3);
	}

	&:disabled {
		opacity: 0.3;
		background-color: transparent;
		cursor: not-allowed;
	}

	svg {
		width: 2rem;
		path {
			stroke: var(--md-grey);
		}
	}
`

const ProductList = styled.ul`
  display: flex;
  gap: var(--spacing-xs);
  transition: var(--tr-medium);

  @media (min-width: ${BREAKPOINTS.tablet + 1}px) {
    transform: translateX(-${props => props.$currentPage * 100}%);
  }

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    overflow-x: auto;
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const ProductItem = styled.li`
  flex: 0 0 200px;
  padding: var(--spacing-sm);
  border: 1px solid var(--lt-grey);
  cursor: pointer;
  transition: var(--tr-fast);

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    flex: 0 0 140px;
  }

  &:hover {
    border-color: var(--lt-grey-hover);
  }
`

const ProductImage = styled.img`
  max-width: 100%;
  height: 200px;
  object-fit: cover;

  @media (max-width: ${BREAKPOINTS.tablet}px) {
    height: 140px;
  }
`

const DesktopButtons = styled.div`
  @media (max-width: ${BREAKPOINTS.tablet}px) {
    display: none;
  }
`

const ProductCard = styled.div`
	flex: 1;
  font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
`


const ProductTitle = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--dk-blue);
  font-size: clamp(var(--font-xxs), 2vw, var(--font-sm));
  padding: var(--spacing-sm) 0;
`

const ProductPrice = styled.div`
  display: flex;
  gap: var(--spacing-md);
  line-height: 1;
  .price {
    display: flex;
    align-items: flex-start;
    .price-span {
      font-size: clamp(var(--font-sm), 2vw, var(--font-md));
      font-weight: bold;
    }
  }
  .whole {
    color: var(--md-grey);
    text-decoration: line-through;
  }
  `

const Discount = styled.p`
  width: fit-content;
  padding: var(--spacing-xs);
  color: var(--white);
  background-color: var(--discount-red);
  margin: var(--spacing-sm) 0;
`

const SeeMoreButton = styled.button`
	color: var(--link-blue);
	width: fit-content;
	font-size: clamp(var(--font-sm), 2vw, var(--font-md));
`
