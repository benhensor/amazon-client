import React from 'react'
import { StyledPrivacyNotice } from '../../assets/styles/CheckoutStyles'

export default function PrivacyNotice() {
	return (
		<StyledPrivacyNotice>
      <p className="small">
        By placing your order you agree to Scamazon's{' '}
        <span className="primary-link">Conditions of Use & Sale</span>.
        Please see our <span className="primary-link">Privacy Notice</span>,
        our <span className="primary-link">Cookies Notice</span> and our{' '}
        <span className="primary-link">Interest-Based Ads Notice</span>.
      </p>
    </StyledPrivacyNotice>
	)
}
