import React, { useState } from 'react'
import Logo from '../../icons/Logo'
import UnionJackIcon from '../../icons/UnionJackIcon'
import styled from 'styled-components'

export default function Footer() {
	const [openSection, setOpenSection] = useState(null)
	const toggleSection = (section) => {
		setOpenSection(openSection === section ? null : section)
	}
	const footerLists = {
		getToKnowUs: [
			'Careers',
			'About Us',
			'UK Modern Slavery Statement',
			'Sustainability',
			'Scamazon Science',
		],
		makeMoneyWithUs: [
			'Sell on Scamazon',
			'Sell on Scamazon Schizzness',
			'Sell on Scamazon Handmade',
			'Sell on Scamazon Launchpad',
			'Supply to Scamazon',
			'Protect and build your brand',
			'Associates Programme',
			'Fulfilment by Scamazon',
			'Seller Fulfilled Crime',
			'Advertise Your Products',
			'Independently Publish with Us',
			'Scamazon Pay',
			'Host a Scamazon Hub',
			'› See More Make Money with Us',
		],
		scamazonPaymentMethods: [
			'Instalments by Gnarlays',
			'The Scamazon Gnarlaycard',
			'Scamazon Schizzness Annexe Card',
			'Gift Cards',
			'Scamazon Currency Converter',
			'Payment Methods Help',
			'Shop with Points',
			'Top Up Your Account',
			'Top Up Your Account in Store',
		],
		letUsHelpYou: [
			'COVID-19 and Scamazon',
			'Track Packages or View Orders',
			'Delivery Rates & Policies',
			'Scamazon Crime',
			'Returns & Replacements',
			'Recycling',
			'Manage Your Content and Devices',
			'Scamazon Mobile App',
			'Customer Service',
			'Accessibility',
			'Grift List',
		],
	}
	return (
		<StyledFooter>
			<a href="#header">
				<div className="to-top">Back to top</div>
			</a>
			<div className="footer-links">
				<div className="column">
					<p onClick={() => toggleSection('getToKnowUs')}>
						Get to Know Us
					</p>
					<ul className={openSection === 'getToKnowUs' ? 'open' : ''}>
						{footerLists.getToKnowUs.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
				<div className="column">
					<p onClick={() => toggleSection('makeMoneyWithUs')}>
						Make Money with Us
					</p>
					<ul
						className={
							openSection === 'makeMoneyWithUs' ? 'open' : ''
						}
					>
						{footerLists.makeMoneyWithUs.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
				<div className="column">
					<p onClick={() => toggleSection('scamazonPaymentMethods')}>
						Scamazon Payment Methods
					</p>
					<ul
						className={
							openSection === 'scamazonPaymentMethods'
								? 'open'
								: ''
						}
					>
						{footerLists.scamazonPaymentMethods.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
				<div className="column">
					<p onClick={() => toggleSection('letUsHelpYou')}>
						Let Us Help You
					</p>
					<ul
						className={openSection === 'letUsHelpYou' ? 'open' : ''}
					>
						{footerLists.letUsHelpYou.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</ul>
				</div>
			</div>
			<hr />
			<div className="base-section">
				<div className="block">
					<Logo letterColor="var(--white)" />
				</div>
				<div className="block">
					<div className="item">
						<p>£ GBP - Pounds</p>
					</div>
					<div className="item">
						<UnionJackIcon />
						<p>United Kingdom</p>
					</div>
				</div>
			</div>
		</StyledFooter>
	)
}

const StyledFooter = styled.footer`
	background: var(--md-blue);
	color: var(--lt-grey);
	user-select: none;
	text-align: center;
	width: 100vw;
	div.to-top {
		color: var(--white);
		background: var(--paleblue);
		font-size: var(--font-xs);
		padding: var(--spacing-md) 0;
		cursor: pointer;
		&:hover {
			background: var(--paleblue-hover);
		}
	}
	div.footer-links {
		max-width: 120rem;
		margin: var(--spacing-xl) auto 0 auto;
		display: flex;
		justify-content: space-around;
		padding: var(--spacing-lg) 0;
		div.column {
			text-align: left;
			p {
				font-weight: bold;
				color: var(--white);
				font-size: clamp(var(--font-sm), 2vw, var(--font-md));
			}
			ul {
				list-style: none;
				margin-top: var(--spacing-ms);
				li {
					font-size: clamp(var(--font-xxs), 2vw, var(--font-xs));
					padding: var(--spacing-xs) 0;
					cursor: pointer;
					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}
	hr {
		border: 0;
		height: 1px;
		background: var(--paleblue-hover);
		margin: var(--spacing-lg) auto;
	}
	div.base-section {
		display: flex;
		justify-content: center;
		margin: 0 auto;
		gap: 8rem;
		padding-bottom: var(--spacing-xxl);
		div.block {
			display: flex;
			align-items: center;
			gap: var(--spacing-md);
			cursor: pointer;
		}
		div.item {
			display: flex;
			align-items: center;
			gap: var(--spacing-md);
			border: 1px solid var(--lt-grey);
			padding: var(--spacing-sm) var(--spacing-md);
			p {
				font-size: var(--font-xs);
			}
		}
	}

	@media only screen and (max-width: 1199px) {
		div.footer-links {
			justify-content: space-between;
			padding: 0 var(--spacing-md);
			div.column {
				margin-bottom: var(--spacing-lg);
			}
		}
		div.base-section {
			gap: var(--spacing-lg);
		}
	}

	@media only screen and (max-width: 768px) {
		div.footer-links {
			flex-direction: column;
			width: 30rem;
			align-items: center;
			div.column {
				margin-bottom: var(--spacing-lg);
				h5 {
					text-align: center;
				}
				ul {
					display: none;
					&.open {
						display: block;
						text-align: center;
					}
				}
			}
		}
	}
	div.base-section {
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--spacing-lg);
	}
`
