import styled from 'styled-components';

export const Container = styled.div`
	padding: var(--spacing-md) var(--spacing-lg);
	p {
		color: var(--dk-blue);
		font-size: var(--font-xs);
	}
	div.header {
		p {
			font-size: var(--font-xl);
		}
	}
	ul.legalese {
		margin-top: var(--spacing-md);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
	}
	div.copyright {
		display: flex;
		justify-content: center;
		margin-top: var(--spacing-md);
		p {
			color: var(--lt-text);
		}
	}
	div.label-and-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	div.text-over-line {
		margin: 3rem 0 2rem 0;
		position: relative;
		hr {
			width: 100%;
			border: 1px solid var(--lt-grey);
		}
		p {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: var(--white);
			padding: 0 var(--spacing-sm);
			color: var(--lt-text);
		}
	}
	div.existing {
		p {
			width: 100%;
			display: flex;
			align-items: center;
			gap: var(--spacing-xs);
		}
		button {
			display: flex;
			align-items: center;
			background: transparent;
			border: none;
			color: var(--signin-link);
			box-shadow: none;
			&:hover {
				text-decoration: underline;
			}
		}
		svg {
			margin-left: var(--spacing-ms);
			width: 0.5rem;
			path {
				stroke: var(--signin-link);
			}
		}
	}

	@media only screen and (max-width: 650px) {
		ul.legalese {
			flex-direction: column;
			gap: 0;
		}
	}
`

export const InnerContainer = styled.div`
	width: 35rem;
	margin: 0 auto;

	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

export const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-lg);
	&:hover {
		cursor: pointer;
	}
	svg {
		width: 15rem;
	}
`

export const FormContainer = styled.div`
	border-radius: var(--br-md);
	border: 1px solid var(--border-grey);
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg);
	margin: 0 auto;
	div.divider {
		margin: var(--spacing-sm) 0 var(--spacing-xs) 0;
		hr {
			border: 1px solid var(--lt-grey);
		}
	}
	div.schizzness {
		p {
			font-weight: bold;
		}
	}
`

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);

	div.change-email {
		display: inline-flex;
		gap: var(--spacing-ms);
	}

	div.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);

		label {
			font-size: var(--font-xs);
			font-weight: bold;
		}

		input {
			padding: var(--spacing-ms);
			border: 1px solid var(--border-grey);
			border-radius: var(--br-sm);

			&:focus {
				outline: 3px solid var(--input-focus);
				border: 1px solid var(--input-focus-border);
				background-color: var(--input-focus-bg);
			}
		}
	}
`

export const GradientDivider = styled.div`
	margin-top: ${({ $marginTop }) => $marginTop};
	width: 100%;
	height: 0.3rem;
	background: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.14),
		rgba(0, 0, 0, 0.03) 0.3rem,
		transparent
	);
	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 4.4rem;
		background: linear-gradient(
			to right,
			#fff,
			rgba(255, 255, 255, 0),
			#fff
		);
	}
`
