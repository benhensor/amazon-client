import styled from 'styled-components';

export const ShoppingBasket = styled.div`
	padding: var(--spacing-md) var(--spacing-xxl);
	span {
		cursor: pointer;
		&:hover {
			text-decoration: underline;
		}
	}
	@media only screen and (max-width: 768px) {
		padding: 0;
	}
`

export const ShoppingBasketContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: var(--spacing-md);

	@media only screen and (max-width: 1199px) {
		flex-direction: column-reverse;
	}
	@media only screen and (max-width: 768px) {
		gap: 0;
	}
`

export const ShoppingBasketItems = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	padding: var(--spacing-md);
	background-color: var(--white);
	div.basket-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 1rem 0;
		border-bottom: 1px solid var(--lt-grey);
	}
	div.basket-subheader {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		div {
			display: flex;
			align-items: center;
			gap: var(--spacing-xs);
		}
		p,
		button {
			font-size: clamp(var(--font-sm), 2vw, var(--font-md));
		}
		button {
			margin: 0;
			padding: 0;
			line-height: 1;
		}
	}
	div.subtotal {
		margin: var(--spacing-md) 0;
		display: flex;
		justify-content: space-between;
		button {
			font-size: var(--font-lg);
		}
		p {
			font-size: var(--font-lg);
			span {
				font-weight: bold;
			}
		}
	}

	@media only screen and (max-width: 768px) {
		div.basket-header {
			padding: 0 0 var(--spacing-md) 0;
		}
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-md) var(--spacing-sm);
	}
`

export const BasketItemContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey);
	position: relative;
	div.crime {
		display: flex;
		svg {
			width: 5rem;
		}
	}
	div.price-column {
		position: absolute;
		top: var(--spacing-md);
		right: 0;
		vertical-align: top;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-end;
		gap: var(--spacing-sm);
		width: 10rem;
	}
	div.price {
		font-size: clamp(var(--font-md), 2vw, (--font-lg));
		font-weight: bold;
		text-align: right;
	}
	div.discount {
		padding: var(--spacing-xs);
		font-size: var(--font-xs);
		background-color: var(--discount-red);
		color: var(--white);
		line-height: 1;
	}
	div.link {
		color: var(--link-blue);
		font-size: var(--font-sm);
		text-align: right;
	}
	div.send-as-gift {
		display: none;
	}

	@media only screen and (max-width: 768px) {
		flex-direction: column;
		position: relative;
		gap: var(--spacing-sm);
		div.price-column {
			width: 100%;
			flex-direction: column-reverse;
			justify-content: space-between;
		}
		div.send-as-gift {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
			font-size: var(--font-xs);
			line-height: 1;
		}
	}
`

export const Content = styled.div`
	display: flex;
	gap: var(--spacing-md);
	@media only screen and (max-width: 768px) {
		gap: var(--spacing-md);
		width: 100%;
	}
`

export const Select = styled.div`
	margin: auto 0;
	input {
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		accent-color: var(--checkbox-bg);
		display: flex;
	}

	@media only screen and (max-width: 768px) {
		position: absolute;
		top: 2.5rem;
		left: 1rem;
		align-self: center;
	}
`

export const Image = styled.div`
	width: 18rem;
	height: 18rem;
	border-radius: var(--br-lg);
	border: 1px solid var(--lt-grey);
	transition: var(--tr-fast);
	&:hover {
		cursor: pointer;
		border: 1px solid var(--lt-text);
	}

	@media only screen and (max-width: 768px) {
		width: 15rem;
		height: 15rem;
	}
`

export const Details = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: var(--spacing-sm);
	h3 {
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
	}
	p {
		font-size: var(--font-xs);
	}
	p.in {
		color: var(--stock-green);
	}
	p.out {
		color: var(--price-red);
	}

	@media only screen and (max-width: 768px) {
		align-items: flex-start;
		position: relative;
		gap: var(--spacing-xs);
	}
`

export const ItemControls = styled.div`
	display: flex;
	align-items: center;
	gap: var(--spacing-sm);
	color: var(--lt-grey);
	width: 100%;
	select {
		background-color: var(--qty-select-grey);
		border: 1px solid var(--lt-grey);
		border-radius: var(--br-sm);
		padding: var(--spacing-ms);
	}
	@media only screen and (max-width: 768px) {
		justify-content: space-between;
		align-items: flex-start;
	}
`

export const Buttons = styled.div`
	flex: 1;
	display: flex;
	justify-content: flex-start;
	align-items: flex-end;
	flex-wrap: wrap;
	gap: var(--spacing-ms);

	button {
		border: none;
		border-radius: 0;
		color: var(--link-blue);
		&:hover {
			text-decoration: none;
		}
		@media only screen and (max-width: 768px) {
			color: var(--md-blue);
			border: 1px solid var(--md-blue);
			border-radius: var(--br-25);
			padding: var(--spacing-sm);
		}
	}
	@media only screen and (max-width: 768px) {
	}
`

export const Pipe = styled.span`
	margin: 0;
	@media only screen and (max-width: 768px) {
		display: none;
	}
`

export const Subtotal = styled.div`
	width: 35rem;
	height: fit-content;
	padding: var(--spacing-md);
	background-color: var(--white);
	.none-selected {
		font-weight: bold;
	}
	p {
		font-size: var(--font-md);
		span {
			font-weight: bold;
		}
	}
	div.order-gift {
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		p {
			font-size: var(--font-xs);
		}
	}
	div.checkout-btn {
		margin-top: var(--spacing-sm);
	}

	@media only screen and (max-width: 1199px) {
		width: 100%;
	}
	@media only screen and (max-width: 768px) {
		border-bottom: 1px solid var(--lt-grey);
	}
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-md) var(--spacing-sm);
	}
`
