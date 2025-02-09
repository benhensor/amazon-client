import styled from 'styled-components'

export const HeroContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
  position: relative;
`

export const HeroTint = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--dk-blue-50);
  opacity: 0.6;
  z-index: 1;
`

export const HeroContent = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-origin: var(--dk-blue-50);
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

export const ChevronButton = styled.button`
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

export const CTAButton = styled.button`
  span {
    position: relative;
    text-transform: uppercase;
    font-size: var(--font-cta);
    font-weight: bold;
    letter-spacing: 0.4rem;
    color: var(--white);
    background: var(--dk-blue-50);
    padding: var(--spacing-xs) var(--spacing-md);
    z-index: 99;
  }
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
