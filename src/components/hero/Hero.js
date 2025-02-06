import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { superCategories } from '../../utils/superCategories'
import ChevronIcon from '../../icons/ChevronIcon'
import {
	HeroContainer,
	HeroTint,
	HeroContent,
	ChevronButton,
	CTAButton,
} from '../../assets/styles/HeroStyles'

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
			<HeroTint />
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
					<span>{superCategories[heroImageIndex].cta}</span>
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

