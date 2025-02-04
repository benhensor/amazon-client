import styled from 'styled-components'

export const ProductsPage = styled.div`
	background-color: var(--white);
`

export const ProductsHeader = styled.div`
	position: sticky;
	top: 0;
	background-color: var(--white);
	border-bottom: 1px solid var(--lt-grey);
	z-index: 10;
`

export const HeaderContent = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	padding: var(--spacing-sm) var(--spacing-md);

	@media only screen and (max-width: 768px) {
		padding: var(--spacing-sm);
	}
`

export const Header = styled.div`
	line-height: 2.4rem;
	h1 {
		font-size: clamp(var(--font-lg), 3vw, var(--font-xxl));
		color: var(--dk-blue);
	}
	p {
		font-size: clamp(var(--font-xxs), 2vw, var(--font-sm));
	}
`

export const ContentWrapper = styled.div`
	display: flex;
	position: relative;
`

export const MobileFilterToggle = styled.button`
	display: none;
	align-items: center;
	gap: var(--spacing-xs);
	padding: var(--spacing-xs) var(--spacing-sm);
	background: none;
	border: 1px solid var(--lt-grey);
	border-radius: 4px;
	cursor: pointer;

	@media only screen and (max-width: 768px) {
		display: flex;
	}
`

export const MainContent = styled.main`
	flex: 1;
	background-color: var(--white);
`


export const ProductContainer = styled.div`
	background-color: var(--white);
	padding: 0 var(--spacing-md);

	@media only screen and (max-width: 450px) {
		padding: 0 var(--spacing-sm);
	}
`

export const BreadcrumbList = styled.ol`
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

export const ProductContent = styled.div`
	display: flex;
	@media only screen and (max-width: 768px) {
		flex-direction: column;
	}
`

export const ProductImages = styled.div`
	display: flex;
	flex: 1;
	margin-right: var(--spacing-md);
	@media only screen and (max-width: 768px) {
		flex-direction: column-reverse;
		margin-right: 0;
	}
`

export const Thumbnails = styled.div`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	margin-right: var(--spacing-sm);

	@media only screen and (max-width: 768px) {
		flex-direction: row;
		margin-right: 0;
	}
`

export const ThumbnailContainer = styled.div`
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

export const ProductImage = styled.div`
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

export const ProductInfo = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
`

export const InfoBlock = styled.div`
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey);
	gap: var(--spacing-xs);
	display: flex;
	flex-direction: column;
	user-select: none;
	&:first-child {
		padding-top: 0;
	}
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
		font-size: clamp(var(--font-md), 2vw, var(--font-lg));
	}
	p.price {
		display: flex;
		align-items: flex-start;
		font-size: var(--font-xs);
		span.price-span {
			line-height: 1.1;
			font-size: var(--font-xxl);
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

	@media only screen and (max-width: 768px) {
		&:first-child {
			padding-bottom: var(--spacing-xs);
			border-bottom: none;
		}
	}
	@media only screen and (max-width: 450px) {
		div.button-container {
			align-self: center;
		}
	}
`
