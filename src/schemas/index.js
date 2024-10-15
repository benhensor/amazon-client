import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,20}$/

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
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter a valid email'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
})

export const addressSchema = yup.object().shape({
	addressLine1: yup
		.string()
		.min(3, 'Address must be at least 3 characters')
		.max(50, 'Address cannot exceed 50 characters')
		.required('Required'),
	addressLine2: yup
		.string()
		.min(3, 'Address must be at least 3 characters')
		.max(50, 'Address cannot exceed 50 characters'),
	city: yup
		.string()
		.min(3, 'City must be at least 3 characters')
		.max(50, 'City cannot exceed 50 characters')
		.required('Required'),
	postcode: yup
		.string()
		.matches(
			/^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/,
			'Please enter a valid postcode'
		)
		.required('Please enter a valid postcode'),
})