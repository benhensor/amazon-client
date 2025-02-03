import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  generateCVV,
  generateCardNumber,
  generateDates,
  generateAccountType,
} from '../../utils/paymentMethods';
import LogoSmile from '../../icons/LogoSmile'
import CloseIcon from '../../icons/CloseIcon'
import styled from 'styled-components'

export default function AddPaymentMethod({ isOpen, setIsOpen, onSubmit }) {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [formData, setFormData] = useState({
    bank: '',
    card_type: '',
    card_account: '', 
    card_number: '',
    start_date: '',
    end_date: '',
    cvv: '',
    cardholder_name: currentUser?.full_name || '',
    status: 'valid'
  });

  useEffect(() => {
    if (isOpen) {
      setFormData({
        bank: '',
        card_type: '',
        card_account: '',
        card_number: '',
        start_date: '',
        end_date: '',
        cvv: '',
        cardholder_name: currentUser?.full_name || '',
        status: 'valid'
      });
    }
  }, [isOpen, currentUser]);

  const handleBankChange = (e) => {
    const bank = e.target.value;
    setFormData(prev => ({
      ...prev,
      bank,
      // Reset generated fields when bank changes
      card_number: '',
      start_date: '',
      end_date: '',
      card_account: '',
      cvv: ''
    }));
  };

  const handleCardTypeChange = (e) => {
    const cardType = e.target.value;
    setFormData(prev => {
      // Only generate all details if both bank and card type are selected
      if (prev.bank && cardType) {
        const accountType = generateAccountType(cardType);
        const cvv = generateCVV(cardType);
        const cardNumber = generateCardNumber(cardType);
        const { startDate, endDate } = generateDates();

        return {
          ...prev,
          card_type: cardType,
          card_account: accountType,
          card_number: cardNumber,
          start_date: startDate,
          end_date: endDate,
          cvv: cvv
        };
      }
      
      // Otherwise just update the card type and reset generated fields
      return {
        ...prev,
        card_type: cardType,
        card_number: '',
        start_date: '',
        end_date: '',
        card_account: '',
        cvv: ''
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      bank: '',
      card_type: '',
      card_account: '',
      card_number: '',
      start_date: '',
      end_date: '',
      cvv: '',
      cardholder_name: currentUser?.full_name || '',
      status: 'valid'
    });
    setIsOpen(false);
  };

	return (
		<ModalBackground $menuOpen={isOpen} onClick={() => setIsOpen(false)}>
			<ModalContainer $menuOpen={isOpen} onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-controls">
					<div className="logo">
						<LogoSmile />
					</div>
					<button onClick={() => setIsOpen(false)}>
						<CloseIcon />
					</button>
				</div>
				<div className="modal-header">
					<p className="modal-heading">Add a credit or debit card</p>
					<p>Scamazon supports all major credit and debit cards</p>
					<p>
						<span>
							All fields marked with an asterisk &#40;*&#41; are
							required.
						</span>
					</p>
				</div>
				<div className="modal-content">
          <form action="payment-method" onSubmit={handleSubmit}>
            <div className="form-group group">
              <div className="input-group">
                <label htmlFor="bank">Bank*</label>
                <select 
                  name="bank" 
                  id="bank"
                  value={formData.bank}
                  onChange={handleBankChange}
                  required
                >
                  <option value="">Select bank</option>
                  <option value="Lloyds Bank">Lloyds Bank</option>
                  <option value="Halifax">Halifax</option>
                  <option value="Barclays">Barclays</option>
                  <option value="HSBC">HSBC</option>
                  <option value="Santander">Santander</option>
                  <option value="NatWest">NatWest</option>
                  <option value="RBS">RBS</option>
                  <option value="TSB">TSB</option>
                  <option value="Nationwide">Nationwide</option>
                  <option value="Metro Bank">Metro Bank</option>
                </select>
              </div>

              <div className="input-group">
                <label htmlFor="card_type">Card Type*</label>
                <select
                  id="card_type"
                  name="card_type"
                  value={formData.card_type}
                  onChange={handleCardTypeChange}
                  required
                >
                  <option value="">Select type</option>
                  <option value="VISA">VISA</option>
                  <option value="MASTERCARD">Mastercard</option>
                  <option value="AMEX">American Express</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="card_number">Card Number*</label>
              <input
                type="text"
                name="card_number"
                id="card_number"
                value={formData.card_number}
                placeholder="Card number"
                readOnly
              />
            </div>

            <div className="form-group group">
              <div className="input-group">
                <label htmlFor="start_date">Start Date (MM/YY)*</label>
                <input
                  type="text"
                  name="start_date"
                  id="start_date"
                  value={formData.start_date}
                  placeholder="MM/YY"
                  readOnly
                />
              </div>

              <div className="input-group">
                <label htmlFor="end_date">Expiry Date (MM/YY)*</label>
                <input
                  type="text"
                  name="end_date"
                  id="end_date"
                  value={formData.end_date}
                  placeholder="MM/YY"
                  readOnly
                />
              </div>
            </div>

            <div className="form-group group">
              <div className="input-group">
                <label htmlFor="card_account">Account Type*</label>
                <input
                  type="text"
                  id="card_account"
                  name="card_account"
                  value={formData.card_account}
                  placeholder="Account type"
                  readOnly
                  required
                />
              </div>

              <div className="input-group">
                <label htmlFor="cvv">Security Code*</label>
                <input
                  type="text"
                  id="cvv"
                  name="cvv"
                  value={formData.cvv}
                  placeholder="CVV"
                  readOnly
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="cardholder_name">Name on card*</label>
              <input
                type="text"
                id="cardholder_name"
                name="cardholder_name"
                value={formData.cardholder_name}
                onChange={(e) => setFormData(prev => ({ ...prev, cardholder_name: e.target.value }))}
                placeholder="First and last name"
                required
              />
            </div>

            <div className="form-group">
              <button type="submit" className="pill-btn secondary-btn">Add and continue</button>
            </div>
          </form>
          <p className="disclaimer">Your information is sold to the highest bidder</p>
        </div>
      </ModalContainer>
    </ModalBackground>
  );
}

const ModalBackground = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.7);
	z-index: 100;
	opacity: ${({ $menuOpen }) => ($menuOpen ? 1 : 0)};
	visibility: ${({ $menuOpen }) => ($menuOpen ? 'visible' : 'hidden')};
	transition: var(--tr-fast);
`

const ModalContainer = styled.div`
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

	.form-group, .input-group {
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
