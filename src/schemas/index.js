import * as yup from 'yup'

const passwordRules =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,20}$/

export const registerSchema = yup.object().shape({
	email: yup
		.string()
		.email('Please enter a valid email')
		.required('Please enter a valid email'),
	fullname: yup
		.string()
		.min(3, 'Username must be at least 3 characters')
		.max(50, 'Username cannot exceed 50 characters')
		.required('First and last name'),
	password: yup
		.string()
		.min(6, 'Password must be at least 6 characters')
		.matches(passwordRules, {
			message: 'Please create a stronger password',
		})
		.required('Required'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Required'),
})

export const loginSchema = yup.object().shape({
	email: yup.string().email('Invalid email').required('Required'),
  password: yup.string().when('showPasswordField', {
    is: true,  // Only validate when the password field is visible
    then: yup.string().required('Password is required'),
  }),
})

export const addressSchema = yup.object().shape({
	full_name: yup
		.string()
		.min(3, 'Name must be at least 3 characters')
		.max(50, 'Name cannot exceed 50 characters')
		.required('Required'),
	address_type: yup
		.string()
		.oneOf(['home', 'work', 'other'], 'Please select a valid address type')
		.required('Required'),
	phone_number: yup
		.string()
		.matches(
			/^(?:0|\+44)(?:\d\s?){9,10}$/,
			'Please enter a valid UK phone number'
		)
		.required('Required'),
	postcode: yup
		.string()
		.matches(
			/^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/,
			'Please enter a valid postcode'
		)
		.required('Please enter a valid postcode'),
	address_line1: yup
		.string()
		.min(3, 'Address must be at least 3 characters')
		.max(50, 'Address cannot exceed 50 characters')
		.required('Required'),
	address_line2: yup
		.string()
		.min(3, 'Address must be at least 3 characters')
		.max(50, 'Address cannot exceed 50 characters'),
	city: yup
		.string()
		.min(3, 'City must be at least 3 characters')
		.max(50, 'City cannot exceed 50 characters')
		.required('Required'),
	county: yup
		.string()
		.min(3, 'County must be at least 3 characters')
		.max(50, 'County cannot exceed 50 characters'),
	country: yup
		.string()
		.min(3, 'Country must be at least 3 characters')
		.max(50, 'Country cannot exceed 50 characters')
		.required('Required'),
	delivery_instructions: yup
		.string()
		.min(3, 'Instructions must be at least 3 characters')
		.max(100, 'Instructions cannot exceed 50 characters'),
	is_default: yup.boolean(),
	is_billing: yup.boolean(),
})
