import React from 'react'
import { useDispatch } from 'react-redux'
import { addressSchema } from '../schemas/index'
import { createNewAddress } from '../redux/slices/addressSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import PositionIcon from '../icons/PositionIcon'
import styled from 'styled-components'

export default function AddNewAddress() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const formik = useFormik({
    initialValues: {
      country: 'United Kingdom',  
      type: 'home',
      full_name: '',
      phone_number: '',
      postcode: '',
      address_line1: '',
      address_line2: '',
      city: '',
      county: '',
      is_default: false,          
    },
    validationSchema: addressSchema,  
    onSubmit: (values, { setSubmitting }) => {
      console.log("Submitting form with values:", values);
      console.log("Submitting form with errors:", formik.errors);
      dispatch(createNewAddress(values))    
        .unwrap()
        .then(() => {
          navigate('/account/addresses');  
        })
        .catch((error) => {
          console.error('Failed to add address:', error);
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

	return (
		<PageContainer>
			<Page>
				<div className="breadcrumb">
					<Link to="/account" className="primary-link">
						Your Account
					</Link>
					<span>▸</span>
					<Link to="/account/addresses" className="primary-link">
						Your Addresses
					</Link>
					<span>▸</span>
					<p>New Address</p>
				</div>
				<PageHeader>
					<h2>Add a new address</h2>
					<div className="position-icon">
						<PositionIcon />
						<p className="scamazon-s">s</p>
						<p className="primary-link">
							Or find a Scamazon collection location near you
						</p>
					</div>
					<div className="autofill">
						<p>Save time. Autofill your current location.</p>
						<button className="autofill-btn">Autofill</button>
					</div>
				</PageHeader>

				<form onSubmit={formik.handleSubmit}>
					<div className="form-group">
						<label htmlFor="country">Country/Region</label>
						<select
							id="country"
							name="country"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.country}
						>
							<option value="United Kingdom">
								United Kingdom
							</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="type">Address Type</label>
						<select
							id="type"
							name="type"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.type}
						>
							<option value="home">Home</option>
							<option value="work">Work</option>
							<option value="other">Other</option>
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="full_name">
							Full Name (first name and surname)
						</label>
						<input
							type="text"
							id="full_name"
							name="full_name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.full_name}
						/>
						{formik.touched.full_name && formik.errors.full_name ? (
							<div className="error">
								{formik.errors.full_name}
							</div>
						) : null}
					</div>
					<div className="form-group">
						<label htmlFor="phone_number">Phone number</label>
						<input
							type="tel"
							id="phone_number"
							name="phone_number"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.phone_number}
							placeholder="Your 10 or 9 digit phone_number number"
						/>
						{formik.touched.phone_number && formik.errors.phone_number ? (
							<div className="error">{formik.errors.phone_number}</div>
						) : null}
					</div>
					<div className="form-group">
						<label htmlFor="postcode">Postcode</label>
						<input
							type="text"
							id="postcode"
							name="postcode"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.postcode}
							placeholder="Enter your area postcode"
						/>
						{formik.touched.postcode && formik.errors.postcode ? (
							<div className="error">
								{formik.errors.postcode}
							</div>
						) : null}
					</div>
					<div className="form-group">
						<label htmlFor="address_line1">
							Address Line 1 &#40;or Company Name&#41;
						</label>
						<input
							type="text"
							id="address_line1"
							name="address_line1"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address_line1}
							placeholder="Start typing your address to get suggestions"
						/>
						{formik.touched.address_line1 && formik.errors.address_line1 ? (
							<div className="error">
								{formik.errors.address_line1}
							</div>
						) : null}
					</div>
					<div className="form-group">
						<label htmlFor="address_line2">
							Address Line 2 &#40;optional&#41;
						</label>
						<input
							type="text"
							id="address_line2"
							name="address_line2"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address_line2}
						/>
						{formik.touched.address_line2 && formik.errors.address_line2 ? (
							<div className="error">
								{formik.errors.address_line2}
							</div>
						) : null}
					</div>
					<div className="form-group">
						<label htmlFor="city">Town/City</label>
						<input
							type="text"
							id="city"
							name="city"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.city}
						/>
						{formik.touched.city && formik.errors.city ? (
							<div className="error">{formik.errors.city}</div>
						) : null}
					</div>
					<div className="form-group">
						<label htmlFor="county">
							County &#40;if applicable&#41;
						</label>
						<input
							type="text"
							id="county"
							name="county"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.county}
						/>
						{formik.touched.county && formik.errors.county ? (
							<div className="error">{formik.errors.county}</div>
						) : null}
					</div>
					<div className="form-group default">
						<input
							type="checkbox"
							id="is_default"
							name="is_default"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							checked={formik.values.is_default}
						/>
						<label htmlFor="is_default">
							Make this my default address
						</label>
						{formik.touched.is_default && formik.errors.is_default ? (
							<div className="error">{formik.errors.is_default}</div>
						) : null}
					</div>
					<button type="submit" className="primary-btn" disabled={formik.isSubmitting}>Add address</button>
				</form>
			</Page>
		</PageContainer>
	)
}

const PageContainer = styled.div`
	background-color: var(--white);
	margin-bottom: 10rem;
`

const Page = styled.div`
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

const PageHeader = styled.div`
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
