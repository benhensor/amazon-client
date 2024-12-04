import React from 'react'
import styled from 'styled-components'

export default function DeliveryOption({ option, selected, onChange, shippingOption }) { 

  if (!shippingOption) return null

  return (
    <StyledDeliveryOption>
      <input
        type="radio"
        checked={selected === option}
        onChange={() => onChange(option)}
        name="shipping"
      />
      <div>
        <p>
          <strong>{shippingOption.dates}</strong>
        </p>
        <p className="small">
          £{shippingOption.price.toFixed(2)} -{' '}
          {shippingOption.label}
        </p>
        <p className="small description">
          {shippingOption.description}
        </p>
      </div>
    </StyledDeliveryOption>
  )
}

const StyledDeliveryOption = styled.label`
	display: flex;
	align-items: flex-start;
	gap: var(--spacing-sm);
	font-size: clamp(var(--font-xs), 2vw, var(--font-sm));
	cursor: pointer;

	input {
		margin-top: var(--spacing-xs);
	}

	div {
		display: flex;
		flex-direction: column;
		margin-bottom: var(--spacing-sm);
	}
`