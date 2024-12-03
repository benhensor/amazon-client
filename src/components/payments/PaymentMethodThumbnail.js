import React from 'react'
import { useSelector } from 'react-redux'
import { getAttributes } from '../../utils/paymentMethods'
import styled from 'styled-components'

export default function PaymentMethodThumbnail({ card, isMethodInListDisplay }) {
  const user = useSelector((state) => state.user.currentUser)
  const { logo, img, typeLogo, background } = getAttributes(card)
  return (
    <Thumbnail
				style={{ background: background }}
				$isMethodInListDisplay={isMethodInListDisplay}
			>
				<div className="sash-container">
					{card.status === 'default' && (
						<div className={isMethodInListDisplay ? "default-sash thumbnail" : "default-sash"}>Default</div>
					)}
				</div>
				<div className="thumbnail-logo">{logo}</div>
				{(card.bank === 'Lloyds Bank' || card.bank === 'Halifax') && (
					<div className="thumbnail-img">{img}</div>
				)}
				{card.status === 'default' && !isMethodInListDisplay && (
					<div className="thumbnail-default">
						<p>•••• •••• •••• {card.number.slice(-4) || null}</p>
						<p>
							{user.first_name} {user.last_name}
						</p>
					</div>
				)}
				<div className="thumbnail-details">
					{typeLogo}
					<p>{card.account}</p>
				</div>
			</Thumbnail>
  )
}

const Thumbnail = styled.div`
	border-radius: var(--br-sm);
	width: 100%;
	height: 100%;
	padding: var(--spacing-xs);
	position: relative;

	.sash-container {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.default-sash {
    position: relative;
    top: var(--spacing-sm);
    left: calc(100% - 7rem); /* Adjusted to account for wider top */
    width: 7rem;
    background-color: var(--default-green);
    color: var(--dk-blue);
    padding: var(--spacing-xs) var(--spacing-sm) var(--spacing-xs) 0;
    font-size: var(--font-xs);
    font-weight: 700;
    text-align: right;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 1rem 100%);

		&.thumbnail {
			top: 0;
			left: calc(100% - 5.6rem);
			scale: 0.6;
		}
}

	.thumbnail-logo {
		position: absolute;
		top: ${($props) =>
			$props.$isMethodInListDisplay
				? 'var(--spacing-xs)'
				: 'var(--spacing-sm)'};
		left: ${($props) =>
			$props.$isMethodInListDisplay ? 'var(--spacing-xs)' : '1.2rem'};
		display: flex;
		align-items: flex-start;
		svg {
			width: ${($props) =>
				$props.$isMethodInListDisplay ? '2rem' : '8.5rem'};
			height: 100%;
		}
	}

	.thumbnail-img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		justify-content: center;
		align-items: center;
		svg {
			width: 100%;
			height: auto;
		}
	}

	.thumbnail-default {
		position: absolute;
		bottom: ${($props) =>
			$props.$isMethodInListDisplay
				? 'var(--spacing-xs)'
				: 'var(--spacing-md)'};
		left: ${($props) =>
			$props.$isMethodInListDisplay ? 'var(--spacing-xs)' : '1.2rem'};
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		p {
			font-weight: 700;
			color: var(--white);
			font-size: ${($props) =>
				$props.$isMethodInListDisplay ? '.4rem' : '1.2rem'};
		}
	}

	.thumbnail-details {
		position: absolute;
		bottom: ${($props) =>
			$props.$isMethodInListDisplay
				? 'var(--spacing-xs)'
				: 'var(--spacing-sm)'};
		right: ${($props) =>
			$props.$isMethodInListDisplay ? 'var(--spacing-xs)' : '1.2rem'};
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		svg {
			width: ${($props) =>
				$props.$isMethodInListDisplay ? '1.2rem' : '5rem'};
			height: auto;
		}
		p {
			color: var(--white);
			font-size: ${($props) =>
				$props.$isMethodInListDisplay ? '.4rem' : '.8rem'};
		}
	}
`