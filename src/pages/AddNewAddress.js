import React from 'react'
import { useDispatch } from 'react-redux'
import { addressSchema } from '../schemas/index'
import { createNewAddress } from '../redux/slices/addressSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import PositionIcon from '../icons/PositionIcon'
import {
	AddEditPageContainer,
	AddEditPage,
	AddEditPageHeader,
} from '../assets/styles/AddressStyles'

export default function AddNewAddress() {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			await dispatch(createNewAddress(values)).unwrap();
			navigate('/account/addresses');
		} catch (error) {
			console.error('Failed to add address:', error);
		} finally {
			setSubmitting(false);
		}
	};

	const formik = useFormik({
    initialValues: {
      country: 'United Kingdom',  
      address_type: 'home',
      full_name: '',
      phone_number: '',
      postcode: '',
      address_line1: '',
      address_line2: '',
      city: '',
      county: '',
			delivery_instructions: '',
      is_default: false,
			is_billing: false,	          
    },
    validationSchema: addressSchema,  
    onSubmit: handleSubmit,
  });

	return (
		<AddEditPageContainer>
			<AddEditPage>
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
				<AddEditPageHeader>
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
				</AddEditPageHeader>

				<form 
					onSubmit={(e) => {
						e.preventDefault(); 
						formik.handleSubmit(e); 
					}}
					noValidate
				>
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
						<label htmlFor="address_type">Address Type</label>
						<select
							id="address_type"
							name="address_type"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.address_type}
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
					<div className="form-group">
						<label htmlFor="delivery_instructions">
							Delivery Instructions (optional)
						</label>
						<input
							type="text"
							id="delivery_instructions"
							name="delivery_instructions"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.delivery_instructions}
							placeholder="Any special instructions for delivery"
						/>
						{formik.touched.delivery_instructions && formik.errors.delivery_instructions ? (
							<div className="error">{formik.errors.delivery_instructions}</div>
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
					<div className="form-group default">
						<input
							type="checkbox"
							id="is_billing"
							name="is_billing"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							checked={formik.values.is_billing}
						/>
						<label htmlFor="is_billing">
							Make this my billing address
						</label>
						{formik.touched.is_billing && formik.errors.is_billing ? (
							<div className="error">{formik.errors.is_billing}</div>
						) : null}
					</div>
					<button 
						type="submit" 
						className="primary-btn" 
					>
						Add address
					</button>
				</form>
			</AddEditPage>
		</AddEditPageContainer>
	)
}
