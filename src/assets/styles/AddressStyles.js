import { Link } from "react-router-dom";
import styled from "styled-components";

export const PageContainer = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

export const AddressesPage = styled.div`
	max-width: 100rem;
	margin: 0 auto;
	.breadcrumb {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		margin: var(--spacing-md) 0;
		font-size: var(--font-xs);
		p {
			color: var(--order-breadcrumb);
		}
		span {
			margin-bottom: 2px;
		}
	}
	.new-default-address {
		border: 2px solid var(--def-address-green);
		border-radius: var(--br-lg);
		overflow: hidden;
		width: 100%;
		height: 7rem;
		display: flex;
		align-items: center;
		gap: var(--spacing-sm);
		.bar {
			margin-right: var(--spacing-lg);
			background-color: var(--def-address-green);
			width: 1.5rem;
			height: 100%;
		}
		.check {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: var(--spacing-xs);
			border-radius: var(--br-50);
			background-color: var(--def-address-green);
			color: var(--white);
			font-size: var(--font-xs);
			width: 2rem;
			height: 2rem;
		}
		h2 {
			font-size: var(--font-md);
			color: var(--black);
		}
	}
	@media only screen and (max-width: 1199px) {
		padding: var(--spacing-md);
	}
	@media only screen and (max-width: 450px) {
		padding: 0 var(--spacing-sm);
	}
`

export const PageHeader = styled.div`
	padding: var(--spacing-sm) 0;
`

export const LayoutGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr); /* 3 even columns */
	gap: var(--spacing-lg);
	@media only screen and (max-width: 1199px) {
		grid-template-columns: repeat(3, 1fr);
		gap: var(--spacing-md);
	}
	@media only screen and (max-width: 899px) {
		grid-template-columns: repeat(2, 1fr); /* 2 column for tablet */
		gap: var(--spacing-sm);
	}
	@media only screen and (max-width: 619px) {
		grid-template-columns: repeat(1, 1fr); /* 1 column for mobile */
	}
`

export const Block = styled.div`
	position: relative;
	width: 100%;
	height: auto;
	padding-top: 100%; /* This maintains the square aspect ratio */
	transition: var(--tr-fast);

	/* Content container to ensure proper positioning of content inside the square */
	& > * {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media only screen and (max-width: 619px) {
    padding-top: 0; /* Remove the aspect ratio export constraint */
    position: static; /* Reset position */
    height: auto;
    
    & > * {
      position: static; /* Reset absolute positioning of children */
    }
  }
`

export const BlockContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.container {
		border-radius: var(--br-lg);
		width: 100%;
		height: 100%;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.border-dash {
		cursor: pointer;
		border: 1px dashed var(--md-grey);
		&:hover {
			border: 1px solid var(--md-grey);
		}
	}
	.border-solid {
		border: 1px solid var(--md-grey);
	}
	.add-address-container {
		margin: auto auto;
	}
	.add-address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: var(--paleblue);
		font-size: var(--font-xl);
		svg {
			width: 3rem;
			height: 3rem;
			fill: var(--paleblue);
		}
	}
	.default {
		border-bottom: 1px solid var(--border-grey);
		padding: var(--spacing-sm) var(--spacing-lg);
		font-size: var(--font-xs);
		font-weight: bold;
    display: flex;
    align-items: center;
	}
  .default-logo {
    margin-left: var(--spacing-sm);
    margin-bottom: 2px;
    svg {
      width: 5rem;
    }
  }
	.address {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		font-size: var(--font-sm);
		padding: var(--spacing-lg) 0 0 var(--spacing-lg);
	}
	.name {
		font-size: var(--font-md);
		font-weight: bold;
	}
	.address-controls {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: var(--spacing-sm) var(--spacing-lg);
		div {
			display: flex;
			align-items: center;
			gap: var(--spacing-sm);
		}
	}
	@media only screen and (max-width: 619px) {
		padding: 0;
		&:hover {
			background-color: transparent;
		}

		.add-address-container.desktop {
			display: none;
		}

		.add-address-container.mobile {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			color: var(--paleblue);
			border-top: 1px solid var(--border-grey);
			border-bottom: 1px solid var(--border-grey);
		}

		.add-address-container {
			margin: var(--spacing-sm) 0;
		}
		.add-address {
			flex-direction: row-reverse;
			justify-content: space-between;
			color: var(--paleblue);
			font-size: var(--font-sm);
			padding: var(--spacing-sm);
			svg {
				width: .8rem;
				height: auto;
				fill: var(--paleblue);
			}
		}

		.default {
			padding: var(--spacing-sm);
		}

		.address {
			width: 100%;
			height: 100%;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			font-size: var(--font-sm);
			padding: var(--spacing-md) var(--spacing-sm);
		}

		.address-controls {
			padding: 0 var(--spacing-sm) var(--spacing-md) var(--spacing-sm);
			gap: var(--spacing-sm);
		}

		.address-controls button {
			font-size: var(--font-xs);
			color: var(--md-blue);
			border: 1px solid var(--md-blue);
			border-radius: var(--br-25);
			padding: var(--spacing-sm) var(--spacing-md);
			&:hover {
				text-decoration: none;
				background-color: var(--md-blue);
				color: var(--white);
			}
		}
	}
`

export const MobileBlock = styled.div`
	color: var(--paleblue);
	border-top: 1px solid var(--md-grey);
	border-bottom: 1px solid var(--md-grey);
	padding: var(--spacing-sm) 0;
	.mobile-icon {
		width: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 100%;
			height: auto;
			fill: var(--paleblue);
		}
	}
`

export const MobileLink = styled(Link)`
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
`


export const AddEditPageContainer = styled.div`
  background-color: var(--white);
  margin-bottom: 10rem;
`

export const AddEditPage = styled.div`
  max-width: 60rem;
  margin: 0 auto;

  .breadcrumb {
    display: flex;
    align-items: center;
    gap: var(--spacing-xs);
    margin: var(--spacing-md) 0;
    font-size: var(--font-xs);
    p {
      color: var(--order-breadcrumb);
    }
    span {
      margin-bottom: 2px;
    }
  }

  form {
    margin-top: var(--spacing-md);
    .form-group {
      margin-bottom: var(--spacing-md);
      label {
        display: block;
        margin-bottom: var(--spacing-xs);
        font-size: var(--font-sm);
        font-weight: bold;
      }
      input,
      select {
        width: 100%;
        padding: var(--spacing-sm);
        border: 1px solid var(--border-grey);
        border-radius: var(--br-sm);
        font-size: var(--font-sm);
      }
      input::placeholder {
        color: var(--lt-text);
      }
    }
    .form-group.default {
      display: flex;
      align-items: center;
      width: 100%;
      input {
        width: fit-content;
        margin-right: var(--spacing-sm);
        padding: 0;
      }
      p {
        line-height: 1;
      }
    }
    button {
      border-radius: var(--br-25);
      padding: var(--spacing-sm) var(--spacing-md);
    }
  }

  @media only screen and (max-width: 1199px) {
    padding: var(--spacing-md);
  }
  @media only screen and (max-width: 450px) {
    padding: var(--spacing-sm);
  }
`

export const AddEditPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) 0;
  .position-icon {
    display: flex;
    align-items: center;
    gap: var(--spacing-sm);
    position: relative;
    svg {
      width: 2rem;
      height: auto;
      z-index: 1;
      path {
        fill: var(--md-orange);
      }
    }
    .scamazon-s {
      position: absolute;
      top: 0.2rem;
      left: 0.6rem;
      font-size: var(--font-md);
      font-weight: bold;
      line-height: 1;
      color: var(--white);
      z-index: 2;
    }
    p {
      font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
      margin-bottom: var(--spacing-ms);
    }
  }
  .autofill {
    border: 1px solid var(--autofill-border);
    border-radius: var(--br-md);
    background: var(--autofill-gradient);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--spacing-md) var(--spacing-lg);
    font-weight: bold;
    font-size: var(--font-sm);
  }
  .autofill-btn {
    border: 1px solid var(--md-grey);
    border-radius: var(--br-25);
    background-color: var(--white);
    padding: var(--spacing-ms) var(--spacing-md);
  }
  @media only screen and (max-width: 450px) {
    padding: 0;
    .autofill {
      padding: var(--spacing-md);
    }
  }
`