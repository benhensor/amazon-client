import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { superCategories } from '../../utils/superCategories'
import ChevronIcon from '../../icons/ChevronIcon'
import styled from 'styled-components'

export default function Hero() {
	const navigate = useNavigate()
	const [heroImageIndex, setHeroImageIndex] = useState(0)

	// Change hero image at an interval
	useEffect(() => {
		const interval = setInterval(() => {
			setHeroImageIndex((prevIndex) =>
				prevIndex === superCategories.length - 1 ? 0 : prevIndex + 1
			)
		}, 5000)

		return () => clearInterval(interval)
	}, [])

	const handleHeroClick = () => {
		navigate(`/department/${superCategories[heroImageIndex].slug}`)
	}

	return (
		<HeroContainer>
			<HeroContent>
				<img
					src={superCategories[heroImageIndex].image}
					alt={superCategories[heroImageIndex].title}
				/>
				<ChevronButton
					id="left-chevron"
					onClick={() =>
						setHeroImageIndex((prevIndex) =>
							prevIndex === 0
								? superCategories.length - 1
								: prevIndex - 1
						)
					}
				>
					<ChevronIcon direction="left" />
				</ChevronButton>
				<CTAButton onClick={handleHeroClick}>
					{superCategories[heroImageIndex].cta}
				</CTAButton>
				<ChevronButton
					id="right-chevron"
					onClick={() =>
						setHeroImageIndex((prevIndex) =>
							prevIndex === superCategories.length - 1
								? 0
								: prevIndex + 1
						)
					}
				>
					<ChevronIcon direction="right" />
				</ChevronButton>
			</HeroContent>
		</HeroContainer>
	)
}

const HeroContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const HeroContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: var(--dk-blue-50);
	position: relative;
	overflow: hidden;
	img {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		max-width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		z-index: 0;
	}
`

const ChevronButton = styled.button`
	width: 5rem;
	height: 100%;
	svg {
		width: 50%;
		stroke: var(--white);
		stroke-width: 1;
	}
	@media (max-width: 768px) {
		width: 4rem;
	}
	@media (max-width: 450px) {
		width: 3rem;
	}
`

const CTAButton = styled.button`
	text-transform: uppercase;
	font-size: var(--font-cta);
	color: var(--white);
	width: 100%;
	height: 30rem;
	overflow: hidden;
	position: relative;
	@media (max-width: 1199px) {
		height: 25rem;
	}
	@media (max-width: 768px) {
		height: 20rem;
	}
	@media (max-width: 450px) {
		height: 15rem;
	}
`
