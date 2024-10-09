import React from 'react'
import CloseIcon from '../../icons/CloseIcon'
import QuantityBtn from '../buttons/QuantityBtn'
import styled from 'styled-components'

export default function AddToBasket({ addToBasketConfirmOpen, closeMenu }) {
  return (
    <>
				<ModalBackground $open={addToBasketConfirmOpen} onClick={closeMenu} />
				<ModalContainer $open={addToBasketConfirmOpen}>
					<Header>
						<button onClick={closeMenu}>
							<CloseIcon />
						</button>
					</Header>
					<QuantityBtn />
				</ModalContainer>
			</>
  )
}

const ModalBackground = styled.div`
  position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background: rgba(0, 0, 0, 0.7);
	z-index: 100;
	opacity: ${({ $open }) => ($open ? 1 : 0)};
	visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
	transition: var(--tr-medium);
`

const ModalContainer = styled.div`
  position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	width: 40rem;
	background-color: var(--white);
	z-index: 99999;
	overflow-y: auto;
	transform: ${({ $open }) =>
		$open ? 'translateX(0)' : 'translateX(-100%)'};
	opacity: ${({ $open }) => ($open ? 1 : 0)};
	transition: var(--tr-medium);

	@media only screen and (max-width: 450px) {
		width: 100%;
	}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--white);
  border-bottom: 1px solid var(--lt-grey);
  z-index: 100;
`

