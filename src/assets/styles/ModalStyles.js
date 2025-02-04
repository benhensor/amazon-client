import styled from 'styled-components'

export const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	z-index: 100;
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	visibility: ${({ $menuOpen }) => ($menuOpen ? 'visible' : 'hidden')};
	transition: var(--tr-fast);
`

export const CategoryModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 40rem;
	background-color: var(--white);
	z-index: 99999;
	overflow-y: auto;
	transform: ${({ $menuOpen }) =>
		$menuOpen ? 'translateX(0)' : 'translateX(-100%)'};
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	transition: var(--tr-medium);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

export const NavModalContainer = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	height: 100vh;
	width: 30rem;
	background-color: var(--white);
	color: var(--black);
	z-index: 999;
	overflow-y: auto;
	transform: ${({ $menuOpen }) =>
		$menuOpen ? 'translateX(0)' : 'translateX(100%)'};
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	transition: var(--tr-medium);
	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

export const PaymentMethodModalContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: var(--br-lg);
	width: 50rem;
	height: auto;
	background-color: var(--white);
	color: var(--black);
	z-index: 999;
	overflow-y: auto;
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	padding: var(--spacing-md);
	transition: var(--tr-medium);
	.modal-controls {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		margin-bottom: var(--spacing-md);
		.logo {
			margin: 0 auto;
		}
		.logo svg {
			width: 5rem;
		}
		svg {
			width: 1.5rem;
			background: none;
			border: none;
			cursor: pointer;
		}
		button {
			position: absolute;
			right: 0;
			background: none;
			border: none;
			cursor: pointer;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
	.modal-header {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-md);
		p {
			font-size: var(--font-sm);
		}
		.modal-heading {
			font-size: var(--font-lg);
			font-weight: bold;
		}
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-md);
		margin-bottom: var(--spacing-md);
	}

	.form-group,
	.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
	}

	.form-group.group {
		display: flex;
		flex-direction: row;
		gap: var(--spacing-md);
	}

	.form-group.group .input-group {
		flex: 1;
	}

	form label {
		font-size: var(--font-sm);
		font-weight: bold;
	}

	form input,
	form select {
		padding: var(--spacing-sm);
		font-size: var(--font-sm);
		border-radius: var(--br-md);
		border: 1px solid var(--border-grey);
	}

	option.def-option {
		color: var(--lt-grey);
	}

	.form-group button {
		display: flex;
		justify-content: center;
		padding: 1rem;
		background-color: var(--lt-grey);
		border: 1px solid var(--md-grey);
		transition: var(--tr-fast);
		&:hover {
			background-color: var(--lt-grey-hover);
		}
	}

	.disclaimer {
		text-align: center;
		font-size: var(--font-xs);
		color: var(--md-grey);
	}
	@media only screen and (max-width: 450px) {
		width: calc(100% - (2 * var(--spacing-sm)));
	}
`

export const ModalHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--md-blue);
	position: relative;
	div.profile {
		display: flex;
		align-items: center;
		gap: var(--spacing-md);
		height: 3rem;
		svg {
			fill: var(--white);
		}
	}

	p {
		display: flex;
		align-items: center;
		min-width: fit-content;
		color: var(--white);
		font-size: var(--font-lg);
		font-weight: bold;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		background-color: transparent;
		position: absolute;
		right: var(--spacing-lg);
	}
`

export const Heading = styled.div`
	padding: var(--spacing-md) var(--spacing-lg);
	background-color: var(--lt-blue);
	border-bottom: 1px solid var(--lt-grey-hover);
	h2 {
		font-size: clamp(var(--font-md), 2vw, var(--font-lg));
		font-weight: bold;
		color: var(--dk-blue);
	}
`

export const DepartmentWrapper = styled.div`
	padding: var(--spacing-md) 0;
	border-bottom: 1px solid var(--lt-grey-hover);
	h3 {
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: clamp(var(--font-sm), 2vw, var(--font-md));
		font-weight: bold;
		color: var(--black);
	}
	ul {
	}
	li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		font-size: var(--font-sm);
		cursor: pointer;
		div {
			width: 100%;
			padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm)
				var(--spacing-sm);
			display: flex;
			justify-content: space-between;
		}
		p {
			font-size: var(--font-sm);
			color: var(--dk-blue);
			padding: var(--spacing-sm) var(--spacing-md);
		}
		svg {
			path {
				stroke: var(--md-grey);
			}
		}
		&:hover {
			background-color: var(--cat-menu-hover);
			svg {
				path {
					stroke: var(--black);
				}
			}
		}
	}
	a {
		color: var(--black);
		text-decoration: none;
	}
`

export const MenuItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	gap: var(--spacing-sm);
	width: 100%;
	border-bottom: 1px solid var(--lt-grey);
	position: relative; /* Needed for ::after positioning */
	transition: var(--tr-fast);
	padding: var(--spacing-md) var(--spacing-lg);
	color: var(--black);
	&:last-of-type {
		border-bottom: none;
	}
	> p {
		font-size: var(--font-sm);
	}
	button {
		float: right;
		background-color: transparent;
		border: none;
		font-size: var(--font-sm);
	}
	.signout-btn {
		&:hover {
			color: var(--highlight-red);
		}
	}
	svg {
		position: absolute;
		left: var(--spacing-lg);
		path {
			stroke: var(--md-grey);
		}
	}
	&:hover {
		background-color: var(--lt-grey);
		svg {
			path {
				stroke: var(--black);
			}
		}
	}
`
