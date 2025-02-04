import styled from 'styled-components'


export const AccountPage = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

export const PageContainer = styled.div`
	max-width: 120rem;
	margin: 0 auto;
	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: 0;
	}
`

export const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
	}
`

export const LayoutGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
	gap: var(--spacing-lg);
	@media only screen and (max-width: 1199px) {
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 768px) {
		grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		gap: 0;
	}
`

export const Option = styled.div`
	border: 1px solid var(--border-grey);
	border-radius: var(--br-lg);
	transition: var(--tr-fast);
	cursor: pointer;
	&:hover {
		background-color: var(--lt-grey);
	}
	button {
		width: 100%;
		text-align: left;
	}
	@media only screen and (max-width: 450px) {
		border-radius: 0;
		border: none;
		border-bottom: 1px solid var(--border-grey);
		height: 9rem;
		display: flex;
		align-items: center;
		&:hover {
			background-color: transparent;
		}
	}
`

export const OptionContainer = styled.div`
	display: flex;
	align-items: flex-start;
	padding: var(--spacing-md);
	width: 100%;
	@media only screen and (max-width: 450px) {
		padding: var(--spacing-sm);
		align-items: center;
		&:hover {
			background-color: transparent;
		}
	}
`

export const OptionImage = styled.div`
	margin-right: var(--spacing-sm);
	border-radius: var(--br-50);
	overflow: hidden;
	max-width: 7rem;
	max-height: 7rem;
	img {
		background-color: var(--account-imgBG);
		width: 100%;
		object-fit: contain;
	}
	@media only screen and (max-width: 450px) {
		max-width: 5rem;
		max-height: 5rem;
	}
`

export const OptionDetails = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	width: 100%;
	height: 100%;
	h3 {
		font-size: clamp(var(--font-md), 3vw, var(--font-lg));
	}
	p {
		color: var(--grey);
	}
	@media only screen and (max-width: 450px) {
		h3 {
			font-size: clamp(var(--font-sm), 3vw, var(--font-md));
		}
		p {
			font-size: var(--font-xs);
		}
	}
`

export const Divider = styled.div`
	margin: var(--spacing-xl) 0;
	hr {
		border: none;
		border-top: 1px solid var(--border-grey);
	}
	@media only screen and (max-width: 768px) {
		margin: var(--spacing-lg) 0;
	}
	@media only screen and (max-width: 450px) {
		margin: var(--spacing-md) 0;
	}
`

export const List = styled.div`
	padding: var(--spacing-md);
	border: 1px solid var(--border-grey);
	border-radius: var(--br-lg);
	h3 {
		margin-bottom: var(--spacing-sm);
	}
	ul {
		li {
			display: flex;
			justify-content: space-between;
			font-size: var(--font-sm);
			span {
				color: var(--link-blue);
				cursor: pointer;
				transition: var(--tr-fast);
				&:hover {
					color: var(--account-link-hover);
					text-decoration: underline;
				}
			}
		}
	}
`
