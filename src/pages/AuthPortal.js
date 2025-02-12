import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate, useLocation } from 'react-router-dom'
import { registerSchema, loginSchema } from '../schemas/index'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, loginUser, clearError } from '../redux/slices/userSlice'
import Logo from '../icons/AmazonLogo'
import {
	Container,
	InnerContainer,
	LogoContainer,
	FormContainer,
	Form,
	GradientDivider,
} from '../assets/styles/AuthPortal'

export default function AuthPortal() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const location = useLocation()

	const [showPasswordField, setShowPasswordField] = useState(false)
	const [isSignIn, setIsSignIn] = useState(true)
	const [authError, setAuthError] = useState(null)

	const { loading, error, isLoggedIn } = useSelector((state) => state.user)

	useEffect(() => {
		if (isLoggedIn) {
			const from = location.state?.from?.pathname || '/'
			navigate(from, { replace: true })
		}
	}, [isLoggedIn, navigate, location])

	useEffect(() => {
		return () => {
			dispatch(clearError())
			setAuthError(null)
		};
	}, [dispatch])

	const handleHomeClick = () => {
    navigate('/')
  }

	const handleLogin = async (values) => {
		try {
			const result = await dispatch(loginUser(values)).unwrap()
			if (result.status.code === 401) {
				setAuthError(result.status.description)
			}
			if (result.status.code === 200) {
				const from = location.state?.from?.pathname || '/'
				navigate(from, { replace: true })
			}
		} catch (err) {
			console.error('Authentication error:', err)
		}
	}
	
	const handleRegister = async (values) => {
		try {
			const result = await dispatch(registerUser(values)).unwrap()
			
			if (result.status.code === 201) {
				setIsSignIn(true)
				formik.resetForm({
					values: {
						fullname: '',
						email: values.email,
						password: '',
						passwordConfirm: '',
					},
				})
				setShowPasswordField(true)
				setAuthError(null)
			}
		} catch (err) {
			setAuthError(err.status?.description || 'An error occurred')
		}
	}

	const handleAuth = async (values) => {
		if (isSignIn) {
			if (showPasswordField) {
				handleLogin(values)
			} else {
				setShowPasswordField(true)
			}
		} else {
			handleRegister(values)
		}
  }

	const handleToggle = () => {
    formik.resetForm({
      values: {
        fullname: '',
        email: '',
        password: '',
        passwordConfirm: '',
      },
    })
    setIsSignIn(!isSignIn)
    setShowPasswordField(false) 
		setAuthError(null)
		dispatch(clearError())
  }

	const formik = useFormik({
		initialValues: {
			fullname: '',
			email: '',
			password: '',
			passwordConfirm: '',
		},
		validationSchema: isSignIn ? loginSchema : registerSchema,
		onSubmit: handleAuth,
		enableReinitialize: true,
	})

	const signIn = {
		heading: 'Sign-In',
		form: (
			<Form onSubmit={formik.handleSubmit}>
				{!showPasswordField ? (
					<div className="input-group">
						<label htmlFor="email">
							Email or mobile phone number
						</label>
						<input
							type="text"
							name="email"
							id="email"
							onChange={(e) => {
								formik.handleChange(e);
								setAuthError(null);
							}}
							onBlur={formik.handleBlur}
							value={formik.values.email || ''}
							autoComplete="email"
							className={
								(formik.touched.email && formik.errors.email) || authError
									? 'error'
									: ''
							}
						/>
						{((formik.touched.email && formik.errors.email) || authError) && (
							<div className="error">{authError || formik.errors.email}</div>
						)}
					</div>
				) : (
					<>
						<div className="change-email">
							<p>{formik.values.email}</p>
							<button
								className="auth-link"
								type="button"
								onClick={() => setShowPasswordField(false)}
							>
								Change
							</button>
						</div>
						<input
              type="hidden"
              name="username"
              id="username"
              autoComplete="username"
              value={formik.values.email}
            />
						<div className="input-group">
							<div className="label-and-button">
								<label htmlFor="password">Password</label>
								<button className="auth-link" type="button">
									Forgot password?
								</button>
							</div>
							<input
								type="password"
								name="password"
								id="password"
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password || ''}
								autoComplete="current-password"
								className={
									formik.touched.password &&
									formik.errors.password
										? 'error'
										: ''
								}
							/>
							{formik.touched.password &&
								formik.errors.password && (
									<div className="error">
										{formik.errors.password}
									</div>
								)}
						</div>
					</>
				)}
				<button className="primary-btn auth-btn" type="submit">
					{showPasswordField ? 'Sign-In' : 'Continue'}
				</button>
			</Form>
		),
		legalese: (
			<div className="legalese">
				<p>
					By continuing, you agree to Amazon's{' '}
					<span className="auth-link">
						Conditions of Use and Sale
					</span>
					. Please see our{' '}
					<span className="auth-link">Privacy Notice</span>, our{' '}
					<span className="auth-link">Cookies Notice</span> and our{' '}
					<span className="auth-link">Interest-Based Ads Notice</span>
					.
				</p>
			</div>
		),
		help: (
			<div className="need-help">
				<span className="auth-link">▸ Need Help?</span>
			</div>
		),
		buying: (
			<div className="schizzness">
				<p>Buying for work?</p>
				<span className="auth-link">Shop on Amazon Business</span>
			</div>
		),
		textOverLine: (
			<div className="text-over-line">
				<hr />
				<p>New to Amazon?</p>
			</div>
		),
	}

	const register = {
		heading: 'Create account',
		form: (
			<Form
				onSubmit={formik.handleSubmit}
			>
				<div className="input-group">
					<label htmlFor="fullname">Your name</label>
					<input
						type="text"
						name="fullname"
						id="fullname"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.fullname || ''}
						autoComplete="name"
						className={
							formik.touched.fullname && formik.errors.fullname
								? 'error'
								: ''
						}
					/>
					{formik.touched.fullname && formik.errors.fullname && (
						<div className="error">{formik.errors.fullname}</div>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="email">Mobile number or email</label>
					<input
						type="text"
						name="email"
						id="email"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email || ''}
						autoComplete="email"
						className={
							formik.touched.email && formik.errors.email
								? 'error'
								: ''
						}
					/>
					{formik.touched.email && formik.errors.email && (
						<div className="error">{formik.errors.email}</div>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.password || ''}
						autoComplete="new-password"
						className={
							formik.touched.password && formik.errors.password
								? 'error'
								: ''
						}
					/>
					{formik.touched.password && formik.errors.password && (
						<div className="error">{formik.errors.password}</div>
					)}
				</div>
				<div className="input-group">
					<label htmlFor="passwordConfirm">Re-enter password</label>
					<input
						type="password"
						name="passwordConfirm"
						id="passwordConfirm"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.passwordConfirm || ''}
						autoComplete="new-password"
						className={
							formik.touched.passwordConfirm &&
							formik.errors.passwordConfirm
								? 'error'
								: ''
						}
					/>
					{formik.touched.passwordConfirm &&
						formik.errors.passwordConfirm && (
							<div className="error">
								{formik.errors.passwordConfirm}
							</div>
						)}
				</div>
				<button type="submit" className="primary-btn auth-btn">
					Continue
				</button>
			</Form>
		),
		legalese: (
			<div className="legalese">
				<p>
					By creating an account, you agree to Amazon's{' '}
					<span className="auth-link">
						Conditions of Use and Sale
					</span>
					. Please see our{' '}
					<span className="auth-link">Privacy Notice</span>, our{' '}
					<span className="auth-link">Cookies Notice</span> and our{' '}
					<span className="auth-link">Interest-Based Ads Notice</span>
					.
				</p>
			</div>
		),
		buying: (
			<div className="schizzness">
				<p>Buying for work?</p>
				<span className="auth-link">
					Create a free Business account
				</span>
			</div>
		),
		divider: <GradientDivider />,
		existing: (
			<div className="existing">
				<p>
					Already have an account?{' '}
					<button
						className="auth-link"
						type="button"
						onClick={handleToggle}
					>
						Sign in ▸
					</button>
				</p>
			</div>
		),
	}

	const currentView = isSignIn ? signIn : register

	if (loading)
		return (
			<Container>
				<LogoContainer onClick={handleHomeClick}>
					<Logo />
				</LogoContainer>
				<InnerContainer>
					<p>Loading...</p>
				</InnerContainer>
			</Container>
		)

	if (error)
		return (
			<Container>
				<LogoContainer onClick={handleHomeClick}>
					<Logo />
				</LogoContainer>
				<InnerContainer>
					<p>Oops! Something went wrong. Please try again later.</p>
				</InnerContainer>
			</Container>
		)

	return (
		<Container>
			<LogoContainer onClick={handleHomeClick}>
				<Logo />
			</LogoContainer>
			<InnerContainer>
				<FormContainer>
					<div className="header">
						<p>{currentView.heading}</p>
					</div>
					{currentView.form}
					{currentView.legalese}
					{isSignIn && currentView.help}
					<div className="divider">
						<hr />
					</div>
					{currentView.buying}
					{!isSignIn && register.divider}
					{!isSignIn && register.existing}
				</FormContainer>
				{isSignIn && signIn.textOverLine}
				{isSignIn && (
					<button
						onClick={() => setIsSignIn(!isSignIn)}
						className="secondary-btn auth-btn"
						type="button"
					>
						Create your Amazon account
					</button>
				)}
			</InnerContainer>

			<GradientDivider $marginTop="var(--spacing-lg)" />
			<ul className="legalese">
				<li>
					<span className="auth-link">Conditions of Use</span>
				</li>
				<li>
					<span className="auth-link">Privacy Notice</span>
				</li>
				<li>
					<span className="auth-link">Help</span>
				</li>
				<li>
					<span className="auth-link">Cookies Notice</span>
				</li>
				<li>
					<span className="auth-link">Interest-Based Ads Notice</span>
				</li>
			</ul>
			<div className="copyright">
				<p>@ 1996-2025, Amazon.com, Inc. or its affiliates</p>
			</div>
		</Container>
	)
}
