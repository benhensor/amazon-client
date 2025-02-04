import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addressSchema } from '../schemas/index'
import { updateAddress, fetchAddresses } from '../redux/slices/addressSlice'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useFormik } from 'formik'
import PositionIcon from '../icons/PositionIcon'
import {
  AddEditPageContainer,
  AddEditPage,
  AddEditPageHeader,
} from '../assets/styles/AddressStyles'

export default function EditAddress() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const addressId = location.state?.addressId
  const [loading, setLoading] = useState(true)
  
  // Get the specific address from the addresses array
  const { addresses } = useSelector(state => state.addresses)
  const currentAddress = addresses.find(addr => addr.address_id === addressId)

  useEffect(() => {
    // Fetch addresses if not already loaded
    if (!currentAddress) {
      dispatch(fetchAddresses())
        .then(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [dispatch, currentAddress])

  const formik = useFormik({
    initialValues: {
      country: currentAddress?.country || 'United Kingdom',
      address_type: currentAddress?.address_type || 'home',
      full_name: currentAddress?.full_name || '',
      phone_number: currentAddress?.phone_number || '',
      postcode: currentAddress?.postcode || '',
      address_line1: currentAddress?.address_line1 || '',
      address_line2: currentAddress?.address_line2 || '',
      city: currentAddress?.city || '',
      county: currentAddress?.county || '',
      delivery_instructions: currentAddress?.delivery_instructions || '',
      is_default: currentAddress?.is_default || false,
      is_billing: currentAddress?.is_billing || false,
    },
    validationSchema: addressSchema,
    enableReinitialize: true, // Important for when the address data loads
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true)
      dispatch(updateAddress({ addressId, addressData: values }))
        .unwrap()
        .then((response) => {
          navigate('/account/addresses')
        })
        .catch((error) => {
          console.error('Failed to update address:', error)
        })
        .finally(() => {
          setSubmitting(false)
        })
    },
  })

  if (loading) {
    return <div>Loading...</div>
  }

  if (!currentAddress && !loading) {
    return <div>Address not found</div>
  }

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
          <p>Edit Address</p>
        </div>
        <AddEditPageHeader>
          <h2>Edit address</h2>
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
              <option value="United Kingdom">United Kingdom</option>
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
            <label htmlFor="full_name">Full Name (first name and surname)</label>
            <input
              type="text"
              id="full_name"
              name="full_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.full_name}
            />
            {formik.touched.full_name && formik.errors.full_name ? (
              <div className="error">{formik.errors.full_name}</div>
            ) : null}
          </div>
          {/* ... Rest of the form fields follow the same pattern ... */}
          {/* Phone number */}
          <div className="form-group">
            <label htmlFor="phone_number">Phone number</label>
            <input
              type="tel"
              id="phone_number"
              name="phone_number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone_number}
              placeholder="Your 10 or 9 digit phone number"
            />
            {formik.touched.phone_number && formik.errors.phone_number ? (
              <div className="error">{formik.errors.phone_number}</div>
            ) : null}
          </div>
          {/* Postcode */}
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
              <div className="error">{formik.errors.postcode}</div>
            ) : null}
          </div>
          {/* Address lines */}
          <div className="form-group">
            <label htmlFor="address_line1">Address Line 1 (or Company Name)</label>
            <input
              type="text"
              id="address_line1"
              name="address_line1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address_line1}
            />
            {formik.touched.address_line1 && formik.errors.address_line1 ? (
              <div className="error">{formik.errors.address_line1}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="address_line2">Address Line 2 (optional)</label>
            <input
              type="text"
              id="address_line2"
              name="address_line2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address_line2}
            />
          </div>
          {/* City and County */}
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
            <label htmlFor="county">County (if applicable)</label>
            <input
              type="text"
              id="county"
              name="county"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.county}
            />
          </div>
          {/* Delivery Instructions */}
          <div className="form-group">
            <label htmlFor="delivery_instructions">Delivery Instructions (optional)</label>
            <input
              type="text"
              id="delivery_instructions"
              name="delivery_instructions"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.delivery_instructions}
              placeholder="Any special instructions for delivery"
            />
          </div>
          {/* Checkboxes */}
          <div className="form-group default">
            <input
              type="checkbox"
              id="is_default"
              name="is_default"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.is_default}
            />
            <label htmlFor="is_default">Make this my default address</label>
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
            <label htmlFor="is_billing">Make this my billing address</label>
          </div>
          <button type="submit" className="primary-btn" disabled={formik.isSubmitting}>
            Save changes
          </button>
        </form>
      </AddEditPage>
    </AddEditPageContainer>
  )
}
