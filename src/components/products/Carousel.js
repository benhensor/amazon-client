import React, { useState, useEffect, useCallback } from 'react'
import { useWindowWidth } from '../../utils/useWindowWidth'
import ChevronIcon from '../../icons/ChevronIcon'
import styled from 'styled-components'


export default function Carousel({ title, products }) {

  const windowWidth = useWindowWidth()

  const [currentPage, setCurrentPage] = useState(0);
  
  const getItemsPerPage = useCallback(() => {
    if (windowWidth <= 450) return 2
    if (windowWidth <= 599) return 3
    if (windowWidth <= 849) return 4
    if (windowWidth <= 999) return 5
    return 8
  }, [windowWidth])

  useEffect(() => {
    setItemsPerPage(getItemsPerPage());
    setCurrentPage(0); // Reset to first page when screen size changes
  }, [windowWidth, getItemsPerPage]);
  
  
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount - 1));
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleProductClick = (product) => {}

	const handleCategoryClick = (category) => {}

  const visibleProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  )

  return (
    <DepartmentCarouselContainer>
      <button className="title" onClick={() => handleCategoryClick(title)}>
        {title}
      </button>
      <div className="carousel-wrapper">
        <button
          className="chevron-container left"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          <ChevronIcon direction="left" />
        </button>
        <ul className="carousel">
          {visibleProducts.map((product, i) => (
            <li
              key={i}
              className="item"
              onClick={() => handleProductClick(product)}
            >
              <div className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <p>{product.title}</p>
              </div>
            </li>
          ))}
        </ul>
        <button
          className="chevron-container right"
          onClick={handleNext}
          disabled={currentPage === pageCount - 1}
        >
          <ChevronIcon direction="right" />
        </button>
      </div>
      <button className="cta" onClick={handleCategoryClick}>
        See more
      </button>
    </DepartmentCarouselContainer>
  )
}

const DepartmentCarouselContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg) var(--spacing-md);
	background-color: var(--white);
	margin: var(--spacing-md);
  position: relative;

	.title {
		color: var(--dk-blue);
		width: fit-content;
		font-size: clamp(var(--font-md), 2vw, var(--font-xl));
		font-weight: bold;
	}

  .carousel-wrapper {
    position: relative;
    overflow: hidden;
  }

  .chevron-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    background-color: var(--white);
    width: fit-content;
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
  }

	.carousel {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		transition: var(--tr-medium);
	}

	.item {
    flex: 0 0 auto;
    width: calc((100% / var(--items-per-page)) - var(--spacing-xs));
    padding: var(--spacing-sm);
    border: 1px solid var(--lt-grey);
    cursor: pointer;
    transition: var(--tr-fast);
    &:hover {
      border-color: var(--lt-grey-hover);
    }
  }

	.item {
		padding: var(--spacing-sm);
		border: 1px solid var(--lt-grey);
		cursor: pointer;
		transition: var(--tr-fast);
		&:hover {
			border-color: var(--lt-grey-hover);
		}
	}

	.product-card {
		img {
			max-width: 100%;
      height: auto;
		}
		p {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			color: var(--dk-blue);
			font-size: var(--font-sm);
			padding: var(--spacing-sm) 0;
		}
	}

	.cta {
		color: var(--link-blue);
		width: fit-content;
		margin-top: var(--spacing-md);
    font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}

	@media only screen and (max-width: 768px) {
		margin: var(--spacing-sm);
	}
`
