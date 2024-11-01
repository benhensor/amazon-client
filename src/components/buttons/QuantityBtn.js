import React from 'react'
import styled from 'styled-components'

export default function QuantityBtn({ quantity, setQuantity }) {
  const handleSubtract = () => {
    const min = 1
    if (quantity > min) {
      setQuantity(quantity - 1)
    }
  }
  const handleAdd = () => {
    const max = 5
    if (quantity < max) {
      setQuantity(quantity + 1)
    }
  }
	return (
		<ButtonContainer>
			<Section>
				<button className='sub' onClick={handleSubtract}>-</button>
			</Section>
			<Section className='quantity'>{quantity}</Section>
			<Section>
				<button className='add' onClick={handleAdd}>+</button>
			</Section>
		</ButtonContainer>
	)
}

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-grey);
  border-radius: var(--br-25);
`

const Section = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  
  button {
    width: 100%;
    background-color: var(--lt-grey);
    padding: var(--spacing-sm) var(--spacing-md);
    color: var(--black);
    font-size: clamp(var(--font-xs), 2vw, var(--font-lg));
    line-height: 1;
    transition: var(--tr-fast);
    
    &:hover {
      background-color: var(--lt-grey-hover);
    }
  }
  
  button.sub {
    border-radius: var(--br-25) 0 0 var(--br-25);
  }
  
  button.add {
    border-radius: 0 var(--br-25) var(--br-25) 0;
  }
`