import React from 'react'
import Logo from '../icons/Logo'
import SignInBtn from '../components/buttons/SignInBtn'
import ChevronIcon from '../icons/ChevronIcon'
import styled from 'styled-components'

export default function SignIn() {
	return (
		<Container>
			<LogoContainer>
				<Logo />
			</LogoContainer>
			<SignInFormContainer>
				<SignInForm
					onSubmit={(e) => {
						e.preventDefault()
					}}
				>
					<div className="header">
						<h1>Sign-In</h1>
					</div>
					<div className="email">
						<label htmlFor="email">
							Email or mobile phone number
						</label>
						<input
							type="text"
							name="email"
							id="email"
							onChange={() => {}}
							required
						/>
					</div>

					<div>
						<SignInBtn
							onClick={() => {}}
							text="Continue"
							type="login"
						/>
					</div>
					<div className="legalese">
						<p>
							By continuing, you agree to Scamazon's{' '}
							<span>Conditions of Use and Sale</span>. Please see
							our <span>Privacy Notice</span>, our{' '}
							<span>Cookies Notice</span> and our{' '}
							<span>Interest-Based Ads Notice</span>.
						</p>
					</div>
					<div className="need-help">
						<ChevronIcon direction="right" />
						<p>Need Help?</p>
					</div>
					<div></div>
				</SignInForm>
				<div className="new-to">
					<hr />
					<p>New to Scamazon?</p>
				</div>
				<div>
					<SignInBtn
						onClick={() => {}}
						text="Create your Scamazon account"
						type="register"
					/>
				</div>
			</SignInFormContainer>
		</Container>
	)
}

const Container = styled.div`
	padding: var(--spacing-md) var(--spacing-lg);
	button {
		box-shadow: 0 2px 5px 0 rgba(213, 217, 217, 0.5);
	}
`

const LogoContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-bottom: var(--spacing-lg);
	svg {
		width: 15rem;
	}
`

const SignInFormContainer = styled.div`
	width: 40rem;
	margin: 0 auto;
	div.new-to {
		margin: 3rem 0;
		position: relative;
		hr {
			width: 100%;
			border: 1px solid var(--lt-grey);
		}
		p {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: var(--white);
			padding: 0 var(--spacing-sm);
			font-size: var(--font-xs);
			color: var(--lt-text);
		}
	}
`

const SignInForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: var(--spacing-md);
	padding: var(--spacing-lg);
	margin: 0 auto;
	border-radius: var(--br-md);
	border: 1px solid var(--border-grey);
	div.email {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-xs);
		label {
			font-size: var(--font-sm);
			font-weight: bold;
		}
		input {
			padding: var(--spacing-ms);
			border: 1px solid var(--border-grey);
			border-radius: var(--br-sm);
			font-size: var(--font-md);
			&:focus {
				outline: 3px solid var(--input-focus);
				border: 1px solid var(--input-focus-border);
			}
		}
	}
	div.legalese {
		p {
			font-size: var(--font-xs);
			color: var(--dk-blue);
			span {
				color: var(--link-blue);
				cursor: pointer;
				&:hover {
					text-decoration: underline;
				}
			}
		}
	}
	div.need-help {
		display: flex;
		align-items: center;
		gap: var(--spacing-xs);
		svg {
			width: 0.5rem;
			margin-top: 0.025rem;
			path {
				stroke: var(--dk-blue);
			}
		}
		p {
			font-size: var(--font-xs);
			color: var(--link-blue);
			cursor: pointer;
			&:hover {
				text-decoration: underline;
			}
		}
	}
`
