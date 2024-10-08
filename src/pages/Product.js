import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	setSelectedCategory,
	fetchProductsByCategory,
	fetchSingleProduct,
} from '../redux/slices/productsSlice'
import { superCategories } from '../utils/superCategories'
import { formatQuery } from '../utils/formatCategory'
import { useWindowWidth } from '../utils/useWindowWidth'
import BuyButton from '../components/buttons/BuyButton'
import QuantityBtn from '../components/buttons/QuantityBtn'
import CrimeLogo from '../icons/CrimeLogo'
import ProductRating from '../components/products/ProductRating'
import ProductReviews from '../components/products/ProductReviews'
import styled from 'styled-components'

export default function Product() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()
	const width = useWindowWidth()
	const { currentProduct } = useSelector((state) => state.products)

	// Extract product ID from URL
	const productId = location.search.substring(1)

	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [activeThumbnail, setActiveThumbnail] = useState(0)
	const [currentImage, setCurrentImage] = useState(
		currentProduct?.images[0] || null
	)

	useEffect(() => {
		const loadProduct = async () => {
			setIsLoading(true)
			setError(null)

			try {
				// If we don't have a current product or the URL ID doesn't match the current product
				if (
					!currentProduct ||
					currentProduct.id.toString() !== productId
				) {
					await dispatch(fetchSingleProduct(productId)).unwrap()
				}
			} catch (err) {
				setError('Failed to load product. Please try again later.')
			} finally {
				setIsLoading(false)
			}
		}

		if (productId) {
			loadProduct()
		}
	}, [dispatch, productId, currentProduct])

	useEffect(() => {
		if (
			currentProduct &&
			currentProduct.images &&
			currentProduct.images.length > 0
		) {
			setCurrentImage(currentProduct.images[0])
			setActiveThumbnail(0) // Reset thumbnail selection when product changes
		}
	}, [currentProduct])

	// Early return for loading state
	if (isLoading) {
		return <div>Loading...</div>
	}

	// Early return for error state
	if (error) {
		return <div>{error}</div>
	}

	// Early return if no product is found
	if (!currentProduct) {
		return <div>Product not found</div>
	}

	const currentSuperCategory = superCategories.find((superCategory) =>
		superCategory.subCategories.includes(currentProduct.category)
	)

	const currentSubCategory = currentSuperCategory
		? currentSuperCategory.subCategories.find(
				(subCategory) => subCategory === currentProduct.category
		  )
		: null

	const handleDepartmentBreadcrumbClick = (category) => {
		dispatch(setSelectedCategory(category))
		navigate(
			`/department?${currentSuperCategory.title
				.toLowerCase()
				.replace(/\s+/g, '-')}`
		)
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

	const renderProductImages = () => {
		return (
			<ProductImages>
				<Thumbnails>
					{currentProduct.images.map((image, i) => (
						<ThumbnailContainer
							key={i}
							className={i === activeThumbnail ? 'active' : ''}
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
		)
	}

	const renderProductTitle = () => {
		return (
			<>
				<InfoBlock>
					<p className="title">{currentProduct.title}</p>
				</InfoBlock>
			</>
		)
	}

	const renderProductDescription = () => {
		return (
			<>
				<InfoBlock>
					<p className="description">{currentProduct.description}</p>
				</InfoBlock>
			</>
		)
	}

	const renderProductAvailability = () => {
		return (
			<InfoBlock>
				<ProductRating rating={currentProduct.rating} />
				<p
					className={
						currentProduct.availabilityStatus === 'In Stock'
							? 'in'
							: 'out'
					}
				>
					{currentProduct.availabilityStatus}
				</p>
			</InfoBlock>
		)
	}

	const renderProductPricing = () => {
		return (
			<InfoBlock>
				<div className="product-price">
					<p className="discount">
						-{currentProduct.discountPercentage}%
					</p>
					<p className="price">
						£
						<span className="price-span">
							{Math.floor(currentProduct.price)}
						</span>
						.{(currentProduct.price % 1).toFixed(2).slice(2)}
					</p>
				</div>
				<p className="whole">
					RRP:{' '}
					<span>
						{(
							currentProduct.price /
							(1 - currentProduct.discountPercentage / 100)
						).toFixed(2)}
					</span>
				</p>
				<CrimeLogo width="10rem" />
				<p className="shipping">{currentProduct.shippingInformation}</p>
				<p className="returns">{currentProduct.returnPolicy}</p>
			</InfoBlock>
		)
	}

	const renderProductBuyingOptions = () => {
		return (
			<InfoBlock>
				<div className="button-container">
					<QuantityBtn>Quantity:</QuantityBtn>
					<BuyButton onClick={() => {}} text="Add to Basket" />
					<BuyButton onClick={() => {}} text="Buy Now" />
				</div>
			</InfoBlock>
		)
	}

	const renderProductSpecifications = () => {
		return (
			<InfoBlock>
				<div className="spec-block">
					<div className="spec-key">
						<p>Brand:</p>
						<p>SKU:</p>
						<p>Weight:</p>
					</div>
					<div className="spec-value">
						<p>{currentProduct.brand}</p>
						<p>{currentProduct.sku}</p>
						<p>{currentProduct.weight}g</p>
					</div>
				</div>
				<p className="dimensions">Product Dimensions:</p>
				<div className="spec-block">
					<div className="spec-key">
						<p>Width:</p>
						<p>Height:</p>
						<p>Depth:</p>
					</div>
					<div className="spec-value">
						<p>{currentProduct.dimensions.width}cm</p>
						<p>{currentProduct.dimensions.height}cm</p>
						<p>{currentProduct.dimensions.depth}cm</p>
					</div>
				</div>
			</InfoBlock>
		)
	}

	const renderProductReviews = () => {
		return (
			<InfoBlock>
				<ProductReviews reviews={currentProduct.reviews} />
			</InfoBlock>
		)
	}

	const renderProductDetails = () => {
		if (width >= 769)
			return (
				<ProductContent>
					{renderProductImages()}
					<ProductInfo>
						{renderProductTitle()}
						{renderProductDescription()}
						{renderProductAvailability()}
						{renderProductPricing()}
						{renderProductBuyingOptions()}
						{renderProductSpecifications()}
						{renderProductReviews()}
					</ProductInfo>
				</ProductContent>
			)

		if (width < 769)
			return (
				<ProductContent>
					{renderProductTitle()}
					<ProductInfo>
						{renderProductImages()}
						{renderProductDescription()}
						{renderProductAvailability()}
						{renderProductPricing()}
						{renderProductSpecifications()}
						{renderProductReviews()}
					</ProductInfo>
				</ProductContent>
			)
	}

	return (
		<ProductContainer>
			<nav aria-label="Breadcrumb">
				<BreadcrumbList>
					<li
						onClick={() =>
							handleDepartmentBreadcrumbClick(
								currentSuperCategory.title
							)
						}
					>
						{currentSuperCategory.title}
					</li>
					<li
						onClick={() =>
							handleCategoryBreadcrumbClick(currentSubCategory)
						}
					>
						{formatQuery(currentProduct.category)}
					</li>
					<li>
						<span aria-current="page">{currentProduct.title}</span>
					</li>
				</BreadcrumbList>
			</nav>

			{renderProductDetails()}
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
			content: '›';
			margin: 0 var(--spacing-sm);
		}

		&:hover {
			text-decoration: underline;
			cursor: pointer;
			&:last-child {
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

	@media only screen and (max-width: 450px) {
		padding: var(--spacing-xs) 0;
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
		margin-right: 0;
	}
`

const ThumbnailContainer = styled.div`
	width: 5.6rem;
	height: 5.6rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: var(--br-lg);

	&.active {
		border: 2px solid var(--paleblue);
		background-color: var(--lt-grey);
		img {
			background-color: var(--white);
		}
	}
	img {
		width: 4.8rem;
		height: auto;
		border-radius: var(--br-md);
		border: 1px solid var(--paleblue-hover);
		cursor: pointer;
		transition: var(--tr-fast);
		position: relative;
	}
`

const ProductImage = styled.div`
	max-width: 90rem;
	img {
		border: 1px solid var(--lt-grey);
		border-radius: var(--br-md);
		height: auto;
		&:hover {
			border-color: var(--lt-grey-hover);
		}
	}
`

const ProductInfo = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
`

const InfoBlock = styled.div`
	padding-bottom: var(--spacing-md);
	border-bottom: 1px solid var(--lt-grey);
	gap: var(--spacing-xs);
	display: flex;
	flex-direction: column;
	user-select: none;
	div.spec-block {
		display: flex;
	}
	div.spec-key {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		font-weight: bold;
		margin-right: var(--spacing-lg);
		margin-bottom: var(--spacing-md);
		&:last-child {
			margin-bottom: 0;
		}
	}
	div.spec-value {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}
	div.product-price {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		width: 100%;
	}
	div.button-container {
		width: 30rem;
		padding: var(--spacing-md) 0;
		display: flex;
		flex-direction: column;
		gap: var(--spacing-sm);
	}
	p {
		display: flex;
		align-items: center;
		
	}
	p.title {
		font-size: clamp(var(--font-lg), 2vw, var(--font-xl));
		font-weight: bold;
		color: var(--dk-blue);
	}
	p.description {
		color: var(--dk-blue);
		font-weight: bold;
	}
	p.discount {
		color: var(--discount-red);
		font-size: clamp(var(--font-md), 2vw, var(--font-xl));
	}
	p.price {
		display: flex;
		align-items: flex-start;
		font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
		span.price-span {
			line-height: 1.1;
			font-size: clamp(var(--font-lg), 2vw, var(--font-xxl));
			font-weight: bold;
		}
	}
	p.whole {
		color: var(--paleblue);
		span {
			margin-left: var(--spacing-sm);
			text-decoration: line-through;
		}
	}
	p.shipping {
		font-weight: bold;
	}
	p.returns {
		color: var(--link-blue);
	}
	p.dimensions {
		font-weight: bold;
	}
	p.in {
		color: var(--stock-green);
	}
	p.out {
		color: var(--price-red);
	}
`
