import React from 'react'
import {
  StyledDeliveryOption
} from '../../assets/styles/CheckoutStyles'

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
