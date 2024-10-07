import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedCategory, fetchProductsByCategory } from '../redux/slices/productsSlice'
import { superCategories } from '../utils/superCategories'
import { formatCategory } from '../utils/formatCategory'
import styled from 'styled-components'

export default function Product() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
	const { currentProduct } = useSelector((state) => state.products)
	const currentSuperCategory = superCategories.find((superCategory) =>
		superCategory.subCategories.includes(currentProduct.category)
	)
  const currentSubCategory = currentSuperCategory.subCategories.find(
    (subCategory) => subCategory === currentProduct.category
  )
	const [activeThumbnail, setActiveThumbnail] = useState(0)
	const [currentImage, setCurrentImage] = useState(currentProduct.images[0])

  const handleDepartmentBreadcrumbClick = (category) => {
    dispatch(setSelectedCategory(category))
    navigate(`/department?${currentSuperCategory.title.toLowerCase().replace(/\s+/g, '-')}`)
  }

  const handleCategoryBreadcrumbClick = (category) => {
    dispatch(setSelectedCategory(category))
    dispatch(fetchProductsByCategory(category))
    navigate(`/products?${category}`)
  }

	const handleThumbnailClick = (i) => {
		setActiveThumbnail(i)
		setCurrentImage(currentProduct.images[i])
	}

	return (
		<ProductContainer>
			<ProductHeader>
      <nav aria-label="Breadcrumb">
        <BreadcrumbList>
          <li onClick={() => handleDepartmentBreadcrumbClick(currentSuperCategory.title)}>
            {currentSuperCategory.title}
          </li>
          <li onClick={() => handleCategoryBreadcrumbClick(currentSubCategory)}>
            {formatCategory(currentProduct.category)}
          </li>
          <li>
            <span aria-current="page">{currentProduct.title}</span>
          </li>
        </BreadcrumbList>
      </nav>
			</ProductHeader>

			<ProductContent>
				<ProductImages>
					<Thumbnails>
						{currentProduct.images.map((image, i) => (
							<ThumbnailContainer
                key={i}
								className={
									i === activeThumbnail ? 'active' : ''
								}
							>
								<img
									src={image}
									alt={currentProduct.name}
									onClick={() => handleThumbnailClick(i)}
								/>
							</ThumbnailContainer>
						))}
					</Thumbnails>
					<ProductImage>
						<img src={currentImage} alt={currentProduct.name} />
					</ProductImage>
				</ProductImages>

				<ProductInfo>
					<InfoBlock>
            <h1>{currentProduct.title}</h1>
          </InfoBlock>
					<InfoBlock>
            <h2>{currentProduct.description}</h2>
          </InfoBlock>
					<InfoBlock>
            <p>£{currentProduct.price}</p>
          </InfoBlock>
					<InfoBlock>
            <p>-{currentProduct.discountPercentage}%</p>
          </InfoBlock>
					<InfoBlock>
            <p>SKU: {currentProduct.sku}</p>
          </InfoBlock>
					<InfoBlock>
            <p>Weight: {currentProduct.weight}g</p>
          </InfoBlock>
					<InfoBlock>
            <p>Dimensions</p>
            <p>Width: {currentProduct.dimensions.width}</p>
            <p>Height: {currentProduct.dimensions.height}</p>
            <p>Depth: {currentProduct.dimensions.depth}</p>
          </InfoBlock>
					<InfoBlock>
            <p>Warranty: {currentProduct.warrantyInformation}</p>
          </InfoBlock>
					<InfoBlock>
            <p>Shipping: {currentProduct.shippingInformation}</p>
          </InfoBlock>
					<InfoBlock>
            <p>{currentProduct.availabilityStatus}</p>
          </InfoBlock>
					<InfoBlock>
            <p>Rating: {currentProduct.rating}</p>
          </InfoBlock>
					<InfoBlock>
            <p>Reviews</p>
            {currentProduct.reviews.map((review, i) => (
              <div key={i}>
                <p>{review.rating}</p>
                <p>{review.comment}</p>
                <p>{review.date}</p>
                <p>{review.reviewerName}</p>
                <p>{review.reviewerEmail}</p>
              </div>
            ))}
          </InfoBlock>
					<InfoBlock>
            <p>{currentProduct.returnPolicy}</p>
          </InfoBlock>
				</ProductInfo>
			</ProductContent>
		</ProductContainer>
	)
}

const ProductContainer = styled.div`
  background-color: var(--white);
	padding: 0 var(--spacing-md);

	@media only screen and (max-width: 450px) {
		padding: 0 var(--spacing-sm);
	}
`

const ProductHeader = styled.div`
	padding: var(--spacing-sm) 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
	p {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
	}
`

const BreadcrumbList = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  padding: var(--spacing-sm) 0;
  margin: 0;
  user-select: none;
  
  li {
    display: flex;
    align-items: center;
    font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
    
    &:not(:last-child)::after {
      content: "›";
      margin: 0 var(--spacing-sm);
    }

    &:hover {
      text-decoration: underline;
      cursor: pointer;
      &:last-child{
        text-decoration: none;
        cursor: default;
      }
    }
  }
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const ProductContent = styled.div`
	display: flex;
  gap: var(--spacing-lg);
	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`

const ProductImages = styled.div`
	display: flex;
  flex: 1;
	@media only screen and (max-width: 768px) {
		flex-direction: column-reverse;
	}
`

const Thumbnails = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	margin-right: var(--spacing-sm);

	@media only screen and (max-width: 768px) {
		flex-direction: row;
		margin-bottom: var(--spacing-md);
		margin-right: 0;
	}
`

const ThumbnailContainer = styled.div`
	width: 5.8rem;
	height: 5.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--br-lg);
  
  &.active {
    border: 2px solid var(--paleblue); /* Simulates an outer border */
    background-color: var(--lt-grey);
    img {
      background-color: var(--white);
    }
  }
	img {
		width: 4.8rem;
		height: auto;
		border-radius: var(--br-md);
		border: 1px solid var(--paleblue-hover); /* Default border */
		cursor: pointer;
		transition: var(--tr-fast);
		position: relative; /* Make the img element a positioned container */

	}
`

const ProductImage = styled.div`
	img {
    border: 1px solid var(--lt-grey);
    border-radius: var(--br-md);
    height: auto;
	}
`

const ProductInfo = styled.div`
  flex: 1;
  
`

const InfoBlock = styled.div`
  border-bottom: 1px solid var(--lt-grey);
`