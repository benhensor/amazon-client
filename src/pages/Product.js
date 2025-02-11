import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
	fetchProductsByCategory,
	fetchSingleProduct,
} from '../redux/slices/productsSlice'
import { addItemToBasket } from '../redux/slices/basketSlice'
import { superCategories } from '../utils/superCategories'
import formatQuery from '../utils/formatQuery'
import { useWindowWidth } from '../utils/useWindowWidth'
import { generateVoteCount } from '../utils/starCalculator'
import BuyButton from '../components/buttons/BuyButton'
import QuantityBtn from '../components/buttons/QuantityBtn'
import CrimeLogo from '../icons/PrimeLogo'
import ProductRating from '../components/products/ProductRating'
import ProductReviews from '../components/products/ProductReviews'
import {
	ProductContainer,
	BreadcrumbList,
	ProductContent,
	ProductImages,
	Thumbnails,
	ThumbnailContainer,
	ProductImage,
	ProductInfo,
	InfoBlock,
} from '../assets/styles/ProductsStyles'

export default function Product() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const { id } = useParams()
	const width = useWindowWidth()
	const { currentProduct } = useSelector((state) => state.products)

	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [activeThumbnail, setActiveThumbnail] = useState(0)
	const [currentImage, setCurrentImage] = useState(
		currentProduct?.images[0] || null
	)
	const [itemQuantity, setItemQuantity] = useState(1)

	useEffect(() => {
		const loadProduct = async () => {
			setIsLoading(true)
			setError(null)

			try {
				// If we don't have a current product or the URL ID doesn't match the current product
				if (!currentProduct || currentProduct.id.toString() !== id) {
					await dispatch(fetchSingleProduct(id)).unwrap()
				}
			} catch (err) {
				setError('Failed to load product. Please try again later.')
			} finally {
				setIsLoading(false)
			}
		}

		if (id) {
			loadProduct()
		}
	}, [dispatch, id, currentProduct])

	useEffect(() => {
		if (
			currentProduct &&
			currentProduct.images &&
			currentProduct.images.length > 0
		) {
			setCurrentImage(currentProduct.images[0])
			setActiveThumbnail(0)
		}
	}, [currentProduct])

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!currentProduct) {
		return <div>Product not found</div>
	}

	const currentSuperCategory = superCategories.find((superCategory) =>
		superCategory.subCategories.includes(currentProduct.category)
	)

	const handleDepartmentBreadcrumbClick = (slug) => {
		navigate(`/department/${slug}`)
	}

	const handleCategoryBreadcrumbClick = (category) => {
		dispatch(fetchProductsByCategory(category))
		navigate(`/category/${category}`)
	}

	const handleThumbnailClick = (i) => {
		setActiveThumbnail(i)
		setCurrentImage(currentProduct.images[i])
	}

	const handleAddToBasketClick = (product) => {
		dispatch(addItemToBasket({ product, quantity: itemQuantity }))
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
		const voteCount = generateVoteCount(currentProduct.rating)
		return (
			<InfoBlock>
				<ProductRating
					rating={currentProduct.rating}
					count={voteCount}
				/>
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
					<QuantityBtn
						quantity={itemQuantity}
						setQuantity={setItemQuantity}
					>
						Quantity:
					</QuantityBtn>
					<BuyButton
						onClick={() => handleAddToBasketClick(currentProduct)}
						text="Add to Basket"
						type="large"
					/>
					<BuyButton onClick={() => {}} text="Buy Now" type="large" />
				</div>
			</InfoBlock>
		)
	}

	const renderProductSpecifications = () => {
		return (
			<InfoBlock>
				<div className="spec-block">
					<div className="spec-key">
						{currentProduct.brand && <p>Brand:</p>}
						<p>SKU:</p>
						<p>Weight:</p>
					</div>
					<div className="spec-value">
						{currentProduct.brand && <p>{currentProduct.brand}</p>}
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
						{renderProductBuyingOptions()}
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
								currentSuperCategory.slug
							)
						}
					>
						{currentSuperCategory.slug}
					</li>
					<li
						onClick={() =>
							handleCategoryBreadcrumbClick(
								currentProduct.category
							)
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
